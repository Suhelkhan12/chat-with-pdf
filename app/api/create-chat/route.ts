import { loadPdfToPinecone } from "@/lib/pinecone";
import { NextResponse } from "next/server";

// for hitting the route /api/create-chat
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { file_key } = body;
    const pdfSegments = await loadPdfToPinecone(file_key);
    return NextResponse.json({
      message: "Pdf segmented successfully 🎊",
      pdfSegments,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
