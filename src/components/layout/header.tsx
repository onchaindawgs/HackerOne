"use client";
import React, { useEffect, useState } from "react";
import { LogOut } from "lucide-react";

import Link from "next/link";

import Logo from "./logo";
import Typography from "../ui/typography";

import { ExecuteRawTransactionData, useOkto } from "okto-sdk-react";
import { GoogleLogin } from "@react-oauth/google";
import { Button } from "../ui/button";
import { useAppStore } from "@/store/store";
import { useRouter } from "next/navigation";

const navLinks = [
  { title: "Create Profile", href: "/create-profile" },
  {
    title: "Hacker",
    href: "/profile/atul",
  },
];

export default function Header() {
  const router = useRouter();
  const oktoContext = useOkto();
  const authenticate = oktoContext?.authenticate;
  const [transferData] = useState({
    network_name: "",
    transaction: "",
  });
  const { setIsCreateHakathonModalOpen, isUserProfileCompleted, authToken, setAuthToken, wallets, setWallets } =
    useAppStore((state) => state);

  const [transferResponse, setTransferResponse] = useState<ExecuteRawTransactionData | null>(null);

  const [_, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const executeRawTransaction = oktoContext?.executeRawTransaction;

  const createWallet = oktoContext?.createWallet;
  const fetchWallets = async () => {
    try {
      if (createWallet) {
        const walletsData = await createWallet();
        console.log({ walletsData });
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

  const handleRawTxnExecute = async (e: { preventDefault: () => void }) => {
    console.log("handling exe");
    e.preventDefault();
    try {
      console.log("transferData: ", transferData);
      console.log({ wallets });

      const rawData = {
        //@ts-expect-error not known
        network_name: wallets?.[1]?.network_name || "APTOS_TESTNET",
        transaction: JSON.parse(transferData.transaction),
      };
      console.log("rawdata: ", rawData);
      if (executeRawTransaction) {
        const response = await executeRawTransaction(rawData);
        setTransferResponse(response);
        setActiveSection("transferResponse");
      } else {
        setError("executeRawTransaction function is not defined");
      }
      console.log("execting: ");
    } catch (error) {
      if (error instanceof Error) {
        setError(`Failed to transfer tokens: ${error.message}`);
      } else {
        setError("Failed to transfer tokens: Unknown error");
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
          setAuthToken(authResponse.auth_token);
          fetchWallets();
        }
        if (error) {
          console.error("Authentication error:", error);
        }
      });
  };

  const handleLogout = () => {
    setAuthToken(null);
    router.push("/");
  };

  useEffect(() => {
    if (authToken) {
      if (!isUserProfileCompleted) {
        router.push("/create-profile");
      } else {
        router.push("/dashboard");
      }
    } else {
      router.push("/");
    }
  }, [authToken, isUserProfileCompleted]);
  return (
    <header
      className={`flex justify-center w-full transition-all duration-500 ease-in-out z-[9999] lg:h-[92px] sm:h-[68px] h-[56px] px-4 py-4 sm:px-5 sm:py-5 lg:px-8 lg:py-6 translate-y-0`}
    >
      <div className="flex items-center justify-between w-full max-w-screen-xl">
        <div className="flex items-center gap-4 lg:justify-between ">
          <Logo />
        </div>
        <div className="hidden gap-6 lg:flex">
          {authToken ? (
            isUserProfileCompleted ? (
              <div className="flex gap-2">
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
                <Button onClick={handleLogout} variant={"destructive"}>
                  <LogOut />
                </Button>
              </div>
            ) : (
              <Button onClick={handleLogout}>Logout</Button>
            )
          ) : (
            <GoogleLogin onSuccess={handleGoogleLogin} onError={() => console.error("Login Failed")} />
          )}

          {/* {!authToken ? (
            <GoogleLogin onSuccess={handleGoogleLogin} onError={() => console.error("Login Failed")} />
          ) : (
            <div className="flex gap-4">
              <Button onClick={onLogoutClick} className="text-white">
                Logout
              </Button>
              <Button onClick={fetchWallets}>View Wallet</Button>
              <Button onClick={handleRawTxnExecute}>Execute Raw Transaction</Button>
            </div>
          )} */}
        </div>
      </div>
    </header>
  );
}
