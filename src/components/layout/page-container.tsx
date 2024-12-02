import React from "react";
import { CreateHackathonModal } from "../create-hackathon";
import { useAppStore } from "@/store/store";

type PageContainerProps = {
  children: React.ReactNode;
  header?: React.ReactNode;
};

export default function PageContainer(props: PageContainerProps) {
  const { children, header } = props;
  const { isCreateHakathonModalOpen, setIsCreateHakathonModalOpen } = useAppStore((state) => state);

  return (
    <div className={`flex flex-col overflow-hidden h-screen min-h-screen`}>
      <div className="w-full dark:bg-black bg-black dark:bg-grid-black/[0.2] bg-grid-white/[0.2] relative flex items-center justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="z-50 flex flex-col w-full h-screen min-h-screen overflow-hidden">
          {header && header}
          {children}
        </div>
      </div>
      <div className="overflow-scroll">
        <CreateHackathonModal isOpen={isCreateHakathonModalOpen} onClose={() => setIsCreateHakathonModalOpen(false)} />
      </div>
    </div>
  );
}
