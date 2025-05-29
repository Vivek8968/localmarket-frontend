'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User as FirebaseUser, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { api } from '@/lib/api';

interface BackendUser {
  id: number;
  firebase_uid: string;
  name: string;
  email?: string;
  phone?: string;
  role: 'customer' | 'seller' | 'admin';
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  firebaseUser: FirebaseUser | null;
  user: BackendUser | null;
  loading: boolean;
  userRole: 'customer' | 'seller' | 'admin' | null;
  login: (firebaseUser: FirebaseUser) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (data: Partial<BackendUser>) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  firebaseUser: null,
  user: null,
  loading: true,
  userRole: null,
  login: async () => {},
  logout: async () => {},
  updateUserProfile: async () => {},
  isAuthenticated: false,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<BackendUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setFirebaseUser(firebaseUser);
      
      if (firebaseUser) {
        // Check if we're in development mode with mock data
        const isDevelopment = process.env.NODE_ENV === 'development';
        const hasBackendUrl = process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_API_URL !== 'https://your-backend-url.com/api';
        
        if (isDevelopment && !hasBackendUrl) {
          // In development without backend, create a mock user
          const mockUser = {
            id: 1,
            firebase_uid: firebaseUser.uid,
            name: firebaseUser.displayName || 'Mock User',
            email: firebaseUser.email || undefined,
            phone: firebaseUser.phoneNumber || undefined,
            role: 'customer' as const,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
          setUser(mockUser);
          localStorage.setItem('userInfo', JSON.stringify(mockUser));
          setLoading(false);
          return;
        }
        
        try {
          // Get Firebase ID token and sync with backend
          const firebaseToken = await firebaseUser.getIdToken();
          const response = await api.login(firebaseToken, firebaseUser.phoneNumber || '');
          
          if (response.status && response.data) {
            const { token, user: backendUser } = response.data;
            
            // Store backend JWT token
            localStorage.setItem('accessToken', token);
            localStorage.setItem('userInfo', JSON.stringify(backendUser));
            
            setUser(backendUser);
          }
        } catch (error) {
          console.error('Error syncing with backend:', error);
          
          // If backend sync fails, try to get existing user data
          try {
            const userResponse = await api.getCurrentUser();
            if (userResponse.status && userResponse.data) {
              setUser(userResponse.data);
              localStorage.setItem('userInfo', JSON.stringify(userResponse.data));
            }
          } catch (getUserError) {
            console.error('Error getting current user:', getUserError);
            
            // If all fails, create a basic user object for registration
            const basicUser = {
              firebase_uid: firebaseUser.uid,
              name: firebaseUser.displayName || 'User',
              email: firebaseUser.email || undefined,
              phone: firebaseUser.phoneNumber || undefined,
              role: 'customer' as const,
            };
            
            // Store basic info for potential registration
            localStorage.setItem('pendingUserInfo', JSON.stringify(basicUser));
          }
        }
      } else {
        setUser(null);
        localStorage.removeItem('userInfo');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('pendingUserInfo');
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (firebaseUser: FirebaseUser) => {
    // Check if we're in development mode with mock data
    const isDevelopment = process.env.NODE_ENV === 'development';
    const hasBackendUrl = process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_API_URL !== 'https://your-backend-url.com/api';
    
    if (isDevelopment && !hasBackendUrl) {
      // In development without backend, create a mock user
      const mockUser = {
        id: 1,
        firebase_uid: firebaseUser.uid,
        name: firebaseUser.displayName || 'Mock User',
        email: firebaseUser.email || undefined,
        phone: firebaseUser.phoneNumber || undefined,
        role: 'customer' as const,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setUser(mockUser);
      localStorage.setItem('userInfo', JSON.stringify(mockUser));
      return;
    }
    
    try {
      const firebaseToken = await firebaseUser.getIdToken();
      const response = await api.login(firebaseToken, firebaseUser.phoneNumber || '');
      
      if (response.status && response.data) {
        const { token, user: backendUser } = response.data;
        
        localStorage.setItem('accessToken', token);
        localStorage.setItem('userInfo', JSON.stringify(backendUser));
        
        setUser(backendUser);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem('userInfo');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('pendingUserInfo');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const updateUserProfile = async (data: Partial<BackendUser>) => {
    // Check if we're in development mode with mock data
    const isDevelopment = process.env.NODE_ENV === 'development';
    const hasBackendUrl = process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_API_URL !== 'https://your-backend-url.com/api';
    
    if (isDevelopment && !hasBackendUrl) {
      // In development without backend, update the mock user
      if (user) {
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        localStorage.setItem('userInfo', JSON.stringify(updatedUser));
      }
      return;
    }
    
    try {
      const response = await api.updateProfile(data);
      if (response.status && response.data) {
        setUser(response.data);
        localStorage.setItem('userInfo', JSON.stringify(response.data));
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const value = {
    firebaseUser,
    user,
    loading,
    userRole: user?.role || null,
    login,
    logout,
    updateUserProfile,
    isAuthenticated: !!firebaseUser && !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};