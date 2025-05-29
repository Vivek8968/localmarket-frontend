/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'via.placeholder.com'],
  },
  serverExternalPackages: ['firebase'],
}

module.exports = nextConfig