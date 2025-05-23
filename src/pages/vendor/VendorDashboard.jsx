import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import apiService from '../../services/api';

export default function VendorDashboard() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shopInfo, setShopInfo] = useState(null);
  
  // For product form
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
    image: ''
  });
  const [availableProducts, setAvailableProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Mock vendor ID (in a real app, this would come from the authenticated user)
  const vendorId = 1;
  
  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        setLoading(true);
        
        // Fetch vendor's products
        const productsResponse = await apiService.getVendorProducts(vendorId);
        setProducts(productsResponse.data);
        
        // Fetch shop info
        const shopResponse = await apiService.getShopById(vendorId);
        setShopInfo(shopResponse.data);
        
        // Fetch available product templates
        // In a real app, this would be a separate API call
        // For now, we'll use mock data
        const mockAvailableProducts = [
          { id: 101, name: 'Samsung 65" QLED TV', category: 'TV', image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1057&q=80' },
          { id: 102, name: 'iPhone 14 Pro Max', category: 'Phone', image: 'https://images.unsplash.com/photo-1678652197831-2d180705cd2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80' },
          { id: 103, name: 'MacBook Pro 16"', category: 'Laptop', image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80' },
          { id: 104, name: 'Sony WH-1000XM5', category: 'Headphones', image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1165&q=80' },
          { id: 105, name: 'LG 1.5 Ton Inverter AC', category: 'AC', image: 'https://images.unsplash.com/photo-1581275288578-bfb98a6fa4f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80' },
        ];
        setAvailableProducts(mockAvailableProducts);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching vendor data:', err);
        setError('Failed to load vendor data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchVendorData();
  }, [vendorId]);
  
  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setProductForm({
      name: product.name,
      price: '',
      category: product.category,
      stock: '',
      image: product.image
    });
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddProduct = async (e) => {
    e.preventDefault();
    
    if (!productForm.price || !productForm.stock) {
      alert('Please fill in all required fields');
      return;
    }
    
    try {
      const newProduct = {
        ...productForm,
        price: parseFloat(productForm.price),
        stock: parseInt(productForm.stock)
      };
      
      const response = await apiService.addVendorProduct(vendorId, newProduct);
      
      // Add the new product to the list
      setProducts([...products, response.data]);
      
      // Reset form and close modal
      setProductForm({
        name: '',
        price: '',
        category: '',
        stock: '',
        image: ''
      });
      setSelectedProduct(null);
      setIsAddingProduct(false);
    } catch (err) {
      console.error('Error adding product:', err);
      alert('Failed to add product. Please try again.');
    }
  };
  
  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }
    
    try {
      await apiService.deleteVendorProduct(vendorId, productId);
      setProducts(products.filter(product => product.id !== productId));
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Failed to delete product. Please try again.');
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 container-custom py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center space-x-3 mb-6">
                {currentUser?.photoURL ? (
                  <img 
                    src={currentUser.photoURL} 
                    alt="Vendor" 
                    className="h-12 w-12 rounded-full"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold">
                    {currentUser?.displayName?.charAt(0) || 'V'}
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {currentUser?.displayName || 'Vendor User'}
                  </h3>
                  <p className="text-sm text-gray-500">Shop Owner</p>
                </div>
              </div>
              
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('products')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'products'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  Products
                </button>
                
                <button
                  onClick={() => setActiveTab('shop')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'shop'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Shop Profile
                </button>
                
                <button
                  onClick={() => setActiveTab('stats')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'stats'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Statistics
                </button>
              </nav>
              
              {shopInfo && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Shop Info</h3>
                  <p className="text-sm text-gray-600">{shopInfo.name}</p>
                  <p className="text-sm text-gray-600 mt-1">{shopInfo.address}</p>
                  <Link 
                    to={`/shops/${shopInfo.id}`}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-800 inline-block"
                  >
                    View Public Shop Page
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            {/* Products Tab */}
            {activeTab === 'products' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">Manage Products</h1>
                  <button
                    onClick={() => setIsAddingProduct(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                  >
                    Add New Product
                  </button>
                </div>
                
                {products.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No products yet</h3>
                    <p className="mt-1 text-gray-500">
                      Get started by adding your first product.
                    </p>
                    <div className="mt-6">
                      <button
                        onClick={() => setIsAddingProduct(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Product
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Product
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Category
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Price
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Stock
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {products.map((product) => (
                            <tr key={product.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10">
                                    <img className="h-10 w-10 rounded-md object-cover" src={product.image} alt="" />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                    <div className="text-sm text-gray-500">ID: {product.id}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{product.category}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">₹{product.price.toLocaleString('en-IN')}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  product.stock > 5 
                                    ? 'bg-green-100 text-green-800' 
                                    : product.stock > 0
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                  className="text-blue-600 hover:text-blue-900 mr-4"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(product.id)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                
                {/* Add Product Modal */}
                {isAddingProduct && (
                  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                      <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-gray-900">Add New Product</h3>
                          <button
                            onClick={() => {
                              setIsAddingProduct(false);
                              setSelectedProduct(null);
                              setProductForm({
                                name: '',
                                price: '',
                                category: '',
                                stock: '',
                                image: ''
                              });
                            }}
                            className="text-gray-400 hover:text-gray-500"
                          >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      <div className="px-6 py-4">
                        {!selectedProduct ? (
                          <div>
                            <p className="text-sm text-gray-600 mb-4">
                              Select a product from our catalog or add a custom product.
                            </p>
                            
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                              {availableProducts.map((product) => (
                                <div
                                  key={product.id}
                                  onClick={() => handleProductSelect(product)}
                                  className="border border-gray-200 rounded-md p-2 cursor-pointer hover:border-blue-500"
                                >
                                  <div className="h-32 w-full overflow-hidden mb-2">
                                    <img 
                                      src={product.image} 
                                      alt={product.name} 
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                                  <p className="text-xs text-gray-500">{product.category}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <form onSubmit={handleAddProduct}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <div className="mb-4">
                                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Product Name
                                  </label>
                                  <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={productForm.name}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    readOnly
                                  />
                                </div>
                                
                                <div className="mb-4">
                                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                                    Category
                                  </label>
                                  <input
                                    type="text"
                                    id="category"
                                    name="category"
                                    value={productForm.category}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    readOnly
                                  />
                                </div>
                                
                                <div className="mb-4">
                                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                                    Price (₹) *
                                  </label>
                                  <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={productForm.price}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    required
                                  />
                                </div>
                                
                                <div className="mb-4">
                                  <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                                    Stock Quantity *
                                  </label>
                                  <input
                                    type="number"
                                    id="stock"
                                    name="stock"
                                    value={productForm.stock}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    required
                                  />
                                </div>
                              </div>
                              
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Product Image
                                </label>
                                <div className="h-64 w-full overflow-hidden border border-gray-300 rounded-md">
                                  <img 
                                    src={productForm.image} 
                                    alt={productForm.name} 
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-6 flex justify-end space-x-3">
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedProduct(null);
                                  setProductForm({
                                    name: '',
                                    price: '',
                                    category: '',
                                    stock: '',
                                    image: ''
                                  });
                                }}
                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                              >
                                Back
                              </button>
                              <button
                                type="submit"
                                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                Add Product
                              </button>
                            </div>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Shop Profile Tab */}
            {activeTab === 'shop' && (
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Shop Profile</h1>
                
                {shopInfo && (
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="h-64 w-full overflow-hidden">
                      <img 
                        src={shopInfo.banner} 
                        alt={shopInfo.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-gray-900 mb-2">{shopInfo.name}</h2>
                      
                      <div className="mt-4 space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Address</h3>
                          <p className="mt-1 text-sm text-gray-900">{shopInfo.address}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Contact</h3>
                          <p className="mt-1 text-sm text-gray-900">{shopInfo.phone}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">WhatsApp</h3>
                          <p className="mt-1 text-sm text-gray-900">{shopInfo.whatsapp}</p>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <button
                          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Edit Shop Profile
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Statistics Tab */}
            {activeTab === 'stats' && (
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Shop Statistics</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">Profile Views</h3>
                        <p className="text-3xl font-bold text-gray-900">1,234</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-green-100 text-green-600">
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">Total Products</h3>
                        <p className="text-3xl font-bold text-gray-900">{products.length}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">WhatsApp Inquiries</h3>
                        <p className="text-3xl font-bold text-gray-900">56</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Monthly Views</h2>
                  <div className="h-64 flex items-center justify-center">
                    <p className="text-gray-500">Analytics charts will be displayed here</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}