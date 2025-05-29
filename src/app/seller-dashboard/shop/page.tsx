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
}

const ShopManagement: React.FC = () => {
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState<Partial<Shop>>({});

  useEffect(() => {
    loadShop();
  }, []);

  const loadShop = async () => {
    try {
      const response = await api.getVendorShop();
      if (response.data) {
        setShop(response.data);
        setFormData(response.data);
      }
    } catch (error: any) {
      console.error('Error loading shop:', error);
      if (error.response?.status === 404) {
        // Shop doesn't exist, allow creation
        setEditing(true);
        setFormData({
          name: '',
          description: '',
          whatsapp_number: '',
          address: '',
          latitude: 0,
          longitude: 0,
        });
      } else {
        setError('Failed to load shop information');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.name?.trim()) {
      setError('Shop name is required');
      return;
    }

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      let response;
      if (shop) {
        response = await api.updateVendorShop(formData);
      } else {
        response = await api.createShop(formData);
      }

      if (response.data) {
        setShop(response.data);
        setFormData(response.data);
        setEditing(false);
        setSuccess('Shop information saved successfully!');
      }
    } catch (error: any) {
      console.error('Error saving shop:', error);
      setError('Failed to save shop information');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (file: File, type: 'image' | 'banner') => {
    try {
      const response = await api.uploadImage(file, 'shop');
      if (response.data?.url) {
        const field = type === 'image' ? 'image_url' : 'banner_url';
        setFormData(prev => ({ ...prev, [field]: response.data.url }));
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Failed to upload image');
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
        },
        (error) => {
          console.error('Error getting location:', error);
          setError('Failed to get current location');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser');
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
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Shop Management</h1>
        {shop && !editing && (
          <button
            onClick={() => setEditing(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Edit Shop
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
          {success}
        </div>
      )}

      <div className="bg-white shadow rounded-lg p-6">
        {editing ? (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shop Name *
              </label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your shop name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your shop"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                WhatsApp Number
              </label>
              <input
                type="tel"
                value={formData.whatsapp_number || ''}
                onChange={(e) => setFormData({ ...formData, whatsapp_number: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+91 9876543210"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <input
                type="text"
                value={formData.address || ''}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your shop address"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Latitude
                </label>
                <input
                  type="number"
                  step="any"
                  value={formData.latitude || ''}
                  onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Longitude
                </label>
                <input
                  type="number"
                  step="any"
                  value={formData.longitude || ''}
                  onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              onClick={getCurrentLocation}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              📍 Use Current Location
            </button>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shop Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file, 'image');
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formData.image_url && (
                <img
                  src={formData.image_url}
                  alt="Shop"
                  className="mt-2 w-32 h-32 object-cover rounded-md"
                />
              )}
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Shop'}
              </button>
              {shop && (
                <button
                  onClick={() => {
                    setEditing(false);
                    setFormData(shop);
                    setError('');
                    setSuccess('');
                  }}
                  className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        ) : shop ? (
          <div className="space-y-6">
            <div className="flex items-start space-x-6">
              {shop.image_url && (
                <img
                  src={shop.image_url}
                  alt={shop.name}
                  className="w-32 h-32 object-cover rounded-lg"
                />
              )}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{shop.name}</h2>
                {shop.description && (
                  <p className="text-gray-600 mb-4">{shop.description}</p>
                )}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">WhatsApp:</span> {shop.whatsapp_number || 'Not set'}
                  </div>
                  <div>
                    <span className="font-medium">Address:</span> {shop.address || 'Not set'}
                  </div>
                  <div>
                    <span className="font-medium">Location:</span> {shop.latitude}, {shop.longitude}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Create Your Shop
            </h2>
            <p className="text-gray-600 mb-6">
              Set up your shop to start selling products to local customers.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopManagement;