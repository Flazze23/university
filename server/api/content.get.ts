import { reviews, faq, banners } from './_content'

export default defineEventHandler(() => {
  return { reviews, faq, banners }
})
