import { Building, Globe, Newspaper, Rocket, Users } from "lucide-react";
import Image from "next/image";

const WhyUs = [
  {
    title: "Connect with a Global Community",
    subtitle:
      "Network with like-minded developers and enthusiasts. Collaborate on exciting Web3 projects. Share knowledge and learn from experts.",
    icon: <Globe className="w-4 h-4 stroke-blue-500" />,
  },
  {
    title: "Accelerate Your Web3 Journey",
    subtitle: "Access valuable resources and tutorials. Stay updated on the latest trends and technologies.",
    icon: <Rocket className="w-4 h-4 stroke-blue-500" />,
  },
  {
    title: " Build Your Web3 Portfolio",
    subtitle:
      "Showcase your skills and projects to a wider audience. Gain recognition and opportunities within the Web3 industry.",
    icon: <Building className="w-4 h-4 stroke-blue-500" />,
  },
  {
    title: "Find Your Dream Team",
    subtitle:
      "Team up with talented individuals to create innovative solutions. Build lasting relationships with your fellow developers.",
    icon: <Users className="w-4 h-4 stroke-blue-500" />,
  },
  {
    title: "Be Part of the Future of the Internet",
    subtitle:
      "Shape the future of technology. Contribute to a decentralized and secure digital world. Be at the forefront of innovation.",
    icon: <Rocket className="w-4 h-4 stroke-blue-500" />,
  },
  {
    title: "Stay Informed",
    subtitle:
      "Get the latest news and updates. Stay informed about upcoming events. Never miss out on important announcements.",
    icon: <Newspaper className="w-4 h-4 stroke-blue-500" />,
  },
];
export default function FeaturesPlanet() {
  return (
    <section className="relative before:absolute before:inset-0 before:-z-20 before:bg-gray-900">
      <div className="max-w-6xl px-4 mx-auto sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="max-w-3xl pb-16 mx-auto text-center md:pb-20">
            <h2 className="text-3xl font-bold text-gray-200 md:text-4xl">
              HackerOne helps you in finding the right teammates based on their skills
            </h2>
          </div>
          {/* Planet */}
          <div className="pb-16 md:pb-20" data-aos="zoom-y-out">
            <div className="text-center">
              <div className="relative inline-flex rounded-full before:absolute before:inset-0 before:-z-10 before:scale-[.85] before:animate-[pulse_4s_cubic-bezier(.4,0,.6,1)_infinite] before:bg-gradient-to-b before:from-blue-900 before:to-sky-700/50 before:blur-3xl after:absolute after:inset-0 after:rounded-[inherit] after:[background:radial-gradient(closest-side,theme(colors.blue.500),transparent)]">
                <Image
                  className="bg-gray-900 rounded-full"
                  src={"/images/planet.png"}
                  width={400}
                  height={400}
                  alt="Planet"
                />
                <div className="pointer-events-none" aria-hidden="true">
                  <Image
                    className="absolute z-10 -right-64 -top-20 max-w-none"
                    src={"/images/planet-overlay.svg"}
                    width={789}
                    height={755}
                    alt="Planet decoration"
                  />
                  <div>
                    <Image
                      className="absolute -left-28 top-16 z-10 animate-[float_4s_ease-in-out_infinite_both] opacity-80 transition-opacity duration-500"
                      src={"/images/planet-tag-01.png"}
                      width={253}
                      height={56}
                      alt="Tag 01"
                    />
                    <Image
                      className="absolute left-56 top-7 z-10 animate-[float_4s_ease-in-out_infinite_1s_both] opacity-30 transition-opacity duration-500"
                      src={"/images/planet-tag-02.png"}
                      width={241}
                      height={56}
                      alt="Tag 02"
                    />
                    <Image
                      className="absolute -left-20 bottom-24 z-10 animate-[float_4s_ease-in-out_infinite_2s_both] opacity-25 transition-opacity duration-500"
                      src={"/images/planet-tag-03.png"}
                      width={243}
                      height={56}
                      alt="Tag 03"
                    />
                    <Image
                      className="absolute bottom-32 left-64 z-10 animate-[float_4s_ease-in-out_infinite_3s_both] opacity-80 transition-opacity duration-500"
                      src={"/images/planet-tag-04.png"}
                      width={251}
                      height={56}
                      alt="Tag 04"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Grid */}
          <div className="grid overflow-hidden sm:grid-cols-2 lg:grid-cols-3 [&>*]:relative [&>*]:p-6 [&>*]:before:absolute [&>*]:before:bg-gray-800 [&>*]:before:[block-size:100vh] [&>*]:before:[inline-size:1px] [&>*]:before:[inset-block-start:0] [&>*]:before:[inset-inline-start:-1px] [&>*]:after:absolute [&>*]:after:bg-gray-800 [&>*]:after:[block-size:1px] [&>*]:after:[inline-size:100vw] [&>*]:after:[inset-block-start:-1px] [&>*]:after:[inset-inline-start:0] md:[&>*]:p-10">
            {WhyUs.map((point) => {
              return (
                <article key={point.title}>
                  <h3 className="flex items-center mb-2 space-x-2 font-medium text-gray-200">
                    {point.icon}
                    <span>{point.title}</span>
                  </h3>
                  <p className="text-[15px] text-gray-400">{point.subtitle}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
