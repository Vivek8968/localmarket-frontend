'use client';

import { useState, useEffect } from 'react';
import ShopCard from '@/components/ShopCard';
import LocationSelector from '@/components/LocationSelector';
import CategoryGrid from '@/components/CategoryGrid';
import { Shop, Location } from '@/types';

// Mock data for demonstration
const mockShops: Shop[] = [
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
    id: '3',
    name: 'Mobile Palace',
    address: 'F-23, City Center Mall',
    phone: '+91 98765 43212',
    whatsapp: '+91 98765 43212',
    location: { latitude: 28.5345, longitude: 77.3900 },
    categories: ['electronics'],
    rating: 4.7,
    isOpen: false,
    image: 'https://via.placeholder.com/300x200?text=Mobile+Palace'
  },
  {
    id: '4',
    name: 'PowerMax Batteries',
    address: 'B-67, Auto Market',
    phone: '+91 98765 43213',
    whatsapp: '+91 98765 43213',
    location: { latitude: 28.5375, longitude: 77.3930 },
    categories: ['batteries'],
    rating: 4.1,
    isOpen: true,
    image: 'https://via.placeholder.com/300x200?text=PowerMax+Batteries'
  }
];

export default function HomePage() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
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
          console.error('Error getting location:', error);
          // Use default location (Gurgaon)
          const defaultLocation = { latitude: 28.5355, longitude: 77.3910 };
          setLocation(defaultLocation);
          loadShops(defaultLocation);
        }
      );
    } else {
      // Use default location
      const defaultLocation = { latitude: 28.5355, longitude: 77.3910 };
      setLocation(defaultLocation);
      loadShops(defaultLocation);
    }
  }, []);

  const loadShops = async (userLocation: Location) => {
    setLoading(true);
    try {
      // Try to load from backend API
      const { api } = await import('@/lib/api');
      const response = await api.getShops(userLocation);
      
      if (response.data && Array.isArray(response.data)) {
        // Transform backend data to frontend format
        const transformedShops = response.data.map((shop: any) => ({
          id: shop.id.toString(),
          name: shop.name,
          address: shop.address || 'Address not provided',
          phone: shop.whatsapp_number || '',
          whatsapp: shop.whatsapp_number || '',
          location: { 
            latitude: shop.latitude || 0, 
            longitude: shop.longitude || 0 
          },
          categories: ['general'], // TODO: Add categories from backend
          rating: 4.0, // TODO: Add ratings from backend
          isOpen: true, // TODO: Add business hours from backend
          image: shop.image_url || 'https://via.placeholder.com/300x200?text=' + encodeURIComponent(shop.name)
        }));
        setShops(transformedShops);
      } else {
        // Fallback to mock data if backend fails
        setShops(mockShops);
      }
    } catch (error) {
      console.error('Error loading shops from backend, using mock data:', error);
      // Fallback to mock data
      setShops(mockShops);
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
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Find Local Shops Near You
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Discover electronics, batteries, and more from trusted local businesses
            </p>
            <LocationSelector onLocationChange={handleLocationChange} />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Shop by Category
          </h2>
          <CategoryGrid />
        </div>
      </section>

      {/* Nearby Shops Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Shops Near You
            </h2>
            {location && (
              <p className="text-gray-600">
                📍 Showing results for your location
              </p>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {shops.map((shop) => (
                <ShopCard key={shop.id} shop={shop} />
              ))}
            </div>
          )}

          {!loading && shops.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🏪</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No shops found in your area
              </h3>
              <p className="text-gray-600">
                Try adjusting your location or check back later
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}