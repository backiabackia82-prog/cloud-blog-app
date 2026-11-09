import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lzsreylpcgzioayzdmmd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6c3JleWxwY2d6aW9heXpkbW1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQxMzkxNzUsImV4cCI6MjEwOTcxNTE3NX0.DcTVDt3JZQh7Z8BTAqCz2jm4HgnnaHrxKeNot4DdGig';

// Prevent multiple client instances during hot-reloads
const globalForSupabase = global as unknown as { supabase: ReturnType<typeof createClient> };

export const supabase =
  globalForSupabase.supabase || createClient(supabaseUrl, supabaseAnonKey);

if (process.env.NODE_ENV !== 'production') globalForSupabase.supabase = supabase;