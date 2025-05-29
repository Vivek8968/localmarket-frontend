'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

const SimplePhase2TestPage: React.FC = () => {
  const { user, userRole, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Phase 2 Testing Dashboard
          </h1>
          <p className="text-gray-600">
            Simple testing interface for Role-Based Access Control and Dashboard Features
          </p>
        </div>

        {/* Current User Status */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">🔐 Current User Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900">Authentication</h3>
              <p className="text-sm text-blue-700">
                {isAuthenticated ? '✅ Logged In' : '❌ Not Logged In'}
              </p>
              <p className="text-xs text-blue-600">
                User: {user?.name || user?.email || 'None'}
              </p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-medium text-green-900">Role</h3>
              <p className="text-sm text-green-700">
                {userRole ? `✅ ${userRole.charAt(0).toUpperCase() + userRole.slice(1)}` : '❌ No Role'}
              </p>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-medium text-purple-900">Access Level</h3>
              <p className="text-sm text-purple-700">
                {userRole === 'admin' ? '🔴 Admin Access' :
                 userRole === 'seller' ? '🟢 Seller Access' :
                 userRole === 'customer' ? '🔵 Customer Access' :
                 '⚪ No Access'}
              </p>
            </div>
          </div>
        </div>

        {/* Dashboard Links */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">📊 Dashboard Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link 
              href="/dashboard" 
              className="p-4 border-2 border-blue-200 rounded-lg hover:border-blue-400 transition-colors text-center"
            >
              <div className="text-2xl mb-2">🏠</div>
              <h3 className="font-medium text-gray-900">Universal Dashboard</h3>
              <p className="text-sm text-gray-600">Redirects based on role</p>
            </Link>
            
            <Link 
              href="/seller-dashboard" 
              className={`p-4 border-2 rounded-lg transition-colors text-center ${
                userRole === 'seller' || userRole === 'admin' 
                  ? 'border-green-200 hover:border-green-400' 
                  : 'border-gray-200 opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="text-2xl mb-2">🏪</div>
              <h3 className="font-medium text-gray-900">Seller Dashboard</h3>
              <p className="text-sm text-gray-600">
                {userRole === 'seller' || userRole === 'admin' ? 'Available' : 'Requires Seller Role'}
              </p>
            </Link>
            
            <Link 
              href="/admin-dashboard" 
              className={`p-4 border-2 rounded-lg transition-colors text-center ${
                userRole === 'admin' 
                  ? 'border-red-200 hover:border-red-400' 
                  : 'border-gray-200 opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="text-2xl mb-2">👑</div>
              <h3 className="font-medium text-gray-900">Admin Dashboard</h3>
              <p className="text-sm text-gray-600">
                {userRole === 'admin' ? 'Available' : 'Requires Admin Role'}
              </p>
            </Link>
          </div>
        </div>

        {/* Feature Testing */}
        {isAuthenticated && (
          <>
            {/* Seller Features */}
            {(userRole === 'seller' || userRole === 'admin') && (
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">🏪 Seller Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Link 
                    href="/seller-dashboard" 
                    className="p-3 border rounded-lg hover:bg-gray-50 text-center"
                  >
                    <div className="text-xl mb-1">📊</div>
                    <div className="text-sm font-medium">Dashboard</div>
                  </Link>
                  
                  <Link 
                    href="/seller-dashboard/shop" 
                    className="p-3 border rounded-lg hover:bg-gray-50 text-center"
                  >
                    <div className="text-xl mb-1">🏪</div>
                    <div className="text-sm font-medium">Shop</div>
                  </Link>
                  
                  <Link 
                    href="/seller-dashboard/products" 
                    className="p-3 border rounded-lg hover:bg-gray-50 text-center"
                  >
                    <div className="text-xl mb-1">📦</div>
                    <div className="text-sm font-medium">Products</div>
                  </Link>
                  
                  <Link 
                    href="/seller-dashboard/inventory" 
                    className="p-3 border rounded-lg hover:bg-gray-50 text-center"
                  >
                    <div className="text-xl mb-1">📋</div>
                    <div className="text-sm font-medium">Inventory</div>
                  </Link>
                </div>
              </div>
            )}

            {/* Admin Features */}
            {userRole === 'admin' && (
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">👑 Admin Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Link 
                    href="/admin-dashboard" 
                    className="p-3 border rounded-lg hover:bg-gray-50 text-center"
                  >
                    <div className="text-xl mb-1">📊</div>
                    <div className="text-sm font-medium">Dashboard</div>
                  </Link>
                  
                  <Link 
                    href="/admin-dashboard/users" 
                    className="p-3 border rounded-lg hover:bg-gray-50 text-center"
                  >
                    <div className="text-xl mb-1">👥</div>
                    <div className="text-sm font-medium">Users</div>
                  </Link>
                  
                  <Link 
                    href="/admin-dashboard/shops" 
                    className="p-3 border rounded-lg hover:bg-gray-50 text-center"
                  >
                    <div className="text-xl mb-1">🏪</div>
                    <div className="text-sm font-medium">Shops</div>
                  </Link>
                  
                  <Link 
                    href="/admin-dashboard/analytics" 
                    className="p-3 border rounded-lg hover:bg-gray-50 text-center"
                  >
                    <div className="text-xl mb-1">📈</div>
                    <div className="text-sm font-medium">Analytics</div>
                  </Link>
                </div>
              </div>
            )}
          </>
        )}

        {/* Phase 2 Implementation Status */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">✅ Phase 2 Implementation Status</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <span className="text-green-600 text-xl">✅</span>
              <span className="text-gray-900">Role-Based Access Control implemented</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-green-600 text-xl">✅</span>
              <span className="text-gray-900">Seller Dashboard with shop and product management</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-green-600 text-xl">✅</span>
              <span className="text-gray-900">Image Upload with Firebase Storage integration</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-green-600 text-xl">✅</span>
              <span className="text-gray-900">Admin Dashboard with user and shop management</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-green-600 text-xl">✅</span>
              <span className="text-gray-900">Protected routes and role-based navigation</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-green-600 text-xl">✅</span>
              <span className="text-gray-900">Comprehensive state management and error handling</span>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">Testing Instructions</h3>
            <ol className="text-sm text-blue-700 space-y-1">
              <li>1. Test authentication by logging in with different roles</li>
              <li>2. Verify dashboard access based on user role</li>
              <li>3. Test seller features (shop management, products, inventory)</li>
              <li>4. Test admin features (user management, shop oversight, analytics)</li>
              <li>5. Verify image upload functionality</li>
              <li>6. Test role-based navigation and protected routes</li>
            </ol>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 text-center">
          <div className="space-x-4">
            <Link 
              href="/" 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Homepage
            </Link>
            
            {!isAuthenticated && (
              <button 
                onClick={() => window.location.reload()}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Refresh Page
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimplePhase2TestPage;