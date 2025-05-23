import axios from 'axios';
import { getCurrentLocation } from '../utils/geolocation';

// Create axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Mock data for development
const MOCK_SHOPS = [
  {
    id: 1,
    name: 'Electronics Hub',
    banner: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    address: '123 Main St, Mumbai, India',
    phone: '+919876543210',
    whatsapp: '+919876543210',
    latitude: 19.0760,
    longitude: 72.8777,
    distance: 0,
  },
  {
    id: 2,
    name: 'Gadget World',
    banner: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    address: '456 Park Ave, Delhi, India',
    phone: '+919876543211',
    whatsapp: '+919876543211',
    latitude: 28.7041,
    longitude: 77.1025,
    distance: 0,
  },
  {
    id: 3,
    name: 'Tech Solutions',
    banner: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1120&q=80',
    address: '789 Tech St, Bangalore, India',
    phone: '+919876543212',
    whatsapp: '+919876543212',
    latitude: 12.9716,
    longitude: 77.5946,
    distance: 0,
  },
  {
    id: 4,
    name: 'Digital Store',
    banner: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    address: '101 Digital Rd, Chennai, India',
    phone: '+919876543213',
    whatsapp: '+919876543213',
    latitude: 13.0827,
    longitude: 80.2707,
    distance: 0,
  },
  {
    id: 5,
    name: 'Smart Devices',
    banner: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1201&q=80',
    address: '202 Smart St, Hyderabad, India',
    phone: '+919876543214',
    whatsapp: '+919876543214',
    latitude: 17.3850,
    longitude: 78.4867,
    distance: 0,
  },
];

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Samsung 55" 4K Smart TV',
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1057&q=80',
    price: 45999,
    category: 'TV',
    shopId: 1,
    stock: 10,
  },
  {
    id: 2,
    name: 'Apple iPhone 14 Pro',
    image: 'https://images.unsplash.com/photo-1678652197831-2d180705cd2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    price: 129900,
    category: 'Phone',
    shopId: 1,
    stock: 5,
  },
  {
    id: 3,
    name: 'Dell XPS 15 Laptop',
    image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80',
    price: 149990,
    category: 'Laptop',
    shopId: 2,
    stock: 3,
  },
  {
    id: 4,
    name: 'Sony WH-1000XM5 Headphones',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1165&q=80',
    price: 34990,
    category: 'Headphones',
    shopId: 2,
    stock: 8,
  },
  {
    id: 5,
    name: 'LG 1.5 Ton Inverter AC',
    image: 'https://images.unsplash.com/photo-1581275288578-bfb98a6fa4f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    price: 42990,
    category: 'AC',
    shopId: 3,
    stock: 4,
  },
  {
    id: 6,
    name: 'Whirlpool 300L Refrigerator',
    image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    price: 32990,
    category: 'Refrigerator',
    shopId: 3,
    stock: 2,
  },
  {
    id: 7,
    name: 'Logitech MX Master 3 Mouse',
    image: 'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    price: 9999,
    category: 'Computer Accessories',
    shopId: 4,
    stock: 15,
  },
  {
    id: 8,
    name: 'Bose SoundLink Revolve+ Speaker',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    price: 24990,
    category: 'Speakers',
    shopId: 4,
    stock: 6,
  },
  {
    id: 9,
    name: 'Samsung Galaxy Tab S8',
    image: 'https://images.unsplash.com/photo-1623126908029-58cb08a2b272?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    price: 58990,
    category: 'Tablet',
    shopId: 5,
    stock: 7,
  },
  {
    id: 10,
    name: 'Canon EOS R6 Camera',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1164&q=80',
    price: 215990,
    category: 'Camera',
    shopId: 5,
    stock: 2,
  },
];

const MOCK_CATEGORIES = [
  { id: 1, name: 'TV' },
  { id: 2, name: 'Phone' },
  { id: 3, name: 'Laptop' },
  { id: 4, name: 'Headphones' },
  { id: 5, name: 'AC' },
  { id: 6, name: 'Refrigerator' },
  { id: 7, name: 'Computer Accessories' },
  { id: 8, name: 'Speakers' },
  { id: 9, name: 'Tablet' },
  { id: 10, name: 'Camera' },
];

// API service functions
const apiService = {
  // Shop related API calls
  getShops: async (radius = 20) => {
    try {
      if (import.meta.env.DEV) {
        // In development, use mock data
        const location = await getCurrentLocation().catch(() => ({
          latitude: 19.0760,
          longitude: 72.8777
        }));
        
        // Calculate distance for each shop
        const shopsWithDistance = MOCK_SHOPS.map(shop => {
          const distance = Math.random() * radius; // Mock distance calculation
          return { ...shop, distance };
        });
        
        // Sort by distance
        const sortedShops = shopsWithDistance.sort((a, b) => a.distance - b.distance);
        
        return { data: sortedShops };
      } else {
        // In production, call actual API
        const location = await getCurrentLocation();
        const response = await api.get('/shops', {
          params: {
            latitude: location.latitude,
            longitude: location.longitude,
            radius
          }
        });
        return response;
      }
    } catch (error) {
      console.error('Error fetching shops:', error);
      throw error;
    }
  },
  
  getShopById: async (shopId) => {
    try {
      if (import.meta.env.DEV) {
        // In development, use mock data
        const shop = MOCK_SHOPS.find(shop => shop.id === parseInt(shopId));
        if (!shop) {
          throw new Error('Shop not found');
        }
        return { data: shop };
      } else {
        // In production, call actual API
        const response = await api.get(`/shops/${shopId}`);
        return response;
      }
    } catch (error) {
      console.error(`Error fetching shop with ID ${shopId}:`, error);
      throw error;
    }
  },
  
  // Product related API calls
  getProducts: async (filters = {}) => {
    try {
      if (import.meta.env.DEV) {
        // In development, use mock data
        let filteredProducts = [...MOCK_PRODUCTS];
        
        // Apply filters
        if (filters.shopId) {
          filteredProducts = filteredProducts.filter(product => 
            product.shopId === parseInt(filters.shopId)
          );
        }
        
        if (filters.category) {
          filteredProducts = filteredProducts.filter(product => 
            product.category.toLowerCase() === filters.category.toLowerCase()
          );
        }
        
        if (filters.search) {
          const searchTerm = filters.search.toLowerCase();
          filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm)
          );
        }
        
        return { data: filteredProducts };
      } else {
        // In production, call actual API
        const response = await api.get('/products', { params: filters });
        return response;
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
  
  getProductById: async (productId) => {
    try {
      if (import.meta.env.DEV) {
        // In development, use mock data
        const product = MOCK_PRODUCTS.find(product => product.id === parseInt(productId));
        if (!product) {
          throw new Error('Product not found');
        }
        return { data: product };
      } else {
        // In production, call actual API
        const response = await api.get(`/products/${productId}`);
        return response;
      }
    } catch (error) {
      console.error(`Error fetching product with ID ${productId}:`, error);
      throw error;
    }
  },
  
  // Category related API calls
  getCategories: async () => {
    try {
      if (import.meta.env.DEV) {
        // In development, use mock data
        return { data: MOCK_CATEGORIES };
      } else {
        // In production, call actual API
        const response = await api.get('/categories');
        return response;
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },
  
  // Vendor related API calls
  getVendorProducts: async (vendorId) => {
    try {
      if (import.meta.env.DEV) {
        // In development, use mock data
        const vendorProducts = MOCK_PRODUCTS.filter(product => 
          product.shopId === parseInt(vendorId)
        );
        return { data: vendorProducts };
      } else {
        // In production, call actual API
        const response = await api.get(`/vendors/${vendorId}/products`);
        return response;
      }
    } catch (error) {
      console.error(`Error fetching products for vendor ${vendorId}:`, error);
      throw error;
    }
  },
  
  addVendorProduct: async (vendorId, productData) => {
    try {
      if (import.meta.env.DEV) {
        // In development, mock adding a product
        const newProduct = {
          id: MOCK_PRODUCTS.length + 1,
          ...productData,
          shopId: parseInt(vendorId)
        };
        MOCK_PRODUCTS.push(newProduct);
        return { data: newProduct };
      } else {
        // In production, call actual API
        const response = await api.post(`/vendors/${vendorId}/products`, productData);
        return response;
      }
    } catch (error) {
      console.error(`Error adding product for vendor ${vendorId}:`, error);
      throw error;
    }
  },
  
  updateVendorProduct: async (vendorId, productId, productData) => {
    try {
      if (import.meta.env.DEV) {
        // In development, mock updating a product
        const productIndex = MOCK_PRODUCTS.findIndex(product => 
          product.id === parseInt(productId) && product.shopId === parseInt(vendorId)
        );
        
        if (productIndex === -1) {
          throw new Error('Product not found');
        }
        
        MOCK_PRODUCTS[productIndex] = {
          ...MOCK_PRODUCTS[productIndex],
          ...productData
        };
        
        return { data: MOCK_PRODUCTS[productIndex] };
      } else {
        // In production, call actual API
        const response = await api.put(`/vendors/${vendorId}/products/${productId}`, productData);
        return response;
      }
    } catch (error) {
      console.error(`Error updating product ${productId} for vendor ${vendorId}:`, error);
      throw error;
    }
  },
  
  deleteVendorProduct: async (vendorId, productId) => {
    try {
      if (import.meta.env.DEV) {
        // In development, mock deleting a product
        const productIndex = MOCK_PRODUCTS.findIndex(product => 
          product.id === parseInt(productId) && product.shopId === parseInt(vendorId)
        );
        
        if (productIndex === -1) {
          throw new Error('Product not found');
        }
        
        MOCK_PRODUCTS.splice(productIndex, 1);
        return { data: { success: true } };
      } else {
        // In production, call actual API
        const response = await api.delete(`/vendors/${vendorId}/products/${productId}`);
        return response;
      }
    } catch (error) {
      console.error(`Error deleting product ${productId} for vendor ${vendorId}:`, error);
      throw error;
    }
  },
  
  // Admin related API calls
  getUsers: async () => {
    try {
      if (import.meta.env.DEV) {
        // In development, use mock data
        const mockUsers = [
          { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+919876543210', role: 'customer' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+919876543211', role: 'vendor' },
          { id: 3, name: 'Admin User', email: 'admin@example.com', phone: '+919876543212', role: 'admin' },
        ];
        return { data: mockUsers };
      } else {
        // In production, call actual API
        const response = await api.get('/admin/users');
        return response;
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },
  
  deleteUser: async (userId) => {
    try {
      if (import.meta.env.DEV) {
        // In development, mock deleting a user
        return { data: { success: true } };
      } else {
        // In production, call actual API
        const response = await api.delete(`/admin/users/${userId}`);
        return response;
      }
    } catch (error) {
      console.error(`Error deleting user ${userId}:`, error);
      throw error;
    }
  },
  
  getAnalytics: async () => {
    try {
      if (import.meta.env.DEV) {
        // In development, use mock data
        const mockAnalytics = {
          totalUsers: 150,
          totalVendors: 25,
          totalProducts: 320,
          recentActivity: [
            { id: 1, action: 'User Registration', timestamp: '2023-06-15T10:30:00Z' },
            { id: 2, action: 'New Shop Added', timestamp: '2023-06-14T14:45:00Z' },
            { id: 3, action: 'Product Updated', timestamp: '2023-06-14T09:15:00Z' },
          ]
        };
        return { data: mockAnalytics };
      } else {
        // In production, call actual API
        const response = await api.get('/admin/analytics');
        return response;
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
      throw error;
    }
  }
};

export default apiService;