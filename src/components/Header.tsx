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
  const { user, firebaseUser, loading, logout } = useAuth();
  const router = useRouter();

  const categories = [
    {
      id: 'mobiles',
      name: 'Mobiles',
      icon: '📱',
      subcategories: [
        { id: 'smartphones', name: 'Smartphones' },
        { id: 'feature-phones', name: 'Feature Phones' },
        { id: 'mobile-cases', name: 'Mobile Cases' },
        { id: 'chargers', name: 'Chargers' },
      ]
    },
    {
      id: 'laptops',
      name: 'Laptops',
      icon: '💻',
      subcategories: [
        { id: 'gaming-laptops', name: 'Gaming Laptops' },
        { id: 'business-laptops', name: 'Business Laptops' },
        { id: 'ultrabooks', name: 'Ultrabooks' },
        { id: 'laptop-accessories', name: 'Accessories' },
      ]
    },
    {
      id: 'tvs',
      name: 'TVs',
      icon: '📺',
      subcategories: [
        { id: 'smart-tvs', name: 'Smart TVs' },
        { id: 'led-tvs', name: 'LED TVs' },
        { id: 'oled-tvs', name: 'OLED TVs' },
        { id: 'tv-accessories', name: 'TV Accessories' },
      ]
    },
    {
      id: 'fridges',
      name: 'Fridges',
      icon: '🧊',
      subcategories: [
        { id: 'single-door', name: 'Single Door' },
        { id: 'double-door', name: 'Double Door' },
        { id: 'side-by-side', name: 'Side-by-Side' },
        { id: 'mini-fridges', name: 'Mini Fridges' },
      ]
    },
    {
      id: 'acs',
      name: 'ACs',
      icon: '❄️',
      subcategories: [
        { id: 'split-acs', name: 'Split ACs' },
        { id: 'window-acs', name: 'Window ACs' },
        { id: 'portable-acs', name: 'Portable ACs' },
        { id: 'ac-accessories', name: 'AC Accessories' },
      ]
    },
    {
      id: 'ovens',
      name: 'Ovens',
      icon: '🔥',
      subcategories: [
        { id: 'microwave-ovens', name: 'Microwave Ovens' },
        { id: 'otg-ovens', name: 'OTG Ovens' },
        { id: 'convection-ovens', name: 'Convection Ovens' },
        { id: 'oven-accessories', name: 'Oven Accessories' },
      ]
    },
    {
      id: 'coolers',
      name: 'Coolers',
      icon: '🌀',
      subcategories: [
        { id: 'desert-coolers', name: 'Desert Coolers' },
        { id: 'personal-coolers', name: 'Personal Coolers' },
        { id: 'tower-coolers', name: 'Tower Coolers' },
        { id: 'cooler-parts', name: 'Cooler Parts' },
      ]
    },
    {
      id: 'printers',
      name: 'Printers',
      icon: '🖨️',
      subcategories: [
        { id: 'inkjet-printers', name: 'Inkjet Printers' },
        { id: 'laser-printers', name: 'Laser Printers' },
        { id: 'all-in-one', name: 'All-in-One' },
        { id: 'printer-supplies', name: 'Printer Supplies' },
      ]
    },
    {
      id: 'fans',
      name: 'Fans',
      icon: '🌪️',
      subcategories: [
        { id: 'ceiling-fans', name: 'Ceiling Fans' },
        { id: 'table-fans', name: 'Table Fans' },
        { id: 'exhaust-fans', name: 'Exhaust Fans' },
        { id: 'fan-accessories', name: 'Fan Accessories' },
      ]
    },
    {
      id: 'accessories',
      name: 'Accessories',
      icon: '🔌',
      subcategories: [
        { id: 'cables', name: 'Cables' },
        { id: 'chargers-acc', name: 'Chargers' },
        { id: 'power-banks', name: 'Power Banks' },
        { id: 'adapters', name: 'Adapters' },
      ]
    }
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
              LocalMarket
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {categories.map((category) => (
              <CategoryDropdown key={category.id} category={category} />
            ))}
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <SearchBar />
          </div>

          {/* Authentication Section */}
          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
            ) : user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {firebaseUser?.photoURL ? (
                    <img
                      src={firebaseUser.photoURL}
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user.name?.charAt(0) || user.email?.charAt(0) || '?'}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-700">
                      Welcome, {user.name || user.email || 'User'}
                    </span>
                    {user.role && (
                      <span className="text-xs text-gray-500 capitalize">
                        {user.role}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Role-based Navigation */}
                {user.role === 'seller' && (
                  <Link
                    href="/seller-dashboard"
                    className="text-sm bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
                  >
                    Dashboard
                  </Link>
                )}
                
                {user.role === 'admin' && (
                  <Link
                    href="/admin-dashboard"
                    className="text-sm bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                  >
                    Admin
                  </Link>
                )}
                
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
                      {firebaseUser?.photoURL ? (
                        <img
                          src={firebaseUser.photoURL}
                          alt="Profile"
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium">
                            {user.name?.charAt(0) || user.email?.charAt(0) || '?'}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-900">
                          {user.name || user.email || 'User'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {user.email || user.phone}
                        </p>
                        {user.role && (
                          <p className="text-xs text-blue-600 capitalize">
                            {user.role}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {/* Role-based Mobile Navigation */}
                    {user.role === 'seller' && (
                      <Link
                        href="/seller-dashboard"
                        className="block w-full bg-green-600 text-white text-center py-2 px-4 rounded-md hover:bg-green-700"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Seller Dashboard
                      </Link>
                    )}
                    
                    {user.role === 'admin' && (
                      <Link
                        href="/admin"
                        className="block w-full bg-purple-600 text-white text-center py-2 px-4 rounded-md hover:bg-purple-700"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Admin Panel
                      </Link>
                    )}
                    
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