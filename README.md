# 🛒 LocalMarket Frontend

A modern, responsive hyperlocal marketplace frontend built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Firebase Authentication**.

## 🌟 Features

### 🔐 Authentication
- **Phone Number Login** with OTP verification
- **Google OAuth** integration
- Session management with persistent login state
- Responsive authentication modals

### 🛍️ E-commerce Functionality
- **Product Catalog** with category navigation
- **Advanced Search** with filter tabs (All/Shops/Products)
- **Product Detail Pages** with shop comparison
- **Category & Subcategory** browsing with filters
- **Price Range**, **Brand**, and **Stock Status** filters
- **Sorting Options** (Price, Rating, Newest)

### 🎨 User Experience
- **Responsive Design** for all device sizes
- **Lazy Loading** for optimal performance
- **SEO Optimization** with meta tags and sitemaps
- **404 Error Handling** with helpful navigation
- **Loading States** and smooth transitions

### ⚡ Performance
- **Next.js 14** with App Router
- **Image Optimization** with lazy loading
- **Code Splitting** and bundle optimization
- **Security Headers** and CSP configuration

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18.0 or higher
- **npm** or **yarn**
- **Firebase Project** with Authentication enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Vivek8968/localmarket-frontend.git
   cd localmarket-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your Firebase configuration:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Firebase Setup

1. **Create a Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or use existing one

2. **Enable Authentication**
   - Navigate to Authentication > Sign-in method
   - Enable **Phone** and **Google** providers
   - Configure authorized domains

3. **Get Configuration**
   - Go to Project Settings > General
   - Copy the Firebase config object
   - Add values to `.env.local`

### Detailed Setup Guide
See [FIREBASE_AUTH_SETUP.md](./FIREBASE_AUTH_SETUP.md) for complete Firebase configuration instructions.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── category/          # Category pages
│   ├── product/           # Product detail pages
│   ├── search/            # Search results page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── not-found.tsx      # 404 page
│   ├── sitemap.ts         # SEO sitemap
│   └── robots.ts          # SEO robots.txt
├── components/            # Reusable components
│   ├── auth/             # Authentication components
│   ├── ui/               # UI components
│   ├── Header.tsx        # Main header
│   ├── ProductCard.tsx   # Product display
│   └── LazyImage.tsx     # Optimized images
├── contexts/             # React contexts
│   └── AuthContext.tsx   # Authentication state
├── lib/                  # Utilities and config
│   ├── firebase.ts       # Firebase configuration
│   └── api.ts           # API utilities
└── types/               # TypeScript definitions
    └── index.ts         # Type definitions
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Type checking
npm run type-check   # Check TypeScript types
```

## 🌐 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main

### Other Platforms
1. Build the project: `npm run build`
2. Upload the `.next` folder and other required files
3. Set environment variables
4. Start with: `npm start`

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Mobile** (320px+)
- **Tablet** (768px+)
- **Desktop** (1024px+)
- **Large screens** (1440px+)

## 🔒 Security Features

- **Firebase Authentication** with secure token management
- **Input validation** and sanitization
- **CSRF protection** with Next.js built-in security
- **Content Security Policy** headers
- **Secure session management**

## 📊 Performance Optimizations

- **Image lazy loading** with Next.js Image component
- **Code splitting** with dynamic imports
- **Bundle optimization** with webpack
- **Caching strategies** for static assets
- **SEO optimization** with meta tags

## 🧪 Testing

The application includes:
- **TypeScript** for type safety
- **ESLint** for code quality
- **Responsive design** testing
- **Authentication flow** testing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the [Firebase Auth Setup Guide](./FIREBASE_AUTH_SETUP.md)
- Review the [Implementation Summary](./IMPLEMENTATION_SUMMARY.md)

## 🎯 Features Roadmap

- [ ] User profiles and preferences
- [ ] Shopping cart functionality
- [ ] Order management
- [ ] Payment integration
- [ ] Real-time notifications
- [ ] Advanced analytics
- [ ] Multi-language support

---

**Built with ❤️ using Next.js, TypeScript, and Firebase**