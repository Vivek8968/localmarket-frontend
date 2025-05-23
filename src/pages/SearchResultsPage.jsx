import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ShopCard from '../components/ShopCard';
import apiService from '../services/api';

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [products, setProducts] = useState([]);
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query.trim()) return;
      
      try {
        setLoading(true);
        
        // Fetch products matching the search query
        const productsResponse = await apiService.getProducts({ search: query });
        setProducts(productsResponse.data);
        
        // Fetch shops matching the search query
        const shopsResponse = await apiService.getShops();
        const filteredShops = shopsResponse.data.filter(shop => 
          shop.name.toLowerCase().includes(query.toLowerCase()) || 
          shop.address.toLowerCase().includes(query.toLowerCase())
        );
        setShops(filteredShops);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching search results:', err);
        setError('Failed to load search results. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSearchResults();
  }, [query]);
  
  const totalResults = products.length + shops.length;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Results</h1>
        <p className="text-gray-600 mb-6">
          {loading ? 'Searching...' : `Found ${totalResults} results for "${query}"`}
        </p>
        
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'all'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('all')}
            >
              All Results ({totalResults})
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'products'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('products')}
            >
              Products ({products.length})
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'shops'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('shops')}
            >
              Shops ({shops.length})
            </button>
          </nav>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        ) : totalResults === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No results found</h3>
            <p className="mt-1 text-gray-500">
              We couldn't find anything matching "{query}". Try using different or more general keywords.
            </p>
            <div className="mt-6">
              <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
                Return to Home
              </Link>
            </div>
          </div>
        ) : (
          <div>
            {/* Products Section */}
            {(activeTab === 'all' || activeTab === 'products') && products.length > 0 && (
              <div className="mb-12">
                {activeTab === 'all' && (
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Products</h2>
                    {products.length > 4 && (
                      <button
                        onClick={() => setActiveTab('products')}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        View All Products →
                      </button>
                    )}
                  </div>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {(activeTab === 'all' ? products.slice(0, 4) : products).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}
            
            {/* Shops Section */}
            {(activeTab === 'all' || activeTab === 'shops') && shops.length > 0 && (
              <div>
                {activeTab === 'all' && (
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Shops</h2>
                    {shops.length > 3 && (
                      <button
                        onClick={() => setActiveTab('shops')}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        View All Shops →
                      </button>
                    )}
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(activeTab === 'all' ? shops.slice(0, 3) : shops).map((shop) => (
                    <ShopCard key={shop.id} shop={shop} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}