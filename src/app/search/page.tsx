'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ShopCard from '@/components/ShopCard';
import ProductCard from '@/components/ProductCard';
import { Shop, Product, SearchResult } from '@/types';



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
      const { api } = await import('@/lib/api');
      
      // Get user location (try to get from localStorage or use default)
      let userLocation = { latitude: 28.5355, longitude: 77.3910 }; // Default location
      
      if (navigator.geolocation) {
        try {
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              timeout: 5000,
              maximumAge: 300000 // 5 minutes
            });
          });
          userLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
        } catch (geoError) {
          console.log('Could not get current location, using default');
        }
      }
      
      const results = await api.search(searchQuery, userLocation);
      
      if (results && results.data) {
        // Transform backend data to frontend format
        const transformedResults: SearchResult = {
          shops: [],
          products: []
        };

        // Transform shops
        if (results.data.shops && Array.isArray(results.data.shops)) {
          transformedResults.shops = results.data.shops.map((shop: any) => ({
            id: shop.id.toString(),
            name: shop.name || 'Unnamed Shop',
            address: shop.address || 'Address not provided',
            phone: shop.phone || shop.whatsapp_number || '',
            whatsapp: shop.whatsapp_number || shop.phone || '',
            location: {
              latitude: parseFloat(shop.latitude) || userLocation.latitude,
              longitude: parseFloat(shop.longitude) || userLocation.longitude
            },
            categories: shop.categories || ['general'],
            rating: parseFloat(shop.rating) || 4.0,
            isOpen: shop.is_open !== undefined ? shop.is_open : true,
            image: shop.image_url || `https://via.placeholder.com/300x200?text=${encodeURIComponent(shop.name || 'Shop')}`,
            distance: shop.distance || null
          }));
        }

        // Transform products
        if (results.data.products && Array.isArray(results.data.products)) {
          transformedResults.products = results.data.products.map((product: any) => ({
            id: product.id.toString(),
            name: product.name || 'Unnamed Product',
            description: product.description || '',
            price: parseFloat(product.price) || 0,
            category: product.category || 'general',
            subcategory: product.subcategory || product.category,
            shopId: product.shop_id?.toString() || '',
            inStock: product.in_stock !== undefined ? product.in_stock : true,
            brand: product.brand || '',
            image: product.image_url || `https://via.placeholder.com/300x300?text=${encodeURIComponent(product.name || 'Product')}`,
            shop: product.shop ? {
              id: product.shop.id.toString(),
              name: product.shop.name || 'Unnamed Shop',
              address: product.shop.address || 'Address not provided',
              phone: product.shop.phone || product.shop.whatsapp_number || '',
              whatsapp: product.shop.whatsapp_number || product.shop.phone || '',
              location: {
                latitude: parseFloat(product.shop.latitude) || userLocation.latitude,
                longitude: parseFloat(product.shop.longitude) || userLocation.longitude
              },
              categories: product.shop.categories || ['general'],
              rating: parseFloat(product.shop.rating) || 4.0,
              isOpen: product.shop.is_open !== undefined ? product.shop.is_open : true
            } : undefined
          }));
        }

        setSearchResults(transformedResults);
      } else {
        console.log('No search results from backend');
        setSearchResults({ shops: [], products: [] });
      }
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
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Search Results
            </h1>
            {query && (
              <p className="text-xl md:text-2xl text-primary-100">
                Showing results for &ldquo;<span className="font-semibold text-white">{query}</span>&rdquo;
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-600 border-t-transparent mx-auto mb-4"></div>
              <p className="text-lg text-gray-600">Searching for results...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Results Summary */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 bg-white rounded-2xl p-6 shadow-sm">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {totalResults} result{totalResults !== 1 ? 's' : ''} found
                </h2>
                <p className="text-lg text-gray-600">
                  {searchResults.shops.length} shop{searchResults.shops.length !== 1 ? 's' : ''} • {' '}
                  {searchResults.products.length} product{searchResults.products.length !== 1 ? 's' : ''}
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex space-x-1 mt-4 md:mt-0 bg-gray-100 p-1 rounded-xl">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    activeTab === 'all'
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-white hover:shadow-sm'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveTab('shops')}
                  className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    activeTab === 'shops'
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-white hover:shadow-sm'
                  }`}
                >
                  Shops ({searchResults.shops.length})
                </button>
                <button
                  onClick={() => setActiveTab('products')}
                  className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    activeTab === 'products'
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-white hover:shadow-sm'
                  }`}
                >
                  Products ({searchResults.products.length})
                </button>
              </div>
            </div>

            {totalResults === 0 ? (
              <div className="text-center py-20">
                <div className="w-32 h-32 mx-auto mb-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <div className="text-gray-400 text-6xl">🔍</div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  No results found
                </h3>
                <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                  We couldn't find any shops or products matching your search. Try different keywords or check your spelling.
                </p>
                <div className="bg-white rounded-2xl p-6 max-w-lg mx-auto shadow-sm">
                  <p className="text-sm font-semibold text-gray-700 mb-4">Search suggestions:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="text-left">
                      <p className="text-sm text-gray-600">• Try "iPhone" for mobile phones</p>
                      <p className="text-sm text-gray-600">• Try "battery" for car batteries</p>
                      <p className="text-sm text-gray-600">• Try "laptop" for computers</p>
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-gray-600">• Try "AC" for air conditioners</p>
                      <p className="text-sm text-gray-600">• Try "TV" for televisions</p>
                      <p className="text-sm text-gray-600">• Try "fridge" for refrigerators</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-16">
                {/* Shops Section */}
                {(activeTab === 'all' || activeTab === 'shops') && searchResults.shops.length > 0 && (
                  <section>
                    <div className="flex items-center space-x-3 mb-8">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 114 0 2 2 0 01-4 0zm8-2a2 2 0 100 4 2 2 0 000-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">Shops</h3>
                      <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                        {searchResults.shops.length}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                      {searchResults.shops.map((shop) => (
                        <ShopCard key={shop.id} shop={shop} />
                      ))}
                    </div>
                  </section>
                )}

                {/* Products Section */}
                {(activeTab === 'all' || activeTab === 'products') && searchResults.products.length > 0 && (
                  <section>
                    <div className="flex items-center space-x-3 mb-8">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 2L3 7v11a2 2 0 002 2h10a2 2 0 002-2V7l-7-5zM8 15a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">Products</h3>
                      <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                        {searchResults.products.length}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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