"use server";

import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

export default async function supabase() {
  const { getToken } = await auth();
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    {
      accessToken: async () => getToken() ?? null,
    }
  );
  return supabase;
}
