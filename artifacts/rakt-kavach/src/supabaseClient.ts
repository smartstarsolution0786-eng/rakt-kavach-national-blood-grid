import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://आपका-प्रोजेक्ट-आईडी.supabase.co';
const supabaseAnonKey = 'आपका-लंबा-सा-anon-public-की-कोड';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
