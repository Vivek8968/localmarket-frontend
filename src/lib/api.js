// Mock API for development without backend
const mockResponse = (data) => ({
  status: true,
  data: data
});

const mockError = () => {
  throw new Error('Mock API - Backend not available');
};

// Mock API functions
export const api = {
  // Auth endpoints
  login: async (firebaseToken, phoneNumber) => {
    return mockResponse({
      token: 'mock-jwt-token',
      user: {
        id: 1,
        firebase_uid: 'mock-uid',
        name: 'Mock User',
        email: 'mock@example.com',
        phone: phoneNumber,
        role: 'customer',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    });
  },

  getCurrentUser: async () => {
    return mockResponse({
      id: 1,
      firebase_uid: 'mock-uid',
      name: 'Mock User',
      email: 'mock@example.com',
      phone: '+1234567890',
      role: 'customer',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  },

  updateProfile: async (data) => {
    return mockResponse({
      id: 1,
      firebase_uid: 'mock-uid',
      name: data.name || 'Mock User',
      email: data.email || 'mock@example.com',
      phone: data.phone || '+1234567890',
      role: 'customer',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ...data
    });
  },

  // Shop endpoints
  getShops: async () => mockError(),
  getShopById: async () => mockError(),
  createShop: async () => mockError(),
  updateShop: async () => mockError(),
  deleteShop: async () => mockError(),

  // Product endpoints
  getProducts: async () => mockError(),
  getProductById: async () => mockError(),
  createProduct: async () => mockError(),
  updateProduct: async () => mockError(),
  deleteProduct: async () => mockError(),

  // Category endpoints
  getCategories: async () => mockError(),
  getCategoryProducts: async () => mockError(),

  // Search endpoints
  searchProducts: async () => mockError(),
  searchShops: async () => mockError(),

  // Admin endpoints
  getUsers: async () => mockError(),
  updateUserRole: async () => mockError(),
  deleteUser: async () => mockError(),
  getAnalytics: async () => mockError(),
};

export default api;