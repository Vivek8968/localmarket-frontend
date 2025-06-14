'use client';

import React, { useState, useEffect } from 'react';
import PhoneAuth from './PhoneAuth';
import GoogleAuth from './GoogleAuth';
import RoleSelector from './RoleSelector';
import { useAuth } from '@/contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

type AuthMethod = 'select' | 'phone' | 'google' | 'role-select';

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [authMethod, setAuthMethod] = useState<AuthMethod>('select');
  const [pendingFirebaseUser, setPendingFirebaseUser] = useState<any>(null);
  const { firebaseUser, user } = useAuth();

  useEffect(() => {
    // Check if user needs to complete registration
    if (firebaseUser && !user && isOpen) {
      const pendingUserInfo = localStorage.getItem('pendingUserInfo');
      if (pendingUserInfo) {
        setPendingFirebaseUser(firebaseUser);
        setAuthMethod('role-select');
      }
    }
  }, [firebaseUser, user, isOpen]);

  const handleSuccess = () => {
    setAuthMethod('select');
    onSuccess();
  };

  const handleClose = () => {
    setAuthMethod('select');
    onClose();
  };

  const goBack = () => {
    setAuthMethod('select');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        {authMethod === 'select' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Login to LocalMarket</h2>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <p className="text-gray-600">
              Choose your preferred login method
            </p>

            <div className="space-y-3">
              <button
                onClick={() => setAuthMethod('phone')}
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700"
              >
                <span>📱</span>
                <span>Login with Phone Number</span>
              </button>

              <button
                onClick={() => setAuthMethod('google')}
                className="w-full flex items-center justify-center space-x-2 bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>
          </div>
        )}

        {authMethod === 'phone' && (
          <PhoneAuth onSuccess={handleSuccess} onClose={goBack} />
        )}

        {authMethod === 'google' && (
          <GoogleAuth onSuccess={handleSuccess} onClose={goBack} />
        )}

        {authMethod === 'role-select' && pendingFirebaseUser && (
          <RoleSelector
            firebaseUser={pendingFirebaseUser}
            onComplete={handleSuccess}
            onClose={handleClose}
          />
        )}
      </div>
    </div>
  );
};

export default AuthModal;