<script setup lang="ts">
const year = new Date().getFullYear()

const cols = [
  {
    title: 'Каталог',
    links: [
      { label: 'Автошампуні', to: '/catalog/shampoo' },
      { label: 'Поліролі', to: '/catalog/polish' },
      { label: 'Очищувачі салону', to: '/catalog/interior' },
      { label: 'Засоби для дисків', to: '/catalog/wheels' },
      { label: 'Захисні покриття', to: '/catalog/protection' },
      { label: 'Хімія для двигуна', to: '/catalog/engine' },
      { label: 'Аксесуари', to: '/catalog/accessories' }
    ]
  },
  {
    title: 'Покупцям',
    links: [
      { label: 'Оплата та доставка', to: '/faq' },
      { label: 'Повернення', to: '/faq' },
      { label: 'Гарантія', to: '/faq' },
      { label: 'Програма лояльності', to: '/account' },
      { label: 'Опт та B2B', to: '/contacts' }
    ]
  },
  {
    title: 'Компанія',
    links: [
      { label: 'Про нас', to: '/about' },
      { label: 'Контакти', to: '/contacts' },
      { label: 'Відгуки', to: '/reviews' },
      { label: 'FAQ', to: '/faq' },
      { label: 'Блог', to: '/blog' }
    ]
  }
]
</script>

<template>
  <footer class="mt-32 bg-ink-800 border-t border-line">
    <div class="container-x py-16">
      <!-- Top: brand + columns -->
      <div class="grid grid-cols-2 lg:grid-cols-5 gap-10">
        <!-- Brand -->
        <div class="col-span-2">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-10 h-10 rounded-md bg-accent flex items-center justify-center font-display text-white text-xl">
              ТХ
            </div>
            <div class="leading-none">
              <div class="font-display text-2xl tracking-mega text-white">ТУРБОХІМ</div>
              <div class="text-[10px] uppercase tracking-mega text-fog">premium auto care</div>
            </div>
          </div>
          <p class="text-fog text-sm leading-relaxed max-w-sm">
            Український інтернет-магазин преміальної автохімії. Працюємо з 2019 року, понад
            12&nbsp;000 клієнтів довірили нам догляд за своїми авто.
          </p>

          <!-- Social -->
          <div class="flex gap-2 mt-6">
            <a v-for="s in ['IG', 'FB', 'YT', 'TG', 'TT']" :key="s" href="#"
              class="w-10 h-10 rounded-md border border-line text-white flex items-center justify-center
                     hover:border-accent hover:text-accent transition-all font-mono text-xs"
            >
              {{ s }}
            </a>
          </div>
        </div>

        <!-- Cols -->
        <div v-for="col in cols" :key="col.title">
          <div class="text-white font-display tracking-mega mb-4 text-lg">
            {{ col.title }}
          </div>
          <ul class="space-y-2.5">
            <li v-for="l in col.links" :key="l.label">
              <NuxtLink :to="l.to" class="text-sm text-fog hover:text-accent transition-colors">
                {{ l.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Newsletter -->
      <div class="mt-14 pt-10 border-t border-line grid md:grid-cols-2 gap-6 items-center">
        <div>
          <div class="text-white font-display text-2xl tracking-mega">Підпишіться на знижки</div>
          <div class="text-fog text-sm mt-1">
            Раз на тиждень — новинки, акції до -40% та поради з догляду.
          </div>
        </div>
        <form class="flex gap-2" @submit.prevent>
          <input type="email" placeholder="Ваш email" class="input flex-1" />
          <button class="btn-primary">Підписатись</button>
        </form>
      </div>

      <!-- Bottom -->
      <div class="mt-12 pt-6 border-t border-line flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-fog">
        <div>© {{ year }} ТурбоХім. Усі права захищено.</div>
        <div class="flex flex-wrap gap-5">
          <NuxtLink to="/privacy" class="hover:text-accent">Політика конфіденційності</NuxtLink>
          <NuxtLink to="/terms" class="hover:text-accent">Умови використання</NuxtLink>
          <NuxtLink to="/sitemap" class="hover:text-accent">Карта сайту</NuxtLink>
        </div>
        <div class="flex items-center gap-2 font-mono">
          <span>VISA</span><span>·</span><span>MASTERCARD</span><span>·</span><span>APPLE PAY</span>
        </div>
      </div>
    </div>
  </footer>
</template>
