import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className=" flex w-full items-center justify-center min-h-screen bg-gradient-to-r from-sky-400 to-blue-500">
      <SignUp />
    </div>
  );
}
