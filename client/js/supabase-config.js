// Supabase Initialization — NCA School Platform
// Anon key is safe for client-side use (restricted by RLS)
const SUPABASE_URL = 'https://bkvjozijixispwqcyppr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrdmpvemlqaXhpc3B3cWN5cHByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ0MzkxNjcsImV4cCI6MjEwMDAxNTE2N30.UF-gYMbpTozq9PcoSRZkpA4sUaTjrIO60GlPuRBm2YI';

let supabaseClient = null;

if (window.supabase) {
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      autoRefreshToken: true,
      persistSession: true
    }
  });
} else {
  console.warn('[Supabase] CDN not loaded. Falling back to localStorage.');
}

window.supabaseClient = supabaseClient;
