export interface Shop {
  id: string;
  name: string;
  address: string;
  logo?: string;
  image?: string;
  phone: string;
  whatsapp?: string;
  location: {
    latitude: number;
    longitude: number;
  };
  categories: string[];
  rating?: number;
  isOpen?: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  subcategory?: string;
  shopId: string;
  shop?: Shop;
  inStock: boolean;
  brand?: string;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  categoryId: string;
}

export interface SearchResult {
  shops: Shop[];
  products: Product[];
}

export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
}