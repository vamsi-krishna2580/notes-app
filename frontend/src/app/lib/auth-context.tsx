//for mongodb connection authentication handles by backend
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import * as api from './api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const response = await api.getCurrentUser();
      if (response.success && response.data) {
        setUser(response.data);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await api.login(email, password);
    
    if (response.success && response.data) {
      setUser(response.data.user);
      return { success: true };
    }
    
    return { success: false, error: response.error };
  };

  const signup = async (email: string, password: string, name: string) => {
    const response = await api.signup(email, password, name);
    
    if (response.success && response.data) {
      setUser(response.data.user);
      return { success: true };
    }
    
    return { success: false, error: response.error };
  };

  const logout = async () => {
    await api.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// // authentication is handled by superbase
// import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
// import { supabase } from './supabase.ts'

// // You can refine this type later
// type SupabaseUser = any

// interface AuthContextType {
//   user: SupabaseUser | null
//   loading: boolean
//   login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
//   signup: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>
//   logout: () => Promise<void>
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<SupabaseUser | null>(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     // Get current user on load
//     const getUser = async () => {
//       const { data } = await supabase.auth.getUser()
//       setUser(data.user)
//       setLoading(false)
//     }

//     getUser()

//     // Listen to auth changes (login/logout)
//     const { data: listener } = supabase.auth.onAuthStateChange(
//       (_event, session) => {
//         setUser(session?.user ?? null)
//       }
//     )

//     return () => {
//       listener.subscription.unsubscribe()
//     }
//   }, [])

//   const login = async (email: string, password: string) => {
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     })

//     if (error) {
//       return { success: false, error: error.message }
//     }

//     setUser(data.user)
//     return { success: true }
//   }

//   const signup = async (email: string, password: string, name: string) => {
//     const { data, error } = await supabase.auth.signUp({
//       email,
//       password,
//       options: {
//         data: {
//           name,
//         },
//       },
//     })

//     if (error) {
//       return { success: false, error: error.message }
//     }

//     setUser(data.user)
//     return { success: true }
//   }

//   const logout = async () => {
//     await supabase.auth.signOut()
//     setUser(null)
//   }

//   return (
//     <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export function useAuth() {
//   const context = useContext(AuthContext)
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider')
//   }
//   return context
// }