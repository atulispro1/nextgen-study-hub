import { createClient } from "@supabase/supabase-js";

// Environment-driven configuration. The values live in .env
// (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY). The app fails fast with a
// clear message when they are missing instead of silently falling back to
// hardcoded credentials.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Supabase configuration missing: set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
