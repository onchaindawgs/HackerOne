"use client";
import React, { useEffect } from "react";
import { LogOut } from "lucide-react";

import Link from "next/link";

import Logo from "./logo";

import { OktoContextType, useOkto } from "okto-sdk-react";
import { GoogleLogin } from "@react-oauth/google";
import { Button } from "../ui/button";
import { useAppStore } from "@/store/store";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function Header() {
  const router = useRouter();
  const path = usePathname();
  const { authenticate, logOut } = useOkto() as OktoContextType;

  const { setIsCreateHakathonModalOpen, isUserProfileCompleted, authToken, setAuthToken } = useAppStore(
    (state) => state,
  );

  //@ts-expect-error not known
  const handleGoogleLogin = async (credentialResponse) => {
    const idToken = credentialResponse.credential;
    authenticate &&
      authenticate(idToken, async (authResponse, error) => {
        if (authResponse) {
          setAuthToken(authResponse.auth_token);
        }
        if (error) {
          console.error("Authentication error:", error);
        }
      });
  };

  const handleLogout = () => {
    setAuthToken(null);
    logOut && logOut();
    router.push("/");
  };

  useEffect(() => {
    if (authToken) {
      if (!isUserProfileCompleted) {
        router.push("/create-profile");
      } else if (path === "/") {
        router.push("dashboard");
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
                <nav className="flex items-center gap-6"></nav>
                <Button onClick={() => setIsCreateHakathonModalOpen(true)}>Create Hackathon</Button>
                <Button onClick={handleLogout} variant={"destructive"}>
                  <LogOut />
                </Button>
                <Link href="/profile/atul">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
              </div>
            ) : (
              <>
                <Button onClick={handleLogout}>Logout</Button>
              </>
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
