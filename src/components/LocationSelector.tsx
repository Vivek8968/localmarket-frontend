'use client';

import { useState } from 'react';
import { Location } from '@/types';

interface LocationSelectorProps {
  onLocationChange: (location: Location) => void;
}

const LocationSelector = ({ onLocationChange }: LocationSelectorProps) => {
  const [isDetecting, setIsDetecting] = useState(false);

  const detectLocation = () => {
    setIsDetecting(true);
    
    if (!navigator.geolocation) {
      setIsDetecting(false);
      alert('Geolocation is not supported by this browser.');
      return;
    }

    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          onLocationChange(location);
          setIsDetecting(false);
        },
        (error) => {
          // Handle geolocation error gracefully without logging the error object
          setIsDetecting(false);
          alert('Unable to detect your location. Please enable location services.');
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        }
      );
    } catch (error) {
      // Handle any synchronous errors
      setIsDetecting(false);
      alert('Unable to detect your location. Please enable location services.');
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
      <button
        onClick={detectLocation}
        disabled={isDetecting}
        className="bg-white text-primary-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50"
      >
        {isDetecting ? (
          <>
            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Detecting...</span>
          </>
        ) : (
          <>
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span>Use My Location</span>
          </>
        )}
      </button>
      
      <div className="text-primary-100 text-sm">
        or browse shops in your area
      </div>
    </div>
  );
};

export default LocationSelector;