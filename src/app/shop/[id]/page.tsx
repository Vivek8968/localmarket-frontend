'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import { Shop, Product } from '@/types';

export default function ShopPage() {
  const params = useParams();
  const shopId = params.id as string;
  
  const [shop, setShop] = useState<Shop | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (shopId) {
      loadShopData(shopId);
    }
  }, [shopId]);

  const loadShopData = async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const { api } = await import('@/lib/api');
      
      // Load shop details
      const shopResponse = await api.getShopById(id);
      if (shopResponse && shopResponse.data) {
        const shopData = {
          id: shopResponse.data.id.toString(),
          name: shopResponse.data.name || 'Unnamed Shop',
          address: shopResponse.data.address || 'Address not provided',
          phone: shopResponse.data.phone || shopResponse.data.whatsapp_number || '',
          whatsapp: shopResponse.data.whatsapp_number || shopResponse.data.phone || '',
          location: {
            latitude: parseFloat(shopResponse.data.latitude) || 0,
            longitude: parseFloat(shopResponse.data.longitude) || 0
          },
          categories: shopResponse.data.categories || ['general'],
          rating: parseFloat(shopResponse.data.rating) || 4.0,
          isOpen: shopResponse.data.is_open !== undefined ? shopResponse.data.is_open : true,
          image: shopResponse.data.image_url || `https://via.placeholder.com/800x400?text=${encodeURIComponent(shopResponse.data.name || 'Shop')}`
        };
        setShop(shopData);
      } else {
        setError('Shop not found');
        return;
      }

      // Load shop products
      const productsResponse = await api.getProductsByShop(id);
      if (productsResponse && productsResponse.data && Array.isArray(productsResponse.data)) {
        const transformedProducts = productsResponse.data.map((product: any) => ({
          id: product.id.toString(),
          name: product.name || 'Unnamed Product',
          description: product.description || '',
          price: parseFloat(product.price) || 0,
          category: product.category || 'general',
          subcategory: product.subcategory || product.category,
          shopId: id,
          inStock: product.in_stock !== undefined ? product.in_stock : true,
          brand: product.brand || '',
          image: product.image_url || `https://via.placeholder.com/300x300?text=${encodeURIComponent(product.name || 'Product')}`
        }));
        setProducts(transformedProducts);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Error loading shop data:', error);
      setError('Failed to load shop data');
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppClick = () => {
    if (shop?.whatsapp) {
      const message = encodeURIComponent(`Hi! I found your shop on LocalMarket. I'm interested in your products.`);
      window.open(`https://wa.me/${shop?.whatsapp?.replace(/[^0-9]/g, '') || ''}?text=${message}`, '_blank');
    }
  };

  const handleCallClick = () => {
    if (shop?.phone) {
      window.open(`tel:${shop?.phone || ''}`, '_self');
    }
  };

  const categories = ['all', ...new Set(products.map(p => p.subcategory || p.category))];
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.subcategory === selectedCategory || p.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || (!loading && !shop)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || 'Shop not found'}
          </h1>
          <p className="text-gray-600 mb-6">
            {error === 'Failed to load shop data' 
              ? 'We encountered an error while loading the shop details. Please try again.'
              : 'The shop you\'re looking for doesn\'t exist or may have been removed.'
            }
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Shop Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Shop Image */}
            <div className="lg:col-span-1">
              <div className="relative h-64 lg:h-80 rounded-lg overflow-hidden">
                {shop?.image ? (
                  <Image
                    src={shop?.image || ''}
                    alt={shop?.name || 'Shop'}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="bg-gray-200 h-full flex items-center justify-center">
                    <svg className="w-24 h-24 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Shop Info */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{shop?.name || 'Shop'}</h1>
                  <p className="text-gray-600 mb-4">📍 {shop?.address || 'Address not available'}</p>
                </div>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                  shop?.isOpen 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {shop?.isOpen ? 'Open Now' : 'Closed'}
                </span>
              </div>

              {/* Rating */}
              {shop?.rating && (
                <div className="flex items-center mb-6">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(shop?.rating || 0) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-lg font-medium text-gray-900">
                      {shop?.rating?.toFixed(1) || '0.0'}
                    </span>
                  </div>
                </div>
              )}

              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-6">
                {shop?.categories?.map((category) => (
                  <span
                    key={category}
                    className="px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full"
                  >
                    {category}
                  </span>
                ))}
              </div>

              {/* Contact Buttons */}
              <div className="flex space-x-4">
                {shop?.whatsapp && (
                  <button
                    onClick={handleWhatsAppClick}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    <span>WhatsApp</span>
                  </button>
                )}
                <button
                  onClick={handleCallClick}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>Call Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Products</h2>
          
          {/* Category Filter */}
          <div className="flex space-x-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category === 'all' ? 'All' : category.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length > 0 ? (
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
              This shop doesn&apos;t have any products in the selected category.
            </p>
          </div>
        )}
      </div>

      {/* Floating WhatsApp Button */}
      {shop?.whatsapp && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={handleWhatsAppClick}
            className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
            title="Chat on WhatsApp"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}