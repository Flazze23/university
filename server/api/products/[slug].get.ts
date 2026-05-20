import { products } from './_products'
import type { Product } from '~/types'

export default defineEventHandler((event): Product => {
  const slug = getRouterParam(event, 'slug')
  const product = products.find(p => p.slug === slug)
  if (!product) {
    throw createError({ statusCode: 404, statusMessage: 'Товар не знайдено' })
  }
  return product
})
