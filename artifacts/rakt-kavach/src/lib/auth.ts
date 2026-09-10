import { supabase } from './supabaseClient';

/**
 * ABHA Authentication Service
 * Provides secure OTP-based authentication flow for ABHA verification
 */

export interface AuthState {
  isLoading: boolean;
  error: string | null;
  session: any | null;
  user: any | null;
}

/**
 * Step 1: Initiate OTP Request
 * Sends OTP to provided phone number via Supabase Auth
 */
export const initiateAbhaOtp = async (phone: string): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    // Validate phone format (Indian number)
    const phoneRegex = /^(?:\+91|91)?[6-9]\d{9}$/;
    if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
      return {
        success: false,
        error: 'Invalid phone number format. Expected 10-digit Indian number.',
      };
    }

    // Sign in with OTP
    const { error } = await supabase.auth.signInWithOtp({
      phone: phone.replace(/\D/g, ''),
    });

    if (error) {
      console.error('OTP initiation error:', error);
      return {
        success: false,
        error: error.message || 'Failed to send OTP. Please try again.',
      };
    }

    console.log('✓ OTP sent successfully');
    return { success: true };
  } catch (err) {
    console.error('OTP initiation exception:', err);
    return {
      success: false,
      error: 'Network error. Please check your connection and try again.',
    };
  }
};

/**
 * Step 2: Verify OTP Token
 * Validates OTP and establishes authenticated session
 */
export const verifyAbhaOtp = async (
  phone: string,
  token: string
): Promise<{
  success: boolean;
  error?: string;
  session?: any;
  user?: any;
}> => {
  try {
    // Validate token format (usually 6 digits)
    if (!/^\d{4,6}$/.test(token)) {
      return {
        success: false,
        error: 'Invalid OTP format. Expected 4-6 digits.',
      };
    }

    const { data, error } = await supabase.auth.verifyOtp({
      phone: phone.replace(/\D/g, ''),
      token: token,
      type: 'sms',
    });

    if (error) {
      console.error('OTP verification error:', error);
      return {
        success: false,
        error: error.message || 'OTP verification failed. Please try again.',
      };
    }

    if (!data.session) {
      return {
        success: false,
        error: 'Session establishment failed. Please try again.',
      };
    }

    console.log('✓ Authentication successful');
    return {
      success: true,
      session: data.session,
      user: data.user,
    };
  } catch (err) {
    console.error('OTP verification exception:', err);
    return {
      success: false,
      error: 'Authentication error. Please try again.',
    };
  }
};

/**
 * Step 3: Load Donor Profile
 * Retrieves verified donor data after successful authentication
 */
export const loadDonorProfile = async (userId: string): Promise<{
  success: boolean;
  error?: string;
  donor?: any;
}> => {
  try {
    // Verify current user matches requested userId
    const {
      data: { user: currentUser },
    } = await supabase.auth.getUser();

    if (!currentUser || currentUser.id !== userId) {
      return {
        success: false,
        error: 'Session verification failed. Please sign in again.',
      };
    }

    // Fetch donor record
    const { data: donor, error } = await supabase
      .from('donors')
      .select('*')
      .eq('auth_user_id', userId)
      .single();

    if (error) {
      // Profile doesn't exist yet (first-time user)
      if (error.code === 'PGRST116') {
        return {
          success: true,
          donor: null, // No existing profile
        };
      }
      console.error('Donor profile fetch error:', error);
      return {
        success: false,
        error: 'Failed to load profile. Please try again.',
      };
    }

    return {
      success: true,
      donor,
    };
  } catch (err) {
    console.error('Donor profile exception:', err);
    return {
      success: false,
      error: 'Profile loading error. Please try again.',
    };
  }
};

/**
 * Step 4: Get Current Session
 * Returns active session or null if not authenticated
 */
export const getCurrentSession = async () => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  } catch (err) {
    console.error('Session retrieval error:', err);
    return null;
  }
};

/**
 * Step 5: Logout
 * Terminates authenticated session
 */
export const logout = async (): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Logout error:', error);
      return {
        success: false,
        error: error.message || 'Logout failed. Please try again.',
      };
    }

    console.log('✓ Logged out successfully');
    return { success: true };
  } catch (err) {
    console.error('Logout exception:', err);
    return {
      success: false,
      error: 'Logout error. Please try again.',
    };
  }
};

/**
 * Session State Hook Helper
 * Returns observable auth state changes
 */
export const onAuthStateChange = (callback: (state: any) => void) => {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((event, session) => {
    callback({ event, session });
  });

  return subscription;
};
