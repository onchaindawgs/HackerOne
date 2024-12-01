"use client";
import React, { useState } from "react";
import { MenuIcon } from "lucide-react";

import Link from "next/link";

import Logo from "./logo";
import Typography from "../ui/typography";

import { WalletSelector } from "../WalletSelector";
import { useOkto, WalletData } from "okto-sdk-react";
import { GoogleLogin } from "@react-oauth/google";
import { Button } from "../ui/button";
import { useAppStore } from "@/store/store";

const navLinks = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  { title: "Create Profile", href: "/create-profile" },
  {
    title: "Hacker",
    href: "/profile/atul",
  },
];

export default function Header() {
  const oktoContext = useOkto();
  const authenticate = oktoContext?.authenticate;
  const [authToken, setAuthToken] = useState(null);

  const createWallet = oktoContext?.createWallet;
  const fetchWallets = async () => {
    try {
      if (createWallet) {
        const walletsData = await createWallet();
        console.log(walletsData);
        setWallets(walletsData);
        setActiveSection("wallets");
      } else {
        setError("createWallet function is not defined");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(`Failed to fetch wallets: ${error.message}`);
      } else {
        setError("Failed to fetch wallets: Unknown error");
      }
    }
  };

  //@ts-expect-error not known
  const handleGoogleLogin = async (credentialResponse) => {
    console.log("Google login response:", credentialResponse);
    const idToken = credentialResponse.credential;
    console.log("google idtoken: ", idToken);
    authenticate &&
      authenticate(idToken, async (authResponse, error) => {
        if (authResponse) {
          console.log("Authentication check: ", authResponse);
          setAuthToken(authResponse.auth_token);
          console.log("auth token received", authToken);
          alert("Authenticated successfully");
        }
        if (error) {
          console.error("Authentication error:", error);
        }
      });
  };

  const onLogoutClick = () => {
    alert("Logout successful");
  };
  const { setIsCreateHakathonModalOpen } = useAppStore((state) => state);
  const [userDetails, setUserDetails] = useState(null);
  const [portfolioData, setPortfolioData] = useState(null);
  const [wallets, setWallets] = useState<WalletData | null>(null);
  const [transferResponse, setTransferResponse] = useState(null);
  const [orderResponse, setOrderResponse] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  return (
    <header
      className={`flex justify-center w-full transition-all duration-500 ease-in-out z-[9999] lg:h-[92px] sm:h-[68px] h-[56px] px-4 py-4 sm:px-5 sm:py-5 lg:px-8 lg:py-6 translate-y-0`}
    >
      <div className="flex items-center justify-between w-full max-w-screen-xl">
        <div className="flex items-center gap-4 lg:justify-between ">
          <Logo />
        </div>
        <div className="hidden gap-6 lg:flex">
          <nav className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={`text-sm font-medium hover:text-primary`}>
                <Typography variant="p2" className={`font-bold text-white hover:text-primary`}>
                  {link.title}
                </Typography>
              </Link>
            ))}
          </nav>
          <Button onClick={() => setIsCreateHakathonModalOpen(true)}>Create Hackathon</Button>
          {!authToken ? (
            <GoogleLogin onSuccess={handleGoogleLogin} onError={() => console.error("Login Failed")} />
          ) : (
            <div className="flex gap-4">
              <Button onClick={onLogoutClick} className="text-white">
                Logout
              </Button>
              <Button onClick={fetchWallets}>View Wallet</Button>
            </div>
          )}

          {activeSection === "wallets" && wallets && (
            <div>
              <h2>Wallets:</h2>
              <pre>{JSON.stringify(wallets, null, 2)}</pre>
            </div>
          )}
          {error && (
            <div style={{ color: "red" }}>
              <h2>Error:</h2>
              <p>{error}</p>
            </div>
          )}
          <WalletSelector />
        </div>
        <div className="block lg:hidden">
          <MenuIcon className="cursor-pointer" />
        </div>
      </div>
    </header>
  );
}
