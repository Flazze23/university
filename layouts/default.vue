<script setup lang="ts">
// Hydrate cart на клієнті
import { useCartStore } from '~/stores/cart'
const cart = useCartStore()
onMounted(() => cart.hydrate())
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <SiteHeader />
    <main class="flex-1">
      <slot />
    </main>
    <SiteFooter />
    <CartDrawer />
    <SearchOverlay />
    <FloatingContact />
  </div>
</template>
