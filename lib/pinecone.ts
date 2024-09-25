import { Pinecone } from "@pinecone-database/pinecone";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { downloadPdf } from "./download-pdf-locally";

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

// for loading our file in pineconedb
/**
 *
 * @param file_key
 *
 * this function is everything in our app. It will perform many steps.
 *
 * 1. obtain the pdf from our uploadthing storage
 */
export async function loadPdfToPinecone(file_key: string) {
  const baseUrl = "https://utfs.io/f";
  const urlForDownloadingPdf = `${baseUrl}/${file_key}`;
  console.log("downloading from uploadthing");

  // downloading pdf from upload thing
  const pdfBuffer = await downloadPdf(urlForDownloadingPdf);
  const pdfBlob = new Blob([pdfBuffer], { type: "application/pdf" });

  // using langchain pdfloader to split the pdf
  const loader = new PDFLoader(pdfBlob);
  const pages = await loader.load();
  return pages;
}

/**
 * 0
: 
appUrl
: 
"https://utfs.io/a/6agzmtaeae/949Le3cbq3i9dcrKL2sEh3XBZAf1wOKGrCuTasIokP8Vx5gF"
customId
: 
null
key
: 
"949Le3cbq3i9dcrKL2sEh3XBZAf1wOKGrCuTasIokP8Vx5gF"
lastModified
: 
1721039089772
name
: 
"Suhel-Khan-Resume.pdf"
serverData
: 
{uploadedBy: 'user_2ly6UxtX6UN1xrEIBDfefiRLJca'}
size
: 
136308
type
: 
"application/pdf"
url
: 
"https://utfs.io/f/949Le3cbq3i9dcrKL2sEh3XBZAf1wOKGrCuTasIokP8Vx5gF"
 */
