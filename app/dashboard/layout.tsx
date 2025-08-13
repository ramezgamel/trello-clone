import PlanProvider from "@/lib/contexts/PlanContext";
import { auth } from "@clerk/nextjs/server";
import React, { ReactNode } from "react";

export default async function layout({ children }: { children: ReactNode }) {
  const { has } = await auth();
  const isProUser = has({ plan: "pro_user" });
  const isEnterpriseUser = has({ plan: "pro_user" });
  return (
    <PlanProvider isProUser={isProUser} isEnterpriseUser={isEnterpriseUser}>
      {children}
    </PlanProvider>
  );
}
