<script setup lang="ts">
const items = [
  'Доставка по Україні від 24 годин',
  'Гарантія повернення 14 днів',
  'Безкоштовна доставка від 1500 грн',
  'Понад 12 000 задоволених клієнтів',
  'Оригінальна продукція з сертифікатами',
  'Підтримка 24/7 у месенджерах',
  'Знижки до -40% постійним клієнтам'
]
const doubled = [...items, ...items]
</script>

<template>
  <div class="border-y border-line bg-ink-800/40 py-4 overflow-hidden marquee">
    <div class="flex animate-marquee whitespace-nowrap gap-12 font-mono text-sm text-fog-soft">
      <span v-for="(text, i) in doubled" :key="i" class="flex items-center gap-3">
        <span class="text-accent">◆</span>
        {{ text }}
      </span>
    </div>
  </div>
</template>
