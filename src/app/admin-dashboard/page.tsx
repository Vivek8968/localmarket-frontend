'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

interface AdminStats {
  totalUsers: number;
  totalShops: number;
  totalProducts: number;
  pendingApprovals: number;
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalShops: 0,
    totalProducts: 0,
    pendingApprovals: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentShops, setRecentShops] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Load admin data
      const [usersResponse, shopsResponse] = await Promise.all([
        api.getAllUsers(),
        api.getAllShops(),
      ]);

      const users = usersResponse.data || [];
      const shops = shopsResponse.data || [];

      setRecentUsers(users.slice(0, 5));
      setRecentShops(shops.slice(0, 5));

      // Calculate stats
      setStats({
        totalUsers: users.length,
        totalShops: shops.length,
        totalProducts: 0, // TODO: Add when products API is available
        pendingApprovals: users.filter((u: any) => u.role === 'customer' && u.pending_seller_request).length,
      });
    } catch (error) {
      console.error('Error loading admin dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleUpdate = async (userId: number, newRole: string) => {
    try {
      await api.updateUserRole(userId, newRole);
      loadDashboardData(); // Refresh data
      alert('User role updated successfully!');
    } catch (error) {
      console.error('Error updating user role:', error);
      alert('Failed to update user role');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
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
          Here's an overview of your platform activity.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                <span className="text-blue-600 text-lg">👥</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                <span className="text-green-600 text-lg">🏪</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Shops</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalShops}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
                <span className="text-yellow-600 text-lg">📦</span>
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
              <div className="w-8 h-8 bg-red-100 rounded-md flex items-center justify-center">
                <span className="text-red-600 text-lg">⏳</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending Approvals</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.pendingApprovals}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Users */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Users</h2>
        </div>
        <div className="p-6">
          {recentUsers.length > 0 ? (
            <div className="space-y-4">
              {recentUsers.map((user: any) => (
                <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <p className="text-sm text-gray-500">Role: {user.role}</p>
                  </div>
                  <div className="flex space-x-2">
                    {user.role === 'customer' && (
                      <button
                        onClick={() => handleRoleUpdate(user.id, 'seller')}
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                      >
                        Make Seller
                      </button>
                    )}
                    {user.role === 'seller' && (
                      <button
                        onClick={() => handleRoleUpdate(user.id, 'customer')}
                        className="bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700"
                      >
                        Revoke Seller
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No users found</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Shops */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Shops</h2>
        </div>
        <div className="p-6">
          {recentShops.length > 0 ? (
            <div className="space-y-4">
              {recentShops.map((shop: any) => (
                <div key={shop.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  {shop.image_url && (
                    <img
                      src={shop.image_url}
                      alt={shop.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{shop.name}</h3>
                    <p className="text-sm text-gray-500">{shop.address}</p>
                    <p className="text-sm text-gray-500">Owner: {shop.owner_name}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    Status: {shop.is_active ? 'Active' : 'Inactive'}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No shops found</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin-dashboard/users"
            className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl">👥</span>
            <div>
              <h3 className="font-medium">Manage Users</h3>
              <p className="text-sm text-gray-500">View and manage user accounts</p>
            </div>
          </a>

          <a
            href="/admin-dashboard/shops"
            className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl">🏪</span>
            <div>
              <h3 className="font-medium">Manage Shops</h3>
              <p className="text-sm text-gray-500">Approve and monitor shops</p>
            </div>
          </a>

          <a
            href="/admin-dashboard/analytics"
            className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl">📈</span>
            <div>
              <h3 className="font-medium">View Analytics</h3>
              <p className="text-sm text-gray-500">Platform usage statistics</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;