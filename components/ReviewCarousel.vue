<script setup lang="ts">
import type { Review } from '~/types'
import { formatDate } from '~/utils/format'

defineProps<{ reviews: Review[] }>()
</script>

<template>
  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
    <article v-for="(r, idx) in reviews.slice(0, 6)" :key="r.id"
      class="card p-6 flex flex-col h-full relative overflow-hidden">
      <div class="absolute top-4 right-5 font-display text-6xl text-accent/10 leading-none">"</div>
      <!-- Stars -->
      <div class="flex text-gold mb-3">
        <span v-for="i in 5" :key="i" :class="i <= r.rating ? 'text-gold' : 'text-ink-500'">★</span>
      </div>
      <p class="text-fog-soft leading-relaxed mb-6 relative">{{ r.text }}</p>
      <div class="mt-auto flex items-center justify-between pt-4 border-t border-line">
        <div>
          <div class="text-white font-semibold">{{ r.author }}</div>
          <div class="text-xs text-fog">{{ r.city }}</div>
        </div>
        <div class="font-mono text-xs text-fog">{{ formatDate(r.date) }}</div>
      </div>
    </article>
  </div>
</template>
