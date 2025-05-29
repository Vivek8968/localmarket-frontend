// API configuration - DO NOT MODIFY as per instructions
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const api = {
  // Shops
  getShops: async (location) => {
    const response = await fetch(`${API_BASE_URL}/shops?lat=${location.latitude}&lng=${location.longitude}`);
    return response.json();
  },

  getShopById: async (shopId) => {
    const response = await fetch(`${API_BASE_URL}/shops/${shopId}`);
    return response.json();
  },

  // Products
  getProductsByShop: async (shopId) => {
    const response = await fetch(`${API_BASE_URL}/shops/${shopId}/products`);
    return response.json();
  },

  getProductsByCategory: async (category, subcategory) => {
    let url = `${API_BASE_URL}/products?category=${category}`;
    if (subcategory) {
      url += `&subcategory=${subcategory}`;
    }
    const response = await fetch(url);
    return response.json();
  },

  // Search
  search: async (query, location) => {
    const response = await fetch(`${API_BASE_URL}/search?q=${query}&lat=${location.latitude}&lng=${location.longitude}`);
    return response.json();
  },

  // Categories
  getCategories: async () => {
    const response = await fetch(`${API_BASE_URL}/categories`);
    return response.json();
  }
};