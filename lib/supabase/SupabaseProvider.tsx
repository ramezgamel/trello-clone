"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { useSession } from "@clerk/nextjs";
import PageLoader from "@/components/shared/PageLoader";

type SupabaseContext = {
  supabase: SupabaseClient | null;
  isLoaded: boolean;
};

const supabaseContext = createContext<SupabaseContext | null>(null);

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session } = useSession();
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (!session) return;

    const client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_KEY!,
      {
        accessToken: async () => session?.getToken() ?? null,
      }
    );

    setSupabase(client);
    setIsLoaded(true);
  }, [session]);
  return (
    <supabaseContext.Provider value={{ supabase, isLoaded }}>
      {isLoaded ? children : <PageLoader />}
    </supabaseContext.Provider>
  );
}

export function useSupabase() {
  const context = useContext(supabaseContext);
  if (context === undefined || context === null) {
    throw new Error("useSupabase must be used within a Supabase Provider");
  }
  return context;
}
