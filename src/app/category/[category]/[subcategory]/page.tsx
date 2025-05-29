'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';

// Mock data - same as category page but filtered by subcategory
const mockProducts: { [key: string]: { [key: string]: Product[] } } = {
  electronics: {
    'mobiles': [
      {
        id: 'p1',
        name: 'iPhone 15 Pro',
        description: 'Latest iPhone with A17 Pro chip',
        price: 134900,
        category: 'electronics',
        subcategory: 'mobiles',
        shopId: '1',
        inStock: true,
        brand: 'Apple',
        image: 'https://via.placeholder.com/300x300?text=iPhone+15+Pro',
        shop: {
          id: '1',
          name: 'TechWorld Electronics',
          address: 'Shop 12, Main Market, Sector 15',
          phone: '+91 98765 43210',
          whatsapp: '+91 98765 43210',
          location: { latitude: 28.5355, longitude: 77.3910 },
          categories: ['electronics'],
          rating: 4.5,
          isOpen: true
        }
      },
      {
        id: 'p2',
        name: 'Samsung Galaxy S24',
        description: 'Flagship Android smartphone',
        price: 79999,
        category: 'electronics',
        subcategory: 'mobiles',
        shopId: '1',
        inStock: true,
        brand: 'Samsung',
        image: 'https://via.placeholder.com/300x300?text=Galaxy+S24',
        shop: {
          id: '1',
          name: 'TechWorld Electronics',
          address: 'Shop 12, Main Market, Sector 15',
          phone: '+91 98765 43210',
          whatsapp: '+91 98765 43210',
          location: { latitude: 28.5355, longitude: 77.3910 },
          categories: ['electronics'],
          rating: 4.5,
          isOpen: true
        }
      }
    ],
    'laptops': [
      {
        id: 'p3',
        name: 'MacBook Air M3',
        description: '13-inch laptop with M3 chip',
        price: 114900,
        category: 'electronics',
        subcategory: 'laptops',
        shopId: '1',
        inStock: false,
        brand: 'Apple',
        image: 'https://via.placeholder.com/300x300?text=MacBook+Air',
        shop: {
          id: '1',
          name: 'TechWorld Electronics',
          address: 'Shop 12, Main Market, Sector 15',
          phone: '+91 98765 43210',
          whatsapp: '+91 98765 43210',
          location: { latitude: 28.5355, longitude: 77.3910 },
          categories: ['electronics'],
          rating: 4.5,
          isOpen: true
        }
      },
      {
        id: 'p6',
        name: 'Dell XPS 13',
        description: 'Premium ultrabook with Intel Core i7',
        price: 89999,
        category: 'electronics',
        subcategory: 'laptops',
        shopId: '1',
        inStock: true,
        brand: 'Dell',
        image: 'https://via.placeholder.com/300x300?text=Dell+XPS+13',
        shop: {
          id: '1',
          name: 'TechWorld Electronics',
          address: 'Shop 12, Main Market, Sector 15',
          phone: '+91 98765 43210',
          whatsapp: '+91 98765 43210',
          location: { latitude: 28.5355, longitude: 77.3910 },
          categories: ['electronics'],
          rating: 4.5,
          isOpen: true
        }
      }
    ],
    'televisions': [
      {
        id: 'p7',
        name: 'Samsung 55" 4K Smart TV',
        description: 'Crystal UHD 4K Smart TV with Tizen OS',
        price: 54999,
        category: 'electronics',
        subcategory: 'televisions',
        shopId: '1',
        inStock: true,
        brand: 'Samsung',
        image: 'https://via.placeholder.com/300x300?text=Samsung+TV',
        shop: {
          id: '1',
          name: 'TechWorld Electronics',
          address: 'Shop 12, Main Market, Sector 15',
          phone: '+91 98765 43210',
          whatsapp: '+91 98765 43210',
          location: { latitude: 28.5355, longitude: 77.3910 },
          categories: ['electronics'],
          rating: 4.5,
          isOpen: true
        }
      }
    ]
  },
  batteries: {
    'four-wheeler-batteries': [
      {
        id: 'p4',
        name: 'Exide Car Battery',
        description: '12V 65Ah maintenance-free battery',
        price: 8500,
        category: 'batteries',
        subcategory: 'four-wheeler-batteries',
        shopId: '2',
        inStock: true,
        brand: 'Exide',
        image: 'https://via.placeholder.com/300x300?text=Car+Battery',
        shop: {
          id: '2',
          name: 'Battery Hub',
          address: 'Plot 45, Industrial Area, Phase 2',
          phone: '+91 98765 43211',
          whatsapp: '+91 98765 43211',
          location: { latitude: 28.5365, longitude: 77.3920 },
          categories: ['batteries'],
          rating: 4.3,
          isOpen: true
        }
      }
    ],
    'two-wheeler-batteries': [
      {
        id: 'p5',
        name: 'Amaron Bike Battery',
        description: '12V 9Ah sealed battery',
        price: 2800,
        category: 'batteries',
        subcategory: 'two-wheeler-batteries',
        shopId: '2',
        inStock: true,
        brand: 'Amaron',
        image: 'https://via.placeholder.com/300x300?text=Bike+Battery',
        shop: {
          id: '2',
          name: 'Battery Hub',
          address: 'Plot 45, Industrial Area, Phase 2',
          phone: '+91 98765 43211',
          whatsapp: '+91 98765 43211',
          location: { latitude: 28.5365, longitude: 77.3920 },
          categories: ['batteries'],
          rating: 4.3,
          isOpen: true
        }
      }
    ],
    'inverter-batteries': [
      {
        id: 'p8',
        name: 'Luminous Inverter Battery',
        description: '150Ah tubular battery for home backup',
        price: 12500,
        category: 'batteries',
        subcategory: 'inverter-batteries',
        shopId: '2',
        inStock: true,
        brand: 'Luminous',
        image: 'https://via.placeholder.com/300x300?text=Inverter+Battery',
        shop: {
          id: '2',
          name: 'Battery Hub',
          address: 'Plot 45, Industrial Area, Phase 2',
          phone: '+91 98765 43211',
          whatsapp: '+91 98765 43211',
          location: { latitude: 28.5365, longitude: 77.3920 },
          categories: ['batteries'],
          rating: 4.3,
          isOpen: true
        }
      }
    ],
    'lithium-batteries': [
      {
        id: 'p9',
        name: 'Tesla Lithium Battery Pack',
        description: 'High-performance lithium-ion battery',
        price: 25000,
        category: 'batteries',
        subcategory: 'lithium-batteries',
        shopId: '2',
        inStock: false,
        brand: 'Tesla',
        image: 'https://via.placeholder.com/300x300?text=Lithium+Battery',
        shop: {
          id: '2',
          name: 'Battery Hub',
          address: 'Plot 45, Industrial Area, Phase 2',
          phone: '+91 98765 43211',
          whatsapp: '+91 98765 43211',
          location: { latitude: 28.5365, longitude: 77.3920 },
          categories: ['batteries'],
          rating: 4.3,
          isOpen: true
        }
      }
    ]
  }
};

const subcategoryInfo: { [key: string]: { [key: string]: { name: string; description: string } } } = {
  electronics: {
    'mobiles': {
      name: 'Mobiles',
      description: 'Latest smartphones from top brands'
    },
    'laptops': {
      name: 'Laptops',
      description: 'High-performance laptops for work and gaming'
    },
    'televisions': {
      name: 'Televisions',
      description: 'Smart TVs and entertainment systems'
    },
    'fridges': {
      name: 'Fridges',
      description: 'Refrigerators and cooling appliances'
    },
    'ovens': {
      name: 'Ovens',
      description: 'Microwave ovens and cooking appliances'
    },
    'printers': {
      name: 'Printers',
      description: 'Inkjet and laser printers for home and office'
    },
    'fans': {
      name: 'Fans',
      description: 'Ceiling fans and cooling solutions'
    },
    'acs': {
      name: 'ACs',
      description: 'Air conditioners and cooling systems'
    },
    'coolers': {
      name: 'Coolers',
      description: 'Air coolers and desert coolers'
    },
    'accessories': {
      name: 'Accessories',
      description: 'Electronic accessories and peripherals'
    }
  },
  batteries: {
    'two-wheeler-batteries': {
      name: 'Two Wheeler Batteries',
      description: 'Motorcycle and scooter batteries'
    },
    'four-wheeler-batteries': {
      name: 'Four Wheeler Batteries',
      description: 'Car and automotive batteries'
    },
    'inverter-batteries': {
      name: 'Inverter Batteries',
      description: 'Home and office backup power solutions'
    },
    'lithium-batteries': {
      name: 'Lithium Batteries',
      description: 'High-performance lithium-ion batteries'
    }
  }
};

export default function SubcategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const subcategory = params.subcategory as string;
  
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high' | 'brand'>('name');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);

  useEffect(() => {
    if (category && subcategory) {
      loadProducts(category, subcategory);
    }
  }, [category, subcategory]);

  useEffect(() => {
    applyFilters();
  }, [products, sortBy, priceRange, selectedBrands, inStockOnly]);

  const loadProducts = async (cat: string, subcat: string) => {
    setLoading(true);
    try {
      // In production: const productsData = await api.getProductsByCategory(cat, subcat);
      const productsData = mockProducts[cat]?.[subcat] || [];
      setProducts(productsData);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Filter by stock
    if (inStockOnly) {
      filtered = filtered.filter(product => product.inStock);
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Filter by brands
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => 
        product.brand && selectedBrands.includes(product.brand)
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'brand':
          return (a.brand || '').localeCompare(b.brand || '');
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  };

  const availableBrands = [...new Set(products.map(p => p.brand).filter(Boolean))] as string[];
  const maxPrice = Math.max(...products.map(p => p.price), 200000);

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const info = subcategoryInfo[category]?.[subcategory];

  if (!info) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Subcategory not found</h1>
          <p className="text-gray-600">The subcategory you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link href="/" className="text-gray-500 hover:text-gray-700">
                  Home
                </Link>
              </li>
              <li>
                <svg className="flex-shrink-0 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li>
                <Link href={`/category/${category}`} className="text-gray-500 hover:text-gray-700">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Link>
              </li>
              <li>
                <svg className="flex-shrink-0 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li>
                <span className="text-gray-900 font-medium">{info.name}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Subcategory Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{info.name}</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{info.description}</p>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
              
              {/* Sort By */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                  <option value="brand">Brand</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹{priceRange[0].toLocaleString()}</span>
                    <span>₹{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Stock Filter */}
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">In Stock Only</span>
                </label>
              </div>

              {/* Brand Filter */}
              {availableBrands.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brands
                  </label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {availableBrands.map((brand) => (
                      <label key={brand} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => handleBrandToggle(brand)}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSortBy('name');
                  setPriceRange([0, maxPrice]);
                  setSelectedBrands([]);
                  setInStockOnly(false);
                }}
                className="w-full text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Products</h2>
              <p className="text-gray-600">
                {filteredProducts.length} of {products.length} product{products.length !== 1 ? 's' : ''}
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📦</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600">
                  {products.length === 0 
                    ? "No products available in this subcategory at the moment."
                    : "No products match your current filters. Try adjusting your search criteria."
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}