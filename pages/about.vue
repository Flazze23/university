<script setup lang="ts">
useSeoMeta({
  title: 'Про нас — ТурбоХім',
  description: 'ТурбоХім — український інтернет-магазин преміальної автохімії з 2019 року. Понад 12 000 клієнтів та 4.9 рейтинг.'
})
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative border-b border-line overflow-hidden">
      <div class="absolute inset-0 bg-hero-gradient"></div>
      <div class="relative container-x py-20 md:py-32">
        <div class="max-w-3xl">
          <div class="section-eyebrow">Про компанію</div>
          <h1 class="font-display text-5xl md:text-8xl tracking-mega text-white leading-[0.95] mb-6">
            Хімія, яка<br><span class="text-accent">працює</span>
          </h1>
          <p class="text-fog-soft text-lg max-w-2xl">
            ТурбоХім — український бренд преміальної автохімії з 2019 року. Ми поєднуємо
            європейські формули, доступні ціни та сервіс, у якому вас почують.
          </p>
        </div>
      </div>
    </section>

    <!-- Numbers -->
    <section class="container-x py-16 md:py-24">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="stat in [
          { num: '2019', label: 'рік заснування' },
          { num: '12K+', label: 'клієнтів' },
          { num: '50+', label: 'товарів' },
          { num: '4.9 / 5', label: 'рейтинг' }
        ]" :key="stat.label" class="card p-6 text-center">
          <div class="font-display text-4xl md:text-5xl tracking-mega text-accent">{{ stat.num }}</div>
          <div class="text-fog text-xs uppercase tracking-mega mt-2">{{ stat.label }}</div>
        </div>
      </div>
    </section>

    <!-- Story -->
    <section class="container-x py-16 md:py-24">
      <div class="grid md:grid-cols-[1fr_1.4fr] gap-12">
        <div>
          <div class="section-eyebrow">Наша історія</div>
          <h2 class="section-title">Від гаража до бренду</h2>
        </div>
        <div class="space-y-5 text-fog-soft text-lg leading-relaxed">
          <p>
            Усе почалося в 2019 році з невеликої детейлінг-студії у Києві. Ми постійно стикалися
            з тим, що якісна автохімія — це або дорого, або недоступно в Україні. І вирішили
            це змінити.
          </p>
          <p>
            Сьогодні <span class="text-white font-semibold">ТурбоХім</span> — це власна
            виробнича лінія, ексклюзивне партнерство з європейськими виробниками
            (Німеччина, Італія, Польща) та склад на 600 м² у Києві.
          </p>
          <p>
            Ми не намагаємось продати дорого. Ми хочемо, щоб ви поверталися — і приводили друзів.
          </p>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="bg-ink-800 border-y border-line py-16 md:py-24">
      <div class="container-x">
        <SectionTitle
          eyebrow="Цінності"
          title="У що ми віримо"
          subtitle="Чотири принципи, які не міняються відколи ми починали."
        />
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="(v, i) in [
            { icon: '⚗️', title: 'Якість понад усе', desc: 'Кожна партія перевіряється в лабораторії перед відправкою на склад.' },
            { icon: '💬', title: 'Прозорість', desc: 'Чесний склад, чесні ціни, чесні відгуки. Без накручення зірочок.' },
            { icon: '🚀', title: 'Швидкість', desc: 'Відправляємо в день оформлення. Підтримка в чаті — 24/7.' },
            { icon: '🌱', title: 'Екологія', desc: 'Біорозкладні шампуні та переробка тари — наш стандарт із 2022 року.' }
          ]" :key="i" class="card p-6">
            <div class="text-4xl mb-3">{{ v.icon }}</div>
            <div class="font-display text-xl tracking-mega text-white mb-2">{{ v.title }}</div>
            <p class="text-fog text-sm">{{ v.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team -->
    <section class="container-x py-16 md:py-24">
      <SectionTitle eyebrow="Команда" title="Хто стоїть за брендом" />
      <div class="grid md:grid-cols-3 gap-6">
        <div v-for="member in [
          { name: 'Андрій К.', role: 'Засновник & R&D', desc: 'Хімік-технолог, 12 років у детейлінгу. Розробляє нові формули.' },
          { name: 'Олена П.', role: 'Керівник продажів', desc: 'Будує B2B-напрямок: автомийки, СТО, детейлінг-студії.' },
          { name: 'Максим В.', role: 'Підтримка та логістика', desc: 'Відповідає за те, щоб ваш товар приїхав вчасно.' }
        ]" :key="member.name" class="card p-6">
          <div class="w-16 h-16 rounded-full bg-accent/20 border border-accent text-accent
                      font-display text-2xl tracking-mega flex items-center justify-center mb-4">
            {{ member.name[0] }}
          </div>
          <div class="text-white font-semibold">{{ member.name }}</div>
          <div class="text-accent text-xs uppercase tracking-mega mb-3">{{ member.role }}</div>
          <p class="text-fog text-sm">{{ member.desc }}</p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="container-x py-16 md:py-24">
      <div class="card p-10 md:p-16 text-center bg-gradient-to-br from-accent/10 to-transparent border-accent/30">
        <div class="section-eyebrow">Готові спробувати?</div>
        <h2 class="font-display text-4xl md:text-6xl tracking-mega text-white mb-4">
          Знайдіть свій продукт
        </h2>
        <p class="text-fog-soft max-w-xl mx-auto mb-8">
          7 категорій, понад 50 товарів. Якщо не визначитесь — напишіть у чат, допоможемо.
        </p>
        <div class="flex flex-wrap justify-center gap-3">
          <NuxtLink to="/catalog" class="btn-primary">До каталогу</NuxtLink>
          <NuxtLink to="/contacts" class="btn-ghost">Зв'язатись</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
