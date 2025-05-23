import { useState, useEffect } from 'react';
import ShopCard from '../components/ShopCard';
import RadiusFilter from '../components/RadiusFilter';
import apiService from '../services/api';

export default function ShopsPage() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [radius, setRadius] = useState(20);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredShops, setFilteredShops] = useState([]);
  
  useEffect(() => {
    const fetchShops = async () => {
      try {
        setLoading(true);
        const response = await apiService.getShops(radius);
        setShops(response.data);
        setFilteredShops(response.data);
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
  
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredShops(shops);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = shops.filter(shop => 
        shop.name.toLowerCase().includes(query) || 
        shop.address.toLowerCase().includes(query)
      );
      setFilteredShops(filtered);
    }
  }, [searchQuery, shops]);
  
  const handleRadiusChange = (newRadius) => {
    setRadius(newRadius);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">All Shops</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <RadiusFilter initialRadius={radius} onChange={handleRadiusChange} />
            
            <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Search Shops</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name or location..."
                  className="w-full py-2 pl-3 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Shop Information</h3>
              <p className="text-sm text-gray-600 mb-2">
                Find local electronics shops near you. Browse through our curated list of shops offering various electronic products.
              </p>
              <p className="text-sm text-gray-600">
                Each shop card shows:
              </p>
              <ul className="text-sm text-gray-600 list-disc pl-5 mt-1">
                <li>Shop name and banner</li>
                <li>Distance from your location</li>
                <li>Address details</li>
                <li>WhatsApp contact button</li>
              </ul>
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
            ) : filteredShops.length === 0 ? (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-md">
                {searchQuery.trim() !== '' 
                  ? `No shops found matching "${searchQuery}". Try a different search term.` 
                  : `No shops found within ${radius} km. Try increasing the radius or check your location settings.`
                }
              </div>
            ) : (
              <>
                <p className="text-gray-600 mb-4">
                  Showing {filteredShops.length} {filteredShops.length === 1 ? 'shop' : 'shops'}
                  {searchQuery.trim() !== '' && ` matching "${searchQuery}"`}
                  {` within ${radius} km`}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredShops.map((shop) => (
                    <ShopCard key={shop.id} shop={shop} />
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