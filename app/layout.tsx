import type { Metadata } from "next";
import { AccessGate } from "@/components/access-gate";
import "./globals.css";

export const metadata: Metadata = {
  title: "Googolplex — Know it all",
  description:
    "Googolplex is a Web3 + Social + AI coding ecosystem. Build, govern, and ship together — at the intersection of curiosity and conviction.",
  openGraph: {
    title: "Googolplex — Know it all",
    description:
      "A Web3 + Social + AI coding ecosystem. Build, govern, and ship together.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-black text-white">
        {children}
        <AccessGate />
      </body>
    </html>
  );
}
