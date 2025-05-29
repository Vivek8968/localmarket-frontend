'use client';

import React, { useState } from 'react';
import { api } from '@/lib/api';

interface RoleSelectorProps {
  firebaseUser: any;
  onComplete: () => void;
  onClose: () => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ firebaseUser, onComplete, onClose }) => {
  const [selectedRole, setSelectedRole] = useState<'customer' | 'seller'>('customer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRoleSelection = async () => {
    if (!firebaseUser) return;

    setLoading(true);
    setError('');

    try {
      const firebaseToken = await firebaseUser.getIdToken();
      
      const userData = {
        firebase_uid: firebaseUser.uid,
        name: firebaseUser.displayName || 'User',
        email: firebaseUser.email || undefined,
        phone: firebaseUser.phoneNumber || undefined,
        role: selectedRole,
      };

      await api.register(userData);
      
      // After successful registration, login to get the token
      await api.login(firebaseToken, firebaseUser.phoneNumber || '');
      
      onComplete();
    } catch (error: any) {
      console.error('Error registering user:', error);
      setError('Failed to complete registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Complete Your Registration</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <p className="text-gray-600">
          Welcome! Please select your role to continue:
        </p>

        <div className="space-y-3">
          <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="role"
              value="customer"
              checked={selectedRole === 'customer'}
              onChange={(e) => setSelectedRole(e.target.value as 'customer')}
              className="text-blue-600"
            />
            <div>
              <div className="font-medium">Customer</div>
              <div className="text-sm text-gray-500">
                Browse and shop from local stores
              </div>
            </div>
          </label>

          <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="role"
              value="seller"
              checked={selectedRole === 'seller'}
              onChange={(e) => setSelectedRole(e.target.value as 'seller')}
              className="text-blue-600"
            />
            <div>
              <div className="font-medium">Seller</div>
              <div className="text-sm text-gray-500">
                Manage your shop and sell products
              </div>
            </div>
          </label>
        </div>

        <button
          onClick={handleRoleSelection}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Completing Registration...' : 'Continue'}
        </button>
      </div>
    </div>
  );
};

export default RoleSelector;