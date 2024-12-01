import React from "react";

type PageContainerProps = {
  children: React.ReactNode;
  header?: React.ReactNode;
};
export default function PageContainer(props: PageContainerProps) {
  const { children, header } = props;
  return (
    <div className={`flex flex-col overflow-hidden h-screen`}>
      {header && header}
      {children}
    </div>
  );
}
