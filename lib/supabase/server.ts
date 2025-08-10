import { createServerClient } from "@supabase/ssr";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export async function createClient() {
  const cookie = await cookies();
  return createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!,
    {
      cookies: {
        getAll() {
          return cookie.getAll();
        },
        setAll(
          cookiesToSet: {
            name: string;
            value: string;
            options?: Partial<ResponseCookie> | undefined;
          }[]
        ) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookie.set(name, value, options)
            );
          } catch {}
        },
      },
    }
  );
}
