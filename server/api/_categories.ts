import type { Category } from '~/types'

export const categories: Category[] = [
  {
    slug: 'shampoo',
    title: 'Автошампуні',
    shortTitle: 'Шампуні',
    description:
      'Концентровані pH-нейтральні шампуні для безконтактного та ручного миття. Не залишають розводів, безпечні для лакофарбового покриття.',
    icon: '🧴',
    cover: 'https://images.unsplash.com/photo-1605618826115-fb9e0c4d6a73?w=1200&q=80'
  },
  {
    slug: 'polish',
    title: 'Поліролі',
    shortTitle: 'Поліролі',
    description:
      'Абразивні та фінішні поліролі для усунення подряпин, голограм та відновлення глибини кольору.',
    icon: '✨',
    cover: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=1200&q=80'
  },
  {
    slug: 'interior',
    title: 'Очищувачі салону',
    shortTitle: 'Салон',
    description:
      'Засоби для шкіри, пластику, текстилю та скла. Антибактеріальні склади з матовим або сатиновим фінішем.',
    icon: '🪑',
    cover: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=1200&q=80'
  },
  {
    slug: 'wheels',
    title: 'Засоби для дисків',
    shortTitle: 'Диски',
    description:
      'Кислотні та лужні очищувачі гальмівного пилу. Індикатор іржі (Iron Out) для глибокого очищення.',
    icon: '🛞',
    cover: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1200&q=80'
  },
  {
    slug: 'protection',
    title: 'Захисні покриття',
    shortTitle: 'Покриття',
    description:
      'Керамічні покриття 9H, графенові та віск-сіланти. Гідрофобний ефект до 24 місяців.',
    icon: '🛡️',
    cover: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80'
  },
  {
    slug: 'engine',
    title: 'Хімія для двигуна',
    shortTitle: 'Двигун',
    description:
      'Очищувачі підкапотного простору, розкоксовка, промивки масляної системи. Безпечні для всіх типів двигунів.',
    icon: '⚙️',
    cover: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&q=80'
  },
  {
    slug: 'accessories',
    title: 'Аксесуари для догляду',
    shortTitle: 'Аксесуари',
    description:
      'Мікрофібра, аплікатори, відра з Grit Guard, щітки, MF-рукавиці та сушарки. Усе для професійного детейлінгу.',
    icon: '🧤',
    cover: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=1200&q=80'
  }
]
