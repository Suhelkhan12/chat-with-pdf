import { NextResponse } from "next/server";

// for hitting the route create-chat
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { file_key, file_name } = body;
    console.log({
      "From api route": {
        file_key,
        file_name,
      },
    });
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
