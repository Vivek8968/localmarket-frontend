'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SearchBar from './SearchBar';
import CategoryDropdown from './CategoryDropdown';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    </header>
  );
};

export default Header;