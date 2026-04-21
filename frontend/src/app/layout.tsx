import type { Metadata } from "next";

import { Navbar } from "@/components/Navbar";
import { ProgramProvider } from "@/context/ProgramProvider";
import { WalletProvider } from "@/context/WalletProvider";

import "./globals.css";

export const metadata: Metadata = {
  title: "NusaCow",
  description: "Fractional cattle investment powered by Solana and Anchor",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <WalletProvider>
          <ProgramProvider>
            <Navbar />
            {children}
          </ProgramProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
