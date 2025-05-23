import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ShopCard from '../components/ShopCard';
import RadiusFilter from '../components/RadiusFilter';
import apiService from '../services/api';

export default function HomePage() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [radius, setRadius] = useState(20);
  
  useEffect(() => {
    const fetchShops = async () => {
      try {
        setLoading(true);
        const response = await apiService.getShops(radius);
        setShops(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching shops:', err);
        setError('Failed to load shops. Please check your internet connection and try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchShops();
  }, [radius]);
  
  const handleRadiusChange = (newRadius) => {
    setRadius(newRadius);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white">
        <div className="container-custom py-16">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">Discover Local Electronics Shops Near You</h1>
            <p className="text-xl mb-8">Find the best electronics, gadgets, and appliances from shops in your neighborhood.</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shops" className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-md font-medium">
                Browse Shops
              </Link>
              <Link to="/products" className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-md font-medium">
                Explore Products
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container-custom py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <RadiusFilter initialRadius={radius} onChange={handleRadiusChange} />
            
            <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/products?category=TV" className="text-gray-600 hover:text-blue-600 flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    TVs & Displays
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=Phone" className="text-gray-600 hover:text-blue-600 flex items-center">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                    Smartphones
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=Laptop" className="text-gray-600 hover:text-blue-600 flex items-center">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                    Laptops & Computers
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=AC" className="text-gray-600 hover:text-blue-600 flex items-center">
                    <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                    Air Conditioners
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=Refrigerator" className="text-gray-600 hover:text-blue-600 flex items-center">
                    <span className="w-2 h-2 bg-yellow-600 rounded-full mr-2"></span>
                    Refrigerators
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="text-blue-600 hover:text-blue-800 font-medium">
                    View All Categories →
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Shops Near You</h2>
              <Link to="/shops" className="text-blue-600 hover:text-blue-800">
                View All →
              </Link>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            ) : shops.length === 0 ? (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-md">
                No shops found within {radius} km. Try increasing the radius or check your location settings.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {shops.map((shop) => (
                  <ShopCard key={shop.id} shop={shop} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}