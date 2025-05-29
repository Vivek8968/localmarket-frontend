'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';

interface AnalyticsData {
  userGrowth: { month: string; users: number }[];
  shopGrowth: { month: string; shops: number }[];
  topCategories: { category: string; count: number }[];
  usersByRole: { role: string; count: number }[];
  recentActivity: any[];
}

const Analytics: React.FC = () => {
  const [data, setData] = useState<AnalyticsData>({
    userGrowth: [],
    shopGrowth: [],
    topCategories: [],
    usersByRole: [],
    recentActivity: [],
  });
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');

  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  const loadAnalytics = async () => {
    try {
      // Load basic data for analytics
      const [usersResponse, shopsResponse] = await Promise.all([
        api.getAllUsers(),
        api.getAllShops(),
      ]);

      const users = usersResponse.data || [];
      const shops = shopsResponse.data || [];

      // Process data for analytics
      const usersByRole = [
        { role: 'Customer', count: users.filter((u: any) => u.role === 'customer').length },
        { role: 'Seller', count: users.filter((u: any) => u.role === 'seller').length },
        { role: 'Admin', count: users.filter((u: any) => u.role === 'admin').length },
      ];

      // Mock data for growth charts (in real app, this would come from backend)
      const userGrowth = [
        { month: 'Jan', users: Math.floor(users.length * 0.1) },
        { month: 'Feb', users: Math.floor(users.length * 0.2) },
        { month: 'Mar', users: Math.floor(users.length * 0.4) },
        { month: 'Apr', users: Math.floor(users.length * 0.6) },
        { month: 'May', users: Math.floor(users.length * 0.8) },
        { month: 'Jun', users: users.length },
      ];

      const shopGrowth = [
        { month: 'Jan', shops: Math.floor(shops.length * 0.1) },
        { month: 'Feb', shops: Math.floor(shops.length * 0.2) },
        { month: 'Mar', shops: Math.floor(shops.length * 0.4) },
        { month: 'Apr', shops: Math.floor(shops.length * 0.6) },
        { month: 'May', shops: Math.floor(shops.length * 0.8) },
        { month: 'Jun', shops: shops.length },
      ];

      // Mock category data
      const topCategories = [
        { category: 'Electronics', count: Math.floor(shops.length * 0.4) },
        { category: 'Batteries', count: Math.floor(shops.length * 0.3) },
        { category: 'Accessories', count: Math.floor(shops.length * 0.2) },
        { category: 'Others', count: Math.floor(shops.length * 0.1) },
      ];

      setData({
        userGrowth,
        shopGrowth,
        topCategories,
        usersByRole,
        recentActivity: [...users.slice(0, 5), ...shops.slice(0, 5)],
      });
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
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
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="1y">Last year</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                <span className="text-blue-600 text-lg">👥</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="text-2xl font-semibold text-gray-900">
                {data.usersByRole.reduce((sum, item) => sum + item.count, 0)}
              </p>
              <p className="text-xs text-green-600">+12% from last month</p>
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
              <p className="text-sm font-medium text-gray-500">Active Shops</p>
              <p className="text-2xl font-semibold text-gray-900">
                {data.shopGrowth[data.shopGrowth.length - 1]?.shops || 0}
              </p>
              <p className="text-xs text-green-600">+8% from last month</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
                <span className="text-yellow-600 text-lg">📊</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Engagement Rate</p>
              <p className="text-2xl font-semibold text-gray-900">78%</p>
              <p className="text-xs text-green-600">+5% from last month</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
                <span className="text-purple-600 text-lg">💰</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Revenue</p>
              <p className="text-2xl font-semibold text-gray-900">₹2.4L</p>
              <p className="text-xs text-green-600">+15% from last month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">User Growth</h3>
          <div className="space-y-3">
            {data.userGrowth.map((item, index) => (
              <div key={item.month} className="flex items-center">
                <div className="w-12 text-sm text-gray-600">{item.month}</div>
                <div className="flex-1 mx-4">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${(item.users / Math.max(...data.userGrowth.map(d => d.users))) * 100}%`
                      }}
                    ></div>
                  </div>
                </div>
                <div className="w-12 text-sm text-gray-900 text-right">{item.users}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Shop Growth Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Shop Growth</h3>
          <div className="space-y-3">
            {data.shopGrowth.map((item, index) => (
              <div key={item.month} className="flex items-center">
                <div className="w-12 text-sm text-gray-600">{item.month}</div>
                <div className="flex-1 mx-4">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{
                        width: `${(item.shops / Math.max(...data.shopGrowth.map(d => d.shops))) * 100}%`
                      }}
                    ></div>
                  </div>
                </div>
                <div className="w-12 text-sm text-gray-900 text-right">{item.shops}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">User Distribution</h3>
          <div className="space-y-4">
            {data.usersByRole.map((item) => (
              <div key={item.role} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    item.role === 'Admin' ? 'bg-red-500' :
                    item.role === 'Seller' ? 'bg-green-500' : 'bg-blue-500'
                  }`}></div>
                  <span className="text-sm text-gray-600">{item.role}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Categories */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Categories</h3>
          <div className="space-y-3">
            {data.topCategories.map((item, index) => (
              <div key={item.category} className="flex items-center">
                <div className="w-20 text-sm text-gray-600">{item.category}</div>
                <div className="flex-1 mx-4">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{
                        width: `${(item.count / Math.max(...data.topCategories.map(d => d.count))) * 100}%`
                      }}
                    ></div>
                  </div>
                </div>
                <div className="w-12 text-sm text-gray-900 text-right">{item.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {data.recentActivity.slice(0, 10).map((item: any, index) => (
              <div key={index} className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">
                  {item.name ? `New user "${item.name}" joined` : `New shop "${item.name || 'Unknown'}" created`}
                </span>
                <span className="text-gray-400">
                  {new Date(item.created_at).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;