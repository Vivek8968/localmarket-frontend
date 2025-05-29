'use client';

import Link from 'next/link';
import LazyImage from './LazyImage';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const handleWhatsAppInquiry = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.shop?.whatsapp) {
      const message = encodeURIComponent(
        `Hi! I'm interested in ${product.name} (₹${product.price.toLocaleString()}) from your shop. Is it available?`
      );
      window.open(`https://wa.me/${product.shop.whatsapp.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
    }
  };

  return (
    <Link href={`/product/${product.id}`} className="block group">
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group-hover:border-primary-200">
      {/* Product Image */}
      <div className="relative h-52 bg-gradient-to-br from-gray-100 to-gray-200">
        {product.image ? (
          <LazyImage
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center">
              <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              <p className="text-sm font-medium">Product Image</p>
            </div>
          </div>
        )}
        
        {/* Stock Status */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-sm ${
            product.inStock 
              ? 'bg-green-500/90 text-white' 
              : 'bg-red-500/90 text-white'
          }`}>
            {product.inStock ? '● In Stock' : '● Out of Stock'}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        {/* Brand */}
        {product.brand && (
          <p className="text-sm text-primary-600 font-semibold mb-2">{product.brand}</p>
        )}
        
        {/* Product Name */}
        <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors duration-200">
          {product.name}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Price */}
        <div className="mb-4">
          <span className="text-3xl font-bold text-primary-600">
            ₹{product.price.toLocaleString()}
          </span>
        </div>

        {/* Category and Shop Info */}
        <div className="flex items-center justify-between mb-6">
          <span className="px-3 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full border border-primary-100">
            {product.subcategory || product.category}
          </span>
          {product.shop && (
            <span className="text-xs text-gray-500 line-clamp-1">
              at {product.shop.name}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleWhatsAppInquiry}
            disabled={!product.inStock}
            className={`w-full font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-sm hover:shadow-md ${
              product.inStock
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            <span>{product.inStock ? 'Inquire on WhatsApp' : 'Out of Stock'}</span>
          </button>
          
          <div className="text-center">
            <span className="text-xs text-gray-500">Click card for more details</span>
          </div>
        </div>
      </div>
      </div>
    </Link>
  );
};

export default ProductCard;