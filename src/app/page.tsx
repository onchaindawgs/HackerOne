"use client";

import HomeHero from "@/components/home/home-hero";
import { Header, PageContainer } from "@/components/layout";

import { BuildType, OktoProvider } from "okto-sdk-react";

const OKTO_CLIENT_API_KEY = process.env.NEXT_PUBLIC_OKTO_CLIENT_API_KEY as string;
console.log({ OKTO_CLIENT_API_KEY });
export default function Home() {
  return (
    <OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}>
      <PageContainer header={<Header />}>
        <HomeHero />
      </PageContainer>
    </OktoProvider>
  );
}
