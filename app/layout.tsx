import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import TanStackProvider from "@/providers/tanstack-provider";
import { Toaster } from "sonner";

const roboto = Roboto({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "DocDialogue | Chat with your pdf with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <TanStackProvider>
        <html lang="en">
          <body className={cn(roboto.variable, "text-black")}>
            <div className="font-roboto bg-gradient-to-r from-rose-100 to-teal-100 ">
              {children}
            </div>
            <Toaster />
          </body>
        </html>
      </TanStackProvider>
    </ClerkProvider>
  );
}
