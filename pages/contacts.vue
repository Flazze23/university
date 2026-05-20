<script setup lang="ts">
useSeoMeta({
  title: 'Контакти — ТурбоХім',
  description: 'Зв\'яжіться з нами: телефон, email, месенджери, адреса офісу та складу в Києві.'
})

const form = reactive({
  name: '',
  phone: '',
  message: '',
  type: 'general' as 'general' | 'b2b' | 'support'
})
const sent = ref(false)
const submit = async () => {
  await new Promise(r => setTimeout(r, 500))
  sent.value = true
  setTimeout(() => { sent.value = false }, 4000)
  Object.assign(form, { name: '', phone: '', message: '' })
}
</script>

<template>
  <div class="container-x py-10 md:py-16">
    <nav class="text-sm text-fog mb-4">
      <NuxtLink to="/" class="hover:text-accent">Головна</NuxtLink>
      <span class="mx-2">/</span>
      <span class="text-white">Контакти</span>
    </nav>

    <div class="max-w-3xl mb-12">
      <div class="section-eyebrow">Зв'язатись з нами</div>
      <h1 class="font-display text-5xl md:text-7xl tracking-mega text-white leading-[0.95]">
        Завжди на зв'язку
      </h1>
      <p class="text-fog-soft text-lg mt-4">
        Відповідаємо в чаті за 5 хвилин, на email — за 1 годину. Працюємо щодня з 9:00 до 21:00.
      </p>
    </div>

    <div class="grid lg:grid-cols-2 gap-8">
      <!-- Info -->
      <div class="space-y-4">
        <div class="card p-6">
          <div class="text-xs uppercase tracking-mega text-fog mb-2">Телефон</div>
          <a href="tel:+380671234567" class="font-display text-3xl tracking-mega text-white hover:text-accent">
            +38 (067) 123-45-67
          </a>
          <div class="text-fog text-sm mt-2">Щодня з 9:00 до 21:00</div>
        </div>

        <div class="card p-6">
          <div class="text-xs uppercase tracking-mega text-fog mb-2">Email</div>
          <a href="mailto:hello@turbochem.ua" class="font-display text-3xl tracking-mega text-white hover:text-accent break-all">
            hello@turbochem.ua
          </a>
          <div class="text-fog text-sm mt-2">Відповідь за 1 годину</div>
        </div>

        <div class="card p-6">
          <div class="text-xs uppercase tracking-mega text-fog mb-2">Месенджери</div>
          <div class="flex flex-wrap gap-2 mt-2">
            <a v-for="m in [
              { label: '✈️ Telegram', href: 'https://t.me/turbochem' },
              { label: '💬 WhatsApp', href: 'https://wa.me/380671234567' },
              { label: '📱 Viber', href: 'viber://chat?number=380671234567' }
            ]" :key="m.label" :href="m.href" target="_blank"
              class="chip hover:border-accent hover:text-accent transition">{{ m.label }}</a>
          </div>
        </div>

        <div class="card p-6">
          <div class="text-xs uppercase tracking-mega text-fog mb-2">Офіс і склад</div>
          <div class="text-white">м. Київ, вул. Промислова, 17</div>
          <div class="text-fog text-sm mt-1">Пн–Пт 10:00–19:00, Сб 11:00–17:00</div>
          <div class="mt-3 chip badge-sale">✓ Самовивіз доступний</div>
        </div>

        <div class="card p-6 bg-gradient-to-br from-accent/15 to-transparent border-accent/30">
          <div class="text-xs uppercase tracking-mega text-accent mb-2">B2B напрямок</div>
          <div class="text-white font-display text-2xl tracking-mega">Опт для автомийок та СТО</div>
          <p class="text-fog text-sm mt-2 mb-4">
            Знижки від 10% до 30%, особистий менеджер, відстрочка платежу.
          </p>
          <a href="mailto:b2b@turbochem.ua" class="btn-primary">b2b@turbochem.ua</a>
        </div>
      </div>

      <!-- Form -->
      <div>
        <div class="card p-6 md:p-8">
          <div class="font-display text-3xl tracking-mega text-white mb-2">Залишіть запит</div>
          <p class="text-fog text-sm mb-6">Менеджер передзвонить протягом години.</p>

          <form @submit.prevent="submit" class="space-y-4">
            <div>
              <label class="label">Тема звернення</label>
              <div class="grid grid-cols-3 gap-2">
                <button v-for="t in [
                  { id: 'general', label: 'Загальне' },
                  { id: 'b2b', label: 'Опт / B2B' },
                  { id: 'support', label: 'Підтримка' }
                ]" :key="t.id" type="button"
                  @click="form.type = t.id as typeof form.type"
                  class="chip py-2 transition"
                  :class="form.type === t.id ? 'bg-accent border-accent text-white' : 'hover:border-accent'">
                  {{ t.label }}
                </button>
              </div>
            </div>
            <div>
              <label class="label">Ім'я *</label>
              <input v-model="form.name" required class="input" placeholder="Олександр" />
            </div>
            <div>
              <label class="label">Телефон *</label>
              <input v-model="form.phone" required type="tel" class="input" placeholder="+38 (067) ..." />
            </div>
            <div>
              <label class="label">Повідомлення</label>
              <textarea v-model="form.message" rows="4" class="input resize-none"
                placeholder="Опишіть ваше питання..."></textarea>
            </div>
            <button type="submit" class="btn-primary w-full">
              Надіслати запит
            </button>
            <p v-if="sent" class="text-success text-sm text-center">
              ✓ Дякуємо! Ми зв'яжемось з вами найближчим часом.
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
