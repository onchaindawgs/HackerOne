"use client";

import CreateUserForm from "@/components/auth/create-user-form";
import { Header, PageContainer, SectionContainer } from "@/components/layout";

export default function page() {
  return (
    <PageContainer header={<Header />}>
      <SectionContainer>
        <CreateUserForm />
      </SectionContainer>
    </PageContainer>
  );
}
