'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ShopCard from '@/components/ShopCard';
import { Product, Shop } from '@/types';

// Mock product data with shops selling it
const mockProductData: { [key: string]: { product: Product; shops: Shop[] } } = {
  'p1': {
    product: {
      id: 'p1',
      name: 'iPhone 15 Pro',
      description: 'Latest iPhone with A17 Pro chip, titanium design, and advanced camera system. Features include 6.1-inch Super Retina XDR display, Action Button, and USB-C connectivity.',
      price: 134900,
      category: 'electronics',
      subcategory: 'mobile-phones',
      shopId: '1',
      inStock: true,
      brand: 'Apple',
      image: 'https://via.placeholder.com/600x600?text=iPhone+15+Pro'
    },
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
      },
      {
        id: '3',
        name: 'Mobile Palace',
        address: 'F-23, City Center Mall',
        phone: '+91 98765 43212',
        whatsapp: '+91 98765 43212',
        location: { latitude: 28.5375, longitude: 77.3930 },
        categories: ['electronics'],
        rating: 4.7,
        isOpen: false,
        image: 'https://via.placeholder.com/300x200?text=Mobile+Palace'
      },
      {
        id: '5',
        name: 'Digital Hub',
        address: 'A-45, Electronics Market',
        phone: '+91 98765 43214',
        whatsapp: '+91 98765 43214',
        location: { latitude: 28.5385, longitude: 77.3940 },
        categories: ['electronics'],
        rating: 4.2,
        isOpen: true,
        image: 'https://via.placeholder.com/300x200?text=Digital+Hub'
      }
    ]
  },
  'p4': {
    product: {
      id: 'p4',
      name: 'Exide Car Battery',
      description: '12V 65Ah maintenance-free battery with advanced technology for reliable performance. Suitable for most cars and comes with 3-year warranty.',
      price: 8500,
      category: 'batteries',
      subcategory: 'car-batteries',
      shopId: '2',
      inStock: true,
      brand: 'Exide',
      image: 'https://via.placeholder.com/600x600?text=Car+Battery'
    },
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
      },
      {
        id: '4',
        name: 'PowerMax Batteries',
        address: 'B-67, Auto Market',
        phone: '+91 98765 43213',
        whatsapp: '+91 98765 43213',
        location: { latitude: 28.5395, longitude: 77.3950 },
        categories: ['batteries'],
        rating: 4.1,
        isOpen: true,
        image: 'https://via.placeholder.com/300x200?text=PowerMax+Batteries'
      }
    ]
  }
};

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  
  const [productData, setProductData] = useState<{ product: Product; shops: Shop[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'rating' | 'distance' | 'price'>('rating');

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      try {
        // Try to get data from API first
        const { api } = await import('@/lib/api');
        const productResponse = await api.getProductById(productId);
        
        if (productResponse && productResponse.data) {
          // Transform API data
          const product = productResponse.data;
          const transformedProduct = {
            id: product.id.toString(),
            name: product.name || 'Unnamed Product',
            description: product.description || '',
            price: parseFloat(product.price) || 0,
            category: product.category || '',
            subcategory: product.subcategory || product.category,
            shopId: product.shop_id?.toString() || '',
            inStock: product.in_stock !== undefined ? product.in_stock : true,
            brand: product.brand || '',
            image: product.image_url || `https://via.placeholder.com/600x600?text=${encodeURIComponent(product.name || 'Product')}`
          };
          
          // Get shops selling this product (mock for now)
          const shops = mockProductData[productId]?.shops || [];
          
          setProductData({ product: transformedProduct, shops });
        } else {
          throw new Error('No product data received');
        }
      } catch (error) {
        console.error('Error fetching product data from API:', error);
        // Fallback to mock data
        const { getProductById, mockShops } = await import('@/lib/mockData');
        const mockProduct = getProductById(productId);
        
        if (mockProduct) {
          // Find shops that sell this product
          const shopsSellingProduct = mockShops.filter(shop => 
            shop.categories.some(category => 
              category.toLowerCase() === mockProduct.category.toLowerCase()
            )
          );
          
          setProductData({ 
            product: mockProduct, 
            shops: shopsSellingProduct.slice(0, 3) // Limit to 3 shops for demo
          });
        } else {
          setProductData(null);
        }
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductData();
    }
  }, [productId]);

  const handleWhatsAppInquiry = (shop: Shop) => {
    if (shop.whatsapp && productData) {
      const message = encodeURIComponent(
        `Hi! I'm interested in ${productData.product.name} (₹${productData.product.price.toLocaleString()}) from your shop. Is it available?`
      );
      window.open(`https://wa.me/${shop.whatsapp.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
    }
  };

  const sortedShops = productData?.shops.sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'distance':
        // Mock distance sorting - in production, calculate actual distance
        return Math.random() - 0.5;
      case 'price':
        // In production, each shop might have different prices
        return Math.random() - 0.5;
      default:
        return 0;
    }
  }) || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">📦</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
          <Link
            href="/"
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  const { product, shops } = productData;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link href="/" className="text-gray-500 hover:text-gray-700">
                  Home
                </Link>
              </li>
              <li>
                <svg className="flex-shrink-0 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li>
                <Link 
                  href={`/category/${product.category}`}
                  className="text-gray-500 hover:text-gray-700 capitalize"
                >
                  {product.category}
                </Link>
              </li>
              <li>
                <svg className="flex-shrink-0 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li>
                <span className="text-gray-900 font-medium">{product.name}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white rounded-lg overflow-hidden shadow-lg">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              
              {/* Stock Status */}
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                  product.inStock 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand */}
            {product.brand && (
              <div>
                <span className="text-sm text-gray-500 uppercase tracking-wide">{product.brand}</span>
              </div>
            )}

            {/* Product Name */}
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

            {/* Price */}
            <div className="text-4xl font-bold text-primary-600">
              ₹{product.price.toLocaleString()}
            </div>

            {/* Category */}
            <div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                {product.subcategory || product.category}
              </span>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Available at {shops.length} shop{shops.length !== 1 ? 's' : ''}</h3>
              <p className="text-gray-600">Contact any shop below to check availability and place your order.</p>
            </div>
          </div>
        </div>

        {/* Shops Selling This Product */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Shops Selling This Product ({shops.length})
            </h2>
            
            {/* Sort Options */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'rating' | 'distance' | 'price')}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="rating">Rating</option>
                <option value="distance">Distance</option>
                <option value="price">Price</option>
              </select>
            </div>
          </div>

          {/* Shops Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedShops.map((shop) => (
              <div key={shop.id} className="card">
                <ShopCard shop={shop} />
                
                {/* Product-specific actions */}
                <div className="p-4 border-t border-gray-200">
                  <button
                    onClick={() => handleWhatsAppInquiry(shop)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    <span>Inquire about {product.name}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}