<script setup lang="ts">
import type { Product, Category, Review, Banner } from '~/types'

useSeoMeta({
  title: 'ТурбоХім — Преміальна автохімія №1 в Україні',
  description: 'Інтернет-магазин професійної автохімії: 7 категорій, понад 50 товарів, доставка по Україні від 24 годин.'
})

// Парадельне завантаження даних (SSR)
const [{ data: catalog }, { data: categories }, { data: content }] = await Promise.all([
  useFetch<{ items: Product[] }>('/api/products', { key: 'home-products' }),
  useFetch<Category[]>('/api/categories', { key: 'home-categories' }),
  useFetch<{ reviews: Review[]; banners: Banner[] }>('/api/content', { key: 'home-content' })
])

const allProducts = computed(() => catalog.value?.items ?? [])
const hits = computed(() => allProducts.value.filter(p => p.badges.includes('hit')).slice(0, 8))
const novelties = computed(() => allProducts.value.filter(p => p.badges.includes('new')).slice(0, 8))
const popular = computed(() => [...allProducts.value].sort((a, b) => b.reviewsCount - a.reviewsCount).slice(0, 4))
</script>

<template>
  <div>
    <!-- Hero slider -->
    <HeroSlider v-if="content?.banners" :banners="content.banners" />

    <!-- USP marquee -->
    <Marquee />

    <!-- Categories -->
    <section class="container-x py-16 md:py-24">
      <SectionTitle
        eyebrow="Каталог / 7 категорій"
        title="Знайди свій продукт"
        subtitle="Від базового шампуню до професійного керамічного покриття — усе для догляду за авто."
        :link="{ label: 'Усі категорії', to: '/catalog' }"
      />
      <CategoryGrid v-if="categories" :categories="categories" />
    </section>

    <!-- Promo -->
    <PromoStrip />

    <!-- Хіти -->
    <section class="container-x py-16 md:py-24">
      <SectionTitle
        eyebrow="🔥 Хіт продажів"
        title="Бестселери магазину"
        subtitle="Топ продукти, які найчастіше замовляють наші клієнти."
        :link="{ label: 'Усі хіти', to: '/catalog?badge=hit' }"
      />
      <ProductGrid :products="hits" />
    </section>

    <!-- Popular hero block -->
    <section class="bg-ink-800 border-y border-line py-16 md:py-24">
      <div class="container-x">
        <SectionTitle
          eyebrow="Найпопулярніше"
          title="Що обирають інші"
          subtitle="Найбільш обговорювані товари за останній місяць."
        />
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard v-for="p in popular" :key="p.id" :product="p" />
        </div>
      </div>
    </section>

    <!-- Новинки -->
    <section class="container-x py-16 md:py-24">
      <SectionTitle
        eyebrow="✨ Тільки прибуло"
        title="Новинки 2026"
        subtitle="Свіжа лінійка — графенові покриття, біорозкладні шампуні та інновації."
        :link="{ label: 'Усі новинки', to: '/catalog?badge=new' }"
      />
      <ProductGrid :products="novelties" />
    </section>

    <!-- Reviews -->
    <section class="container-x py-16 md:py-24">
      <SectionTitle
        eyebrow="⭐ Соціальний доказ"
        title="Відгуки клієнтів"
        subtitle="Понад 12 000 покупок та 4.9 з 5 за рейтингом задоволеності."
        :link="{ label: 'Усі відгуки', to: '/reviews' }"
      />
      <ReviewCarousel v-if="content?.reviews" :reviews="content.reviews" />
    </section>

    <!-- Trust section -->
    <section class="container-x py-16 md:py-24">
      <div class="grid md:grid-cols-4 gap-4">
        <div v-for="(stat, i) in [
          { num: '12 000+', label: 'клієнтів довірились' },
          { num: '50+', label: 'товарів у каталозі' },
          { num: '24 год', label: 'середній час доставки' },
          { num: '4.9 / 5', label: 'рейтинг магазину' }
        ]" :key="i" class="card p-6 text-center">
          <div class="font-display text-4xl md:text-5xl tracking-mega text-accent mb-2">{{ stat.num }}</div>
          <div class="text-fog text-sm uppercase tracking-mega">{{ stat.label }}</div>
        </div>
      </div>
    </section>
  </div>
</template>
