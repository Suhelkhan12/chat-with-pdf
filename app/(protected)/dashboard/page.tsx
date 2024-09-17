import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { MessageSquare } from "lucide-react";
import Link from "next/link";
import React from "react";
import FileUpload from "./_components/file-upload";

const page = async () => {
  const user = await currentUser();
  if (!user) {
    return (
      <div className="min-h-screen bg-black text-3xl font-bold">
        Not signed in!
      </div>
    );
  }
  return (
    <div className=" min-h-screen px-5 md:px-10  mx-auto md:max-w-4xl pb-10 ">
      <div className="flex items-center justify-between gap-10 pt-10">
        <h1 className=" text-3xl font-semibold ">DocDilogue</h1>
        <UserButton />
      </div>

      <main className=" mt-8 space-y-4 ">
        <Card>
          <CardHeader>
            <CardTitle className=" text-[1.5rem]">
              Welcome{" "}
              <span className=" bg-gradient-to-r from-sky-400 to-blue-500 text-transparent bg-clip-text">
                {user?.firstName}
              </span>
            </CardTitle>
            <CardDescription>
              Your AI-powered PDF chat assistant
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              ChatPDF allows you to have interactive conversations with your PDF
              documents. Simply upload a PDF, and start asking questions or
              discussing its content with our AI.
            </p>
            <Link href="/chats">
              <Button className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" /> Go to Chats
              </Button>
            </Link>
          </CardContent>
        </Card>
        <FileUpload />
        <Card>
          <CardHeader>
            <CardTitle className="text-[1.5rem]">How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2">
              <li>Upload your PDF document</li>
              <li>Our AI processes and analyzes the content</li>
              <li>Start a chat and ask questions about the document</li>
              <li>
                Receive instant, accurate responses based on the PDF content
              </li>
            </ol>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default page;
