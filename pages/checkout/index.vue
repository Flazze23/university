<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import { formatUAH } from '~/utils/format'
import type { Product } from '~/types'

useSeoMeta({
  title: 'Оформлення замовлення — ТурбоХім',
  description: 'Швидке оформлення замовлення: контактні дані, доставка Новою Поштою, оплата онлайн або при отриманні.'
})

const cart = useCartStore()

const { data: catalog } = await useFetch<{ items: Product[] }>('/api/products', {
  key: 'checkout-catalog',
  default: () => ({ items: [] })
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

// Форма
const form = reactive({
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  city: '',
  warehouse: '',
  deliveryType: 'np-warehouse' as 'np-warehouse' | 'np-courier' | 'np-postomat',
  payment: 'card' as 'card' | 'cod',
  comment: '',
  promocode: ''
})

const submitting = ref(false)
const submitted = ref(false)
const orderNumber = ref('')

const submit = async () => {
  if (cart.isEmpty) return
  submitting.value = true
  // Імітація відправки
  await new Promise(r => setTimeout(r, 800))
  orderNumber.value = `TC-2026-${String(Math.floor(100000 + Math.random() * 900000)).slice(0, 5)}`
  submitting.value = false
  submitted.value = true
  cart.clear()
}
</script>

<template>
  <div class="container-x py-10 md:py-16">
    <nav class="text-sm text-fog mb-4">
      <NuxtLink to="/" class="hover:text-accent">Головна</NuxtLink>
      <span class="mx-2">/</span>
      <span class="text-white">Оформлення</span>
    </nav>

    <h1 class="font-display text-4xl md:text-6xl tracking-mega text-white mb-10">
      Оформлення замовлення
    </h1>

    <!-- Success -->
    <div v-if="submitted" class="card p-10 text-center max-w-2xl mx-auto">
      <div class="text-6xl mb-4">✅</div>
      <div class="font-display text-4xl tracking-mega text-white mb-3">Замовлення прийняте!</div>
      <p class="text-fog-soft mb-6">
        Номер вашого замовлення: <span class="font-mono text-accent text-lg">{{ orderNumber }}</span>
      </p>
      <p class="text-fog text-sm mb-8">
        Менеджер зателефонує вам протягом 15 хвилин для підтвердження. Дякуємо за довіру!
      </p>
      <div class="flex gap-3 justify-center">
        <NuxtLink to="/" class="btn-primary">На головну</NuxtLink>
        <NuxtLink to="/account" class="btn-ghost">Мої замовлення</NuxtLink>
      </div>
    </div>

    <!-- Empty -->
    <div v-else-if="cart.isEmpty" class="card p-10 text-center max-w-2xl mx-auto">
      <div class="text-6xl opacity-30 mb-4">🛒</div>
      <div class="font-display text-3xl tracking-mega text-white mb-3">Кошик порожній</div>
      <p class="text-fog mb-6">Спочатку додайте товари до кошика.</p>
      <NuxtLink to="/catalog" class="btn-primary">До каталогу</NuxtLink>
    </div>

    <!-- Form -->
    <form v-else @submit.prevent="submit" class="grid lg:grid-cols-[1fr_400px] gap-8">
      <div class="space-y-6">
        <!-- 1. Контакти -->
        <div class="card p-6">
          <div class="font-display text-2xl tracking-mega text-white mb-5">
            <span class="text-accent">01.</span> Контактна інформація
          </div>
          <div class="grid sm:grid-cols-2 gap-4">
            <div>
              <label class="label">Ім'я *</label>
              <input v-model="form.firstName" required class="input" placeholder="Олександр" />
            </div>
            <div>
              <label class="label">Прізвище *</label>
              <input v-model="form.lastName" required class="input" placeholder="Шатравка" />
            </div>
            <div>
              <label class="label">Телефон *</label>
              <input v-model="form.phone" required type="tel" class="input" placeholder="+38 (067) ..." />
            </div>
            <div>
              <label class="label">Email *</label>
              <input v-model="form.email" required type="email" class="input" placeholder="email@example.com" />
            </div>
          </div>
        </div>

        <!-- 2. Доставка -->
        <div class="card p-6">
          <div class="font-display text-2xl tracking-mega text-white mb-5">
            <span class="text-accent">02.</span> Доставка
          </div>
          <div class="space-y-3 mb-5">
            <label v-for="opt in [
              { id: 'np-warehouse', label: '📦 Відділення Нової Пошти', desc: '1–2 дні · від 60 грн' },
              { id: 'np-postomat', label: '🤖 Поштомат Нової Пошти', desc: '1–2 дні · від 50 грн' },
              { id: 'np-courier', label: '🛵 Кур\'єр Нової Пошти', desc: '1–2 дні · від 120 грн' }
            ]" :key="opt.id"
              class="flex items-start gap-3 p-4 border rounded-md cursor-pointer transition"
              :class="form.deliveryType === opt.id ? 'border-accent bg-ink-700/50' : 'border-line hover:border-line-strong'">
              <input v-model="form.deliveryType" :value="opt.id" type="radio" class="accent-accent mt-1" />
              <div>
                <div class="text-white font-semibold">{{ opt.label }}</div>
                <div class="text-xs text-fog">{{ opt.desc }}</div>
              </div>
            </label>
          </div>
          <div class="grid sm:grid-cols-2 gap-4">
            <div>
              <label class="label">Місто *</label>
              <input v-model="form.city" required class="input" placeholder="Київ" />
            </div>
            <div>
              <label class="label">№ відділення *</label>
              <input v-model="form.warehouse" required class="input" placeholder="№ 25" />
            </div>
          </div>
        </div>

        <!-- 3. Оплата -->
        <div class="card p-6">
          <div class="font-display text-2xl tracking-mega text-white mb-5">
            <span class="text-accent">03.</span> Оплата
          </div>
          <div class="space-y-3">
            <label v-for="opt in [
              { id: 'card', label: '💳 Карткою онлайн', desc: 'Visa / Mastercard / Apple Pay / Google Pay' },
              { id: 'cod', label: '📦 Накладений платіж', desc: 'Оплата при отриманні + комісія НП' }
            ]" :key="opt.id"
              class="flex items-start gap-3 p-4 border rounded-md cursor-pointer transition"
              :class="form.payment === opt.id ? 'border-accent bg-ink-700/50' : 'border-line hover:border-line-strong'">
              <input v-model="form.payment" :value="opt.id" type="radio" class="accent-accent mt-1" />
              <div>
                <div class="text-white font-semibold">{{ opt.label }}</div>
                <div class="text-xs text-fog">{{ opt.desc }}</div>
              </div>
            </label>
          </div>
        </div>

        <!-- 4. Коментар -->
        <div class="card p-6">
          <label class="label">Коментар до замовлення (необов'язково)</label>
          <textarea v-model="form.comment" rows="3" class="input resize-none"
            placeholder="Побажання щодо доставки, особливі вимоги..."></textarea>
        </div>
      </div>

      <!-- Sidebar -->
      <aside class="lg:sticky lg:top-24 self-start space-y-4">
        <div class="card p-6">
          <div class="font-display text-2xl tracking-mega text-white mb-5">Ваше замовлення</div>

          <div class="space-y-3 max-h-64 overflow-y-auto mb-5 pr-1">
            <div v-for="item in items" :key="item.product.id" class="flex gap-3 text-sm">
              <img :src="item.product.image" class="w-12 h-12 rounded object-cover shrink-0" :alt="item.product.title" />
              <div class="flex-1 min-w-0">
                <div class="text-white line-clamp-2 leading-tight">{{ item.product.title }}</div>
                <div class="text-fog text-xs mt-1">{{ item.qty }} × {{ formatUAH(item.product.price) }}</div>
              </div>
              <div class="text-white font-semibold whitespace-nowrap">
                {{ formatUAH(item.product.price * item.qty) }}
              </div>
            </div>
          </div>

          <!-- Promo -->
          <div class="flex gap-2 mb-5">
            <input v-model="form.promocode" class="input text-sm" placeholder="Промокод" />
            <button type="button" class="btn-ghost">OK</button>
          </div>

          <div class="space-y-2 pt-4 border-t border-line text-sm">
            <div class="flex justify-between text-fog">
              <span>Сума товарів</span><span class="text-white">{{ formatUAH(subtotal) }}</span>
            </div>
            <div class="flex justify-between text-fog">
              <span>Доставка</span>
              <span class="text-white">
                <template v-if="shipping === 0">Безкоштовно</template>
                <template v-else>{{ formatUAH(shipping) }}</template>
              </span>
            </div>
            <div class="flex justify-between items-end pt-3 mt-3 border-t border-line">
              <span class="text-white font-semibold">Усього</span>
              <span class="font-display text-3xl tracking-mega text-white">{{ formatUAH(total) }}</span>
            </div>
          </div>

          <button type="submit" :disabled="submitting" class="btn-primary w-full mt-6 text-base">
            <template v-if="submitting">Обробка...</template>
            <template v-else>Підтвердити замовлення</template>
          </button>
          <p class="text-xs text-fog mt-3 text-center">
            Натискаючи "Підтвердити", ви погоджуєтесь з
            <NuxtLink to="/terms" class="text-accent hover:underline">умовами</NuxtLink>.
          </p>
        </div>
      </aside>
    </form>
  </div>
</template>
