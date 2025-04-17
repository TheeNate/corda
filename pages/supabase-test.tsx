import { supabase } from "../lib/supabaseClient";

export default function SupabaseTest() {
  return (
    <pre>
      Supabase loaded: {typeof supabase !== "undefined" ? "✅ YES" : "❌ NO"}
    </pre>
  );
}
