import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiService from '../services/api';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [shop, setShop] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        
        // Fetch product details
        const productResponse = await apiService.getProductById(id);
        setProduct(productResponse.data);
        
        // Fetch shop details
        const shopResponse = await apiService.getShopById(productResponse.data.shopId);
        setShop(shopResponse.data);
        
        // Fetch related products (same category, same shop)
        const relatedResponse = await apiService.getProducts({ 
          category: productResponse.data.category,
          shopId: productResponse.data.shopId 
        });
        
        // Filter out the current product
        const filtered = relatedResponse.data.filter(item => item.id !== parseInt(id));
        setRelatedProducts(filtered.slice(0, 4)); // Limit to 4 related products
        
        setError(null);
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError('Failed to load product details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProductDetails();
  }, [id]);
  
  const openWhatsApp = () => {
    if (!shop) return;
    const message = encodeURIComponent(`Hello, I'm interested in the product "${product.name}" priced at ₹${product.price} that I found on LocalMarket.`);
    window.open(`https://wa.me/${shop.whatsapp.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 container-custom py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
        <div className="mt-4">
          <Link to="/products" className="text-blue-600 hover:text-blue-800">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }
  
  if (!product || !shop) {
    return (
      <div className="min-h-screen bg-gray-50 container-custom py-8">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-md">
          Product not found. It may have been removed or is temporarily unavailable.
        </div>
        <div className="mt-4">
          <Link to="/products" className="text-blue-600 hover:text-blue-800">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        {/* Breadcrumbs */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="text-gray-600 hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <Link to="/products" className="ml-1 text-gray-600 hover:text-blue-600 md:ml-2">
                  Products
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <Link to={`/products?category=${product.category}`} className="ml-1 text-gray-600 hover:text-blue-600 md:ml-2">
                  {product.category}
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className="ml-1 text-gray-500 md:ml-2 font-medium truncate">
                  {product.name}
                </span>
              </div>
            </li>
          </ol>
        </nav>
        
        {/* Product Details */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:w-1/2">
              <div className="h-96 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            
            {/* Product Info */}
            <div className="md:w-1/2 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
                  <div className="flex items-center mb-4">
                    <span className="text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>
                </div>
                <Link 
                  to={`/shops/${shop.id}`}
                  className="text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  View Shop
                </Link>
              </div>
              
              <div className="mt-4 mb-6">
                <p className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</p>
                
                <div className="mt-4">
                  <div className="flex items-center">
                    <svg className={`h-5 w-5 ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {product.stock > 0 ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      )}
                    </svg>
                    <span className={`ml-2 ${product.stock > 0 ? 'text-green-700' : 'text-red-700'}`}>
                      {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Shop Information</h3>
                <div className="flex items-start mb-4">
                  <svg className="h-5 w-5 mr-2 text-gray-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900">{shop.name}</p>
                    <p className="text-gray-600 text-sm">{shop.address}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-3">
                <button
                  onClick={openWhatsApp}
                  className="flex-1 flex justify-center items-center bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-md transition-colors"
                  disabled={product.stock <= 0}
                >
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Inquire on WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="card hover:shadow-lg transition-shadow duration-300">
                  <div className="relative h-48 w-full overflow-hidden">
                    <img 
                      src={relatedProduct.image} 
                      alt={relatedProduct.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">{relatedProduct.name}</h3>
                    
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-gray-900 font-bold">₹{relatedProduct.price.toLocaleString('en-IN')}</p>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {relatedProduct.category}
                      </span>
                    </div>
                    
                    <Link 
                      to={`/products/${relatedProduct.id}`}
                      className="btn-primary w-full text-center text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}