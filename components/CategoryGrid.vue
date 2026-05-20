<script setup lang="ts">
import type { Category } from '~/types'
defineProps<{ categories: Category[] }>()
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <NuxtLink
      v-for="(cat, idx) in categories"
      :key="cat.slug"
      :to="`/catalog/${cat.slug}`"
      class="card card-hover group relative overflow-hidden aspect-[4/5] flex flex-col justify-end p-5"
      :class="idx === 0 ? 'md:col-span-2 md:row-span-2 aspect-square' : ''"
    >
      <!-- Background -->
      <img
        :src="cat.cover"
        :alt="cat.title"
        class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/50 to-transparent"></div>

      <!-- Icon -->
      <div class="absolute top-5 right-5 text-3xl">{{ cat.icon }}</div>

      <!-- Content -->
      <div class="relative">
        <div class="text-xs uppercase tracking-mega text-accent mb-2">
          Категорія / 0{{ idx + 1 }}
        </div>
        <h3
          class="font-display tracking-mega text-white mb-2"
          :class="idx === 0 ? 'text-4xl md:text-6xl' : 'text-2xl md:text-3xl'"
        >
          {{ cat.title }}
        </h3>
        <p v-if="idx === 0" class="text-fog-soft text-sm max-w-xs mb-4 line-clamp-3">
          {{ cat.description }}
        </p>
        <div class="flex items-center gap-2 text-white text-sm font-semibold
                    group-hover:text-accent transition-colors">
          Переглянути
          <span class="transition-transform group-hover:translate-x-1">→</span>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
