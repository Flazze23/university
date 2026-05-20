<script setup lang="ts">
import { useUserStore } from '~/stores/user'
import { formatUAH, formatDate } from '~/utils/format'

useSeoMeta({
  title: 'Особистий кабінет — ТурбоХім',
  description: 'Керуйте профілем, переглядайте історію замовлень та статус доставки.'
})

const user = useUserStore()

const email = ref('shatravka@example.com')

const statusMap = {
  processing: { label: 'В обробці', class: 'bg-gold text-ink-900' },
  shipped: { label: 'Відправлено', class: 'bg-accent text-white' },
  delivered: { label: 'Доставлено', class: 'bg-success text-ink-900' },
  cancelled: { label: 'Скасовано', class: 'bg-danger text-white' }
} as const

const handleLogin = () => {
  user.login(email.value)
}
</script>

<template>
  <div class="container-x py-10 md:py-16">
    <nav class="text-sm text-fog mb-4">
      <NuxtLink to="/" class="hover:text-accent">Головна</NuxtLink>
      <span class="mx-2">/</span>
      <span class="text-white">Кабінет</span>
    </nav>

    <h1 class="font-display text-4xl md:text-6xl tracking-mega text-white mb-10">
      Особистий кабінет
    </h1>

    <!-- Не залогінений -->
    <div v-if="!user.isAuthenticated" class="max-w-md mx-auto card p-8">
      <div class="text-center mb-6">
        <div class="text-5xl mb-3">👤</div>
        <div class="font-display text-2xl tracking-mega text-white">Вхід у кабінет</div>
        <p class="text-fog text-sm mt-2">Демо-вхід — введіть будь-який email</p>
      </div>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="label">Email</label>
          <input v-model="email" type="email" required class="input" />
        </div>
        <button type="submit" class="btn-primary w-full">Увійти</button>
      </form>
    </div>

    <!-- Залогінений -->
    <div v-else class="grid lg:grid-cols-[320px_1fr] gap-8">
      <!-- Profile sidebar -->
      <aside class="space-y-4">
        <div class="card p-6 text-center">
          <div class="w-20 h-20 rounded-full bg-accent text-white font-display text-3xl
                      tracking-mega mx-auto mb-3 flex items-center justify-center">
            {{ user.user?.firstName[0] }}{{ user.user?.lastName[0] }}
          </div>
          <div class="font-display text-xl tracking-mega text-white">{{ user.fullName }}</div>
          <div class="text-fog text-sm">{{ user.user?.email }}</div>
          <div class="text-xs text-fog mt-2">З нами з {{ formatDate(user.user!.joinedAt) }}</div>
        </div>

        <div class="card p-5 space-y-1">
          <a v-for="link in [
            { label: 'Мої замовлення', icon: '📦', active: true },
            { label: 'Особисті дані', icon: '👤' },
            { label: 'Адреси доставки', icon: '📍' },
            { label: 'Бонусний рахунок', icon: '💎' },
            { label: 'Бажане', icon: '❤️' }
          ]" :key="link.label"
            href="#"
            class="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold transition"
            :class="link.active ? 'bg-ink-700 text-white' : 'text-fog hover:text-white hover:bg-ink-700/50'">
            <span>{{ link.icon }}</span>
            {{ link.label }}
          </a>
          <button @click="user.logout()" class="w-full text-left px-3 py-2.5 text-fog hover:text-danger text-sm font-semibold mt-2">
            ↩ Вийти
          </button>
        </div>
      </aside>

      <!-- Main: orders -->
      <div>
        <!-- Stats -->
        <div class="grid sm:grid-cols-3 gap-4 mb-8">
          <div class="card p-5">
            <div class="text-xs uppercase tracking-mega text-fog mb-1">Замовлень</div>
            <div class="font-display text-3xl tracking-mega text-white">{{ user.orders.length }}</div>
          </div>
          <div class="card p-5">
            <div class="text-xs uppercase tracking-mega text-fog mb-1">Витрачено</div>
            <div class="font-display text-3xl tracking-mega text-accent">
              {{ formatUAH(user.orders.reduce((acc, o) => acc + o.total, 0)) }}
            </div>
          </div>
          <div class="card p-5">
            <div class="text-xs uppercase tracking-mega text-fog mb-1">Бонуси</div>
            <div class="font-display text-3xl tracking-mega text-gold">488 ₴</div>
          </div>
        </div>

        <!-- Orders list -->
        <div class="font-display text-2xl tracking-mega text-white mb-5">Історія замовлень</div>
        <div class="space-y-4">
          <article v-for="order in user.orders" :key="order.id" class="card p-5">
            <div class="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div class="font-mono text-sm text-fog">{{ order.number }}</div>
                <div class="text-white font-semibold mt-1">
                  Замовлення від {{ formatDate(order.date) }}
                </div>
                <div class="text-fog text-sm">{{ order.itemsCount }} товарів</div>
              </div>
              <div class="text-right">
                <span class="chip" :class="statusMap[order.status].class">
                  {{ statusMap[order.status].label }}
                </span>
                <div class="font-display text-2xl tracking-mega text-white mt-2">
                  {{ formatUAH(order.total) }}
                </div>
              </div>
            </div>
            <div class="flex gap-2 mt-4 pt-4 border-t border-line">
              <button class="btn-ghost text-sm py-2">Деталі</button>
              <button class="btn-ghost text-sm py-2">Повторити</button>
              <button v-if="order.status === 'shipped'" class="btn-ghost text-sm py-2">
                Відстежити
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>
