'use client';

import { useState, useEffect } from 'react';
import ShopCard from '@/components/ShopCard';
import LocationSelector from '@/components/LocationSelector';
import CategoryGridNew from '@/components/CategoryGridNew';
import { Shop, Location } from '@/types';

export default function HomePage() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    requestLocationAndLoadShops();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const requestLocationAndLoadShops = () => {
    setLocationError(null);
    
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser');
      const defaultLocation = { latitude: 28.5355, longitude: 77.3910 };
      setLocation(defaultLocation);
      loadShops(defaultLocation);
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        setLocation(userLocation);
        loadShops(userLocation);
      },
      (error) => {
        console.error('Geolocation error:', error);
        let errorMessage = 'Unable to get your location';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please enable location services.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
        }
        
        setLocationError(errorMessage);
        const defaultLocation = { latitude: 28.5355, longitude: 77.3910 };
        setLocation(defaultLocation);
        loadShops(defaultLocation);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };



  const loadShops = async (userLocation: Location) => {
    setLoading(true);
    try {
      const { api } = await import('@/lib/api');
      const response = await api.getShops(userLocation);
      
      if (response && response.data && Array.isArray(response.data)) {
        // Transform backend data to frontend format
        const transformedShops = response.data.map((shop: any) => ({
          id: shop.id.toString(),
          name: shop.name || 'Unnamed Shop',
          address: shop.address || 'Address not provided',
          phone: shop.phone || shop.whatsapp_number || '',
          whatsapp: shop.whatsapp_number || shop.phone || '',
          location: { 
            latitude: parseFloat(shop.latitude) || userLocation.latitude, 
            longitude: parseFloat(shop.longitude) || userLocation.longitude
          },
          categories: shop.categories || ['general'],
          rating: parseFloat(shop.rating) || 4.0,
          isOpen: shop.is_open !== undefined ? shop.is_open : true,
          image: shop.image_url || `https://via.placeholder.com/300x200?text=${encodeURIComponent(shop.name || 'Shop')}`,
          distance: shop.distance || null
        }));
        
        // Sort by distance if available
        transformedShops.sort((a, b) => {
          if (a.distance && b.distance) return a.distance - b.distance;
          return 0;
        });
        
        setShops(transformedShops);
      } else {
        console.log('No shops data received from backend');
        setShops([]);
      }
    } catch (error) {
      console.error('Error loading shops from backend:', error);
      setShops([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationChange = (newLocation: Location) => {
    setLocation(newLocation);
    loadShops(newLocation);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Find Local Shops
              <span className="block text-primary-200">Near You</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-primary-100 max-w-3xl mx-auto leading-relaxed">
              Discover electronics, batteries, and more from trusted local businesses. 
              Connect directly with shop owners via WhatsApp.
            </p>
            <LocationSelector onLocationChange={handleLocationChange} />
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse through our wide range of electronics and battery products from local stores
            </p>
          </div>
          <CategoryGridNew />
        </div>
      </section>

      {/* Nearby Shops Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                Shops Near You
              </h2>
              <p className="text-xl text-gray-600">
                Discover trusted local businesses in your area
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col space-y-2">
              {location && (
                <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-gray-700 font-medium">
                    📍 Location detected
                  </p>
                </div>
              )}
              {locationError && (
                <div className="flex items-center space-x-2 bg-orange-50 px-4 py-2 rounded-full border border-orange-200">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <p className="text-orange-700 text-sm font-medium">
                    {locationError}
                  </p>
                  <button
                    onClick={requestLocationAndLoadShops}
                    className="text-orange-600 hover:text-orange-800 text-sm underline ml-2"
                  >
                    Retry
                  </button>
                </div>
              )}
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse bg-white rounded-2xl p-6 shadow-sm">
                  <div className="bg-gray-200 h-48 rounded-xl mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded-lg mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded-lg mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded-lg w-3/4 mb-4"></div>
                  <div className="flex space-x-2">
                    <div className="h-10 bg-gray-200 rounded-lg flex-1"></div>
                    <div className="h-10 bg-gray-200 rounded-lg flex-1"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {shops.map((shop) => (
                <ShopCard key={shop.id} shop={shop} />
              ))}
            </div>
          )}

          {!loading && shops.length === 0 && (
            <div className="text-center py-20">
              <div className="w-32 h-32 mx-auto mb-8 bg-gray-100 rounded-full flex items-center justify-center">
                <div className="text-gray-400 text-6xl">🏪</div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                No shops found in your area
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                We&apos;re working to add more local businesses. Try adjusting your location or check back later.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors duration-200"
              >
                Refresh
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}