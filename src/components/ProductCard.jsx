import { Link } from 'react-router-dom';

export default function ProductCard({ product, showShopInfo = false, shop = null }) {
  return (
    <div className="card hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
        {product.stock <= 3 && product.stock > 0 && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
            Only {product.stock} left
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            Out of stock
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-1">{product.name}</h3>
        
        <div className="flex justify-between items-center mb-2">
          <p className="text-gray-900 font-bold">₹{product.price.toLocaleString('en-IN')}</p>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>
        
        {showShopInfo && shop && (
          <div className="mb-3 pt-2 border-t border-gray-100">
            <Link 
              to={`/shops/${shop.id}`}
              className="text-sm text-gray-600 hover:text-blue-600 flex items-center"
            >
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {shop.name}
            </Link>
          </div>
        )}
        
        <Link 
          to={`/products/${product.id}`}
          className="btn-primary w-full text-center text-sm"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}