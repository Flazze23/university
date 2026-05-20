<script setup lang="ts">
const open = ref(false)
const channels = [
  { id: 'tg', label: 'Telegram', href: 'https://t.me/turbochem', emoji: '✈️' },
  { id: 'wa', label: 'WhatsApp', href: 'https://wa.me/380671234567', emoji: '💬' },
  { id: 'ph', label: 'Подзвонити', href: 'tel:+380671234567', emoji: '📞' },
  { id: 'mail', label: 'Email', href: 'mailto:hello@turbochem.ua', emoji: '📧' }
]
</script>

<template>
  <div class="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3">
    <!-- Channels -->
    <Transition name="reveal">
      <div v-if="open" class="flex flex-col items-end gap-2">
        <a
          v-for="(c, i) in channels"
          :key="c.id"
          :href="c.href"
          target="_blank"
          rel="noopener"
          class="flex items-center gap-3 bg-ink-800 border border-line text-white px-4 py-2.5 rounded-full
                 hover:border-accent hover:shadow-accent-glow transition-all"
          :style="{ animationDelay: `${i * 60}ms` }"
        >
          <span class="text-sm font-semibold">{{ c.label }}</span>
          <span class="text-xl">{{ c.emoji }}</span>
        </a>
      </div>
    </Transition>

    <!-- Main FAB -->
    <button
      @click="open = !open"
      aria-label="Зв'язатись"
      class="w-14 h-14 rounded-full bg-accent text-white shadow-accent-glow flex items-center justify-center
             hover:bg-accent-hover transition-transform"
      :class="{ 'rotate-45': open }"
    >
      <svg v-if="!open" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
      <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>
  </div>
</template>

<style scoped>
.reveal-enter-active, .reveal-leave-active { transition: all 0.3s cubic-bezier(.2,.7,.2,1); }
.reveal-enter-from, .reveal-leave-to { opacity: 0; transform: translateY(20px); }
</style>
