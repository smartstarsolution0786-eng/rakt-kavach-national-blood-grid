import { createClient } from '@supabase/supabase-js';

/**
 * Environment Validation
 * Ensures required Supabase credentials are present before client initialization
 */
const validateEnvironment = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    console.error(
      '❌ VITE_SUPABASE_URL is not configured. ' +
      'Set this environment variable to your Supabase project URL. ' +
      'Example: https://your-project.supabase.co'
    );
    if (import.meta.env.PROD) {
      throw new Error(
        'Production deployment failed: VITE_SUPABASE_URL environment variable is required'
      );
    }
  }

  if (!supabaseAnonKey) {
    console.error(
      '❌ VITE_SUPABASE_ANON_KEY is not configured. ' +
      'Set this environment variable to your Supabase anonymous key. ' +
      'Get it from: https://app.supabase.com/project/_/settings/api'
    );
    if (import.meta.env.PROD) {
      throw new Error(
        'Production deployment failed: VITE_SUPABASE_ANON_KEY environment variable is required'
      );
    }
  }

  return { supabaseUrl, supabaseAnonKey };
};

const { supabaseUrl, supabaseAnonKey } = validateEnvironment();

/**
 * Supabase Client Instance
 * Configured for production with session persistence and auto-refresh
 */
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
    },
    global: {
      headers: {
        'x-client-info': 'rakt-kavach/1.0.0',
      },
    },
  }
);

/**
 * Health Check
 * Verify Supabase connectivity on app load
 */
export const checkSupabaseHealth = async () => {
  try {
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name', { count: 'exact', head: true })
      .limit(1);

    if (error) {
      console.warn('⚠️ Supabase health check failed:', error.message);
      return false;
    }
    console.log('✓ Supabase connection verified');
    return true;
  } catch (err) {
    console.warn('⚠️ Supabase health check error:', err);
    return false;
  }
};

export default supabase;
