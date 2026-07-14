// Supabase Initialization
const SUPABASE_URL = 'https://hzojspnsbfeifkzzqdtk.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6b2pzcG5zYmZlaWZrenpxZHRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2MTU4NzIsImV4cCI6MjA5OTE5MTg3Mn0.ro_mpet9UdlY_uZPvBy5NVVMR2wkNKj_u8UvMzlRuAk';

// Initialize the Supabase Client
// We load the script dynamically or assume it's loaded in HTML <head> via CDN
let supabaseClient = null;

if (window.supabase) {
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  console.log("Supabase client initialized successfully!");
} else {
  console.error("Supabase CDN not loaded. Please ensure the library is included in the HTML file.");
}

window.supabaseClient = supabaseClient;
