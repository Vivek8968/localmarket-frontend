import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ShoppingBagIcon, UserIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="container-custom">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/" className="flex items-center">
                    <ShoppingBagIcon className="h-8 w-8 text-blue-600" />
                    <span className="ml-2 text-xl font-bold text-gray-900">LocalMarket</span>
                  </Link>
                </div>
                
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <Link to="/" className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-blue-600">
                      Home
                    </Link>
                    <Link to="/shops" className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-blue-600">
                      Shops
                    </Link>
                    <Link to="/products" className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-blue-600">
                      Products
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Search form */}
                <form onSubmit={handleSearch} className="hidden md:block mr-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-64 py-1.5 pl-3 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-blue-600"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>
                </form>
                
                {/* Profile dropdown */}
                {currentUser ? (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        <span className="sr-only">Open user menu</span>
                        {currentUser.photoURL ? (
                          <img
                            className="h-8 w-8 rounded-full"
                            src={currentUser.photoURL}
                            alt="User profile"
                          />
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                            <UserIcon className="h-5 w-5" />
                          </div>
                        )}
                      </Menu.Button>
                    </div>
                    <Transition
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/profile"
                              className={`${
                                active ? 'bg-gray-100' : ''
                              } block px-4 py-2 text-sm text-gray-700`}
                            >
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                        {currentUser.role === 'vendor' && (
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/vendor/dashboard"
                                className={`${
                                  active ? 'bg-gray-100' : ''
                                } block px-4 py-2 text-sm text-gray-700`}
                              >
                                Vendor Dashboard
                              </Link>
                            )}
                          </Menu.Item>
                        )}
                        {currentUser.role === 'admin' && (
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/admin/dashboard"
                                className={`${
                                  active ? 'bg-gray-100' : ''
                                } block px-4 py-2 text-sm text-gray-700`}
                              >
                                Admin Dashboard
                              </Link>
                            )}
                          </Menu.Item>
                        )}
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={`${
                                active ? 'bg-gray-100' : ''
                              } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <Link
                    to="/login"
                    className="ml-3 inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Sign in
                  </Link>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <Disclosure.Button
                as={Link}
                to="/"
                className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-600"
              >
                Home
              </Disclosure.Button>
              <Disclosure.Button
                as={Link}
                to="/shops"
                className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-600"
              >
                Shops
              </Disclosure.Button>
              <Disclosure.Button
                as={Link}
                to="/products"
                className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-600"
              >
                Products
              </Disclosure.Button>
              
              {/* Mobile search form */}
              <form onSubmit={handleSearch} className="px-2 py-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full py-1.5 pl-3 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-blue-600"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}