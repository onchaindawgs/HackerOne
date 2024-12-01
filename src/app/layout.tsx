import type { Metadata } from "next";
import type { ReactNode } from "react";

import { ReactQueryProvider } from "@/components/ReactQueryProvider";
import { WalletProvider } from "@/components/WalletProvider";
import { Toaster } from "@/components/ui/toaster";
import { WrongNetworkAlert } from "@/components/WrongNetworkAlert";
import localFont from "next/font/local";
import { GoogleOAuthProvider } from "@react-oauth/google";

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
  const GOOGLE_CLIENT_ID = "1051020883677-43q1s4t2reh46t2odpe3oivu3lkrhd73.apps.googleusercontent.com";
  debugger;
  console.log({ gid: GOOGLE_CLIENT_ID });
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${satoshi.variable} ${satoshiItalic.variable} font-sans antialiased`}>
        <WalletProvider>
          <ReactQueryProvider>
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
              <div id="root">{children}</div>
            </GoogleOAuthProvider>
            <WrongNetworkAlert />
            <Toaster />
          </ReactQueryProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
