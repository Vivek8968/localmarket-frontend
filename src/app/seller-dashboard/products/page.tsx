'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';

interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  category?: string;
  image_url?: string;
  in_stock: boolean;
  quantity: number;
  unit: string;
}

interface CatalogItem {
  id: number;
  name: string;
  description?: string;
  category_id: number;
  brand?: string;
  image_url?: string;
  suggested_price?: number;
  unit?: string;
}

const ProductsManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [catalogItems, setCatalogItems] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCatalog, setShowCatalog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    loadProducts();
    loadCatalog();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await api.getVendorProducts();
      setProducts(response.data || []);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const loadCatalog = async () => {
    try {
      const [catalogResponse, categoriesResponse] = await Promise.all([
        api.getCatalog({ search: searchQuery, category: selectedCategory }),
        api.getCatalogCategories(),
      ]);
      
      setCatalogItems(catalogResponse.data || []);
      setCategories(categoriesResponse.data || []);
    } catch (error) {
      console.error('Error loading catalog:', error);
    } finally {
      setLoading(false);
    }
  };

  const addProductFromCatalog = async (catalogItem: CatalogItem) => {
    try {
      const response = await api.addProductFromCatalog({
        catalogId: catalogItem.id.toString(),
        shopId: '1', // This should come from shop context
        quantity: 10, // Default quantity
      });

      if (response.data) {
        setProducts(prev => [...prev, response.data]);
        alert('Product added successfully!');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
  };

  const updateProductStock = async (productId: number, quantity: number) => {
    try {
      await api.updateProductInventory(productId, { quantity });
      setProducts(prev =>
        prev.map(p => p.id === productId ? { ...p, quantity } : p)
      );
    } catch (error) {
      console.error('Error updating stock:', error);
      alert('Failed to update stock');
    }
  };

  const deleteProduct = async (productId: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await api.deleteProduct(productId);
      setProducts(prev => prev.filter(p => p.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  useEffect(() => {
    if (showCatalog) {
      loadCatalog();
    }
  }, [searchQuery, selectedCategory, showCatalog]);

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
        <h1 className="text-2xl font-bold text-gray-900">Products Management</h1>
        <button
          onClick={() => setShowCatalog(!showCatalog)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          {showCatalog ? 'View My Products' : 'Add from Catalog'}
        </button>
      </div>

      {showCatalog ? (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Product Catalog</h2>
          
          {/* Filters */}
          <div className="flex space-x-4 mb-6">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Catalog Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {catalogItems.map((item) => (
              <div key={item.id} className="border rounded-lg p-4">
                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-32 object-cover rounded-md mb-2"
                  />
                )}
                
                <h3 className="font-medium text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                
                {item.brand && (
                  <p className="text-xs text-gray-500 mb-2">Brand: {item.brand}</p>
                )}
                
                {item.suggested_price && (
                  <p className="text-sm font-medium text-green-600 mb-2">
                    Suggested Price: ₹{item.suggested_price}
                  </p>
                )}
                
                <button
                  onClick={() => addProductFromCatalog(item)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  Add to Shop
                </button>
              </div>
            ))}
          </div>

          {catalogItems.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No products found in catalog</p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">My Products</h2>
          </div>
          
          {products.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {products.map((product) => (
                <div key={product.id} className="p-6">
                  <div className="flex items-start space-x-4">
                    {product.image_url && (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    )}
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                      {product.description && (
                        <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                      )}
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-lg font-semibold text-green-600">
                          ₹{product.price}
                        </span>
                        {product.category && (
                          <span className="text-sm text-gray-500">
                            Category: {product.category}
                          </span>
                        )}
                        <span className={`text-sm ${product.in_stock ? 'text-green-600' : 'text-red-600'}`}>
                          {product.in_stock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="text-right">
                        <label className="block text-xs text-gray-500">Stock</label>
                        <input
                          type="number"
                          value={product.quantity}
                          onChange={(e) => updateProductStock(product.id, parseInt(e.target.value) || 0)}
                          className="w-20 px-2 py-1 text-sm border border-gray-300 rounded"
                          min="0"
                        />
                      </div>
                      
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Delete product"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No products in your shop yet</p>
              <button
                onClick={() => setShowCatalog(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                Add Products from Catalog
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsManagement;