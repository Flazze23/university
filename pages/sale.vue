<script setup lang="ts">
import type { Product } from '~/types'

useSeoMeta({
  title: 'Акції та знижки — ТурбоХім',
  description: 'Товари зі знижкою до 40%. Сезонні розпродажі, промокоди та спецпропозиції.'
})

const { data } = await useFetch<{ items: Product[]; total: number }>('/api/products', {
  query: { badge: 'sale' },
  key: 'sale-page'
})
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative border-b border-line overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-accent/20 via-ink-900 to-ink-900"></div>
      <div class="relative container-x py-16 md:py-24">
        <div class="max-w-3xl">
          <div class="chip badge-hit mb-4">🔥 АКЦІЇ</div>
          <h1 class="font-display text-5xl md:text-8xl tracking-mega text-white leading-[0.9] mb-4">
            Знижки<br><span class="text-accent">до -40%</span>
          </h1>
          <p class="text-fog-soft text-lg max-w-2xl mb-6">
            Сезонний розпродаж популярних товарів. Кількість обмежена.
          </p>
          <div class="flex flex-wrap gap-3 text-sm">
            <div class="chip">
              <span class="text-fog">Промокод:</span>
              <span class="font-mono font-bold text-gold ml-1">SEZON25</span>
            </div>
            <div class="chip">
              <span class="text-fog">Додатково:</span>
              <span class="text-white ml-1">-25% у кошику</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Products -->
    <section class="container-x py-10 md:py-16">
      <div class="flex items-end justify-between gap-6 mb-8">
        <div>
          <h2 class="section-title">Товари зі знижкою</h2>
          <p class="text-fog mt-2">Знайдено: <span class="text-white">{{ data?.total ?? 0 }}</span> позицій</p>
        </div>
      </div>

      <div v-if="!data?.items.length" class="card p-12 text-center">
        <div class="text-6xl opacity-30 mb-3">🎁</div>
        <div class="text-white font-display text-2xl tracking-mega">Поки що акцій немає</div>
        <p class="text-fog mt-2">Слідкуйте за оновленнями — нові пропозиції щотижня.</p>
      </div>
      <ProductGrid v-else :products="data.items" />
    </section>
  </div>
</template>
