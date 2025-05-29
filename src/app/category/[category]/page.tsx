'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';

// Mock data
const mockProducts: { [key: string]: Product[] } = {
  electronics: [
    {
      id: 'p1',
      name: 'iPhone 15 Pro',
      description: 'Latest iPhone with A17 Pro chip',
      price: 134900,
      category: 'electronics',
      subcategory: 'mobile-phones',
      shopId: '1',
      inStock: true,
      brand: 'Apple',
      image: 'https://via.placeholder.com/300x300?text=iPhone+15+Pro',
      shop: {
        id: '1',
        name: 'TechWorld Electronics',
        address: 'Shop 12, Main Market, Sector 15',
        phone: '+91 98765 43210',
        whatsapp: '+91 98765 43210',
        location: { latitude: 28.5355, longitude: 77.3910 },
        categories: ['electronics'],
        rating: 4.5,
        isOpen: true
      }
    },
    {
      id: 'p2',
      name: 'Samsung Galaxy S24',
      description: 'Flagship Android smartphone',
      price: 79999,
      category: 'electronics',
      subcategory: 'mobile-phones',
      shopId: '1',
      inStock: true,
      brand: 'Samsung',
      image: 'https://via.placeholder.com/300x300?text=Galaxy+S24',
      shop: {
        id: '1',
        name: 'TechWorld Electronics',
        address: 'Shop 12, Main Market, Sector 15',
        phone: '+91 98765 43210',
        whatsapp: '+91 98765 43210',
        location: { latitude: 28.5355, longitude: 77.3910 },
        categories: ['electronics'],
        rating: 4.5,
        isOpen: true
      }
    }
  ],
  batteries: [
    {
      id: 'p4',
      name: 'Exide Car Battery',
      description: '12V 65Ah maintenance-free battery',
      price: 8500,
      category: 'batteries',
      subcategory: 'car-batteries',
      shopId: '2',
      inStock: true,
      brand: 'Exide',
      image: 'https://via.placeholder.com/300x300?text=Car+Battery',
      shop: {
        id: '2',
        name: 'Battery Hub',
        address: 'Plot 45, Industrial Area, Phase 2',
        phone: '+91 98765 43211',
        whatsapp: '+91 98765 43211',
        location: { latitude: 28.5365, longitude: 77.3920 },
        categories: ['batteries'],
        rating: 4.3,
        isOpen: true
      }
    }
  ]
};

const categoryInfo: { [key: string]: { name: string; icon: string; description: string } } = {
  electronics: {
    name: 'Electronics',
    icon: '📱',
    description: 'Find the latest smartphones, laptops, TVs, and electronic appliances'
  },
  batteries: {
    name: 'Batteries',
    icon: '🔋',
    description: 'Car batteries, bike batteries, inverter batteries, and more'
  }
};

const subcategories: { [key: string]: string[] } = {
  electronics: [
    'mobile-phones', 'laptops', 'televisions', 'refrigerators', 
    'air-conditioners', 'washing-machines', 'accessories'
  ],
  batteries: [
    'car-batteries', 'two-wheeler-batteries', 'inverter-batteries', 
    'ev-batteries', 'battery-chargers'
  ]
};

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');

  useEffect(() => {
    if (category) {
      loadProducts(category);
    }
  }, [category]);

  const loadProducts = async (cat: string) => {
    setLoading(true);
    try {
      // In production: const productsData = await api.getProductsByCategory(cat);
      const productsData = mockProducts[cat] || [];
      setProducts(productsData);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const info = categoryInfo[category];
  const subs = subcategories[category] || [];
  const filteredProducts = selectedSubcategory === 'all' 
    ? products 
    : products.filter(p => p.subcategory === selectedSubcategory);

  if (!info) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category not found</h1>
          <p className="text-gray-600">The category you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="text-6xl mb-4">{info.icon}</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{info.name}</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{info.description}</p>
          </div>
        </div>
      </div>

      {/* Subcategories */}
      <div className="bg-gray-100 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedSubcategory('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                selectedSubcategory === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {subs.map((sub) => (
              <Link
                key={sub}
                href={`/category/${category}/${sub}`}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-white text-gray-700 hover:bg-gray-200 transition-colors duration-200"
              >
                {sub.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedSubcategory === 'all' ? 'All Products' : selectedSubcategory.replace('-', ' ')}
          </h2>
          <p className="text-gray-600">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600">
              No products available in this category at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}