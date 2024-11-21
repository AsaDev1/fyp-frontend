import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL; // Replace with your Supabase project URL
const supabaseKey = process.env.REACT_APP_SUPABASE_API_KEY; // Replace with your Supabase API key

export const supabase = createClient(supabaseUrl, supabaseKey);
