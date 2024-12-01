"use client";

import { AccountInfo } from "@/components/AccountInfo";
import HomeHero from "@/components/home/home-hero";
import { Header, PageContainer } from "@/components/layout";
import { MessageBoard } from "@/components/MessageBoard";
import { NetworkInfo } from "@/components/NetworkInfo";
import { TransferAPT } from "@/components/TransferAPT";
import { Card, CardContent } from "@/components/ui/card";
import { WalletDetails } from "@/components/WalletDetails";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { OktoProvider, BuildType } from "okto-sdk-react";

const OKTO_CLIENT_API_KEY = "10f73c94-d3f3-4008-99e1-300df58b155a";
export default function Home() {
  const { connected } = useWallet();
  console.log({ okto: OKTO_CLIENT_API_KEY });

  return (
    <PageContainer header={<Header />}>
      {connected ? (
        <Card>
          <CardContent className="flex flex-col gap-10 pt-6">
            <WalletDetails />
            <NetworkInfo />
            <AccountInfo />
            <TransferAPT />
            <MessageBoard />
          </CardContent>
        </Card>
      ) : (
        <OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}>
          <HomeHero />
        </OktoProvider>
      )}
    </PageContainer>
  );
}
