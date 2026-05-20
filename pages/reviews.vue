<script setup lang="ts">
import type { Review, FaqItem, Banner } from '~/types'
import { formatDate } from '~/utils/format'

useSeoMeta({
  title: 'Відгуки клієнтів — ТурбоХім',
  description: 'Реальні відгуки про продукцію ТурбоХім від наших клієнтів з усієї України.'
})

const { data } = await useFetch<{ reviews: Review[]; faq: FaqItem[]; banners: Banner[] }>(
  '/api/content',
  { key: 'reviews-page' }
)

const filter = ref<'all' | 5 | 4>('all')
const filtered = computed(() => {
  if (filter.value === 'all') return data.value?.reviews ?? []
  return (data.value?.reviews ?? []).filter(r => r.rating === filter.value)
})
const avg = computed(() => {
  const all = data.value?.reviews ?? []
  if (!all.length) return 0
  return (all.reduce((a, r) => a + r.rating, 0) / all.length).toFixed(1)
})
</script>

<template>
  <div class="container-x py-10 md:py-16">
    <nav class="text-sm text-fog mb-4">
      <NuxtLink to="/" class="hover:text-accent">Головна</NuxtLink>
      <span class="mx-2">/</span>
      <span class="text-white">Відгуки</span>
    </nav>

    <!-- Hero stats -->
    <div class="grid md:grid-cols-[1.5fr_1fr] gap-8 mb-12 md:mb-16">
      <div>
        <div class="section-eyebrow">Соціальний доказ</div>
        <h1 class="font-display text-5xl md:text-7xl tracking-mega text-white leading-[0.95]">
          Відгуки клієнтів
        </h1>
        <p class="text-fog-soft text-lg mt-4 max-w-2xl">
          Чесні думки тих, хто вже спробував. Жодних накручених — лише реальні люди з різних
          куточків України.
        </p>
      </div>
      <div class="card p-8 text-center bg-gradient-to-br from-accent/10 to-transparent border-accent/30">
        <div class="font-display text-7xl tracking-mega text-white">{{ avg }}</div>
        <div class="flex justify-center text-gold text-2xl mb-2">★★★★★</div>
        <div class="text-fog text-sm">на основі {{ data?.reviews.length ?? 0 }} відгуків</div>
      </div>
    </div>

    <!-- Filter -->
    <div class="flex flex-wrap gap-2 mb-8">
      <button v-for="f in [
        { id: 'all' as const, label: 'Усі' },
        { id: 5 as const, label: '5 ★' },
        { id: 4 as const, label: '4 ★' }
      ]" :key="f.id" @click="filter = f.id"
        class="chip transition"
        :class="filter === f.id ? 'bg-accent border-accent text-white' : 'hover:border-accent'">
        {{ f.label }}
      </button>
    </div>

    <!-- List -->
    <div class="grid md:grid-cols-2 gap-4">
      <article v-for="r in filtered" :key="r.id" class="card p-6 relative">
        <div class="absolute top-3 right-5 font-display text-7xl text-accent/10">"</div>
        <div class="flex text-gold mb-3 text-lg">
          <span v-for="i in 5" :key="i" :class="i <= r.rating ? 'text-gold' : 'text-ink-500'">★</span>
        </div>
        <p class="text-fog-soft leading-relaxed mb-5">{{ r.text }}</p>
        <div class="flex items-center justify-between pt-4 border-t border-line">
          <div>
            <div class="text-white font-semibold">{{ r.author }}</div>
            <div class="text-fog text-xs">{{ r.city }}</div>
          </div>
          <div class="font-mono text-xs text-fog">{{ formatDate(r.date) }}</div>
        </div>
      </article>
    </div>
  </div>
</template>
