<script setup lang="ts">
import type { Product, Category, SortKey, ProductBadge } from '~/types'

useSeoMeta({
  title: 'Каталог автохімії — ТурбоХім',
  description: 'Понад 50 товарів автохімії: шампуні, поліролі, очищувачі салону, аксесуари. Фільтрація, сортування, швидка доставка.'
})

const route = useRoute()

// Стан фільтрів
const filters = reactive({
  search: '' as string,
  sort: 'popular' as SortKey,
  brands: [] as string[],
  priceMin: 0,
  priceMax: 5000,
  inStockOnly: false,
  badge: (route.query.badge as ProductBadge | undefined) ?? undefined
})

// Реактивний computed-параметр для API
const apiQuery = computed(() => ({
  search: filters.search || undefined,
  sort: filters.sort,
  brands: filters.brands.length ? filters.brands.join(',') : undefined,
  priceMin: filters.priceMin || undefined,
  priceMax: filters.priceMax < 5000 ? filters.priceMax : undefined,
  inStockOnly: filters.inStockOnly ? 'true' : undefined,
  badge: filters.badge
}))

const { data: catalogData } = await useFetch<{ items: Product[]; total: number }>(
  '/api/products',
  { query: apiQuery, key: 'catalog-list' }
)

const { data: categories } = await useFetch<Category[]>('/api/categories', {
  key: 'catalog-categories'
})

const items = computed(() => catalogData.value?.items ?? [])
const total = computed(() => catalogData.value?.total ?? 0)

// Список доступних брендів (з усього каталогу — потрібен окремий fetch без фільтрів)
const { data: allProducts } = await useFetch<{ items: Product[] }>('/api/products', {
  key: 'catalog-all-brands'
})
const allBrands = computed(() => {
  const set = new Set<string>()
  for (const p of allProducts.value?.items ?? []) set.add(p.brand)
  return [...set].sort()
})

const toggleBrand = (brand: string) => {
  const i = filters.brands.indexOf(brand)
  if (i >= 0) filters.brands.splice(i, 1)
  else filters.brands.push(brand)
}

const resetFilters = () => {
  filters.search = ''
  filters.brands = []
  filters.priceMin = 0
  filters.priceMax = 5000
  filters.inStockOnly = false
  filters.badge = undefined
}

const filtersOpen = ref(false)
</script>

<template>
  <div class="container-x py-10 md:py-16">
    <!-- Breadcrumbs + title -->
    <nav class="text-sm text-fog mb-4">
      <NuxtLink to="/" class="hover:text-accent">Головна</NuxtLink>
      <span class="mx-2">/</span>
      <span class="text-white">Каталог</span>
    </nav>

    <div class="flex items-end justify-between gap-6 mb-8 md:mb-12">
      <div>
        <h1 class="font-display text-4xl md:text-6xl tracking-mega text-white">Каталог</h1>
        <p class="text-fog mt-2">Знайдено: <span class="text-white">{{ total }}</span> товарів</p>
      </div>
    </div>

    <!-- Категорії - чіпи -->
    <div class="mb-8 -mx-4 sm:mx-0 px-4 sm:px-0 overflow-x-auto">
      <div class="flex gap-2 min-w-max">
        <NuxtLink to="/catalog" class="chip border-accent text-white bg-accent">
          Усі товари
        </NuxtLink>
        <NuxtLink
          v-for="cat in categories"
          :key="cat.slug"
          :to="`/catalog/${cat.slug}`"
          class="chip hover:border-accent hover:text-accent transition"
        >
          {{ cat.icon }} {{ cat.title }}
        </NuxtLink>
      </div>
    </div>

    <!-- Toolbar -->
    <div class="flex flex-wrap items-center gap-3 mb-6">
      <input
        v-model="filters.search"
        type="search"
        placeholder="Пошук у каталозі..."
        class="input flex-1 min-w-[200px] max-w-md"
      />

      <select v-model="filters.sort" class="input max-w-[200px]">
        <option value="popular">За популярністю</option>
        <option value="new">Спочатку нові</option>
        <option value="price-asc">Спочатку дешеві</option>
        <option value="price-desc">Спочатку дорогі</option>
        <option value="rating">За рейтингом</option>
      </select>

      <button @click="filtersOpen = !filtersOpen" class="btn-ghost lg:hidden">
        ⚙ Фільтри
      </button>
    </div>

    <div class="grid lg:grid-cols-[260px_1fr] gap-8">
      <!-- Sidebar filters -->
      <aside
        class="space-y-6"
        :class="filtersOpen ? 'block' : 'hidden lg:block'"
      >
        <!-- Бренди -->
        <div class="card p-5">
          <div class="text-white font-display tracking-mega text-lg mb-4">Бренди</div>
          <div class="space-y-2 max-h-60 overflow-y-auto">
            <label v-for="b in allBrands" :key="b"
              class="flex items-center gap-2 text-sm cursor-pointer hover:text-white text-fog-soft">
              <input
                type="checkbox"
                :checked="filters.brands.includes(b)"
                @change="toggleBrand(b)"
                class="accent-accent w-4 h-4"
              />
              {{ b }}
            </label>
          </div>
        </div>

        <!-- Price -->
        <div class="card p-5">
          <div class="text-white font-display tracking-mega text-lg mb-4">Ціна, ₴</div>
          <div class="flex gap-2 mb-3">
            <input v-model.number="filters.priceMin" type="number" class="input text-sm" placeholder="Від" />
            <input v-model.number="filters.priceMax" type="number" class="input text-sm" placeholder="До" />
          </div>
          <input
            v-model.number="filters.priceMax"
            type="range"
            min="0"
            max="5000"
            step="100"
            class="w-full accent-accent"
          />
          <div class="text-xs text-fog mt-1">До {{ filters.priceMax }} грн</div>
        </div>

        <!-- Stock + badge -->
        <div class="card p-5 space-y-3">
          <label class="flex items-center gap-2 text-sm cursor-pointer text-fog-soft hover:text-white">
            <input v-model="filters.inStockOnly" type="checkbox" class="accent-accent w-4 h-4" />
            Лише в наявності
          </label>

          <div class="pt-3 border-t border-line">
            <div class="text-xs uppercase tracking-mega text-fog mb-2">Бейджі</div>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="b in [
                  { id: 'hit' as ProductBadge, label: 'Хіт' },
                  { id: 'new' as ProductBadge, label: 'Новинка' },
                  { id: 'sale' as ProductBadge, label: 'Знижка' }
                ]"
                :key="b.id"
                @click="filters.badge = filters.badge === b.id ? undefined : b.id"
                class="chip transition"
                :class="filters.badge === b.id
                  ? 'bg-accent border-accent text-white'
                  : 'hover:border-accent'"
              >
                {{ b.label }}
              </button>
            </div>
          </div>
        </div>

        <button @click="resetFilters" class="btn-ghost w-full">Скинути фільтри</button>
      </aside>

      <!-- Results -->
      <div>
        <div v-if="items.length === 0" class="text-center py-20 card">
          <div class="text-6xl opacity-30 mb-3">📭</div>
          <div class="text-white font-display text-2xl tracking-mega mb-2">Нічого не знайдено</div>
          <div class="text-fog mb-6">Спробуйте змінити фільтри або скинути їх.</div>
          <button @click="resetFilters" class="btn-primary">Скинути фільтри</button>
        </div>
        <ProductGrid v-else :products="items" />
      </div>
    </div>
  </div>
</template>
