import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import apiService from '../services/api';

export default function ShopDetailPage() {
  const { id } = useParams();
  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    const fetchShopAndProducts = async () => {
      try {
        setLoading(true);
        
        // Fetch shop details
        const shopResponse = await apiService.getShopById(id);
        setShop(shopResponse.data);
        
        // Fetch products for this shop
        const productsResponse = await apiService.getProducts({ shopId: id });
        setProducts(productsResponse.data);
        
        // Extract unique categories from products
        const uniqueCategories = [...new Set(productsResponse.data.map(product => product.category))];
        setCategories(uniqueCategories);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching shop details:', err);
        setError('Failed to load shop details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchShopAndProducts();
  }, [id]);
  
  const openWhatsApp = () => {
    if (!shop) return;
    const message = encodeURIComponent(`Hello, I found your shop on LocalMarket and I'm interested in your products.`);
    window.open(`https://wa.me/${shop.whatsapp.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };
  
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);
  
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
          <Link to="/shops" className="text-blue-600 hover:text-blue-800">
            ← Back to Shops
          </Link>
        </div>
      </div>
    );
  }
  
  if (!shop) {
    return (
      <div className="min-h-screen bg-gray-50 container-custom py-8">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-md">
          Shop not found. It may have been removed or is temporarily unavailable.
        </div>
        <div className="mt-4">
          <Link to="/shops" className="text-blue-600 hover:text-blue-800">
            ← Back to Shops
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Shop Banner */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <img 
          src={shop.banner} 
          alt={shop.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container-custom">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{shop.name}</h1>
            <p className="flex items-center text-white/90 mb-4">
              <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {shop.address}
            </p>
            <button 
              onClick={openWhatsApp}
              className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Contact on WhatsApp
            </button>
          </div>
        </div>
      </div>
      
      {/* Products Section */}
      <div className="container-custom py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Products</h2>
          <Link to="/shops" className="text-blue-600 hover:text-blue-800">
            ← Back to Shops
          </Link>
        </div>
        
        {/* Category Tabs */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex space-x-2 min-w-max">
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
              onClick={() => setActiveCategory('all')}
            >
              All Products
            </button>
            
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-md">
            No products found in this category. Try selecting a different category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}