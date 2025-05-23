import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import RadiusFilter from '../components/RadiusFilter';
import apiService from '../services/api';

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialSearch = searchParams.get('q') || '';
  
  const [products, setProducts] = useState([]);
  const [shops, setShops] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [radius, setRadius] = useState(20);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch products
        const productsResponse = await apiService.getProducts({
          search: searchQuery,
          category: selectedCategory,
          radius
        });
        setProducts(productsResponse.data);
        
        // Fetch shops for product info
        const shopsResponse = await apiService.getShops(radius);
        setShops(shopsResponse.data);
        
        // Fetch categories
        const categoriesResponse = await apiService.getCategories();
        setCategories(categoriesResponse.data);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [radius, selectedCategory, searchQuery]);
  
  const handleRadiusChange = (newRadius) => {
    setRadius(newRadius);
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    // Search is already triggered by the useEffect
  };
  
  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    setPriceRange(prev => ({ ...prev, [name]: value }));
  };
  
  const applyPriceFilter = () => {
    // Price filtering is done client-side for simplicity
  };
  
  const filteredProducts = products.filter(product => {
    // Apply price filter if set
    if (priceRange.min && product.price < parseInt(priceRange.min)) {
      return false;
    }
    if (priceRange.max && product.price > parseInt(priceRange.max)) {
      return false;
    }
    return true;
  });
  
  // Get shop info for each product
  const productsWithShopInfo = filteredProducts.map(product => {
    const shop = shops.find(shop => shop.id === product.shopId);
    return { ...product, shop };
  });
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">All Products</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Search Products</h3>
              <form onSubmit={handleSearch}>
                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full py-2 pl-3 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-blue-600"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
            
            <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Categories</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    id="category-all"
                    type="radio"
                    name="category"
                    checked={selectedCategory === ''}
                    onChange={() => setSelectedCategory('')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor="category-all" className="ml-2 text-gray-700">
                    All Categories
                  </label>
                </div>
                
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <input
                      id={`category-${category.id}`}
                      type="radio"
                      name="category"
                      checked={selectedCategory === category.name}
                      onChange={() => setSelectedCategory(category.name)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor={`category-${category.id}`} className="ml-2 text-gray-700">
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Price Range</h3>
              <div className="space-y-3">
                <div>
                  <label htmlFor="min-price" className="block text-sm font-medium text-gray-700 mb-1">
                    Min Price (₹)
                  </label>
                  <input
                    type="number"
                    id="min-price"
                    name="min"
                    placeholder="Min"
                    className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={priceRange.min}
                    onChange={handlePriceRangeChange}
                  />
                </div>
                <div>
                  <label htmlFor="max-price" className="block text-sm font-medium text-gray-700 mb-1">
                    Max Price (₹)
                  </label>
                  <input
                    type="number"
                    id="max-price"
                    name="max"
                    placeholder="Max"
                    className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={priceRange.max}
                    onChange={handlePriceRangeChange}
                  />
                </div>
                <button
                  type="button"
                  onClick={applyPriceFilter}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Apply Filter
                </button>
              </div>
            </div>
            
            <div className="mt-6">
              <RadiusFilter initialRadius={radius} onChange={handleRadiusChange} />
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            ) : productsWithShopInfo.length === 0 ? (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-md">
                No products found matching your criteria. Try adjusting your filters.
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <p className="text-gray-600">
                    Showing {productsWithShopInfo.length} {productsWithShopInfo.length === 1 ? 'product' : 'products'}
                    {selectedCategory && ` in ${selectedCategory}`}
                    {searchQuery && ` matching "${searchQuery}"`}
                  </p>
                  <div className="flex items-center">
                    <span className="text-gray-600 mr-2">Sort by:</span>
                    <select className="py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="relevance">Relevance</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="distance">Distance</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {productsWithShopInfo.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      showShopInfo={true}
                      shop={product.shop}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}