'use client';

import Link from 'next/link';

const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    icon: '📱',
    description: 'Mobiles, Laptops, Televisions & more',
    color: 'bg-gradient-to-br from-blue-500 to-blue-600',
    subcategories: [
      'Mobiles', 'Laptops', 'Televisions', 'Fridges', 'Ovens', 
      'Printers', 'Fans', 'ACs', 'Coolers', 'Accessories'
    ]
  },
  {
    id: 'batteries',
    name: 'Batteries',
    icon: '🔋',
    description: 'Two Wheeler, Four Wheeler & Inverter batteries',
    color: 'bg-gradient-to-br from-green-500 to-green-600',
    subcategories: [
      'Two Wheeler Batteries', 'Four Wheeler Batteries', 
      'Inverter Batteries', 'Lithium Batteries'
    ]
  }
];

const CategoryGridNew = () => {
  console.log('CategoryGridNew rendering with categories:', categories);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/category/${category.id}`}
          className="group"
        >
          <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group-hover:border-primary-200 group-hover:-translate-y-2">
            <div className="p-8">
              <div className="flex items-center space-x-6 mb-6">
                <div className={`w-20 h-20 ${category.color} rounded-2xl flex items-center justify-center text-4xl shadow-lg`}>
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-200 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-lg text-gray-600">
                    {category.description}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 mb-8">
                {category.subcategories.slice(0, 4).map((sub) => (
                  <span
                    key={sub}
                    className="px-4 py-2 bg-gray-50 text-gray-700 text-sm font-medium rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                  >
                    {sub}
                  </span>
                ))}
                {category.subcategories.length > 4 && (
                  <span className="px-4 py-2 bg-primary-50 text-primary-700 text-sm font-semibold rounded-xl border border-primary-200">
                    +{category.subcategories.length - 4} more
                  </span>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-primary-600 font-semibold text-lg group-hover:text-primary-700 transition-colors duration-200">
                  <span>Explore {category.name}</span>
                  <svg className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-200">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
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