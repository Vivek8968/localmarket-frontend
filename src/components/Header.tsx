'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SearchBar from './SearchBar';
import CategoryDropdown from './CategoryDropdown';
import AuthModal from './auth/AuthModal';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const categories = [
    {
      id: 'electronics',
      name: 'Electronics',
      icon: '📱',
      subcategories: [
        { id: 'mobile-phones', name: 'Mobile Phones' },
        { id: 'laptops', name: 'Laptops' },
        { id: 'accessories', name: 'Accessories' },
        { id: 'televisions', name: 'Televisions' },
        { id: 'refrigerators', name: 'Refrigerators' },
        { id: 'air-conditioners', name: 'Air Conditioners' },
        { id: 'washing-machines', name: 'Washing Machines' },
        { id: 'printers', name: 'Printers' },
        { id: 'ovens', name: 'Ovens' },
        { id: 'coolers', name: 'Coolers' },
        { id: 'fans', name: 'Fans' },
      ]
    },
    {
      id: 'batteries',
      name: 'Batteries',
      icon: '🔋',
      subcategories: [
        { id: 'two-wheeler-batteries', name: 'Two-Wheeler Batteries' },
        { id: 'inverter-batteries', name: 'Inverter Batteries' },
        { id: 'car-batteries', name: 'Car Batteries' },
        { id: 'battery-chargers', name: 'Battery Chargers' },
        { id: 'ev-batteries', name: 'EV Batteries' },
      ]
    }
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <span className="text-xl font-bold text-gray-900">LocalMarket</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {categories.map((category) => (
              <CategoryDropdown key={category.id} category={category} />
            ))}
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <SearchBar />
          </div>

          {/* Authentication Section */}
          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
            ) : user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user.displayName?.charAt(0) || user.email?.charAt(0) || '?'}
                      </span>
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-700">
                    Welcome, {user.displayName || user.email || 'User'}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-4">
              {/* Mobile Authentication */}
              <div className="pb-4 border-b border-gray-200">
                {loading ? (
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                  </div>
                ) : user ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt="Profile"
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium">
                            {user.displayName?.charAt(0) || user.email?.charAt(0) || '?'}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-900">
                          {user.displayName || user.email || 'User'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {user.email || user.phoneNumber}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={logout}
                      className="w-full text-left text-red-600 hover:text-red-800"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                  >
                    Login
                  </button>
                )}
              </div>

              {categories.map((category) => (
                <div key={category.id} className="space-y-2">
                  <div className="font-medium text-gray-900 flex items-center space-x-2">
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </div>
                  <div className="pl-6 space-y-1">
                    {category.subcategories.map((sub) => (
                      <Link
                        key={sub.id}
                        href={`/category/${category.id}/${sub.id}`}
                        className="block text-sm text-gray-600 hover:text-primary-600"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
};

export default Header;