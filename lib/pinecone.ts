import { Pinecone } from "@pinecone-database/pinecone";
import { Vector } from "@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch/data";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { downloadPdf } from "./download-pdf-locally";
import {
  Document,
  RecursiveCharacterTextSplitter,
} from "@pinecone-database/doc-splitter";
import { getEmbeddings } from "./embeddings";
import md5 from "md5";
import { convertToASCII } from "./utils";

// for initialising pineconedb instance
let pinecone: Pinecone | null = null;
export const getPineconeInstance = async () => {
  if (!pinecone) {
    pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });
  }
  return pinecone;
};

type PdfPage = {
  pageContent: string;
  metadata: {
    loc: {
      pageNumber: number;
    };
  };
};

// for loading our file in pineconedb
/**
 *
 * this function is everything in our app. It will perform many steps.
 *
 * 1. obtain the pdf from our uploadthing storage
 * 2. Segmenting the pdf using langchain
 * 3. Vectorise and embed the documents
 */
export async function loadPdfToPinecone(file_key: string) {
  const baseUrl = "https://utfs.io/f";
  const urlForDownloadingPdf = `${baseUrl}/${file_key}`;

  // step: 1 downloading pdf from upload thing
  const pdfBuffer = await downloadPdf(urlForDownloadingPdf);
  const pdfBlob = new Blob([pdfBuffer], { type: "application/pdf" });

  // step: 2 using langchain pdfloader to split the pdf
  const loader = new PDFLoader(pdfBlob);
  const pages = (await loader.load()) as PdfPage[];

  // more finegrain segmentation
  const documents = await Promise.all(pages.map(prepareDocument));

  //step: 3 vectorise the segments
  const vectors = await Promise.all(documents.flat().map(embedDocument));

  return vectors;

  // //step: 4 add vectors to pinecone
  // const pc = await getPineconeInstance();
  // const pineconeIndex = pc.Index("chatwithpdf");
  // console.log("Inserting vectors into pinecone");

  // const namespace = convertToASCII(file_key);

  // pineconeIndex.namespace(namespace).upsert([
  //   {
  //     id: "",
  //     values: [1.0, 1.5],
  //   },
  // ]);
}

// function to embed documents using openai embeddings model
async function embedDocument(document: Document): Promise<Vector> {
  try {
    const embeddings = await getEmbeddings(document.pageContent);

    // now hashing every embedding with an id within pinecone
    const hash = md5(document.pageContent);

    return {
      id: hash,
      values: embeddings,
      metadata: {
        text: document.metadata.text,
        pageNumber: document.metadata.pageNumber,
      },
    } as Vector;
  } catch (err) {
    console.log("Error embeding document", err);
    throw err;
  }
}

// function to truncate the string which will be feed to each document as a metadata
export const truncateStringByByte = (str: string, bytes: number) => {
  const enc = new TextEncoder();
  return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
};

// this function will be used for more fine segmentation of pdfs
async function prepareDocument(page: PdfPage) {
  const { pageContent, metadata } = page;

  //replacing all new line chars with empty string
  pageContent.replace(/\n/g, "");

  // split the docs
  const splitter = new RecursiveCharacterTextSplitter();
  const docs = await splitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        pageNumber: metadata.loc.pageNumber,
        text: truncateStringByByte(pageContent, 36000),
      },
    }),
  ]);

  return docs;
}
