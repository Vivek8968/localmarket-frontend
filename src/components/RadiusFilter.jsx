import { useState } from 'react';

export default function RadiusFilter({ initialRadius = 10, onChange }) {
  const [radius, setRadius] = useState(initialRadius);
  
  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    setRadius(value);
    onChange(value);
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-medium text-gray-900 mb-3">Distance Filter</h3>
      
      <div className="mb-2">
        <label htmlFor="radius-slider" className="block text-sm font-medium text-gray-700 mb-1">
          Show within {radius} km
        </label>
        <input
          id="radius-slider"
          type="range"
          min="1"
          max="50"
          step="1"
          value={radius}
          onChange={handleChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
      
      <div className="flex justify-between text-xs text-gray-500">
        <span>1 km</span>
        <span>25 km</span>
        <span>50 km</span>
      </div>
    </div>
  );
}