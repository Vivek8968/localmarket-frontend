import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import ShopsPage from './pages/ShopsPage';
import ShopDetailPage from './pages/ShopDetailPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import SearchResultsPage from './pages/SearchResultsPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import VendorDashboard from './pages/vendor/VendorDashboard';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const isAuthenticated = localStorage.getItem('mockUser') !== null;
  const userRole = JSON.parse(localStorage.getItem('mockUser') || '{}')?.role || 'customer';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/shops" element={<ShopsPage />} />
              <Route path="/shops/:id" element={<ShopDetailPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/search" element={<SearchResultsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Protected Routes */}
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/vendor/dashboard" 
                element={
                  <ProtectedRoute requiredRole="vendor">
                    <VendorDashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Fallback Route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
