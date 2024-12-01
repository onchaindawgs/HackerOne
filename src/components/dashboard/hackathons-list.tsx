"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BackgroundGradient } from "../shared";
import Typography from "../ui/typography";

interface Hackathon {
  id: number;
  title: string;
  description: string;
  date: string;
  participants: number;
}

const initialHackathons: Hackathon[] = [
  {
    id: 1,
    title: "Web3 DeFi Hackathon",
    description: "Build the future of decentralized finance",
    date: "2024-06-15",
    participants: 500,
  },
  {
    id: 2,
    title: "AI & Blockchain Fusion",
    description: "Combine AI and blockchain technologies",
    date: "2024-07-01",
    participants: 750,
  },
  {
    id: 3,
    title: "Sustainable Tech Challenge",
    description: "Create solutions for a greener future",
    date: "2024-07-20",
    participants: 600,
  },
  {
    id: 4,
    title: "IoT Security Hackathon",
    description: "Secure the Internet of Things",
    date: "2024-08-05",
    participants: 400,
  },
  {
    id: 5,
    title: "Cross-Chain Interoperability",
    description: "Build bridges between blockchains",
    date: "2024-08-25",
    participants: 550,
  },
];

export default function HackathonsList() {
  const [hackathons, setHackathons] = useState<Hackathon[]>(initialHackathons);
  const [loading, setLoading] = useState(false);

  const loadMore = () => {
    setLoading(true);
    // Simulating an API call to load more hackathons
    setTimeout(() => {
      const newHackathons: Hackathon[] = [
        {
          id: hackathons.length + 1,
          title: "Metaverse Exploration",
          description: "Create immersive metaverse experiences",
          date: "2024-09-10",
          participants: 800,
        },
        {
          id: hackathons.length + 2,
          title: "Zero-Knowledge Proofs",
          description: "Advance privacy in blockchain",
          date: "2024-09-30",
          participants: 450,
        },
        {
          id: hackathons.length + 3,
          title: "Quantum-Resistant Blockchain",
          description: "Prepare blockchains for the quantum era",
          date: "2024-10-15",
          participants: 350,
        },
      ];
      setHackathons([...hackathons, ...newHackathons]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {hackathons.map((hackathon) => (
          <BackgroundGradient key={hackathon.id} className="rounded-[22px] max-w-sm p-4 sm:p-10 dark:bg-zinc-900">
            <Typography variant="h2" weight="bold" className="text-white">
              {hackathon.title}
            </Typography>
            <p className="mt-4 mb-2 text-base text-black sm:text-xl dark:text-neutral-200">{hackathon.date}</p>

            <p className="text-sm text-neutral-600 dark:text-neutral-400">{hackathon.description}</p>
            <button className="flex items-center py-1 pl-4 pr-1 mt-4 space-x-1 text-xs font-bold text-white bg-black rounded-full dark:bg-zinc-800">
              <span>{hackathon.participants} </span>
              <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">Participants</span>
            </button>
          </BackgroundGradient>
        ))}
      </div>
      <div className="flex justify-center">
        <Button onClick={loadMore} disabled={loading}>
          {loading ? "Loading..." : "Load More"}
        </Button>
      </div>
    </div>
  );
}
