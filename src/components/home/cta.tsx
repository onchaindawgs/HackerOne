import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Cta() {
  return (
    <section>
      <div className="max-w-6xl px-4 mx-auto sm:px-6">
        <div
          className="relative overflow-hidden text-center shadow-xl rounded-2xl before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-gray-900"
          data-aos="zoom-y-out"
        >
          {/* Glow */}
          <div className="absolute bottom-0 -translate-x-1/2 translate-y-1/2 left-1/2 -z-10" aria-hidden="true">
            <div className="h-56 w-[480px] rounded-full border-[20px] border-blue-500 blur-3xl" />
          </div>
          {/* Stripes illustration */}
          <div
            className="absolute top-0 transform -translate-x-1/2 pointer-events-none left-1/2 -z-10"
            aria-hidden="true"
          >
            <Image className="max-w-none" src={"/images/stripes-dark.svg"} width={768} height={432} alt="Stripes" />
          </div>
          <div className="px-4 py-12 md:px-12 md:py-20">
            <h2 className="mb-6 border-y text-3xl font-bold text-gray-200 [border-image:linear-gradient(to_right,transparent,theme(colors.slate.700/.7),transparent)1] md:mb-12 md:text-4xl">
              Join HackerOne Today To Find Your Team
            </h2>
            <div className="max-w-xs mx-auto sm:flex sm:max-w-none sm:justify-center">
              <Button>
                Join Now
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
