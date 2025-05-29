'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  revenue: number;
  shopViews: number;
}

const SellerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalOrders: 0,
    revenue: 0,
    shopViews: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Load vendor products to get stats
      const productsResponse = await api.getVendorProducts();
      const products = productsResponse.data || [];
      
      setRecentProducts(products.slice(0, 5)); // Show recent 5 products
      
      // Calculate basic stats
      setStats({
        totalProducts: products.length,
        totalOrders: 0, // TODO: Implement when orders API is available
        revenue: 0, // TODO: Implement when orders API is available
        shopViews: 0, // TODO: Implement when analytics API is available
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your shop today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                <span className="text-blue-600 text-lg">📦</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Products</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalProducts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                <span className="text-green-600 text-lg">🛒</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Orders</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
                <span className="text-yellow-600 text-lg">💰</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Revenue</p>
              <p className="text-2xl font-semibold text-gray-900">₹{stats.revenue}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
                <span className="text-purple-600 text-lg">👁️</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Shop Views</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.shopViews}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Products */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Products</h2>
        </div>
        <div className="p-6">
          {recentProducts.length > 0 ? (
            <div className="space-y-4">
              {recentProducts.map((product: any) => (
                <div key={product.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  {product.image_url && (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-500">₹{product.price}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    Stock: {product.quantity || 0}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No products yet</p>
              <a
                href="/seller-dashboard/products"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Add Your First Product
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/seller-dashboard/products"
            className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl">➕</span>
            <div>
              <h3 className="font-medium">Add Product</h3>
              <p className="text-sm text-gray-500">Add new products to your shop</p>
            </div>
          </a>

          <a
            href="/seller-dashboard/shop"
            className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl">🏪</span>
            <div>
              <h3 className="font-medium">Manage Shop</h3>
              <p className="text-sm text-gray-500">Update shop information</p>
            </div>
          </a>

          <a
            href="/seller-dashboard/inventory"
            className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl">📋</span>
            <div>
              <h3 className="font-medium">Check Inventory</h3>
              <p className="text-sm text-gray-500">Manage product stock</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;