'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import ShopCard from '@/components/ShopCard';
import { Product, Shop } from '@/types';

const categoryInfo: { [key: string]: { name: string; icon: string; description: string } } = {
  electronics: {
    name: 'Electronics',
    icon: '📱',
    description: 'Find the latest smartphones, laptops, TVs, and electronic appliances from local stores'
  },
  batteries: {
    name: 'Batteries',
    icon: '🔋',
    description: 'Car batteries, bike batteries, inverter batteries, and more from trusted dealers'
  }
};

const subcategories: { [key: string]: string[] } = {
  electronics: [
    'mobiles', 'laptops', 'televisions', 'fridges', 'ovens', 
    'printers', 'fans', 'acs', 'coolers', 'accessories'
  ],
  batteries: [
    'two-wheeler-batteries', 'four-wheeler-batteries', 
    'inverter-batteries', 'lithium-batteries'
  ]
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
    try {
      const { api } = await import('@/lib/api');
      
      // Get user location for nearby results
      let userLocation = { latitude: 28.5355, longitude: 77.3910 };
      if (navigator.geolocation) {
        try {
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              timeout: 5000,
              maximumAge: 300000
            });
          });
          userLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
        } catch (geoError) {
          console.log('Could not get location, using default');
        }
      }

      // Load products by category
      const productsResponse = await api.getProductsByCategory(cat);
      if (productsResponse && productsResponse.data && Array.isArray(productsResponse.data)) {
        const transformedProducts = productsResponse.data.map((product: any) => ({
          id: product.id.toString(),
          name: product.name || 'Unnamed Product',
          description: product.description || '',
          price: parseFloat(product.price) || 0,
          category: product.category || cat,
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
            categories: product.shop.categories || [cat],
            rating: parseFloat(product.shop.rating) || 4.0,
            isOpen: product.shop.is_open !== undefined ? product.shop.is_open : true
          } : undefined
        }));
        setProducts(transformedProducts);
      } else {
        setProducts([]);
      }

      // Load shops by category
      const shopsResponse = await api.getShops(userLocation);
      if (shopsResponse && shopsResponse.data && Array.isArray(shopsResponse.data)) {
        const categoryShops = shopsResponse.data
          .filter((shop: any) => shop.categories && shop.categories.includes(cat))
          .map((shop: any) => ({
            id: shop.id.toString(),
            name: shop.name || 'Unnamed Shop',
            address: shop.address || 'Address not provided',
            phone: shop.phone || shop.whatsapp_number || '',
            whatsapp: shop.whatsapp_number || shop.phone || '',
            location: {
              latitude: parseFloat(shop.latitude) || userLocation.latitude,
              longitude: parseFloat(shop.longitude) || userLocation.longitude
            },
            categories: shop.categories || [cat],
            rating: parseFloat(shop.rating) || 4.0,
            isOpen: shop.is_open !== undefined ? shop.is_open : true,
            image: shop.image_url || `https://via.placeholder.com/300x200?text=${encodeURIComponent(shop.name || 'Shop')}`,
            distance: shop.distance || null
          }));
        setShops(categoryShops);
      } else {
        setShops([]);
      }
    } catch (error) {
      console.error('Error loading category data:', error);
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