"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HackathonsList from "@/components/dashboard/hackathons-list";
import BuildersList from "@/components/dashboard/builders-list";
import { Header, PageContainer, SectionContainer } from "@/components/layout";
import { CreateHackathonModal } from "@/components/create-hackathon";
import { useAppStore } from "@/store/store";
import { motion } from "framer-motion";

const tabs = [
  { id: "hackathons", label: "Hackathons", component: <HackathonsList /> },
  { id: "builders", label: "Builders", component: <BuildersList /> },
];

export default function DeveloperDashboard() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const { isCreateHakathonModalOpen, setIsCreateHakathonModalOpen } = useAppStore((state) => state);

  return (
    <PageContainer header={<Header />}>
      <SectionContainer classNames="py-4">
        <div className="w-full mx-auto">
          <div className="sticky flex p-1 space-x-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id ? "text-white" : "text-white/60 hover:text-white/80"
                } relative rounded-lg px-3 py-2 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`}
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="bubble"
                    className="absolute inset-0 bg-white rounded-lg mix-blend-overlay"
                    style={{ opacity: 0.7 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {tab.label}
              </button>
            ))}
          </div>
          <div className="h-[80vh] p-4 mt-4 overflow-scroll rounded-lg shadow-md">
            {tabs.find((tab) => tab.id === activeTab)?.component}
          </div>
        </div>
      </SectionContainer>
      <div className="overflow-scroll">
        <CreateHackathonModal isOpen={isCreateHakathonModalOpen} onClose={() => setIsCreateHakathonModalOpen(false)} />
      </div>
    </PageContainer>
  );
}
