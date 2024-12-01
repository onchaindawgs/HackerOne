import type { Metadata } from "next";
import type { ReactNode } from "react";

import { ReactQueryProvider } from "@/components/ReactQueryProvider";
import { WalletProvider } from "@/components/WalletProvider";
import { Toaster } from "@/components/ui/toaster";
import { WrongNetworkAlert } from "@/components/WrongNetworkAlert";
import localFont from "next/font/local";

import "./globals.css";

const satoshi = localFont({
  src: "./fonts/Satoshi-Variable.ttf",
  variable: "--font-satoshi",
  weight: "400 700",
});

const satoshiItalic = localFont({
  src: "./fonts/Satoshi-VariableItalic.ttf",
  variable: "--font-satoshi-italic",
  weight: "400 700",
});

export const metadata: Metadata = {
  applicationName: "HackerOne",
  title: "HackerOne",
  description: "A platform where web3 hackers meet others web3 hackers",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${satoshi.variable} ${satoshiItalic.variable} font-sans antialiased`}>
        <WalletProvider>
          <ReactQueryProvider>
            <div id="root">{children}</div>
            <WrongNetworkAlert />
            <Toaster />
          </ReactQueryProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
