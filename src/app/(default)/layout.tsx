"use client";

import { Header } from "@/components/layout";

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header theme="dark" />
      <main className="grow">{children}</main>
    </>
  );
}
