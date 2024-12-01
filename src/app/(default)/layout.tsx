"use client";

import { Footer, Header } from "@/components/layout";

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />

      <main className="grow">{children}</main>
      <Footer border={true} />
    </>
  );
}
