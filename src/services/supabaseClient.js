import { createClient } from '@supabase/supabase-js';

// Instead of relying on environment variables that might not be available,
// we'll set default values for local development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-url.supabase.co ';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Log for debugging purposes
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key:', supabaseAnonKey.substring(0, 5) + '...');

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;