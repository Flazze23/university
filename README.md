# ТурбоХім — інтернет-магазин преміальної автохімії

Повноцінний багатосторінковий e-commerce на **Nuxt 3 SSR + Vue 3 + TypeScript + Tailwind + Pinia**.

## ⚡ Швидкий старт

```bash
# 1. Установка залежностей
npm install

# 2. Запуск у dev-режимі
npm run dev

# 3. Відкрити в браузері
# → http://localhost:3000
```

## 📦 Команди

| Команда | Опис |
|---------|------|
| `npm run dev` | Dev-сервер з HMR |
| `npm run build` | Продакшн-білд (SSR) |
| `npm run preview` | Локальний перегляд білда |
| `npm run generate` | Статичний експорт (SSG) |
| `npm run typecheck` | TS-перевірка |

## 🏗️ Архітектура

```
turbochem/
├── assets/css/main.css         # Tailwind + кастомні компоненти
├── components/                 # 13 переусних компонентів
│   ├── SiteHeader.vue          # Sticky header з пошуком
│   ├── SiteFooter.vue          # Футер з newsletter
│   ├── HeroSlider.vue          # Автопрокрутка банерів
│   ├── ProductCard.vue         # Картка товару
│   ├── ProductGrid.vue         # Адаптивна сітка
│   ├── CategoryGrid.vue        # Сітка категорій
│   ├── CartDrawer.vue          # Drawer кошика (Teleport)
│   ├── SearchOverlay.vue       # Live-пошук
│   ├── FloatingContact.vue     # FAB зв'язку
│   ├── Marquee.vue             # Стрічка USP
│   ├── PromoStrip.vue          # Акційний блок з countdown
│   ├── ReviewCarousel.vue      # Відгуки
│   └── SectionTitle.vue        # Заголовок секції
├── layouts/default.vue
├── pages/                      # 11 сторінок
│   ├── index.vue               # Головна
│   ├── catalog/index.vue       # Каталог з фільтрами
│   ├── catalog/[slug].vue      # Сторінка категорії
│   ├── product/[slug].vue      # Сторінка товару
│   ├── checkout/index.vue      # Оформлення замовлення
│   ├── account/index.vue       # Особистий кабінет
│   ├── about.vue               # Про нас
│   ├── contacts.vue            # Контакти + B2B
│   ├── faq.vue                 # FAQ accordion
│   ├── reviews.vue             # Відгуки
│   └── sale.vue                # Акції
├── server/api/                 # Nitro API endpoints
│   ├── _categories.ts          # Моки категорій
│   ├── _products.ts            # 56 товарів
│   ├── _content.ts             # Відгуки/FAQ/банери
│   ├── products.get.ts         # GET /api/products + фільтри
│   ├── products/[slug].get.ts  # GET /api/products/:slug
│   ├── categories.get.ts
│   └── content.get.ts
├── stores/                     # Pinia
│   ├── cart.ts                 # Кошик + localStorage
│   ├── user.ts                 # Демо-користувач
│   └── ui.ts                   # Drawer/Search/Menu
├── types/index.ts              # Доменна модель + AsyncState<T>
├── utils/format.ts             # formatUAH, formatDate
├── error.vue                   # 404
└── nuxt.config.ts
```

## 🎨 Дизайн-система

- **Тема:** темна automotive (графіт #0a0a0b)
- **Акцент:** помаранчевий #ff3d00 + золотий #ffb800
- **Шрифти:** Bebas Neue (display) + Manrope (sans) + JetBrains Mono
- **Брендова деталь:** літер-спейсинг 0.18em на display-заголовках
- **Адаптив:** 2 cols (mobile) → 3 (tablet) → 4 (desktop)

## 📊 Контент

- **7 категорій:** автошампуні, поліролі, очищувачі салону, засоби для дисків, захисні покриття, хімія для двигуна, аксесуари
- **56 товарів** з бейджами hit/new/sale, рейтингами, відгуками
- **6 відгуків клієнтів** з різних міст
- **8 FAQ-питань**
- **3 банери** для слайдера

## 🛒 Функціонал

- ✅ SSR з мета-тегами для SEO (Open Graph, uk_UA)
- ✅ Каталог з фільтрами: категорія, бренди, ціна, наявність, бейджі, пошук
- ✅ 5 типів сортування (популярність, ціна, рейтинг, новинки)
- ✅ Кошик з персистом у localStorage
- ✅ Безкоштовна доставка від 1500 грн
- ✅ Чекаут з вибором доставки/оплати + накладений платіж
- ✅ Особистий кабінет з історією замовлень
- ✅ Live-пошук overlay (Esc, autofocus)
- ✅ Плаваючий FAB зв'язку (Telegram/WhatsApp/Phone/Email)
- ✅ Page transitions
- ✅ Mobile menu

## 🔧 Технічні рішення

- **AsyncState\<T>** як discriminated union для типобезпечних станів
- **useFetch з key** для дедуплікації SSR-запитів
- **Reactive filters** з computed-query для каталогу
- **Pinia hydrate()** з захистом від подвійної гідрації
- **Teleport** для CartDrawer/SearchOverlay (поза основним DOM)

## 📝 Що далі (для продакшну)

1. Замінити моки в `/server/api/_*.ts` на запити до реального бекенду
2. Додати auth-провайдер (NextAuth-style або Supabase)
3. Інтегрувати реальну оплату (LiqPay/Fondy/WayForPay)
4. Підключити Nova Poshta API для відділень
5. Налаштувати CDN для статичних зображень (зараз — Unsplash)
6. Додати тести (Vitest для unit, Playwright для e2e)

---

Made with 🔥 by detailers, for detailers.
