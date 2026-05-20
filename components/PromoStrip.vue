<script setup lang="ts">
const target = new Date()
target.setDate(target.getDate() + 3)
target.setHours(23, 59, 59)

const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)

const update = () => {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) { days.value = hours.value = minutes.value = seconds.value = 0; return }
  days.value = Math.floor(diff / 86400000)
  hours.value = Math.floor((diff % 86400000) / 3600000)
  minutes.value = Math.floor((diff % 3600000) / 60000)
  seconds.value = Math.floor((diff % 60000) / 1000)
}

let timer: ReturnType<typeof setInterval> | null = null
onMounted(() => { update(); timer = setInterval(update, 1000) })
onBeforeUnmount(() => { if (timer) clearInterval(timer) })

const pad = (n: number) => String(n).padStart(2, '0')
</script>

<template>
  <section class="container-x">
    <div class="rounded-2xl bg-gradient-to-br from-accent/20 via-ink-800 to-ink-800 border border-accent/30
                p-8 md:p-12 relative overflow-hidden">
      <!-- Decorative dots -->
      <div class="absolute inset-0 opacity-30 pointer-events-none"
        style="background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 0); background-size: 24px 24px;"></div>

      <div class="relative grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div class="chip badge-hit mb-4">🔥 Тільки 3 дні</div>
          <h2 class="font-display text-4xl md:text-6xl tracking-mega text-white leading-[0.95] mb-4">
            Сезон<br>детейлінгу<br>
            <span class="text-accent">— 25%</span>
          </h2>
          <p class="text-fog-soft max-w-md mb-6">
            Великий розпродаж шампунів, паст та аксесуарів.
            Введіть промокод <span class="font-mono font-bold text-gold">SEZON25</span> у кошику.
          </p>
          <NuxtLink to="/sale" class="btn-primary">До акцій →</NuxtLink>
        </div>

        <!-- Countdown -->
        <div class="grid grid-cols-4 gap-2 md:gap-3">
          <div v-for="block in [
            { label: 'днів', val: days },
            { label: 'годин', val: hours },
            { label: 'хвилин', val: minutes },
            { label: 'секунд', val: seconds }
          ]" :key="block.label"
            class="bg-ink-900 border border-line rounded-lg p-3 md:p-5 text-center">
            <div class="font-display text-3xl md:text-5xl tracking-mega text-white tabular-nums">
              {{ pad(block.val) }}
            </div>
            <div class="text-xs uppercase tracking-mega text-fog mt-1">{{ block.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
