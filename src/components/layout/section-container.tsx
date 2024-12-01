import React from "react";
import Typography from "../ui/typography";
import { cn } from "@/lib/utils";

type SectionContainerProps = {
  children: React.ReactNode;
  classNames?: string;
  introduction?: {
    title?: string;
    subtitle?: string;
    classNames?: string;
    textAlignment?: "center" | "left" | "right";
  };
  sectionBodyClassNames?: string;
};
export default function SectionContainer(props: SectionContainerProps) {
  const { children, classNames = "", introduction, sectionBodyClassNames } = props;
  const { title, subtitle, textAlignment, classNames: classes } = introduction || {};
  return (
    <section className={cn(`px-4 py-20 md:px-6 lg:px-8 lg:py-30 flex flex-col items-center`, classNames)}>
      <div className={cn(`flex flex-col gap-10 lg:gap-16 max-w-screen-xl items-center w-full`, sectionBodyClassNames)}>
        {introduction && (
          <div className={cn(`flex flex-col gap-4 w-full`, classes)}>
            {title && (
              <Typography variant="h2" className="text-inherit" align={textAlignment}>
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography variant="p" className="text-inherit" align={textAlignment}>
                {subtitle}
              </Typography>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
