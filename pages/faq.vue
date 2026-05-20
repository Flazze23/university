<script setup lang="ts">
import type { FaqItem, Review, Banner } from '~/types'

useSeoMeta({
  title: 'FAQ — часті запитання — ТурбоХім',
  description: 'Відповіді на популярні запитання про доставку, оплату, гарантію та підбір автохімії.'
})

const { data: content } = await useFetch<{ reviews: Review[]; faq: FaqItem[]; banners: Banner[] }>(
  '/api/content',
  { key: 'faq-content' }
)

const open = ref<number | null>(0)
const toggle = (i: number) => { open.value = open.value === i ? null : i }
</script>

<template>
  <div class="container-x py-10 md:py-16">
    <nav class="text-sm text-fog mb-4">
      <NuxtLink to="/" class="hover:text-accent">Головна</NuxtLink>
      <span class="mx-2">/</span>
      <span class="text-white">FAQ</span>
    </nav>

    <div class="max-w-3xl mb-12">
      <div class="section-eyebrow">Поширені запитання</div>
      <h1 class="font-display text-5xl md:text-7xl tracking-mega text-white leading-[0.95]">
        FAQ
      </h1>
      <p class="text-fog-soft text-lg mt-4">
        Не знайшли відповідь? Напишіть нам у чат — відповідаємо за 5 хвилин.
      </p>
    </div>

    <div class="max-w-3xl mx-auto space-y-3">
      <div v-for="(item, i) in content?.faq" :key="i" class="card overflow-hidden">
        <button @click="toggle(i)" class="w-full px-6 py-5 flex items-center justify-between gap-4 text-left">
          <span class="text-white font-semibold text-lg">{{ item.q }}</span>
          <span class="text-accent text-2xl shrink-0 transition-transform"
            :class="open === i ? 'rotate-45' : ''">+</span>
        </button>
        <Transition name="acc">
          <div v-if="open === i" class="px-6 pb-6 text-fog-soft leading-relaxed">
            {{ item.a }}
          </div>
        </Transition>
      </div>
    </div>

    <!-- CTA -->
    <div class="max-w-3xl mx-auto mt-16 card p-8 text-center bg-gradient-to-br from-accent/10 to-transparent border-accent/30">
      <div class="text-4xl mb-3">💬</div>
      <div class="font-display text-2xl tracking-mega text-white mb-2">Не знайшли відповідь?</div>
      <p class="text-fog mb-5">Напишіть нам — допоможемо з вибором та технічними питаннями.</p>
      <NuxtLink to="/contacts" class="btn-primary">Зв'язатись з нами</NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.acc-enter-active, .acc-leave-active { transition: all 0.3s; }
.acc-enter-from, .acc-leave-to { opacity: 0; max-height: 0; }
.acc-enter-to, .acc-leave-from { opacity: 1; max-height: 400px; }
</style>
