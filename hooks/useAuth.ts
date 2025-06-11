'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase-client';
import { User } from '@supabase/supabase-js';

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  name: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setUser(session.user);
        await fetchProfile(session.user.email!);
      } else {
        // Check localStorage for user data (from login)
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
          const userData = JSON.parse(currentUser);
          setProfile(userData);
        }
      }
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          await fetchProfile(session.user.email!);
        } else {
          setUser(null);
          setProfile(null);
          localStorage.removeItem('currentUser');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (email: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', email)
        .single();

      if (data && !error) {
        const userProfile = {
          id: data.id,
          email: data.email,
          full_name: data.full_name,
          name: data.full_name
        };
        setProfile(userProfile);
        localStorage.setItem('currentUser', JSON.stringify(userProfile));
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('currentUser');
    setUser(null);
    setProfile(null);
  };

  const checkHasPaid = async () => {
    if (!profile?.email) return false;

    try {
      const { data } = await supabase
        .from('payments')
        .select('status')
        .eq('email', profile.email)
        .eq('status', 'succeeded')
        .single();

      return !!data;
    } catch {
      return false;
    }
  };

  return {
    user,
    profile,
    loading,
    signOut,
    isAuthenticated: !!user || !!profile,
    checkHasPaid
  };
} 