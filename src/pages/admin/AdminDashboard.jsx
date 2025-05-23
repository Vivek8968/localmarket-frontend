import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import apiService from '../../services/api';

export default function AdminDashboard() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [shops, setShops] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch users
        const usersResponse = await apiService.getUsers();
        setUsers(usersResponse.data);
        
        // Fetch shops
        const shopsResponse = await apiService.getShops(100); // Large radius to get all shops
        setShops(shopsResponse.data);
        
        // Fetch analytics
        const analyticsResponse = await apiService.getAnalytics();
        setAnalytics(analyticsResponse.data);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }
    
    try {
      await apiService.deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Failed to delete user. Please try again.');
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
                    alt="Admin" 
                    className="h-12 w-12 rounded-full"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold">
                    {currentUser?.displayName?.charAt(0) || 'A'}
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {currentUser?.displayName || 'Admin User'}
                  </h3>
                  <p className="text-sm text-gray-500">Administrator</p>
                </div>
              </div>
              
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'overview'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  Overview
                </button>
                
                <button
                  onClick={() => setActiveTab('users')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'users'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Users
                </button>
                
                <button
                  onClick={() => setActiveTab('shops')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'shops'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Shops
                </button>
                
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'analytics'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Analytics
                </button>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">Total Users</h3>
                        <p className="text-3xl font-bold text-gray-900">{analytics?.totalUsers || users.length}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-green-100 text-green-600">
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">Total Shops</h3>
                        <p className="text-3xl font-bold text-gray-900">{analytics?.totalVendors || shops.length}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">Total Products</h3>
                        <p className="text-3xl font-bold text-gray-900">{analytics?.totalProducts || '320'}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
                  
                  <div className="overflow-hidden">
                    <ul className="divide-y divide-gray-200">
                      {(analytics?.recentActivity || [
                        { id: 1, action: 'User Registration', timestamp: '2023-06-15T10:30:00Z' },
                        { id: 2, action: 'New Shop Added', timestamp: '2023-06-14T14:45:00Z' },
                        { id: 3, action: 'Product Updated', timestamp: '2023-06-14T09:15:00Z' },
                      ]).map((activity) => (
                        <li key={activity.id} className="py-4">
                          <div className="flex space-x-3">
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium text-gray-900">{activity.action}</h3>
                                <p className="text-sm text-gray-500">
                                  {new Date(activity.timestamp).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {/* Users Tab */}
            {activeTab === 'users' && (
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Manage Users</h1>
                
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            User
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Contact
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Role
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                          <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  {user.photoURL ? (
                                    <img className="h-10 w-10 rounded-full" src={user.photoURL} alt="" />
                                  ) : (
                                    <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                                      {user.name?.charAt(0) || 'U'}
                                    </div>
                                  )}
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                  <div className="text-sm text-gray-500">ID: {user.id}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{user.email}</div>
                              <div className="text-sm text-gray-500">{user.phone}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                user.role === 'admin' 
                                  ? 'bg-purple-100 text-purple-800' 
                                  : user.role === 'vendor'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => handleDeleteUser(user.id)}
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
              </div>
            )}
            
            {/* Shops Tab */}
            {activeTab === 'shops' && (
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Manage Shops</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {shops.map((shop) => (
                    <div key={shop.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="h-40 w-full overflow-hidden">
                        <img 
                          src={shop.banner} 
                          alt={shop.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-medium text-gray-900 mb-1">{shop.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{shop.address}</p>
                        
                        <div className="flex justify-between items-center">
                          <Link 
                            to={`/shops/${shop.id}`}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            View Details
                          </Link>
                          <button
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Delete Shop
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Analytics</h1>
                
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">User Growth</h2>
                  <div className="h-64 flex items-center justify-center">
                    <p className="text-gray-500">Analytics charts will be displayed here</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Popular Categories</h2>
                    <div className="h-48 flex items-center justify-center">
                      <p className="text-gray-500">Category distribution chart</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Shop Distribution</h2>
                    <div className="h-48 flex items-center justify-center">
                      <p className="text-gray-500">Shop location map</p>
                    </div>
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