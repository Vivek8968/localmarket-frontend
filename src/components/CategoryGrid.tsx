'use client';

import Link from 'next/link';

const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    icon: '📱',
    description: 'Mobile phones, laptops, TVs & more',
    color: 'bg-blue-500',
    subcategories: [
      'Mobile Phones', 'Laptops', 'Televisions', 'Refrigerators', 
      'Air Conditioners', 'Washing Machines', 'Accessories'
    ]
  },
  {
    id: 'batteries',
    name: 'Batteries',
    icon: '🔋',
    description: 'Car, bike, inverter & EV batteries',
    color: 'bg-green-500',
    subcategories: [
      'Two-Wheeler Batteries', 'Car Batteries', 'Inverter Batteries', 
      'EV Batteries', 'Battery Chargers'
    ]
  }
];

const CategoryGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/category/${category.id}`}
          className="group"
        >
          <div className="card p-8 hover:scale-105 transition-all duration-300 group-hover:shadow-xl">
            <div className="flex items-center space-x-4 mb-4">
              <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center text-3xl`}>
                {category.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
                  {category.name}
                </h3>
                <p className="text-gray-600">
                  {category.description}
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {category.subcategories.slice(0, 4).map((sub) => (
                <span
                  key={sub}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  {sub}
                </span>
              ))}
              {category.subcategories.length > 4 && (
                <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full">
                  +{category.subcategories.length - 4} more
                </span>
              )}
            </div>
            
            <div className="mt-6 flex items-center text-primary-600 font-medium group-hover:text-primary-700">
              <span>Explore {category.name}</span>
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryGrid;