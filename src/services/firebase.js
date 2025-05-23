// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithPhoneNumber, 
  signInWithPopup, 
  GoogleAuthProvider, 
  OAuthProvider,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "mock-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "mock-auth-domain",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "mock-project-id",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "mock-storage-bucket",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "mock-messaging-sender-id",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "mock-app-id",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "mock-measurement-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const appleProvider = new OAuthProvider('apple.com');

// Mock user data for development
const MOCK_USERS = [
  {
    uid: "mock-uid-1",
    phoneNumber: "+919876543210",
    displayName: "Test User",
    email: "testuser@example.com",
    photoURL: "https://via.placeholder.com/150",
  },
  {
    uid: "mock-uid-2",
    phoneNumber: "+919876543211",
    displayName: "Admin User",
    email: "admin@example.com",
    photoURL: "https://via.placeholder.com/150",
  },
];

// Mock authentication functions
const mockSignInWithPhone = (phoneNumber) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = MOCK_USERS.find(u => u.phoneNumber === phoneNumber) || MOCK_USERS[0];
      localStorage.setItem('mockUser', JSON.stringify(user));
      resolve(user);
    }, 1000);
  });
};

const mockSignInWithGoogle = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = MOCK_USERS[0];
      localStorage.setItem('mockUser', JSON.stringify(user));
      resolve(user);
    }, 1000);
  });
};

const mockSignInWithApple = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = MOCK_USERS[0];
      localStorage.setItem('mockUser', JSON.stringify(user));
      resolve(user);
    }, 1000);
  });
};

const mockSignOut = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.removeItem('mockUser');
      resolve();
    }, 500);
  });
};

const mockVerifyOTP = (otp) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (otp === "123456") {
        const user = JSON.parse(localStorage.getItem('mockUser')) || MOCK_USERS[0];
        resolve(user);
      } else {
        reject(new Error("Invalid OTP"));
      }
    }, 1000);
  });
};

// Export the functions
export {
  auth,
  googleProvider,
  appleProvider,
  signInWithPhoneNumber,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  // Mock functions
  mockSignInWithPhone,
  mockSignInWithGoogle,
  mockSignInWithApple,
  mockSignOut,
  mockVerifyOTP
};