<script setup lang="ts">
import type { Product } from '~/types'
import { formatUAH } from '~/utils/format'
import { useCartStore } from '~/stores/cart'
import { useUIStore } from '~/stores/ui'

const props = defineProps<{ product: Product }>()
const cart = useCartStore()
const ui = useUIStore()

const discount = computed(() => {
  if (!props.product.oldPrice) return 0
  return Math.round(((props.product.oldPrice - props.product.price) / props.product.oldPrice) * 100)
})

const addToCart = () => {
  cart.add(props.product.id, 1)
  ui.openCart()
}

const stars = computed(() => {
  const full = Math.floor(props.product.rating)
  const half = props.product.rating - full >= 0.5
  return { full, half, empty: 5 - full - (half ? 1 : 0) }
})
</script>

<template>
  <article class="card card-hover group flex flex-col relative">
    <!-- Badges -->
    <div class="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
      <span v-if="product.badges.includes('hit')" class="chip badge-hit">🔥 хіт</span>
      <span v-if="product.badges.includes('new')" class="chip badge-new">новинка</span>
      <span v-if="product.badges.includes('sale')" class="chip badge-sale">-{{ discount }}%</span>
    </div>

    <!-- Stock indicator -->
    <div
      v-if="!product.inStock"
      class="absolute top-3 right-3 z-10 chip bg-ink-700 text-fog"
    >
      Очікується
    </div>

    <!-- Image -->
    <NuxtLink :to="`/product/${product.slug}`" class="block aspect-square bg-ink-700 overflow-hidden relative">
      <img
        :src="product.image"
        :alt="product.title"
        loading="lazy"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <!-- Gradient overlay on hover -->
      <div class="absolute inset-0 bg-gradient-to-t from-ink-900/80 to-transparent
                  opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </NuxtLink>

    <!-- Body -->
    <div class="p-4 flex-1 flex flex-col">
      <div class="text-[11px] uppercase tracking-mega text-fog mb-2">
        {{ product.brand }} <span v-if="product.volume">· {{ product.volume }}</span>
      </div>

      <NuxtLink :to="`/product/${product.slug}`"
        class="text-white font-semibold text-sm leading-snug line-clamp-2 mb-2 hover:text-accent transition-colors min-h-[40px]">
        {{ product.title }}
      </NuxtLink>

      <!-- Rating -->
      <div class="flex items-center gap-1 mb-3 text-xs">
        <div class="flex text-gold">
          <span v-for="i in stars.full" :key="`f${i}`">★</span>
          <span v-if="stars.half" class="opacity-60">★</span>
          <span v-for="i in stars.empty" :key="`e${i}`" class="text-ink-500">★</span>
        </div>
        <span class="text-fog">({{ product.reviewsCount }})</span>
      </div>

      <!-- Price -->
      <div class="flex items-end gap-2 mt-auto mb-3">
        <div class="font-display text-2xl text-white tracking-mega">
          {{ formatUAH(product.price) }}
        </div>
        <div v-if="product.oldPrice" class="text-fog line-through text-sm pb-1">
          {{ formatUAH(product.oldPrice) }}
        </div>
      </div>

      <!-- CTA -->
      <button
        @click="addToCart"
        :disabled="!product.inStock"
        class="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="9" cy="21" r="1"/>
          <circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        Купити
      </button>
    </div>
  </article>
</template>
