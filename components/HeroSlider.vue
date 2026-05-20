<script setup lang="ts">
import type { Banner } from '~/types'

const props = defineProps<{ banners: Banner[] }>()

const active = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

const next = () => { active.value = (active.value + 1) % props.banners.length }
const prev = () => { active.value = (active.value - 1 + props.banners.length) % props.banners.length }
const go = (i: number) => { active.value = i; restart() }

const start = () => {
  timer = setInterval(next, 6000)
}
const stop = () => { if (timer) clearInterval(timer); timer = null }
const restart = () => { stop(); start() }

onMounted(start)
onBeforeUnmount(stop)
</script>

<template>
  <section
    class="relative overflow-hidden border-b border-line"
    @mouseenter="stop"
    @mouseleave="start"
  >
    <!-- Atmospheric background -->
    <div class="absolute inset-0 bg-hero-gradient pointer-events-none"></div>

    <div class="relative container-x">
      <div class="relative h-[520px] md:h-[640px]">
        <Transition
          v-for="(banner, idx) in banners"
          :key="banner.id"
          name="slide"
          mode="out-in"
        >
          <div
            v-if="idx === active"
            class="absolute inset-0 grid md:grid-cols-2 gap-6 md:gap-12 items-center py-10"
          >
            <!-- Text -->
            <div class="animate-fade-up order-2 md:order-1">
              <div class="section-eyebrow">
                {{ banner.eyebrow }}
              </div>
              <h1
                class="font-display text-5xl md:text-7xl lg:text-8xl tracking-mega leading-[0.9] mb-6"
              >
                {{ banner.title }}
              </h1>
              <p class="text-fog-soft text-lg max-w-md mb-8">
                {{ banner.subtitle }}
              </p>
              <div class="flex flex-wrap gap-3">
                <NuxtLink :to="banner.ctaHref" class="btn-primary">
                  {{ banner.ctaLabel }}
                  <span>→</span>
                </NuxtLink>
                <NuxtLink to="/catalog" class="btn-ghost">
                  Усі категорії
                </NuxtLink>
              </div>
            </div>

            <!-- Image -->
            <div class="relative order-1 md:order-2 h-64 md:h-full">
              <div
                class="absolute inset-0 rounded-lg overflow-hidden border border-line"
                :style="{ boxShadow: `0 30px 80px -20px ${banner.accent}55` }"
              >
                <img
                  :src="banner.image"
                  :alt="banner.title"
                  class="w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-gradient-to-br from-transparent to-ink-900/60"></div>
              </div>
              <!-- Decorative chip -->
              <div class="absolute -bottom-4 -left-4 hidden md:block">
                <div class="font-mono text-xs text-fog bg-ink-800 border border-line rounded-md px-3 py-2">
                  0{{ idx + 1 }} / 0{{ banners.length }}
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Controls -->
      <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
        <button @click="prev(); restart()" aria-label="Попередній"
          class="w-10 h-10 rounded-full bg-ink-800 border border-line text-white
                 hover:border-accent hover:text-accent transition flex items-center justify-center">
          ‹
        </button>
        <div class="flex gap-1.5">
          <button
            v-for="(_, i) in banners"
            :key="i"
            @click="go(i)"
            :aria-label="`Слайд ${i + 1}`"
            class="h-1.5 rounded-full transition-all"
            :class="i === active ? 'w-8 bg-accent' : 'w-4 bg-line-strong'"
          ></button>
        </div>
        <button @click="next(); restart()" aria-label="Наступний"
          class="w-10 h-10 rounded-full bg-ink-800 border border-line text-white
                 hover:border-accent hover:text-accent transition flex items-center justify-center">
          ›
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.slide-enter-active, .slide-leave-active { transition: opacity 0.5s; }
.slide-enter-from, .slide-leave-to { opacity: 0; }
</style>
