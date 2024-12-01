"use client";
import React, { useState } from "react";
import { MenuIcon } from "lucide-react";

import Link from "next/link";

import Logo from "./logo";
import Typography from "../ui/typography";

import { WalletSelector } from "../WalletSelector";
import { useOkto } from "okto-sdk-react";
import { GoogleLogin } from "@react-oauth/google";

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
  const handleGoogleLogin = async (credentialResponse: { credential?: any }) => {
    const idToken = credentialResponse.credential;
    if (idToken && authenticate) {
      authenticate(idToken, (authResponse: { auth_token: React.SetStateAction<null> }, error: any) => {
        if (authResponse) {
          setAuthToken(authResponse.auth_token);
          console.log("Authenticated successfully, auth token:", authResponse.auth_token);
        } else if (error) {
          console.error("Authentication error:", error);
        }
      });
    } else {
      console.error("No credential found in the response");
    }
  };
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

          {!authToken ? (
            <GoogleLogin onSuccess={handleGoogleLogin} onError={() => console.error("Login Failed")} />
          ) : (
            <p>Authenticated</p>
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
