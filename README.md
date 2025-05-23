# LocalMarket Frontend

A premium-quality, production-ready frontend website for an Organised Local Market platform. This website connects to an existing backend (Python + FastAPI + MySQL + Firebase + AWS S3) and will eventually integrate with a mobile Android app as well.

## Features

- **Homepage**: Display list of shops sorted by distance from user
- **Shop Detail Page**: Banner, name, address, WhatsApp CTA, and product listings
- **Product Discovery**: Search and filter by product name/category/location/shop
- **Authentication**: OTP-based phone login, Gmail, and Apple ID using Firebase Auth
- **Admin Panel**: Monitor vendors and customers, view/delete shops and users
- **Vendor Catalogue Management**: Manage shop and inventory

## Tech Stack

- **Frontend Framework**: React.js with Vite
- **Styling**: Tailwind CSS
- **API Integration**: Axios
- **Routing**: React Router
- **Authentication**: Firebase Authentication
- **Geolocation**: Browser's Geolocation API

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Vivek8968/hyperlocalbymanus.git
   cd hyperlocalbymanus-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   VITE_API_URL=http://localhost:8000/api
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Backend Connection

This frontend is designed to connect to a Python FastAPI backend. The API service is configured to work with both development (mock data) and production environments.

### Development Mode

In development mode, the application uses mock data for testing and development purposes. No actual API calls are made to the backend.

### Production Mode

In production mode, the application connects to the actual backend API. Make sure to set the correct API URL in the `.env` file.

## Folder Structure

```
src/
├── assets/         # Static assets like images, fonts, etc.
├── components/     # Reusable UI components
├── context/        # React context providers
├── hooks/          # Custom React hooks
├── pages/          # Page components
│   ├── admin/      # Admin dashboard pages
│   ├── auth/       # Authentication pages
│   └── vendor/     # Vendor dashboard pages
├── services/       # API and external services
├── utils/          # Utility functions
├── App.jsx         # Main application component
└── main.jsx        # Entry point
```

## Deployment

To build the application for production:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory, ready to be deployed to a static hosting service like Vercel, Netlify, or AWS S3.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspired by Myntra.com
- Icons from Heroicons
- Mock images from Unsplash
