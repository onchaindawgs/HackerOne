"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HackathonsList from "@/components/dashboard/hackathons-list";
import BuildersList from "@/components/dashboard/builders-list";
import { Header, PageContainer, SectionContainer } from "@/components/layout";

export default function DeveloperDashboard() {
  const [activeTab, setActiveTab] = useState("hackathons");

  return (
    <PageContainer header={<Header />}>
      <SectionContainer>
        <h1 className="mb-6 text-3xl font-bold">Welcome, Developer!</h1>
        <Tabs defaultValue="hackathons" onValueChange={(value) => setActiveTab(value)}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="hackathons">Hackathons</TabsTrigger>
            <TabsTrigger value="builders">Builders</TabsTrigger>
          </TabsList>
          <TabsContent value="hackathons">
            <HackathonsList />
          </TabsContent>
          <TabsContent value="builders">
            <BuildersList />
          </TabsContent>
        </Tabs>
      </SectionContainer>
    </PageContainer>
  );
}
