import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Supabase é totalmente opcional: sem credenciais, o formulário de contacto
// usa o fallback mailto. Nunca bloqueia o arranque do site (dev ou produção).
export const hasCredentials = !!(supabaseUrl && supabaseAnonKey);

export const supabase = hasCredentials
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
