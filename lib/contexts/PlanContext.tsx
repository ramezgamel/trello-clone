"use client";
import React, { createContext, ReactNode, useContext } from "react";
interface PlanContextType {
  isFreeUser: boolean;
  isProUser: boolean;
  isEnterpriseUser: boolean;
}

const planContext = createContext<PlanContextType | undefined>(undefined);

export default function PlanProvider({
  isEnterpriseUser,
  isProUser,
  children,
}: {
  isEnterpriseUser: boolean;
  isProUser: boolean;
  children: ReactNode;
}) {
  return (
    <planContext.Provider
      value={{
        isProUser,
        isEnterpriseUser,
        isFreeUser: !isProUser && !isEnterpriseUser,
      }}
    >
      {children}
    </planContext.Provider>
  );
}

export const usePlan = () => {
  const context = useContext(planContext);
  if (context === undefined)
    throw new Error("UsePlan must be inside the provider");
  return context;
};
