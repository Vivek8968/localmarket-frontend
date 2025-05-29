import { Shop, Product } from '@/types';

// Mock shop data with 10 electronics shops
export const mockShops: Shop[] = [
  {
    id: '1',
    name: 'TechHub Electronics',
    address: 'Shop 12, Electronics Market, Sector 18, Noida, UP 201301',
    phone: '+919876543210',
    whatsapp: '+919876543210',
    location: { latitude: 28.5355, longitude: 77.3910 },
    categories: ['Mobiles', 'Laptops', 'Accessories'],
    rating: 4.5,
    isOpen: true,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
    distance: 0.5
  },
  {
    id: '2',
    name: 'Digital World',
    address: '45, Main Market, Lajpat Nagar, New Delhi 110024',
    phone: '+919876543211',
    whatsapp: '+919876543211',
    location: { latitude: 28.5665, longitude: 77.2431 },
    categories: ['TVs', 'ACs', 'Fridges'],
    rating: 4.2,
    isOpen: true,
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
    distance: 1.2
  },
  {
    id: '3',
    name: 'Smart Electronics',
    address: 'B-23, Connaught Place, New Delhi 110001',
    phone: '+919876543212',
    whatsapp: '+919876543212',
    location: { latitude: 28.6315, longitude: 77.2167 },
    categories: ['Mobiles', 'Printers', 'Accessories'],
    rating: 4.7,
    isOpen: true,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
    distance: 2.1
  },
  {
    id: '4',
    name: 'Home Appliance Center',
    address: '78, Karol Bagh Market, New Delhi 110005',
    phone: '+919876543213',
    whatsapp: '+919876543213',
    location: { latitude: 28.6519, longitude: 77.1909 },
    categories: ['Fridges', 'Ovens', 'Fans'],
    rating: 4.0,
    isOpen: true,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
    distance: 3.5
  },
  {
    id: '5',
    name: 'Gadget Galaxy',
    address: 'Shop 34, Nehru Place, New Delhi 110019',
    phone: '+919876543214',
    whatsapp: '+919876543214',
    location: { latitude: 28.5494, longitude: 77.2500 },
    categories: ['Laptops', 'Mobiles', 'Accessories'],
    rating: 4.3,
    isOpen: false,
    image: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=400&h=300&fit=crop',
    distance: 4.2
  },
  {
    id: '6',
    name: 'Cool Comfort',
    address: '156, Rajouri Garden, New Delhi 110027',
    phone: '+919876543215',
    whatsapp: '+919876543215',
    location: { latitude: 28.6467, longitude: 77.1206 },
    categories: ['ACs', 'Coolers', 'Fans'],
    rating: 4.1,
    isOpen: true,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    distance: 5.8
  },
  {
    id: '7',
    name: 'Vision Electronics',
    address: '89, Laxmi Nagar, New Delhi 110092',
    phone: '+919876543216',
    whatsapp: '+919876543216',
    location: { latitude: 28.6358, longitude: 77.2772 },
    categories: ['TVs', 'Laptops', 'Printers'],
    rating: 4.4,
    isOpen: true,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
    distance: 6.1
  },
  {
    id: '8',
    name: 'Kitchen King',
    address: '23, Janakpuri, New Delhi 110058',
    phone: '+919876543217',
    whatsapp: '+919876543217',
    location: { latitude: 28.6219, longitude: 77.0757 },
    categories: ['Ovens', 'Fridges', 'Accessories'],
    rating: 3.9,
    isOpen: true,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
    distance: 7.3
  },
  {
    id: '9',
    name: 'Mobile Mania',
    address: 'F-12, Gaffar Market, Karol Bagh, New Delhi 110005',
    phone: '+919876543218',
    whatsapp: '+919876543218',
    location: { latitude: 28.6542, longitude: 77.1905 },
    categories: ['Mobiles', 'Accessories'],
    rating: 4.6,
    isOpen: true,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
    distance: 8.0
  },
  {
    id: '10',
    name: 'PrintTech Solutions',
    address: '67, Tilak Nagar, New Delhi 110018',
    phone: '+919876543219',
    whatsapp: '+919876543219',
    location: { latitude: 28.6414, longitude: 77.0977 },
    categories: ['Printers', 'Laptops', 'Accessories'],
    rating: 4.2,
    isOpen: true,
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
    distance: 9.2
  }
];

// Mock product data with 25 products spread across shops and categories
export const mockProducts: Product[] = [
  // TechHub Electronics (Shop 1) - Mobiles, Laptops, Accessories
  {
    id: '1',
    name: 'iPhone 15 Pro',
    description: 'Latest iPhone with A17 Pro chip, titanium design, and advanced camera system',
    price: 134900,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
    category: 'Mobiles',
    shopId: '1',
    shop: mockShops[0],
    inStock: true,
    brand: 'Apple'
  },
  {
    id: '2',
    name: 'MacBook Air M2',
    description: '13-inch MacBook Air with M2 chip, 8GB RAM, 256GB SSD',
    price: 114900,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop',
    category: 'Laptops',
    shopId: '1',
    shop: mockShops[0],
    inStock: true,
    brand: 'Apple'
  },
  {
    id: '3',
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1609592806955-d0ae3d1e4b9e?w=400&h=400&fit=crop',
    category: 'Accessories',
    shopId: '1',
    shop: mockShops[0],
    inStock: true,
    brand: 'Belkin'
  },

  // Digital World (Shop 2) - TVs, ACs, Fridges
  {
    id: '4',
    name: 'Samsung 55" 4K Smart TV',
    description: '55-inch Crystal UHD 4K Smart TV with HDR and Tizen OS',
    price: 54990,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop',
    category: 'TVs',
    shopId: '2',
    shop: mockShops[1],
    inStock: true,
    brand: 'Samsung'
  },
  {
    id: '5',
    name: 'LG 1.5 Ton Split AC',
    description: 'Energy efficient split AC with dual inverter technology and Wi-Fi control',
    price: 42990,
    image: 'https://images.unsplash.com/photo-1631545806609-c2b999c8f4c6?w=400&h=400&fit=crop',
    category: 'ACs',
    shopId: '2',
    shop: mockShops[1],
    inStock: true,
    brand: 'LG'
  },
  {
    id: '6',
    name: 'Whirlpool 265L Double Door Fridge',
    description: 'Frost-free double door refrigerator with advanced cooling technology',
    price: 28990,
    image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=400&fit=crop',
    category: 'Fridges',
    shopId: '2',
    shop: mockShops[1],
    inStock: true,
    brand: 'Whirlpool'
  },

  // Smart Electronics (Shop 3) - Mobiles, Printers, Accessories
  {
    id: '7',
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Premium Android smartphone with S Pen, 200MP camera, and AI features',
    price: 129999,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop',
    category: 'Mobiles',
    shopId: '3',
    shop: mockShops[2],
    inStock: true,
    brand: 'Samsung'
  },
  {
    id: '8',
    name: 'HP LaserJet Pro M404n',
    description: 'Monochrome laser printer with fast printing and network connectivity',
    price: 18999,
    image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=400&fit=crop',
    category: 'Printers',
    shopId: '3',
    shop: mockShops[2],
    inStock: true,
    brand: 'HP'
  },
  {
    id: '9',
    name: 'Bluetooth Headphones',
    description: 'Premium wireless headphones with noise cancellation and 30-hour battery',
    price: 8999,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    category: 'Accessories',
    shopId: '3',
    shop: mockShops[2],
    inStock: true,
    brand: 'Sony'
  },

  // Home Appliance Center (Shop 4) - Fridges, Ovens, Fans
  {
    id: '10',
    name: 'LG 190L Single Door Fridge',
    description: 'Compact single door refrigerator perfect for small families',
    price: 16990,
    image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=400&fit=crop',
    category: 'Fridges',
    shopId: '4',
    shop: mockShops[3],
    inStock: true,
    brand: 'LG'
  },
  {
    id: '11',
    name: 'IFB 30L Convection Microwave',
    description: 'Convection microwave oven with auto-cook menus and grill function',
    price: 12990,
    image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=400&fit=crop',
    category: 'Ovens',
    shopId: '4',
    shop: mockShops[3],
    inStock: true,
    brand: 'IFB'
  },
  {
    id: '12',
    name: 'Havells Ceiling Fan 48"',
    description: 'Energy efficient ceiling fan with decorative design and remote control',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    category: 'Fans',
    shopId: '4',
    shop: mockShops[3],
    inStock: true,
    brand: 'Havells'
  },

  // Gadget Galaxy (Shop 5) - Laptops, Mobiles, Accessories
  {
    id: '13',
    name: 'Dell XPS 13',
    description: 'Ultra-portable laptop with Intel Core i7, 16GB RAM, and 512GB SSD',
    price: 89990,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
    category: 'Laptops',
    shopId: '5',
    shop: mockShops[4],
    inStock: false,
    brand: 'Dell'
  },
  {
    id: '14',
    name: 'OnePlus 12',
    description: 'Flagship smartphone with Snapdragon 8 Gen 3 and 100W fast charging',
    price: 64999,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    category: 'Mobiles',
    shopId: '5',
    shop: mockShops[4],
    inStock: true,
    brand: 'OnePlus'
  },
  {
    id: '15',
    name: 'USB-C Hub 7-in-1',
    description: 'Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1609592806955-d0ae3d1e4b9e?w=400&h=400&fit=crop',
    category: 'Accessories',
    shopId: '5',
    shop: mockShops[4],
    inStock: true,
    brand: 'Anker'
  },

  // Cool Comfort (Shop 6) - ACs, Coolers, Fans
  {
    id: '16',
    name: 'Daikin 1 Ton Window AC',
    description: 'Window AC with copper coil and energy saving features',
    price: 32990,
    image: 'https://images.unsplash.com/photo-1631545806609-c2b999c8f4c6?w=400&h=400&fit=crop',
    category: 'ACs',
    shopId: '6',
    shop: mockShops[5],
    inStock: true,
    brand: 'Daikin'
  },
  {
    id: '17',
    name: 'Symphony 70L Desert Cooler',
    description: 'Large capacity desert air cooler with honeycomb pads and remote',
    price: 8999,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    category: 'Coolers',
    shopId: '6',
    shop: mockShops[5],
    inStock: true,
    brand: 'Symphony'
  },
  {
    id: '18',
    name: 'Crompton Table Fan 16"',
    description: 'High-speed table fan with adjustable tilt and speed control',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    category: 'Fans',
    shopId: '6',
    shop: mockShops[5],
    inStock: true,
    brand: 'Crompton'
  },

  // Vision Electronics (Shop 7) - TVs, Laptops, Printers
  {
    id: '19',
    name: 'Sony 43" 4K Android TV',
    description: '43-inch 4K HDR Android TV with Google Assistant and Chromecast',
    price: 42990,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop',
    category: 'TVs',
    shopId: '7',
    shop: mockShops[6],
    inStock: true,
    brand: 'Sony'
  },
  {
    id: '20',
    name: 'ASUS VivoBook 15',
    description: 'Affordable laptop with AMD Ryzen 5, 8GB RAM, and 512GB SSD',
    price: 45990,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
    category: 'Laptops',
    shopId: '7',
    shop: mockShops[6],
    inStock: true,
    brand: 'ASUS'
  },
  {
    id: '21',
    name: 'Canon PIXMA G3010',
    description: 'All-in-one inkjet printer with Wi-Fi and high-yield ink tanks',
    price: 14999,
    image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=400&fit=crop',
    category: 'Printers',
    shopId: '7',
    shop: mockShops[6],
    inStock: true,
    brand: 'Canon'
  },

  // Kitchen King (Shop 8) - Ovens, Fridges, Accessories
  {
    id: '22',
    name: 'Bajaj 28L OTG Oven',
    description: 'Oven toaster griller with convection cooking and rotisserie function',
    price: 7999,
    image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=400&fit=crop',
    category: 'Ovens',
    shopId: '8',
    shop: mockShops[7],
    inStock: true,
    brand: 'Bajaj'
  },
  {
    id: '23',
    name: 'Godrej 240L Double Door Fridge',
    description: 'Frost-free refrigerator with vegetable crisper and energy efficiency',
    price: 24990,
    image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=400&fit=crop',
    category: 'Fridges',
    shopId: '8',
    shop: mockShops[7],
    inStock: true,
    brand: 'Godrej'
  },

  // Mobile Mania (Shop 9) - Mobiles, Accessories
  {
    id: '24',
    name: 'Xiaomi 14',
    description: 'Premium smartphone with Leica cameras and Snapdragon 8 Gen 3',
    price: 69999,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    category: 'Mobiles',
    shopId: '9',
    shop: mockShops[8],
    inStock: true,
    brand: 'Xiaomi'
  },
  {
    id: '25',
    name: 'Power Bank 20000mAh',
    description: 'High-capacity power bank with fast charging and multiple ports',
    price: 1999,
    image: 'https://images.unsplash.com/photo-1609592806955-d0ae3d1e4b9e?w=400&h=400&fit=crop',
    category: 'Accessories',
    shopId: '9',
    shop: mockShops[8],
    inStock: true,
    brand: 'Mi'
  }
];

// Helper functions
export const getShopById = (id: string): Shop | undefined => {
  return mockShops.find(shop => shop.id === id);
};

export const getProductById = (id: string): Product | undefined => {
  return mockProducts.find(product => product.id === id);
};

export const getProductsByShop = (shopId: string): Product[] => {
  return mockProducts.filter(product => product.shopId === shopId);
};

export const getProductsByCategory = (category: string): Product[] => {
  return mockProducts.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return mockProducts.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.brand?.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  );
};

export const searchShops = (query: string): Shop[] => {
  const lowercaseQuery = query.toLowerCase();
  return mockShops.filter(shop =>
    shop.name.toLowerCase().includes(lowercaseQuery) ||
    shop.address.toLowerCase().includes(lowercaseQuery) ||
    shop.categories.some(category => category.toLowerCase().includes(lowercaseQuery))
  );
};

export const getShopsByCategory = (category: string): Shop[] => {
  return mockShops.filter(shop =>
    shop.categories.some(cat => cat.toLowerCase() === category.toLowerCase())
  );
};