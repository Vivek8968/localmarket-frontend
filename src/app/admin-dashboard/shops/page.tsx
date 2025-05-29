'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';

interface Shop {
  id: number;
  name: string;
  description?: string;
  whatsapp_number?: string;
  address?: string;
  latitude: number;
  longitude: number;
  image_url?: string;
  banner_url?: string;
  is_active: boolean;
  owner_name?: string;
  owner_id?: number;
  created_at: string;
  updated_at: string;
}

const ShopsManagement: React.FC = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    loadShops();
  }, []);

  const loadShops = async () => {
    try {
      const response = await api.getAllShops();
      setShops(response.data || []);
    } catch (error) {
      console.error('Error loading shops:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleShopStatus = async (shopId: number, currentStatus: boolean) => {
    const action = currentStatus ? 'deactivate' : 'activate';
    if (!confirm(`Are you sure you want to ${action} this shop?`)) {
      return;
    }

    try {
      // Note: This would need a specific API endpoint for admin shop status updates
      // For now, we'll use the update shop endpoint
      await api.updateShop(shopId, { is_active: !currentStatus });
      setShops(prev => 
        prev.map(shop => 
          shop.id === shopId ? { ...shop, is_active: !currentStatus } : shop
        )
      );
      alert(`Shop ${action}d successfully!`);
    } catch (error) {
      console.error('Error updating shop status:', error);
      alert(`Failed to ${action} shop`);
    }
  };

  const filteredShops = shops.filter(shop => {
    const matchesSearch = !searchQuery || 
      shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.address?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.owner_name?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = !statusFilter || 
      (statusFilter === 'active' && shop.is_active) ||
      (statusFilter === 'inactive' && !shop.is_active);
    
    return matchesSearch && matchesStatus;
  });

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
        <h1 className="text-2xl font-bold text-gray-900">Shops Management</h1>
        <div className="text-sm text-gray-600">
          Total Shops: {shops.length}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex space-x-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search shops by name, address, or owner..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Shops Grid */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            Shops ({filteredShops.length})
          </h2>
        </div>
        
        {filteredShops.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {filteredShops.map((shop) => (
              <div key={shop.id} className="border rounded-lg overflow-hidden">
                {shop.image_url && (
                  <img
                    src={shop.image_url}
                    alt={shop.name}
                    className="w-full h-32 object-cover"
                  />
                )}
                
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-900 text-lg">{shop.name}</h3>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      shop.is_active 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {shop.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  
                  {shop.description && (
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {shop.description}
                    </p>
                  )}
                  
                  <div className="space-y-1 text-sm text-gray-500 mb-4">
                    {shop.address && (
                      <div className="flex items-center">
                        <span className="mr-1">📍</span>
                        <span className="truncate">{shop.address}</span>
                      </div>
                    )}
                    
                    {shop.whatsapp_number && (
                      <div className="flex items-center">
                        <span className="mr-1">📱</span>
                        <span>{shop.whatsapp_number}</span>
                      </div>
                    )}
                    
                    {shop.owner_name && (
                      <div className="flex items-center">
                        <span className="mr-1">👤</span>
                        <span>Owner: {shop.owner_name}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center">
                      <span className="mr-1">📅</span>
                      <span>Created: {new Date(shop.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleShopStatus(shop.id, shop.is_active)}
                      className={`flex-1 px-3 py-2 rounded text-sm font-medium ${
                        shop.is_active
                          ? 'bg-red-600 text-white hover:bg-red-700'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      {shop.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                    
                    <a
                      href={`/shop/${shop.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      View
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No shops found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Shop Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                <span className="text-green-600 text-lg">✅</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Shops</p>
              <p className="text-2xl font-semibold text-gray-900">
                {shops.filter(s => s.is_active).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-red-100 rounded-md flex items-center justify-center">
                <span className="text-red-600 text-lg">❌</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Inactive Shops</p>
              <p className="text-2xl font-semibold text-gray-900">
                {shops.filter(s => !s.is_active).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                <span className="text-blue-600 text-lg">📱</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">With WhatsApp</p>
              <p className="text-2xl font-semibold text-gray-900">
                {shops.filter(s => s.whatsapp_number).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
                <span className="text-purple-600 text-lg">🖼️</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">With Images</p>
              <p className="text-2xl font-semibold text-gray-900">
                {shops.filter(s => s.image_url).length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopsManagement;