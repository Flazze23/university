<script setup lang="ts">
const props = defineProps<{ error: { statusCode: number; statusMessage?: string } }>()
const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <NuxtLayout>
    <div class="container-x py-20 md:py-32 text-center">
      <div class="font-display text-[140px] md:text-[220px] tracking-mega text-accent leading-none">
        {{ error.statusCode }}
      </div>
      <div class="font-display text-3xl md:text-5xl tracking-mega text-white mb-4">
        <template v-if="error.statusCode === 404">Сторінку не знайдено</template>
        <template v-else>Щось пішло не так</template>
      </div>
      <p class="text-fog-soft text-lg max-w-md mx-auto mb-8">
        {{ error.statusMessage || 'Перевірте URL або поверніться на головну.' }}
      </p>
      <div class="flex flex-wrap gap-3 justify-center">
        <button @click="handleError" class="btn-primary">На головну</button>
        <NuxtLink to="/catalog" class="btn-ghost">До каталогу</NuxtLink>
      </div>
    </div>
  </NuxtLayout>
</template>
