'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ShopCard from '@/components/ShopCard';
import ProductCard from '@/components/ProductCard';
import { Shop, Product, SearchResult } from '@/types';

// Mock search data
const mockSearchResults: { [key: string]: SearchResult } = {
  'iphone': {
    shops: [
      {
        id: '1',
        name: 'TechWorld Electronics',
        address: 'Shop 12, Main Market, Sector 15',
        phone: '+91 98765 43210',
        whatsapp: '+91 98765 43210',
        location: { latitude: 28.5355, longitude: 77.3910 },
        categories: ['electronics'],
        rating: 4.5,
        isOpen: true,
        image: 'https://via.placeholder.com/300x200?text=TechWorld+Electronics'
      }
    ],
    products: [
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
      }
    ]
  },
  'battery': {
    shops: [
      {
        id: '2',
        name: 'Battery Hub',
        address: 'Plot 45, Industrial Area, Phase 2',
        phone: '+91 98765 43211',
        whatsapp: '+91 98765 43211',
        location: { latitude: 28.5365, longitude: 77.3920 },
        categories: ['batteries'],
        rating: 4.3,
        isOpen: true,
        image: 'https://via.placeholder.com/300x200?text=Battery+Hub'
      }
    ],
    products: [
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
  }
};

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [searchResults, setSearchResults] = useState<SearchResult>({ shops: [], products: [] });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'shops' | 'products'>('all');

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (searchQuery: string) => {
    setLoading(true);
    try {
      // In production: const results = await api.search(searchQuery, userLocation);
      const results = mockSearchResults[searchQuery.toLowerCase()] || { shops: [], products: [] };
      setSearchResults(results);
    } catch (error) {
      console.error('Error performing search:', error);
      setSearchResults({ shops: [], products: [] });
    } finally {
      setLoading(false);
    }
  };

  const totalResults = searchResults.shops.length + searchResults.products.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Search Results
            </h1>
            {query && (
              <p className="text-xl text-gray-600">
                Showing results for &ldquo;<span className="font-semibold">{query}</span>&rdquo;
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <>
            {/* Results Summary */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {totalResults} result{totalResults !== 1 ? 's' : ''} found
                </h2>
                <p className="text-gray-600">
                  {searchResults.shops.length} shop{searchResults.shops.length !== 1 ? 's' : ''} • {' '}
                  {searchResults.products.length} product{searchResults.products.length !== 1 ? 's' : ''}
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    activeTab === 'all'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveTab('shops')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    activeTab === 'shops'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Shops ({searchResults.shops.length})
                </button>
                <button
                  onClick={() => setActiveTab('products')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    activeTab === 'products'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Products ({searchResults.products.length})
                </button>
              </div>
            </div>

            {totalResults === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No results found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try searching with different keywords or check your spelling.
                </p>
                <div className="text-sm text-gray-500">
                  <p>Search suggestions:</p>
                  <ul className="mt-2 space-y-1">
                    <li>• Try &ldquo;iPhone&rdquo; for mobile phones</li>
                    <li>• Try &ldquo;battery&rdquo; for car or bike batteries</li>
                    <li>• Try &ldquo;laptop&rdquo; for computers</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-12">
                {/* Shops Section */}
                {(activeTab === 'all' || activeTab === 'shops') && searchResults.shops.length > 0 && (
                  <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Shops</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {searchResults.shops.map((shop) => (
                        <ShopCard key={shop.id} shop={shop} />
                      ))}
                    </div>
                  </section>
                )}

                {/* Products Section */}
                {(activeTab === 'all' || activeTab === 'products') && searchResults.products.length > 0 && (
                  <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Products</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {searchResults.products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading search results...</p>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}