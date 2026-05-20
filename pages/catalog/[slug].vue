<script setup lang="ts">
import type { Product, Category, SortKey, CategorySlug } from '~/types'

const route = useRoute()
const slug = computed(() => route.params.slug as CategorySlug)

const { data: categories } = await useFetch<Category[]>('/api/categories', {
  key: 'cat-page-categories'
})

const category = computed(() =>
  categories.value?.find(c => c.slug === slug.value)
)

// 404 якщо немає такої категорії
if (!category.value) {
  throw createError({ statusCode: 404, statusMessage: 'Категорія не знайдена' })
}

useSeoMeta({
  title: () => `${category.value?.title} — ТурбоХім`,
  description: () => category.value?.description ?? ''
})

const sort = ref<SortKey>('popular')
const search = ref('')

const apiQuery = computed(() => ({
  category: slug.value,
  sort: sort.value,
  search: search.value || undefined
}))

const { data } = await useFetch<{ items: Product[]; total: number }>('/api/products', {
  query: apiQuery,
  key: `cat-${slug.value}`,
  watch: [slug]
})
</script>

<template>
  <div v-if="category">
    <!-- Hero -->
    <section class="relative border-b border-line overflow-hidden">
      <img :src="category.cover" :alt="category.title"
           class="absolute inset-0 w-full h-full object-cover opacity-30" />
      <div class="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/80 to-ink-900/40"></div>

      <div class="relative container-x py-16 md:py-24">
        <nav class="text-sm text-fog mb-4">
          <NuxtLink to="/" class="hover:text-accent">Головна</NuxtLink>
          <span class="mx-2">/</span>
          <NuxtLink to="/catalog" class="hover:text-accent">Каталог</NuxtLink>
          <span class="mx-2">/</span>
          <span class="text-white">{{ category.title }}</span>
        </nav>

        <div class="flex items-end justify-between gap-6 flex-wrap">
          <div class="max-w-2xl">
            <div class="section-eyebrow flex items-center gap-2">
              <span class="text-2xl">{{ category.icon }}</span>
              Категорія
            </div>
            <h1 class="font-display text-5xl md:text-7xl tracking-mega text-white leading-[0.95]">
              {{ category.title }}
            </h1>
            <p class="text-fog-soft mt-4 text-lg">{{ category.description }}</p>
          </div>
          <div class="card p-5 text-right">
            <div class="text-xs uppercase tracking-mega text-fog">Товарів у категорії</div>
            <div class="font-display text-5xl tracking-mega text-accent">{{ data?.total ?? 0 }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Toolbar + grid -->
    <section class="container-x py-10 md:py-16">
      <div class="flex flex-wrap items-center gap-3 mb-8">
        <input v-model="search" type="search" placeholder="Пошук у категорії..."
               class="input flex-1 min-w-[200px] max-w-md" />
        <select v-model="sort" class="input max-w-[220px]">
          <option value="popular">За популярністю</option>
          <option value="new">Спочатку нові</option>
          <option value="price-asc">Спочатку дешеві</option>
          <option value="price-desc">Спочатку дорогі</option>
          <option value="rating">За рейтингом</option>
        </select>
      </div>

      <div v-if="!data?.items.length" class="text-center py-20 card">
        <div class="text-6xl opacity-30 mb-3">📭</div>
        <div class="text-white font-display text-2xl tracking-mega">Поки що порожньо</div>
      </div>
      <ProductGrid v-else :products="data.items" />
    </section>
  </div>
</template>
