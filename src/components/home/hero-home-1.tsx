import Image from "next/image";
import PageIllustration from "./page-illustration";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroHome() {
  return (
    <section className="relative">
      <PageIllustration />
      <div className="max-w-6xl px-4 mx-auto sm:px-6">
        {/* Hero content */}
        <div className="pt-32 pb-12 md:pb-20 md:pt-40">
          {/* Section header */}
          <div className="pb-12 text-center md:pb-16">
            <div
              className="mb-6 border-y [border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1]"
              data-aos="zoom-y-out"
            >
              <div className="-mx-0.5 flex justify-center -space-x-3">
                <Image
                  className="box-content border-2 rounded-full border-gray-50"
                  src={"/images/avatar-01.jpg"}
                  width={32}
                  height={32}
                  alt="Avatar 01"
                />
                <Image
                  className="box-content border-2 rounded-full border-gray-50"
                  src={"/images/avatar-02.jpg"}
                  width={32}
                  height={32}
                  alt="Avatar 01"
                />
                <Image
                  className="box-content border-2 rounded-full border-gray-50"
                  src={"/images/avatar-03.jpg"}
                  width={32}
                  height={32}
                  alt="Avatar 02"
                />
                <Image
                  className="box-content border-2 rounded-full border-gray-50"
                  src={"/images/avatar-04.jpg"}
                  width={32}
                  height={32}
                  alt="Avatar 03"
                />
                <Image
                  className="box-content border-2 rounded-full border-gray-50"
                  src={"/images/avatar-05.jpg"}
                  width={32}
                  height={32}
                  alt="Avatar 04"
                />
                <Image
                  className="box-content border-2 rounded-full border-gray-50"
                  src={"/images/avatar-06.jpg"}
                  width={32}
                  height={32}
                  alt="Avatar 05"
                />
              </div>
            </div>
            <h1
              className="mb-6 border-y text-5xl font-bold [border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1] md:text-6xl"
              data-aos="zoom-y-out"
              data-aos-delay={150}
            >
              Your Web3 Team <br className="max-lg:hidden" />
              Assembled
            </h1>
            <div className="max-w-3xl mx-auto">
              <p className="mb-8 text-lg text-gray-700" data-aos="zoom-y-out" data-aos-delay={300}>
                The Ultimate Platform for Web3 Developers: Network, Collaborate, Succeed.
              </p>
              <div className="relative before:absolute before:inset-0 before:border-y before:[border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1]">
                <div
                  className="max-w-xs mx-auto sm:flex sm:max-w-none sm:justify-center"
                  data-aos="zoom-y-out"
                  data-aos-delay={450}
                >
                  <Button>
                    Join Now
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
