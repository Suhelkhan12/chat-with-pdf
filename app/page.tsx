import { Button } from "@/components/ui/button";
import Link from "next/link";

import { IoLogOutOutline } from "react-icons/io5";

const page = () => {
  return (
    <div className="w-screen min-h-screen flex items-center justify-center flex-col md:px-10 px-5">
      <div className=" flex flex-col items-center text-center space-y-3">
        <h1 className=" text-4xl md:text-6xl font-bold">Chat with any pdf</h1>
      </div>
      <p className="mt-2 text-lg max-w-xl text-center">
        Upload your PDF documents and start a conversation. Get instant answers,
        insights, and summaries powered by AI.
      </p>
      <div className=" w-full mt-6 flex justify-center">
        <Link href={"/sign-in"}>
          <Button>
            <div className="flex items-center justify-center gap-1">
              <span>Get started</span>
              <IoLogOutOutline className="size-5" />
            </div>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default page;
