import { products } from './_products'
import type { Product, SortKey, CategorySlug, ProductBadge } from '~/types'

export default defineEventHandler((event): { items: Product[]; total: number } => {
  const q = getQuery(event)

  let result: Product[] = [...products]

  // Фільтр за категорією
  if (q.category && typeof q.category === 'string') {
    result = result.filter(p => p.category === (q.category as CategorySlug))
  }

  // Бренди
  if (q.brands && typeof q.brands === 'string') {
    const list = q.brands.split(',').filter(Boolean)
    if (list.length) result = result.filter(p => list.includes(p.brand))
  }

  // Ціна
  const min = q.priceMin ? Number(q.priceMin) : undefined
  const max = q.priceMax ? Number(q.priceMax) : undefined
  if (min !== undefined && !Number.isNaN(min)) result = result.filter(p => p.price >= min)
  if (max !== undefined && !Number.isNaN(max)) result = result.filter(p => p.price <= max)

  // Лише в наявності
  if (q.inStockOnly === 'true') result = result.filter(p => p.inStock)

  // Бейдж
  if (q.badge && typeof q.badge === 'string') {
    result = result.filter(p => p.badges.includes(q.badge as ProductBadge))
  }

  // Пошук
  if (q.search && typeof q.search === 'string') {
    const s = q.search.toLowerCase().trim()
    if (s.length >= 2) {
      result = result.filter(
        p =>
          p.title.toLowerCase().includes(s) ||
          p.brand.toLowerCase().includes(s) ||
          p.shortDescription.toLowerCase().includes(s)
      )
    }
  }

  // Сортування
  const sort = (q.sort as SortKey) ?? 'popular'
  switch (sort) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price); break
    case 'price-desc':
      result.sort((a, b) => b.price - a.price); break
    case 'rating':
      result.sort((a, b) => b.rating - a.rating); break
    case 'new':
      result.sort(
        (a, b) => Number(b.badges.includes('new')) - Number(a.badges.includes('new'))
      ); break
    case 'popular':
    default:
      result.sort((a, b) => b.reviewsCount - a.reviewsCount); break
  }

  return { items: result, total: result.length }
})
