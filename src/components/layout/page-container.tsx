import React from "react";

type PageContainerProps = {
  children: React.ReactNode;
  header?: React.ReactNode;
};
export default function PageContainer(props: PageContainerProps) {
  const { children, header } = props;
  // linear-gradient(to right, blue, transparent),
  //   url("https://grainy-gradients.vercel.app/noise.svg");
  return (
    <div className={`flex flex-col overflow-hidden h-screen min-h-screen bg-black`}>
      {header && header}
      {children}
    </div>
  );
}
