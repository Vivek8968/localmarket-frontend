import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: Phone input, 2: OTP verification
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { signInWithPhone, verifyOTP, signInWithGoogle, signInWithApple } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the redirect path from location state or default to home
  const from = location.state?.from?.pathname || '/';
  
  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    
    if (!phoneNumber.trim()) {
      setError('Please enter your phone number');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      // In a real app, this would trigger SMS verification
      await signInWithPhone(phoneNumber);
      
      setStep(2);
    } catch (err) {
      console.error('Error sending OTP:', err);
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    
    if (!otp.trim()) {
      setError('Please enter the OTP');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      // Verify OTP
      await verifyOTP(otp);
      
      // Redirect to the page user was trying to access or home
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Error verifying OTP:', err);
      setError('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      
      await signInWithGoogle();
      
      // Redirect to the page user was trying to access or home
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Error signing in with Google:', err);
      setError('Failed to sign in with Google. Please try again.');
      setLoading(false);
    }
  };
  
  const handleAppleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      
      await signInWithApple();
      
      // Redirect to the page user was trying to access or home
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Error signing in with Apple:', err);
      setError('Failed to sign in with Apple. Please try again.');
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <svg className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to LocalMarket
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          )}
          
          {step === 1 ? (
            // Phone Number Form
            <form className="space-y-6" onSubmit={handlePhoneSubmit}>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="mt-1">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    placeholder="+91 98765 43210"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  We'll send you a one-time password to verify your phone number
                </p>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending OTP...' : 'Send OTP'}
                </button>
              </div>
            </form>
          ) : (
            // OTP Verification Form
            <form className="space-y-6" onSubmit={handleOtpSubmit}>
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                  One-Time Password
                </label>
                <div className="mt-1">
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    required
                    placeholder="Enter 6-digit OTP"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Enter the OTP sent to {phoneNumber}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  Change phone number
                </button>
                <button
                  type="button"
                  onClick={handlePhoneSubmit}
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  Resend OTP
                </button>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
              </div>
            </form>
          )}

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                  </svg>
                  <span className="ml-2">Google</span>
                </button>
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleAppleSignIn}
                  disabled={loading}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z" />
                  </svg>
                  <span className="ml-2">Apple</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}