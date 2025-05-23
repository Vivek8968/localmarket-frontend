import { createContext, useContext, useEffect, useState } from 'react';
import { 
  auth, 
  onAuthStateChanged, 
  signOut,
  mockSignInWithPhone,
  mockSignInWithGoogle,
  mockSignInWithApple,
  mockSignOut,
  mockVerifyOTP
} from '../services/firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [verificationId, setVerificationId] = useState(null);

  // Check if we're in development mode to use mock functions
  const isDev = import.meta.env.DEV;

  useEffect(() => {
    if (isDev) {
      // In development, check for mock user in localStorage
      const mockUser = localStorage.getItem('mockUser');
      if (mockUser) {
        setCurrentUser(JSON.parse(mockUser));
      }
      setLoading(false);
    } else {
      // In production, use Firebase auth
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setLoading(false);
      });
      return unsubscribe;
    }
  }, [isDev]);

  // Phone authentication
  const signInWithPhone = async (phoneNumber) => {
    if (isDev) {
      await mockSignInWithPhone(phoneNumber);
      setVerificationId('mock-verification-id');
      return 'mock-verification-id';
    } else {
      // Implement actual Firebase phone auth
      // This would require recaptcha setup
      // const appVerifier = window.recaptchaVerifier;
      // const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      // setVerificationId(confirmationResult.verificationId);
      // return confirmationResult.verificationId;
    }
  };

  // Verify OTP
  const verifyOTP = async (otp) => {
    if (isDev) {
      const user = await mockVerifyOTP(otp);
      setCurrentUser(user);
      return user;
    } else {
      // Implement actual Firebase OTP verification
      // const credential = PhoneAuthProvider.credential(verificationId, otp);
      // const result = await signInWithCredential(auth, credential);
      // return result.user;
    }
  };

  // Google authentication
  const signInWithGoogle = async () => {
    if (isDev) {
      const user = await mockSignInWithGoogle();
      setCurrentUser(user);
      return user;
    } else {
      // Implement actual Firebase Google auth
      // const result = await signInWithPopup(auth, googleProvider);
      // return result.user;
    }
  };

  // Apple authentication
  const signInWithApple = async () => {
    if (isDev) {
      const user = await mockSignInWithApple();
      setCurrentUser(user);
      return user;
    } else {
      // Implement actual Firebase Apple auth
      // const result = await signInWithPopup(auth, appleProvider);
      // return result.user;
    }
  };

  // Sign out
  const logout = async () => {
    if (isDev) {
      await mockSignOut();
      setCurrentUser(null);
    } else {
      await signOut(auth);
    }
  };

  const value = {
    currentUser,
    signInWithPhone,
    verifyOTP,
    signInWithGoogle,
    signInWithApple,
    logout,
    verificationId
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}