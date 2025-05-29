'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import ShopCard from '@/components/ShopCard';
import { Product, Shop } from '@/types';

const categoryInfo: { [key: string]: { name: string; icon: string; description: string } } = {
  mobiles: {
    name: 'Mobiles',
    icon: '📱',
    description: 'Find the latest smartphones, feature phones, and mobile accessories from local stores'
  },
  laptops: {
    name: 'Laptops',
    icon: '💻',
    description: 'Gaming laptops, business laptops, ultrabooks, and laptop accessories'
  },
  tvs: {
    name: 'TVs',
    icon: '📺',
    description: 'Smart TVs, LED TVs, OLED displays, and TV accessories from trusted dealers'
  },
  fridges: {
    name: 'Fridges',
    icon: '🧊',
    description: 'Single door, double door, side-by-side refrigerators, and mini fridges'
  },
  acs: {
    name: 'ACs',
    icon: '❄️',
    description: 'Split ACs, window ACs, portable air conditioners, and AC accessories'
  },
  ovens: {
    name: 'Ovens',
    icon: '🔥',
    description: 'Microwave ovens, OTG ovens, convection ovens, and oven accessories'
  },
  coolers: {
    name: 'Coolers',
    icon: '🌀',
    description: 'Desert coolers, personal coolers, tower coolers, and cooler parts'
  },
  printers: {
    name: 'Printers',
    icon: '🖨️',
    description: 'Inkjet printers, laser printers, all-in-one printers, and printer supplies'
  },
  fans: {
    name: 'Fans',
    icon: '🌪️',
    description: 'Ceiling fans, table fans, exhaust fans, and fan accessories'
  },
  accessories: {
    name: 'Accessories',
    icon: '🔌',
    description: 'Cables, chargers, power banks, adapters, and electronic accessories'
  }
};

const subcategories: { [key: string]: string[] } = {
  mobiles: ['smartphones', 'feature-phones', 'mobile-cases', 'chargers'],
  laptops: ['gaming-laptops', 'business-laptops', 'ultrabooks', 'laptop-accessories'],
  tvs: ['smart-tvs', 'led-tvs', 'oled-tvs', 'tv-accessories'],
  fridges: ['single-door', 'double-door', 'side-by-side', 'mini-fridges'],
  acs: ['split-acs', 'window-acs', 'portable-acs', 'ac-accessories'],
  ovens: ['microwave-ovens', 'otg-ovens', 'convection-ovens', 'oven-accessories'],
  coolers: ['desert-coolers', 'personal-coolers', 'tower-coolers', 'cooler-parts'],
  printers: ['inkjet-printers', 'laser-printers', 'all-in-one', 'printer-supplies'],
  fans: ['ceiling-fans', 'table-fans', 'exhaust-fans', 'fan-accessories'],
  accessories: ['cables', 'chargers-acc', 'power-banks', 'adapters']
};

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  
  const [products, setProducts] = useState<Product[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'products' | 'shops'>('products');

  useEffect(() => {
    if (category) {
      loadCategoryData(category);
    }
  }, [category]);

  const loadCategoryData = async (cat: string) => {
    setLoading(true);
    
    // Load mock data directly since backend is not available
    console.log('Loading mock data for category:', cat);
    try {
      const { getProductsByCategory, getShopsByCategory } = await import('@/lib/mockData');
      
      // Load mock products by category
      const mockProducts = getProductsByCategory(cat);
      setProducts(mockProducts);
      
      // Load mock shops by category
      const mockShops = getShopsByCategory(cat);
      setShops(mockShops);
      
      console.log(`Loaded ${mockProducts.length} products and ${mockShops.length} shops for ${cat}`);
    } catch (error) {
      console.error('Error loading mock data:', error);
      setProducts([]);
      setShops([]);
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
              <button
                key={sub}
                onClick={() => setSelectedSubcategory(sub)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  selectedSubcategory === sub
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-200'
                }`}
              >
                {sub.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === 'products'
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-white hover:shadow-sm'
              }`}
            >
              Products ({filteredProducts.length})
            </button>
            <button
              onClick={() => setActiveTab('shops')}
              className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === 'shops'
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-white hover:shadow-sm'
              }`}
            >
              Shops ({shops.length})
            </button>
          </div>
          
          <p className="text-gray-600">
            {activeTab === 'products' 
              ? `${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''} found`
              : `${shops.length} shop${shops.length !== 1 ? 's' : ''} found`
            }
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse bg-white rounded-2xl p-6 shadow-sm">
                <div className="bg-gray-200 h-48 rounded-xl mb-4"></div>
                <div className="h-6 bg-gray-200 rounded-lg mb-3"></div>
                <div className="h-4 bg-gray-200 rounded-lg mb-2"></div>
                <div className="h-4 bg-gray-200 rounded-lg w-3/4 mb-4"></div>
                <div className="flex space-x-2">
                  <div className="h-10 bg-gray-200 rounded-lg flex-1"></div>
                  <div className="h-10 bg-gray-200 rounded-lg flex-1"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Products Tab */}
            {activeTab === 'products' && (
              <>
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <div className="w-32 h-32 mx-auto mb-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <div className="text-gray-400 text-6xl">📦</div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      No products found
                    </h3>
                    <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                      No products available in this category at the moment. Check back later or try a different category.
                    </p>
                  </div>
                )}
              </>
            )}

            {/* Shops Tab */}
            {activeTab === 'shops' && (
              <>
                {shops.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {shops.map((shop) => (
                      <ShopCard key={shop.id} shop={shop} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <div className="w-32 h-32 mx-auto mb-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <div className="text-gray-400 text-6xl">🏪</div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      No shops found
                    </h3>
                    <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                      No shops selling {info.name.toLowerCase()} found in your area. Try expanding your search or check back later.
                    </p>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}