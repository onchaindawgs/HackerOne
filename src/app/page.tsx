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
import { BuildType, OktoProvider } from "okto-sdk-react";

const OKTO_CLIENT_API_KEY = "bf3ad2a6-4dc7-4cd4-9f66-463588dd1828";
export default function Home() {
  const { connected } = useWallet();

  return (
    <OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}>
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
          <HomeHero />
        )}
      </PageContainer>
    </OktoProvider>
  );
}
