import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://localmarket.com'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ]

  // Category pages
  const categories = ['electronics', 'batteries']
  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/category/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Subcategory pages
  const subcategories = [
    { category: 'electronics', subcategory: 'mobile-phones' },
    { category: 'electronics', subcategory: 'laptops' },
    { category: 'electronics', subcategory: 'televisions' },
    { category: 'electronics', subcategory: 'accessories' },
    { category: 'batteries', subcategory: 'car-batteries' },
    { category: 'batteries', subcategory: 'two-wheeler-batteries' },
    { category: 'batteries', subcategory: 'inverter-batteries' },
  ]

  const subcategoryPages = subcategories.map(({ category, subcategory }) => ({
    url: `${baseUrl}/category/${category}/${subcategory}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  // Product pages (mock data - in production, fetch from API)
  const products = ['p1', 'p2', 'p3', 'p4', 'p5']
  const productPages = products.map((productId) => ({
    url: `${baseUrl}/product/${productId}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }))

  return [...staticPages, ...categoryPages, ...subcategoryPages, ...productPages]
}