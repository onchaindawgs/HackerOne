"use client";

import { AccountInfo } from "@/components/AccountInfo";
import { BusinessCategories, Cta, FeaturesPlanet, LargeTestimonial } from "@/components/home";
import HomeHero from "@/components/home/home-hero";
import { MessageBoard } from "@/components/MessageBoard";
import { NetworkInfo } from "@/components/NetworkInfo";
import { TransferAPT } from "@/components/TransferAPT";
import { Card, CardContent } from "@/components/ui/card";
import { WalletDetails } from "@/components/WalletDetails";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
export default function Home() {
  const { connected } = useWallet();
  return (
    <>
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
        <>
          <HomeHero />
          <BusinessCategories />
          <FeaturesPlanet />
          <LargeTestimonial />
          <Cta />
        </>
      )}
    </>
  );
}
