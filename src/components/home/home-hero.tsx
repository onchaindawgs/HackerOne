import React from "react";
import { FlipWords } from "./flip-words";
import { BackgroundBeams } from "./background-beams";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function HomeHero() {
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen gap-4 bg-black dark:bg-black">
      {/* <HeroSection /> */}
      <div className="flex flex-col gap-4">
        <h2 className="relative z-20 font-sans text-2xl font-bold tracking-tight text-center text-white md:text-4xl lg:text-7xl dark:text-white">
          Welcome To HackerOne
        </h2>

        <h2 className="relative z-20 font-sans text-2xl font-bold tracking-tight text-center text-white md:text-4xl lg:text-7xl dark:text-white">
          <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
            {" "}
            A platform
          </div>
        </h2>
        <h2 className="relative z-20 font-sans text-2xl font-bold tracking-tight text-center text-white md:text-4xl lg:text-7xl dark:text-white">
          <FlipWords words={["of the Hackers", "by the hackers", "for the hackers"]} />
        </h2>
      </div>

      <BackgroundBeams />
      <div className="relative flex h-[324px] items-center justify-center">
        {/* Small blue dots */}
        <div className="absolute -z-10">
          <svg
            className="fill-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            width={164}
            height={41}
            viewBox="0 0 164 41"
            fill="none"
          >
            <circle cx={1} cy={8} r={1} fillOpacity="0.24" />
            <circle cx={1} cy={1} r={1} fillOpacity="0.16" />
            <circle cx={1} cy={15} r={1} />
            <circle cx={1} cy={26} r={1} fillOpacity="0.64" />
            <circle cx={1} cy={33} r={1} fillOpacity="0.24" />
            <circle cx={8} cy={8} r={1} />
            <circle cx={8} cy={15} r={1} />
            <circle cx={8} cy={26} r={1} fillOpacity="0.24" />
            <circle cx={15} cy={15} r={1} fillOpacity="0.64" />
            <circle cx={15} cy={26} r={1} fillOpacity="0.16" />
            <circle cx={8} cy={33} r={1} />
            <circle cx={1} cy={40} r={1} />
            <circle cx={1} cy={1} r={1} transform="matrix(-1 0 0 1 164 7)" fillOpacity="0.24" />
            <circle cx={1} cy={1} r={1} transform="matrix(-1 0 0 1 164 0)" fillOpacity="0.16" />
            <circle cx={1} cy={1} r={1} transform="matrix(-1 0 0 1 164 14)" />
            <circle cx={1} cy={1} r={1} transform="matrix(-1 0 0 1 164 25)" fillOpacity="0.64" />
            <circle cx={1} cy={1} r={1} transform="matrix(-1 0 0 1 164 32)" fillOpacity="0.24" />
            <circle cx={1} cy={1} r={1} transform="matrix(-1 0 0 1 157 7)" />
            <circle cx={1} cy={1} r={1} transform="matrix(-1 0 0 1 157 14)" />
            <circle cx={1} cy={1} r={1} transform="matrix(-1 0 0 1 157 25)" fillOpacity="0.24" />
            <circle cx={1} cy={1} r={1} transform="matrix(-1 0 0 1 150 14)" fillOpacity="0.64" />
            <circle cx={1} cy={1} r={1} transform="matrix(-1 0 0 1 150 25)" fillOpacity="0.16" />
            <circle cx={1} cy={1} r={1} transform="matrix(-1 0 0 1 157 32)" />
            <circle cx={1} cy={1} r={1} transform="matrix(-1 0 0 1 164 39)" />
          </svg>
        </div>
        {/* Blue glow */}
        <div className="absolute -z-10">
          <svg xmlns="http://www.w3.org/2000/svg" width={432} height={160} viewBox="0 0 432 160" fill="none">
            <g opacity="0.6" filter="url(#filter0_f_2044_9)">
              <path
                className="fill-blue-500"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M80 112C62.3269 112 48 97.6731 48 80C48 62.3269 62.3269 48 80 48C97.6731 48 171 62.3269 171 80C171 97.6731 97.6731 112 80 112ZM352 112C369.673 112 384 97.6731 384 80C384 62.3269 369.673 48 352 48C334.327 48 261 62.3269 261 80C261 97.6731 334.327 112 352 112Z"
              />
            </g>
            <defs>
              <filter
                id="filter0_f_2044_9"
                x={0}
                y={0}
                width={432}
                height={160}
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation={32} result="effect1_foregroundBlur_2044_9" />
              </filter>
            </defs>
          </svg>
        </div>
        {/* Horizontal lines */}
        <div className="absolute inset-x-0 top-0 h-px -z-10 bg-gradient-to-r from-transparent via-blue to-transparent red-100"></div>
        <div className="absolute inset-x-0 bottom-0 h-px -z-10 bg-gradient-to-r from-transparent via-blue to-transparent red-100"></div>
        <div className="absolute inset-x-[200px] top-1/2 -z-10 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent mix-blend-multiply"></div>
        <div className="absolute inset-x-0 top-1/2 -z-10 h-px -translate-y-[82px] bg-gradient-to-r from-transparent via-blue to-transparent red-100 before:absolute before:inset-y-0 before:w-24 before:animate-[line_10s_ease-in-out_infinite_both] before:bg-gradient-to-r before:via-blue-500"></div>
        <div className="absolute inset-x-0 top-1/2 -z-10 h-px translate-y-[82px] bg-gradient-to-r from-transparent via-blue to-transparent red-100 before:absolute before:inset-y-0 before:w-24 before:animate-[line_10s_ease-in-out_infinite_5s_both] before:bg-gradient-to-r before:via-blue-500"></div>
        {/* Diagonal lines */}
        <div className="absolute inset-x-[300px] top-1/2 -z-10 h-px rotate-[20deg] bg-gradient-to-r from-transparent via-blue to-transparent red-100"></div>
        <div className="absolute inset-x-[300px] top-1/2 -z-10 h-px -rotate-[20deg] bg-gradient-to-r from-transparent via-blue to-transparent red-100"></div>
        {/* Vertical lines */}
        <div className="absolute inset-y-0 left-1/2 -z-10 w-px -translate-x-[216px] bg-gradient-to-b from-gray-200 to-transparent mix-blend-multiply"></div>
        <div className="absolute inset-y-0 left-1/2 -z-10 w-px translate-x-[216px] bg-gradient-to-t from-gray-200 to-transparent mix-blend-multiply"></div>
        {/* Logos */}
        <div className="absolute before:absolute before:-inset-3 before:animate-[spin_3s_linear_infinite] before:rounded-full before:border before:border-transparent before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] before:[background:conic-gradient(from_180deg,transparent,theme(colors.blue.500))_border-box]">
          <div className="animate-[breath_8s_ease-in-out_infinite_both]">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-lg shadow-black/[0.03] before:absolute before:inset-0 before:m-[8.334%] before:rounded-[inherit] before:border before:border-gray-700/5 before:bg-gray-200/60 before:[mask-image:linear-gradient(to_bottom,black,transparent)]">
              <Image className="relative" src={"/images/logo-01.svg"} width={32} height={32} alt="Logo 01" />
            </div>
          </div>
        </div>

        <div className="relative flex flex-col">
          <article className="flex items-center justify-center w-full h-full focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300">
            <div className="absolute -translate-x-[136px]">
              <div className="animate-[breath_7s_ease-in-out_3s_infinite_both]">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg shadow-black/[0.03] before:absolute before:inset-0 before:m-[8.334%] before:rounded-[inherit] before:border before:border-gray-700/5 before:bg-gray-200/60 before:[mask-image:linear-gradient(to_bottom,black,transparent)]">
                  <Image className="relative" src={"/images/logo-02.svg"} width={23} height={22} alt="Logo 02" />
                </div>
              </div>
            </div>
            <div className="absolute translate-x-[136px]">
              <div className="animate-[breath_7s_ease-in-out_3.5s_infinite_both]">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg shadow-black/[0.03] before:absolute before:inset-0 before:m-[8.334%] before:rounded-[inherit] before:border before:border-gray-700/5 before:bg-gray-200/60 before:[mask-image:linear-gradient(to_bottom,black,transparent)]">
                  <Image className="relative" src={"/images/logo-03.svg"} width={22} height={22} alt="Logo 03" />
                </div>
              </div>
            </div>
            <div className="absolute -translate-x-[216px] -translate-y-[82px]">
              <div className="animate-[breath_6s_ease-in-out_3.5s_infinite_both]">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg shadow-black/[0.03] before:absolute before:inset-0 before:m-[8.334%] before:rounded-[inherit] before:border before:border-gray-700/5 before:bg-gray-200/60 before:[mask-image:linear-gradient(to_bottom,black,transparent)]">
                  <Image className="relative" src={"/images/logo-04.svg"} width={24} height={22} alt="Logo 04" />
                </div>
              </div>
            </div>
            <div className="absolute -translate-y-[82px] translate-x-[216px]">
              <div className="animate-[breath_6s_ease-in-out_1.5s_infinite_both]">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg shadow-black/[0.03] before:absolute before:inset-0 before:m-[8.334%] before:rounded-[inherit] before:border before:border-gray-700/5 before:bg-gray-200/60 before:[mask-image:linear-gradient(to_bottom,black,transparent)]">
                  <Image className="relative" src={"/images/logo-05.svg"} width={25} height={25} alt="Logo 05" />
                </div>
              </div>
            </div>
            <div className="absolute translate-x-[216px] translate-y-[82px]">
              <div className="animate-[breath_6s_ease-in-out_2s_infinite_both]">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg shadow-black/[0.03] before:absolute before:inset-0 before:m-[8.334%] before:rounded-[inherit] before:border before:border-gray-700/5 before:bg-gray-200/60 before:[mask-image:linear-gradient(to_bottom,black,transparent)]">
                  <Image className="relative" src={"/images/logo-06.svg"} width={20} height={18} alt="Logo 06" />
                </div>
              </div>
            </div>
            <div className="absolute -translate-x-[216px] translate-y-[82px]">
              <div className="animate-[breath_6s_ease-in-out_2.5s_infinite_both]">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg shadow-black/[0.03] before:absolute before:inset-0 before:m-[8.334%] before:rounded-[inherit] before:border before:border-gray-700/5 before:bg-gray-200/60 before:[mask-image:linear-gradient(to_bottom,black,transparent)]">
                  <Image className="relative" src={"/images/logo-07.svg"} width={25} height={25} alt="Logo 07" />
                </div>
              </div>
            </div>
            <div className="absolute -translate-x-[292px] opacity-40">
              <div className="animate-[breath_6s_ease-in-out_2s_infinite_both]">
                <div className="flex items-center justify-center w-12 h-12 bg-white border rounded-full shadow-lg border-gray-200/60">
                  <Image className="relative" src={"/images/logo-08.svg"} width={20} height={20} alt="Logo 08" />
                </div>
              </div>
            </div>
            <div className="absolute translate-x-[292px] opacity-40">
              <div className="animate-[breath_6s_ease-in-out_4s_infinite_both]">
                <div className="flex items-center justify-center w-12 h-12 bg-white border rounded-full shadow-lg border-gray-200/60">
                  <Image className="relative" src={"/images/logo-09.svg"} width={21} height={13} alt="Logo 09" />
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
      <button className="p-[3px] relative">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500" />
        <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent flex flex-row items-center">
          Join Now
          <ArrowRight className="w-4 h-4 ml-1" />
        </div>
      </button>
    </div>
  );
}
