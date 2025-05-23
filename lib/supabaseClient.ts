import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase env vars:", { supabaseUrl, supabaseAnonKey });
  throw new Error("Supabase credentials are missing.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
