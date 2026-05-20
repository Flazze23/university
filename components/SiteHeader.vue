<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import { useUIStore } from '~/stores/ui'
import { useUserStore } from '~/stores/user'

const cart = useCartStore()
const ui = useUIStore()
const user = useUserStore()

const route = useRoute()
const isHome = computed(() => route.path === '/')

const navLinks = [
  { label: 'Каталог', to: '/catalog' },
  { label: 'Акції', to: '/sale' },
  { label: 'Про нас', to: '/about' },
  { label: 'Контакти', to: '/contacts' },
  { label: 'FAQ', to: '/faq' }
]

// Scroll detection для зміни вигляду header
const scrolled = ref(false)
onMounted(() => {
  cart.hydrate()
  const onScroll = () => { scrolled.value = window.scrollY > 20 }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
  onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
})
</script>

<template>
  <header
    class="sticky top-0 z-40 border-b transition-all duration-300"
    :class="[
      scrolled || !isHome
        ? 'bg-ink-900/95 backdrop-blur-md border-line'
        : 'bg-transparent border-transparent'
    ]"
  >
    <!-- Top utility bar -->
    <div class="hidden lg:block border-b border-line/40 bg-ink-800/40">
      <div class="container-x flex items-center justify-between text-xs text-fog py-2">
        <div class="flex items-center gap-5">
          <span>🚚 Доставка по Україні від 24 год</span>
          <span>🛡️ Гарантія 14 днів на повернення</span>
        </div>
        <div class="flex items-center gap-5">
          <a href="tel:+380671234567" class="hover:text-accent transition">
            +38 (067) 123-45-67
          </a>
          <a href="mailto:hello@turbochem.ua" class="hover:text-accent transition">
            hello@turbochem.ua
          </a>
        </div>
      </div>
    </div>

    <!-- Main header -->
    <div class="container-x flex items-center gap-4 py-4">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-2 shrink-0 group">
        <div class="w-10 h-10 rounded-md bg-accent flex items-center justify-center font-display text-white text-xl
                    group-hover:rotate-12 transition-transform duration-300">
          ТХ
        </div>
        <div class="hidden sm:block leading-none">
          <div class="font-display text-2xl tracking-mega text-white">ТУРБОХІМ</div>
          <div class="text-[10px] uppercase tracking-mega text-fog">premium auto care</div>
        </div>
      </NuxtLink>

      <!-- Nav (desktop) -->
      <nav class="hidden lg:flex items-center gap-1 ml-8">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="px-4 py-2 text-sm font-semibold text-fog-soft hover:text-white rounded-md
                 hover:bg-ink-800 transition-colors"
          active-class="text-white !bg-ink-700"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <!-- Spacer -->
      <div class="flex-1"></div>

      <!-- Actions -->
      <div class="flex items-center gap-2">
        <!-- Search btn -->
        <button
          @click="ui.toggleSearch()"
          aria-label="Пошук"
          class="w-11 h-11 rounded-md border border-line text-fog-soft hover:text-white
                 hover:border-accent transition-all flex items-center justify-center"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="7"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </button>

        <!-- Account -->
        <NuxtLink
          to="/account"
          aria-label="Кабінет"
          class="hidden sm:flex w-11 h-11 rounded-md border border-line text-fog-soft hover:text-white
                 hover:border-accent transition-all items-center justify-center"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </NuxtLink>

        <!-- Cart -->
        <button
          @click="ui.openCart()"
          aria-label="Кошик"
          class="relative h-11 px-4 rounded-md bg-accent text-white font-semibold flex items-center gap-2
                 hover:bg-accent-hover transition-all hover:shadow-accent-glow"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <span class="hidden sm:inline">Кошик</span>
          <span
            v-if="cart.count > 0"
            class="ml-1 min-w-[20px] h-5 px-1.5 rounded-full bg-white text-accent text-xs font-bold
                   flex items-center justify-center"
          >
            {{ cart.count }}
          </span>
        </button>

        <!-- Mobile menu -->
        <button
          @click="ui.toggleMobileMenu()"
          aria-label="Меню"
          class="lg:hidden w-11 h-11 rounded-md border border-line text-white flex items-center justify-center"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <Transition name="page">
      <div
        v-if="ui.mobileMenuOpen"
        class="lg:hidden border-t border-line bg-ink-900 py-4"
      >
        <div class="container-x flex flex-col gap-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            @click="ui.closeMobileMenu()"
            class="px-4 py-3 text-white font-semibold rounded-md hover:bg-ink-800"
          >
            {{ link.label }}
          </NuxtLink>
          <NuxtLink
            to="/account"
            @click="ui.closeMobileMenu()"
            class="px-4 py-3 text-white font-semibold rounded-md hover:bg-ink-800"
          >
            Особистий кабінет
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </header>
</template>
