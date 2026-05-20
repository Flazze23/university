<script setup lang="ts">
import type { Product } from '~/types'
import { formatUAH } from '~/utils/format'
import { useCartStore } from '~/stores/cart'
import { useUIStore } from '~/stores/ui'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const { data: product } = await useFetch<Product>(`/api/products/${slug.value}`, {
  key: `product-${slug.value}`
})

if (!product.value) {
  throw createError({ statusCode: 404, statusMessage: 'Товар не знайдено' })
}

useSeoMeta({
  title: () => `${product.value?.title} — ТурбоХім`,
  description: () => product.value?.shortDescription ?? ''
})

// Схожі товари (та сама категорія)
const { data: relatedData } = await useFetch<{ items: Product[] }>('/api/products', {
  query: { category: product.value.category },
  key: `related-${slug.value}`
})
const related = computed(() =>
  (relatedData.value?.items ?? []).filter(p => p.id !== product.value?.id).slice(0, 4)
)

const cart = useCartStore()
const ui = useUIStore()

const qty = ref(1)
const activeImage = ref(0)

const gallery = computed(() => product.value?.gallery ?? [product.value?.image ?? ''])

const discount = computed(() => {
  if (!product.value?.oldPrice) return 0
  return Math.round(((product.value.oldPrice - product.value.price) / product.value.oldPrice) * 100)
})

const stars = computed(() => {
  if (!product.value) return { full: 0, half: false, empty: 5 }
  const full = Math.floor(product.value.rating)
  const half = product.value.rating - full >= 0.5
  return { full, half, empty: 5 - full - (half ? 1 : 0) }
})

const tab = ref<'description' | 'features' | 'delivery'>('description')

const addToCart = () => {
  if (!product.value) return
  cart.add(product.value.id, qty.value)
  ui.openCart()
}
</script>

<template>
  <div v-if="product" class="container-x py-10 md:py-16">
    <!-- Breadcrumbs -->
    <nav class="text-sm text-fog mb-6 flex flex-wrap items-center gap-1">
      <NuxtLink to="/" class="hover:text-accent">Головна</NuxtLink>
      <span>/</span>
      <NuxtLink to="/catalog" class="hover:text-accent">Каталог</NuxtLink>
      <span>/</span>
      <NuxtLink :to="`/catalog/${product.category}`" class="hover:text-accent capitalize">
        {{ product.category }}
      </NuxtLink>
      <span>/</span>
      <span class="text-white">{{ product.title }}</span>
    </nav>

    <div class="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-16">
      <!-- Gallery -->
      <div class="space-y-3">
        <div class="card aspect-square relative overflow-hidden">
          <img :src="gallery[activeImage]" :alt="product.title"
            class="w-full h-full object-cover" />
          <!-- Badges -->
          <div class="absolute top-4 left-4 flex flex-col gap-2">
            <span v-if="product.badges.includes('hit')" class="chip badge-hit">🔥 ХІТ</span>
            <span v-if="product.badges.includes('new')" class="chip badge-new">НОВИНКА</span>
            <span v-if="product.badges.includes('sale')" class="chip badge-sale">-{{ discount }}%</span>
          </div>
        </div>
        <div v-if="gallery.length > 1" class="grid grid-cols-4 gap-3">
          <button
            v-for="(img, i) in gallery"
            :key="i"
            @click="activeImage = i"
            class="aspect-square card overflow-hidden transition-all"
            :class="activeImage === i ? 'border-accent ring-2 ring-accent/40' : ''"
          >
            <img :src="img" :alt="`Фото ${i + 1}`" class="w-full h-full object-cover" />
          </button>
        </div>
      </div>

      <!-- Info -->
      <div>
        <div class="text-xs uppercase tracking-mega text-fog mb-3">
          {{ product.brand }}
          <span v-if="product.volume">· {{ product.volume }}</span>
        </div>

        <h1 class="font-display text-3xl md:text-5xl tracking-mega text-white leading-[1.05] mb-4">
          {{ product.title }}
        </h1>

        <!-- Rating -->
        <div class="flex items-center gap-3 mb-5">
          <div class="flex text-gold text-lg">
            <span v-for="i in stars.full" :key="`f${i}`">★</span>
            <span v-if="stars.half" class="opacity-60">★</span>
            <span v-for="i in stars.empty" :key="`e${i}`" class="text-ink-500">★</span>
          </div>
          <span class="text-fog text-sm">{{ product.rating }} · {{ product.reviewsCount }} відгуків</span>
        </div>

        <p class="text-fog-soft text-lg mb-8">{{ product.shortDescription }}</p>

        <!-- Price + stock -->
        <div class="card p-6 mb-6">
          <div class="flex items-end justify-between gap-4 mb-5">
            <div>
              <div class="flex items-end gap-3">
                <div class="font-display text-5xl md:text-6xl tracking-mega text-white">
                  {{ formatUAH(product.price) }}
                </div>
                <div v-if="product.oldPrice" class="text-fog line-through text-xl pb-2">
                  {{ formatUAH(product.oldPrice) }}
                </div>
              </div>
              <div v-if="product.oldPrice" class="text-gold text-sm font-semibold mt-1">
                Економія {{ formatUAH(product.oldPrice - product.price) }} ({{ discount }}%)
              </div>
            </div>
            <div class="text-right">
              <div v-if="product.inStock" class="chip badge-sale">✓ В наявності</div>
              <div v-else class="chip bg-ink-700 text-fog">Очікується</div>
            </div>
          </div>

          <!-- Qty + buy -->
          <div class="flex items-stretch gap-3">
            <div class="flex items-center border border-line rounded-md">
              <button @click="qty = Math.max(1, qty - 1)"
                class="w-12 h-12 text-white hover:bg-ink-700 text-xl">−</button>
              <span class="w-12 text-center text-white font-semibold">{{ qty }}</span>
              <button @click="qty++"
                class="w-12 h-12 text-white hover:bg-ink-700 text-xl">+</button>
            </div>
            <button @click="addToCart" :disabled="!product.inStock"
              class="btn-primary flex-1 text-lg disabled:opacity-40">
              Додати в кошик · {{ formatUAH(product.price * qty) }}
            </button>
          </div>
        </div>

        <!-- USP блоки -->
        <div class="grid grid-cols-2 gap-3 text-sm">
          <div class="card p-4 flex items-center gap-3">
            <span class="text-2xl">🚚</span>
            <div>
              <div class="text-white font-semibold">Доставка</div>
              <div class="text-fog text-xs">Нова Пошта · 1–2 дні</div>
            </div>
          </div>
          <div class="card p-4 flex items-center gap-3">
            <span class="text-2xl">🛡️</span>
            <div>
              <div class="text-white font-semibold">Гарантія</div>
              <div class="text-fog text-xs">Повернення 14 днів</div>
            </div>
          </div>
          <div class="card p-4 flex items-center gap-3">
            <span class="text-2xl">💳</span>
            <div>
              <div class="text-white font-semibold">Оплата</div>
              <div class="text-fog text-xs">Картка / Накладений</div>
            </div>
          </div>
          <div class="card p-4 flex items-center gap-3">
            <span class="text-2xl">✓</span>
            <div>
              <div class="text-white font-semibold">Оригінал</div>
              <div class="text-fog text-xs">Сертифіковано</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <section class="mt-16 md:mt-24">
      <div class="flex flex-wrap gap-2 mb-6 border-b border-line">
        <button
          v-for="t in [
            { id: 'description' as const, label: 'Опис' },
            { id: 'features' as const, label: 'Характеристики' },
            { id: 'delivery' as const, label: 'Доставка та оплата' }
          ]"
          :key="t.id"
          @click="tab = t.id"
          class="px-5 py-3 font-semibold border-b-2 transition-colors"
          :class="tab === t.id
            ? 'text-white border-accent'
            : 'text-fog border-transparent hover:text-white'"
        >
          {{ t.label }}
        </button>
      </div>

      <div class="card p-6 md:p-10">
        <div v-if="tab === 'description'" class="prose prose-invert max-w-3xl">
          <p class="text-fog-soft text-lg leading-relaxed">{{ product.description }}</p>
        </div>

        <div v-else-if="tab === 'features'" class="max-w-2xl">
          <ul class="space-y-3">
            <li v-for="f in product.features" :key="f"
              class="flex items-start gap-3 text-fog-soft">
              <span class="text-accent text-lg shrink-0">◆</span>
              {{ f }}
            </li>
          </ul>
        </div>

        <div v-else class="space-y-4 text-fog-soft max-w-2xl">
          <div>
            <div class="text-white font-semibold mb-1">🚚 Нова Пошта</div>
            <p>Доставка по Україні від 24 годин. Безкоштовно при замовленні від 1 500 грн.</p>
          </div>
          <div>
            <div class="text-white font-semibold mb-1">💳 Способи оплати</div>
            <p>Карткою онлайн (Visa/Mastercard), Apple Pay, Google Pay, накладений платіж при отриманні.</p>
          </div>
          <div>
            <div class="text-white font-semibold mb-1">↩ Повернення</div>
            <p>14 днів на повернення товару — за умови збереження товарного вигляду.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Related -->
    <section v-if="related.length" class="mt-16 md:mt-24">
      <SectionTitle
        eyebrow="Що ще обирають"
        title="Схожі товари"
        :link="{ label: 'До категорії', to: `/catalog/${product.category}` }"
      />
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <ProductCard v-for="p in related" :key="p.id" :product="p" />
      </div>
    </section>
  </div>
</template>
