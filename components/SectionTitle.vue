<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  subtitle?: string
  link?: { label: string; to: string }
}>()
</script>

<template>
  <div class="flex items-end justify-between gap-6 mb-8 md:mb-12">
    <div>
      <div v-if="eyebrow" class="section-eyebrow">{{ eyebrow }}</div>
      <h2 class="section-title">{{ title }}</h2>
      <p v-if="subtitle" class="text-fog-soft mt-3 max-w-xl">{{ subtitle }}</p>
    </div>
    <NuxtLink v-if="link" :to="link.to"
      class="hidden sm:flex items-center gap-2 text-white font-semibold hover:text-accent transition shrink-0">
      {{ link.label }}
      <span>→</span>
    </NuxtLink>
  </div>
</template>
