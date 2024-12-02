"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Twitter, ExternalLink, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function page() {
  return (
    <div className="container p-4 mx-auto mt-24">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="flex flex-col items-center gap-4 sm:flex-row">
          <Avatar className="w-24 h-24">
            <AvatarImage src="/placeholder.svg?height=96&width=96" alt="John Doe" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            <CardTitle className="text-3xl">John Doe</CardTitle>
            <CardDescription className="mt-1 text-xl">Full-stack wizard with a love for blockchain</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h2 className="mb-2 text-2xl font-semibold">About Me</h2>
            <p>
              I am a developer specializing in blockchain, smart contracts, and dApps. I've participated in 10+
              hackathons and love solving challenging problems.
            </p>
          </section>
          <section>
            <h2 className="mb-2 text-2xl font-semibold">Skills & Expertise</h2>
            <div className="flex flex-wrap gap-2">
              {["Solidity", "Rust", "Move", "React", "Node.js"].map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
            <p className="mt-2">
              <strong>Experience:</strong> 3+ years
            </p>
            <p>
              <strong>Learning:</strong> ZK Proofs, Cairo
            </p>
          </section>
          <section>
            <h2 className="mb-2 text-2xl font-semibold">Preferences</h2>
            <p>
              <strong>Preferred Role:</strong> Smart Contract Developer
            </p>
            <p>
              <strong>Availability:</strong> Open to new projects
            </p>
            <p>
              <strong>Time Zone:</strong> UTC-5
            </p>
            <p>
              <strong>Work Style:</strong> Small Team
            </p>
          </section>
        </CardContent>
        <CardFooter className="flex flex-wrap justify-center gap-4 sm:justify-start">
          <Button asChild variant="outline">
            <Link href="https://github.com/johndoe">
              <Github className="w-4 h-4 mr-2" /> GitHub
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="https://twitter.com/john_doe_dev">
              <Twitter className="w-4 h-4 mr-2" /> Twitter
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="https://t.me/JohnDoe">
              <MessageCircle className="w-4 h-4 mr-2" /> Telegram
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="https://johndoe.dev">
              <ExternalLink className="w-4 h-4 mr-2" /> Website
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
