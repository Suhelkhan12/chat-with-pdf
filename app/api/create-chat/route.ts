import { loadPdfToPinecone } from "@/lib/pinecone";
import { NextResponse } from "next/server";

// for hitting the route /api/create-chat
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { file_key } = body;
    console.log(file_key);
    const pages = await loadPdfToPinecone(file_key);
    console.log({ pages });
    return NextResponse.json({
      message: "Pdf upload successfull 🎊",
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
