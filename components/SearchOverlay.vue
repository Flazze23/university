<script setup lang="ts">
import { useUIStore } from '~/stores/ui'
import type { Product } from '~/types'
import { formatUAH } from '~/utils/format'

const ui = useUIStore()
const query = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

const { data } = await useFetch<{ items: Product[] }>('/api/products', {
  key: 'search-catalog',
  default: () => ({ items: [] })
})

const results = computed(() => {
  const q = query.value.toLowerCase().trim()
  if (q.length < 2) return []
  return (data.value?.items ?? [])
    .filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q)
    )
    .slice(0, 8)
})

watch(() => ui.searchOpen, async open => {
  if (open) {
    await nextTick()
    inputRef.value?.focus()
    if (import.meta.client) document.body.style.overflow = 'hidden'
  } else {
    if (import.meta.client) document.body.style.overflow = ''
    query.value = ''
  }
})

// Esc закриває
onMounted(() => {
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && ui.searchOpen) ui.closeSearch()
  }
  window.addEventListener('keydown', onKey)
  onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
})
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="ui.searchOpen"
        class="fixed inset-0 z-50 bg-ink-900/95 backdrop-blur-md overflow-y-auto"
        @click.self="ui.closeSearch()"
      >
        <div class="container-x pt-20 pb-10">
          <div class="flex items-center gap-4 max-w-3xl mx-auto">
            <div class="flex-1 flex items-center bg-ink-800 border border-line rounded-lg px-5 py-4 focus-within:border-accent transition-colors">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   stroke-width="2" class="text-fog mr-3">
                <circle cx="11" cy="11" r="7"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                ref="inputRef"
                v-model="query"
                type="search"
                placeholder="Шукати товари, бренди, категорії..."
                class="flex-1 bg-transparent text-white text-lg placeholder-fog outline-none"
              />
              <button v-if="query" @click="query = ''" class="text-fog hover:text-white">✕</button>
            </div>
            <button @click="ui.closeSearch()"
              class="hidden md:block px-4 py-3 text-fog hover:text-white border border-line rounded-md">
              Esc
            </button>
          </div>

          <!-- Results -->
          <div class="max-w-3xl mx-auto mt-8">
            <div v-if="!query" class="text-center text-fog">
              <p class="text-lg">Почніть вводити запит...</p>
              <p class="text-sm mt-2">Спробуйте: «шампунь», «кераміка», «мікрофібра»</p>
            </div>

            <div v-else-if="results.length === 0" class="text-center text-fog py-10">
              <div class="text-6xl mb-4 opacity-30">🔍</div>
              <p>Нічого не знайдено за запитом "<span class="text-white">{{ query }}</span>"</p>
            </div>

            <div v-else class="space-y-2">
              <div class="text-xs uppercase tracking-mega text-fog mb-3">
                Знайдено: {{ results.length }}
              </div>
              <NuxtLink
                v-for="p in results"
                :key="p.id"
                :to="`/product/${p.slug}`"
                @click="ui.closeSearch()"
                class="flex gap-4 p-3 rounded-lg hover:bg-ink-800 border border-transparent
                       hover:border-line transition-all group"
              >
                <img :src="p.image" :alt="p.title" class="w-16 h-16 rounded-md object-cover" />
                <div class="flex-1">
                  <div class="text-[10px] uppercase tracking-mega text-fog">{{ p.brand }}</div>
                  <div class="text-white font-semibold group-hover:text-accent transition-colors">
                    {{ p.title }}
                  </div>
                  <div class="text-fog text-sm mt-1 line-clamp-1">{{ p.shortDescription }}</div>
                </div>
                <div class="font-display text-xl text-white tracking-mega self-center">
                  {{ formatUAH(p.price) }}
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
