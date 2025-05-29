import axios from 'axios';

// API configuration with backend integration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://your-backend-url.com/api';

// Create axios instance with interceptors
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired, clear storage and redirect to login
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userInfo');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const api = {
  // Authentication
  login: async (firebaseToken, phoneNumber) => {
    return apiClient.post('/auth/login', {
      firebase_token: firebaseToken,
      phone: phoneNumber,
    });
  },

  register: async (userData) => {
    return apiClient.post('/auth/register', userData);
  },

  verifyToken: async () => {
    return apiClient.post('/auth/verify-token');
  },

  // User Management
  getCurrentUser: async () => {
    return apiClient.get('/users/me');
  },

  updateProfile: async (userData) => {
    return apiClient.put('/users/me', userData);
  },

  // Shops
  getShops: async (location) => {
    const params = new URLSearchParams();
    if (location?.latitude) params.append('latitude', location.latitude.toString());
    if (location?.longitude) params.append('longitude', location.longitude.toString());
    
    return apiClient.get(`/shops?${params.toString()}`);
  },

  getShopById: async (shopId) => {
    return apiClient.get(`/shops/${shopId}`);
  },

  createShop: async (shopData) => {
    return apiClient.post('/shops', shopData);
  },

  updateShop: async (shopId, shopData) => {
    return apiClient.put(`/shops/${shopId}`, shopData);
  },

  // Products
  getProductsByShop: async (shopId, filters = {}) => {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.category) params.append('category', filters.category);
    if (filters.sort) params.append('sort', filters.sort);
    
    return apiClient.get(`/shops/${shopId}/products?${params.toString()}`);
  },

  getProductById: async (productId) => {
    return apiClient.get(`/products/${productId}`);
  },

  getProductsByCategory: async (category, subcategory) => {
    const params = new URLSearchParams();
    params.append('category', category);
    if (subcategory) params.append('subcategory', subcategory);
    
    return apiClient.get(`/products?${params.toString()}`);
  },

  // Catalog
  getCatalog: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.category) params.append('category', filters.category);
    
    return apiClient.get(`/catalog?${params.toString()}`);
  },

  getCatalogCategories: async () => {
    return apiClient.get('/catalog/categories');
  },

  // Vendor Operations (Seller Dashboard)
  getVendorShop: async () => {
    return apiClient.get('/vendor/shop');
  },

  updateVendorShop: async (shopData) => {
    return apiClient.put('/vendor/shop', shopData);
  },

  getVendorProducts: async () => {
    return apiClient.get('/vendor/products');
  },

  addProductFromCatalog: async (data) => {
    return apiClient.post('/vendor/products/add-from-catalog', data);
  },

  updateProductInventory: async (productId, inventoryData) => {
    return apiClient.put(`/vendor/products/${productId}`, inventoryData);
  },

  deleteProduct: async (productId) => {
    return apiClient.delete(`/vendor/products/${productId}`);
  },

  // Search
  search: async (query, location) => {
    const params = new URLSearchParams();
    params.append('q', query);
    if (location?.latitude) params.append('lat', location.latitude.toString());
    if (location?.longitude) params.append('lng', location.longitude.toString());
    
    return apiClient.get(`/search?${params.toString()}`);
  },

  // Categories
  getCategories: async () => {
    return apiClient.get('/categories');
  },

  // Image Upload
  uploadImage: async (file, type = 'product') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    
    return apiClient.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Admin Operations
  getAllUsers: async () => {
    return apiClient.get('/admin/users');
  },

  getAllShops: async () => {
    return apiClient.get('/admin/shops');
  },

  updateUserRole: async (userId, role) => {
    return apiClient.put(`/admin/users/${userId}/role`, { role });
  },
};