# Firebase Authentication Setup Guide

This guide explains how to set up Firebase authentication for the LocalMarket frontend application.

## 🔥 Firebase Authentication Features Implemented

✅ **Phone Number Authentication with OTP**
- Send OTP to phone numbers with country code
- Verify OTP using Firebase's `confirmationResult.confirm()`
- reCAPTCHA verification for security

✅ **Google OAuth Authentication**
- Sign in with Google using popup flow
- Automatic user profile retrieval

✅ **Session Management**
- Persistent login state using localStorage
- Automatic session restoration on page reload
- Secure logout functionality

✅ **UI Integration**
- Login button in header (desktop & mobile)
- User profile display with avatar/initials
- Welcome message with user name
- Logout functionality

## 🚀 Setup Instructions

### 1. Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable **Phone** authentication
   - Enable **Google** authentication
   - Add your domain to authorized domains

### 2. Get Firebase Configuration

1. Go to Project Settings > General
2. Scroll down to "Your apps" section
3. Click "Add app" > Web app
4. Copy the Firebase config object

### 3. Environment Variables

Update `.env.local` with your Firebase configuration:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

### 4. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project
3. Go to APIs & Services > Credentials
4. Configure OAuth consent screen
5. Add authorized domains (including localhost for development)

### 5. Phone Authentication Setup

1. In Firebase Console > Authentication > Sign-in method
2. Click on Phone and enable it
3. Add test phone numbers if needed for development
4. Configure reCAPTCHA settings

## 🔧 Technical Implementation

### File Structure
```
src/
├── lib/
│   └── firebase.ts              # Firebase configuration
├── contexts/
│   └── AuthContext.tsx          # Authentication context
├── components/
│   ├── auth/
│   │   ├── AuthModal.tsx        # Main auth modal
│   │   ├── PhoneAuth.tsx        # Phone OTP component
│   │   └── GoogleAuth.tsx       # Google OAuth component
│   └── Header.tsx               # Updated with auth UI
├── types/
│   └── global.d.ts              # TypeScript declarations
└── app/
    └── layout.tsx               # Wrapped with AuthProvider
```

### Key Components

#### AuthContext
- Manages global authentication state
- Provides `user`, `loading`, and `logout` functions
- Handles session persistence with localStorage
- Listens to Firebase auth state changes

#### PhoneAuth Component
- Phone number input with country code
- OTP verification flow
- reCAPTCHA integration
- Error handling for invalid OTP

#### GoogleAuth Component
- Google sign-in popup
- Automatic profile data extraction
- Error handling for popup blocked/cancelled

#### Header Integration
- Shows login button when not authenticated
- Displays user profile when authenticated
- Responsive design for mobile and desktop
- Logout functionality

## 🎯 Usage

### For Users
1. Click "Login" button in header
2. Choose between Phone or Google authentication
3. For Phone: Enter number → Verify OTP
4. For Google: Click "Continue with Google" → Authorize
5. User profile appears in header with logout option

### For Developers
```tsx
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, loading, logout } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  if (user) {
    return (
      <div>
        Welcome, {user.displayName}!
        <button onClick={logout}>Logout</button>
      </div>
    );
  }
  
  return <div>Please log in</div>;
}
```

## 🔒 Security Features

- **reCAPTCHA Protection**: Prevents automated phone number abuse
- **Firebase Security Rules**: Server-side validation
- **Session Management**: Secure token handling
- **Error Handling**: Proper error messages without exposing sensitive data

## 🐛 Troubleshooting

### Common Issues

1. **reCAPTCHA not working**
   - Check if domain is added to Firebase authorized domains
   - Ensure reCAPTCHA is enabled in Firebase console

2. **Google OAuth popup blocked**
   - Check browser popup settings
   - Ensure domain is in Google OAuth authorized origins

3. **Phone OTP not received**
   - Verify phone number format includes country code
   - Check Firebase quota limits
   - Ensure phone authentication is enabled

4. **Session not persisting**
   - Check localStorage permissions
   - Verify Firebase config is correct

### Development Tips

- Use test phone numbers in Firebase for development
- Check browser console for detailed error messages
- Test on different devices and browsers
- Monitor Firebase Authentication logs

## 📱 Mobile Considerations

- Responsive design works on all screen sizes
- Touch-friendly button sizes
- Mobile-optimized modal layouts
- Proper keyboard handling for OTP input

## 🚀 Production Deployment

1. Update authorized domains in Firebase
2. Configure proper CORS settings
3. Set up proper error monitoring
4. Test authentication flow thoroughly
5. Monitor Firebase usage and quotas

## 📊 Analytics & Monitoring

Firebase provides built-in analytics for authentication:
- Sign-in success/failure rates
- Popular authentication methods
- User retention metrics
- Error tracking

Access these in Firebase Console > Analytics and Authentication sections.