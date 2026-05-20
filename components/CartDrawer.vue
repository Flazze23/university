<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import { useUIStore } from '~/stores/ui'
import { formatUAH } from '~/utils/format'
import type { Product } from '~/types'

const cart = useCartStore()
const ui = useUIStore()

// Завантажуємо каталог для відображення товарів у кошику
const { data: catalog } = await useFetch<{ items: Product[]; total: number }>('/api/products', {
  key: 'cart-catalog',
  default: () => ({ items: [], total: 0 })
})

const items = computed(() =>
  cart.items
    .map(ci => {
      const p = catalog.value?.items.find(x => x.id === ci.productId)
      return p ? { product: p, qty: ci.qty } : null
    })
    .filter(Boolean) as { product: Product; qty: number }[]
)

const subtotal = computed(() =>
  items.value.reduce((acc, i) => acc + i.product.price * i.qty, 0)
)
const shipping = computed(() => (subtotal.value >= 1500 ? 0 : 80))
const total = computed(() => subtotal.value + shipping.value)

watch(() => ui.cartDrawerOpen, open => {
  if (import.meta.client) {
    document.body.style.overflow = open ? 'hidden' : ''
  }
})
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition name="fade">
      <div
        v-if="ui.cartDrawerOpen"
        @click="ui.closeCart()"
        class="fixed inset-0 bg-ink-900/80 backdrop-blur-sm z-50"
      ></div>
    </Transition>

    <!-- Drawer -->
    <Transition name="drawer">
      <aside
        v-if="ui.cartDrawerOpen"
        class="fixed top-0 right-0 bottom-0 w-full sm:w-[440px] bg-ink-800 border-l border-line z-50 flex flex-col"
      >
        <!-- Header -->
        <div class="flex items-center justify-between px-5 py-4 border-b border-line">
          <div class="flex items-center gap-3">
            <div class="font-display text-2xl tracking-mega text-white">Кошик</div>
            <span class="chip">{{ cart.count }} шт</span>
          </div>
          <button @click="ui.closeCart()" aria-label="Закрити"
            class="w-9 h-9 rounded-md hover:bg-ink-700 text-white flex items-center justify-center">
            ✕
          </button>
        </div>

        <!-- Empty -->
        <div v-if="cart.isEmpty" class="flex-1 flex flex-col items-center justify-center text-center px-8">
          <div class="text-6xl mb-4 opacity-30">🛒</div>
          <div class="text-white font-display text-2xl tracking-mega mb-2">Кошик порожній</div>
          <div class="text-fog text-sm mb-6">Додайте улюблену автохімію — і поверніться сюди.</div>
          <NuxtLink to="/catalog" @click="ui.closeCart()" class="btn-primary">До каталогу</NuxtLink>
        </div>

        <!-- Items -->
        <div v-else class="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          <div v-for="item in items" :key="item.product.id"
               class="flex gap-3 pb-4 border-b border-line/60">
            <img :src="item.product.image" :alt="item.product.title"
              class="w-20 h-20 rounded-md object-cover bg-ink-700 shrink-0" />
            <div class="flex-1 min-w-0">
              <div class="text-[10px] uppercase tracking-mega text-fog mb-1">{{ item.product.brand }}</div>
              <NuxtLink :to="`/product/${item.product.slug}`" @click="ui.closeCart()"
                class="text-white text-sm font-semibold leading-tight line-clamp-2 hover:text-accent">
                {{ item.product.title }}
              </NuxtLink>
              <div class="flex items-center justify-between mt-2">
                <div class="flex items-center gap-1 border border-line rounded-md">
                  <button @click="cart.setQty(item.product.id, item.qty - 1)"
                    class="w-8 h-8 text-white hover:bg-ink-700">−</button>
                  <span class="w-8 text-center text-white text-sm">{{ item.qty }}</span>
                  <button @click="cart.setQty(item.product.id, item.qty + 1)"
                    class="w-8 h-8 text-white hover:bg-ink-700">+</button>
                </div>
                <div class="text-white font-display text-lg tracking-mega">
                  {{ formatUAH(item.product.price * item.qty) }}
                </div>
              </div>
            </div>
            <button @click="cart.remove(item.product.id)" aria-label="Видалити"
              class="text-fog hover:text-danger transition self-start">
              ✕
            </button>
          </div>
        </div>

        <!-- Summary + checkout -->
        <div v-if="!cart.isEmpty" class="border-t border-line p-5 space-y-3">
          <div class="flex justify-between text-sm text-fog">
            <span>Сума</span><span class="text-white">{{ formatUAH(subtotal) }}</span>
          </div>
          <div class="flex justify-between text-sm text-fog">
            <span>Доставка</span>
            <span class="text-white">
              <template v-if="shipping === 0">Безкоштовно</template>
              <template v-else>{{ formatUAH(shipping) }}</template>
            </span>
          </div>
          <div v-if="shipping > 0" class="text-xs text-gold">
            До безкоштовної доставки лишилось {{ formatUAH(1500 - subtotal) }}
          </div>
          <div class="flex justify-between items-end pt-2 border-t border-line">
            <span class="text-white font-semibold">Усього</span>
            <span class="font-display text-3xl tracking-mega text-white">{{ formatUAH(total) }}</span>
          </div>
          <NuxtLink to="/checkout" @click="ui.closeCart()" class="btn-primary w-full">
            Оформити замовлення →
          </NuxtLink>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.drawer-enter-active, .drawer-leave-active { transition: transform 0.35s cubic-bezier(.2,.7,.2,1); }
.drawer-enter-from, .drawer-leave-to { transform: translateX(100%); }
</style>
