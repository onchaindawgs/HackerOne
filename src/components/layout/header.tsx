"use client";
import React, { useState, useEffect, useCallback } from "react";
import { MenuIcon } from "lucide-react";

import Link from "next/link";

import Logo from "./logo";
import Typography from "../ui/typography";

import { WalletSelector } from "../WalletSelector";

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

type HeaderProps = {
  theme?: "light" | "dark";
};
export default function Header(props: HeaderProps) {
  const theme = props.theme || "light";
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const [windowWidth, setWindowWidth] = useState<number | undefined>();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleScroll = useCallback(() => {
    if (windowWidth && windowWidth < 1024) return;
    const currentScrollY = window.scrollY;
    setIsAtTop(currentScrollY === 0);
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      setLastScrollY(window.scrollY);
    }
  }, [lastScrollY, windowWidth]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [handleScroll]);

  const isDarkBg = isAtTop && theme === "dark";

  return (
    <header
      className={`flex justify-center fixed w-full top-0 left-0 transition-all duration-500 ease-in-out z-[9999] lg:h-[92px] sm:h-[68px] h-[56px] px-4 py-4 sm:px-5 sm:py-5 lg:px-8 lg:py-6 ${
        isAtTop ? "bg-transparent shadow-none" : "shadow bg-white"
      } ${isHidden ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="flex items-center justify-between w-full max-w-screen-xl">
        <div className="flex items-center gap-4 lg:justify-between ">
          <Logo />
        </div>
        <div className="hidden gap-6 lg:flex">
          <nav className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary"
              >
                <Typography variant="p2" className={`font-bold ${isDarkBg ? "text-white" : "text-black"}`}>
                  {link.title}
                </Typography>
              </Link>
            ))}
          </nav>

          <WalletSelector />
        </div>
        <div className="block lg:hidden">
          <MenuIcon className="cursor-pointer" />
        </div>
      </div>
    </header>
  );
}
