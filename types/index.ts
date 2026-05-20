// ============================================================================
// Доменна модель ТурбоХім
// ============================================================================

export type CategorySlug =
  | 'shampoo'
  | 'polish'
  | 'interior'
  | 'wheels'
  | 'protection'
  | 'engine'
  | 'accessories'

export interface Category {
  slug: CategorySlug
  title: string
  shortTitle: string
  description: string
  icon: string // emoji або id для SVG
  cover: string
}

export type ProductBadge = 'hit' | 'new' | 'sale'

export interface Product {
  id: string
  slug: string
  title: string
  brand: string
  category: CategorySlug
  price: number // у грн
  oldPrice?: number
  rating: number // 0..5
  reviewsCount: number
  inStock: boolean
  volume?: string
  badges: ProductBadge[]
  shortDescription: string
  description: string
  features: string[]
  image: string
  gallery: string[]
}

export interface CartItem {
  productId: string
  qty: number
}

export interface Review {
  id: string
  author: string
  city: string
  rating: number
  date: string // ISO
  text: string
  productSlug?: string
}

export interface FaqItem {
  q: string
  a: string
}

export interface Banner {
  id: string
  eyebrow: string
  title: string
  subtitle: string
  ctaLabel: string
  ctaHref: string
  image: string
  accent?: string
}

// Discriminated union для асинхронних станів — як ти любиш у TS
export type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string }

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string
  joinedAt: string
}

export interface Order {
  id: string
  number: string
  date: string
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled'
  total: number
  itemsCount: number
}

export type SortKey =
  | 'popular'
  | 'price-asc'
  | 'price-desc'
  | 'rating'
  | 'new'

export interface CatalogFilters {
  category?: CategorySlug
  brands: string[]
  priceMin?: number
  priceMax?: number
  inStockOnly: boolean
  badge?: ProductBadge
  search?: string
  sort: SortKey
}
