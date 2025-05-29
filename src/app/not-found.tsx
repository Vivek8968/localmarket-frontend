import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-gray-400 text-9xl font-bold mb-4">404</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or doesn't exist.
        </p>
        
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors duration-200 font-medium"
          >
            Go Back Home
          </Link>
          
          <div className="text-sm text-gray-500">
            <p>Or try searching for what you need:</p>
            <div className="mt-4 space-y-2">
              <Link href="/category/electronics" className="block text-primary-600 hover:text-primary-700">
                📱 Electronics
              </Link>
              <Link href="/category/batteries" className="block text-primary-600 hover:text-primary-700">
                🔋 Batteries
              </Link>
              <Link href="/search?q=iphone" className="block text-primary-600 hover:text-primary-700">
                🔍 Search for iPhone
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}