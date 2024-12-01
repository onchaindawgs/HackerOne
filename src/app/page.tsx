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
export default function Home() {
  const { connected } = useWallet();
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
        <HomeHero />
      )}
    </PageContainer>
  );
}
