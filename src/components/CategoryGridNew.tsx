'use client';

import Link from 'next/link';

const categories = [
  {
    id: 'mobiles',
    name: 'Mobiles',
    icon: '📱',
    description: 'Smartphones, Feature phones & Mobile accessories',
    color: 'bg-gradient-to-br from-blue-500 to-blue-600',
    subcategories: ['Smartphones', 'Feature Phones', 'Mobile Cases', 'Chargers']
  },
  {
    id: 'laptops',
    name: 'Laptops',
    icon: '💻',
    description: 'Gaming, Business & Student laptops',
    color: 'bg-gradient-to-br from-purple-500 to-purple-600',
    subcategories: ['Gaming Laptops', 'Business Laptops', 'Ultrabooks', 'Accessories']
  },
  {
    id: 'tvs',
    name: 'TVs',
    icon: '📺',
    description: 'Smart TVs, LED & OLED displays',
    color: 'bg-gradient-to-br from-red-500 to-red-600',
    subcategories: ['Smart TVs', 'LED TVs', 'OLED TVs', 'TV Accessories']
  },
  {
    id: 'fridges',
    name: 'Fridges',
    icon: '🧊',
    description: 'Single door, Double door & Side-by-side',
    color: 'bg-gradient-to-br from-cyan-500 to-cyan-600',
    subcategories: ['Single Door', 'Double Door', 'Side-by-Side', 'Mini Fridges']
  },
  {
    id: 'acs',
    name: 'ACs',
    icon: '❄️',
    description: 'Split, Window & Portable air conditioners',
    color: 'bg-gradient-to-br from-teal-500 to-teal-600',
    subcategories: ['Split ACs', 'Window ACs', 'Portable ACs', 'AC Accessories']
  },
  {
    id: 'ovens',
    name: 'Ovens',
    icon: '🔥',
    description: 'Microwave, OTG & Convection ovens',
    color: 'bg-gradient-to-br from-orange-500 to-orange-600',
    subcategories: ['Microwave Ovens', 'OTG Ovens', 'Convection Ovens', 'Oven Accessories']
  },
  {
    id: 'coolers',
    name: 'Coolers',
    icon: '🌀',
    description: 'Desert, Personal & Tower air coolers',
    color: 'bg-gradient-to-br from-green-500 to-green-600',
    subcategories: ['Desert Coolers', 'Personal Coolers', 'Tower Coolers', 'Cooler Parts']
  },
  {
    id: 'printers',
    name: 'Printers',
    icon: '🖨️',
    description: 'Inkjet, Laser & All-in-one printers',
    color: 'bg-gradient-to-br from-gray-500 to-gray-600',
    subcategories: ['Inkjet Printers', 'Laser Printers', 'All-in-One', 'Printer Supplies']
  },
  {
    id: 'fans',
    name: 'Fans',
    icon: '🌪️',
    description: 'Ceiling, Table & Exhaust fans',
    color: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
    subcategories: ['Ceiling Fans', 'Table Fans', 'Exhaust Fans', 'Fan Accessories']
  },
  {
    id: 'accessories',
    name: 'Accessories',
    icon: '🔌',
    description: 'Cables, Chargers & Electronic accessories',
    color: 'bg-gradient-to-br from-pink-500 to-pink-600',
    subcategories: ['Cables', 'Chargers', 'Power Banks', 'Adapters']
  }
];

const CategoryGridNew = () => {
  console.log('CategoryGridNew rendering with categories:', categories);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/category/${category.id}`}
          className="group"
        >
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group-hover:border-primary-200 group-hover:-translate-y-1">
            <div className="p-6">
              <div className="text-center mb-4">
                <div className={`w-16 h-16 ${category.color} rounded-xl flex items-center justify-center text-2xl shadow-md mx-auto mb-3`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-200 mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {category.description}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {category.subcategories.slice(0, 2).map((sub) => (
                  <span
                    key={sub}
                    className="px-2 py-1 bg-gray-50 text-gray-700 text-xs font-medium rounded-lg border border-gray-200"
                  >
                    {sub}
                  </span>
                ))}
                {category.subcategories.length > 2 && (
                  <span className="px-2 py-1 bg-primary-50 text-primary-700 text-xs font-semibold rounded-lg border border-primary-200">
                    +{category.subcategories.length - 2}
                  </span>
                )}
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center text-primary-600 font-semibold text-sm group-hover:text-primary-700 transition-colors duration-200">
                  <span>Explore</span>
                  <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryGridNew;