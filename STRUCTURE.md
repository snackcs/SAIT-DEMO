# STRUCTURE — Структура файлов проекта

## Дерево файлов

```
demo-sait/
│
├── public/
│   └── images/
│       ├── barbershop/         # Локальные фото (опционально, можно Unsplash)
│       ├── auto/
│       ├── dental/
│       ├── beauty/
│       ├── tutor/
│       └── coffee/
│
├── src/
│   │
│   ├── app/                            # Next.js App Router
│   │   ├── layout.tsx                  # Root layout: шрифты, Header, Footer, Metrika
│   │   ├── globals.css                 # Tailwind directives + CSS переменные шрифтов
│   │   ├── page.tsx                    # Главная /
│   │   ├── not-found.tsx               # Кастомная 404 страница
│   │   ├── loading.tsx                 # Глобальный loading state
│   │   ├── error.tsx                   # Глобальный error boundary
│   │   ├── robots.ts                   # Генерация robots.txt
│   │   ├── sitemap.ts                  # Генерация sitemap.xml
│   │   ├── barbershop/
│   │   │   └── page.tsx
│   │   ├── auto/
│   │   │   └── page.tsx
│   │   ├── dental/
│   │   │   └── page.tsx
│   │   ├── beauty/
│   │   │   └── page.tsx
│   │   ├── tutor/
│   │   │   └── page.tsx
│   │   ├── coffee/
│   │   │   └── page.tsx
│   │   └── contact/
│   │       └── page.tsx
│   │
│   ├── components/
│   │   │
│   │   ├── layout/
│   │   │   ├── Header.tsx              # Логотип, навигация, CTA кнопка
│   │   │   ├── MobileMenu.tsx          # Drawer-меню для мобилки (отдельный компонент!)
│   │   │   └── Footer.tsx
│   │   │
│   │   ├── sections/                   # Переиспользуемые секции лендингов
│   │   │   ├── DemoBanner.tsx          # Плашка "Это демо" — только на страницах ниш
│   │   │   ├── NicheHero.tsx
│   │   │   ├── NicheAbout.tsx          # Секция "О нас" — 2 колонки (текст+фото) + 3 факта
│   │   │   ├── NicheServices.tsx       # 6 ServiceCard (или MenuCard для /coffee)
│   │   │   ├── NicheWhyUs.tsx          # Секция "Почему мы" — 4 блока с иконками
│   │   │   ├── NicheProcess.tsx        # Секция "Как это работает" — 3 шага со стрелками
│   │   │   ├── NicheGallery.tsx
│   │   │   ├── NicheReviews.tsx
│   │   │   ├── NichePricing.tsx        # 3 PricingCard (или PopularItems для /coffee)
│   │   │   ├── NicheFAQ.tsx            # Аккордеон, 5 вопросов — уникальны для каждой ниши
│   │   │   ├── NicheCTA.tsx
│   │   │   ├── NicheContacts.tsx       # Рендерит только непустые контакты
│   │   │   └── TutorResults.tsx        # Специфично для /tutor (вместо галереи)
│   │   │
│   │   ├── home/                       # Секции только главной страницы
│   │   │   ├── HomeHero.tsx
│   │   │   ├── NicheGrid.tsx
│   │   │   ├── WhyMe.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   └── HomeCTA.tsx
│   │   │
│   │   ├── ui/                         # Атомарные UI компоненты
│   │   │   ├── Button.tsx              # variants: primary|outline|ghost, sizes: sm|md|lg
│   │   │   ├── Badge.tsx
│   │   │   ├── FadeIn.tsx              # Framer Motion обёртка
│   │   │   ├── StarRating.tsx          # SVG звёзды для отзывов
│   │   │   ├── NicheCard.tsx           # Карточка ниши на главной
│   │   │   ├── ServiceCard.tsx
│   │   │   ├── MenuCard.tsx            # Карточка пункта меню (только /coffee, данные = Service)
│   │   │   ├── ReviewCard.tsx
│   │   │   └── PricingCard.tsx
│   │   │
│   │   └── YandexMetrika.tsx           # Скрипт аналитики (next/script afterInteractive)
│   │
│   ├── data/
│   │   ├── types.ts                    # Все TypeScript типы
│   │   ├── niches.ts                   # Краткий список для главной
│   │   ├── barbershop.ts
│   │   ├── auto.ts
│   │   ├── dental.ts
│   │   ├── beauty.ts
│   │   ├── tutor.ts
│   │   └── coffee.ts
│   │
│   └── lib/
│       └── utils.ts                    # cn() = clsx + tailwind-merge
│
├── README.md
├── PROJECT_PLAN.md
├── STRUCTURE.md
├── PAGES_PLAN.md
├── next.config.mjs                     # images.remotePatterns для Unsplash
├── tailwind.config.ts
├── tsconfig.json                       # strict: true, paths: @/*
├── .env.local                          # Локальные переменные (в .gitignore!)
├── .env.example                        # Шаблон переменных (коммитится в репо)
└── package.json
```

---

## Типы данных (src/data/types.ts)

```ts
import type { LucideProps } from 'lucide-react'

// Иконка — React-компонент, импортируется явно в каждом файле данных
// Это позволяет избежать import * from 'lucide-react' (1000+ иконок в бандл)
type LucideIcon = React.FC<LucideProps>

export type Service = {
  Icon: LucideIcon      // напр. Scissors, Wrench — импортируется в barbershop.ts
  title: string
  description: string
  price?: string        // необязательно (у /coffee — всегда есть)
}
// Примечание: /coffee использует Service[] для меню. MenuCard рендерит те же данные
// иначе (без price "от", с акцентом на описание напитка). Отдельный тип не нужен.

export type PricingPlan = {
  name: string
  price: string
  features: string[]    // /coffee: features[0] = описание комбо, напр. "Утренний комплект"
  highlighted: boolean
  badge?: string        // напр. "Популярное", "Хит дня"
}
// Примечание: /coffee использует PricingPlan[] для PopularItems (комбо напиток+выпечка).
// NichePricing рендерит их как PopularItems, а не тарифные карточки.

export type Review = {
  name: string
  role: string          // "клиент", "мама ученика", "BMW 3 Series" — гибко
  text: string
  rating: number        // 1–5
}

export type ContactInfo = {
  phone?: string
  address?: string
  hours?: string
  telegram?: string
  instagram?: string
  whatsapp?: string     // автосервис, репетитор
  vk?: string           // салон красоты
  email?: string        // репетитор
}

export type AboutInfo = {
  text: string          // основной абзац
  facts: { label: string; value: string }[]  // 3 факта, напр. {label:"Мастеров", value:"6"}
  image: string         // Unsplash URL для фото рядом с текстом
}

export type WhyUsItem = {
  Icon: LucideIcon
  title: string
  text: string
}

export type ProcessStep = {
  title: string
  text: string
}

export type FaqItem = {
  question: string
  answer: string
}

export type TutorResult = {
  name: string
  subject: string
  before: number
  after: number
}

// Базовый тип — общий для всех ниш
type NicheBase = {
  slug: string
  title: string         // "Barbershop «Топор»"
  tagline: string       // подзаголовок hero
  description: string   // краткое описание (используется в meta)
  color: string         // hex акцентного цвета — используется через inline style!
  badge?: string        // бейдж в Hero
  heroImage: string     // images.unsplash.com/photo-{id}?w=1600&q=80
  about: AboutInfo
  services: Service[]
  whyUs: WhyUsItem[]    // 4 элемента
  process: ProcessStep[] // 3 шага
  pricing: PricingPlan[]
  reviews: Review[]
  faq: FaqItem[]        // 5 вопросов — специфичны для каждой ниши
  contacts: ContactInfo
  seo: {
    title: string       // <title> страницы
    description: string // meta description (до 160 символов)
    ogImage: string     // images.unsplash.com/photo-{id}?w=1200&q=80
  }
}

// Ниши с галереей (barbershop, auto, dental, beauty, coffee)
export type NicheWithGallery = NicheBase & {
  hasGallery: true
  gallery: string[]     // массив images.unsplash.com URL
}

// Репетитор — вместо галереи блок результатов учеников
export type NicheWithResults = NicheBase & {
  hasGallery: false
  results: TutorResult[]
}

export type NicheData = NicheWithGallery | NicheWithResults

// Краткий тип для карточек на главной
export type NichePreview = {
  slug: string
  label: string         // "Барбершоп"
  tag: string           // "Лендинг · Запись онлайн"
  Icon: LucideIcon      // компонент иконки, не строка
  color: string         // hex
}
```

---

## next.config.mjs

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // НЕ отключать TypeScript и ESLint ошибки!
}

export default nextConfig
```

---

## .env.example (переменные окружения)

```bash
# Formspree — ID формы. Получить на formspree.io → New Form → скопировать ID
# В коде: process.env.NEXT_PUBLIC_FORMSPREE_ID
NEXT_PUBLIC_FORMSPREE_ID=xabc1234

# Домен сайта — используется в sitemap.ts и robots.ts
NEXT_PUBLIC_SITE_URL=https://твой-домен.ru
```

Файл `.env.local` создаётся локально, никогда не коммитится (добавить в `.gitignore`).
На **Vercel**: Settings → Environment Variables → добавить те же ключи вручную.

---

## tailwind.config.ts (ключевые токены)

```ts
theme: {
  extend: {
    colors: {
      background: '#0a0a0a',
      surface: '#141414',
      border: '#2a2a2a',
      'text-primary': '#f5f5f5',
      'text-secondary': '#888888',
      accent: '#e8c547',
    },
    fontFamily: {
      serif: ['var(--font-playfair)', 'serif'],
      sans: ['var(--font-inter)', 'sans-serif'],
    },
  },
}
```

---

## Стратегия акцентных цветов ниш (Tailwind + data.color)

**Проблема:** Tailwind генерирует CSS только для классов, найденных в исходном коде на этапе сборки. Динамически составленная строка `className={\`border-[\${data.color}]\`` **не попадёт в финальный CSS**.

**Решение — inline style для всех динамических цветов:**

```tsx
// ❌ НЕ РАБОТАЕТ — Tailwind удалит этот класс при сборке
<div className={`border-[${data.color}]`} />

// ✅ ПРАВИЛЬНО — inline style всегда применяется
<div style={{ borderColor: data.color }} />
<div style={{ color: data.color }} />
<div style={{ background: `${data.color}20` }} />  // 20 = 12% прозрачность в hex
```

**Где используется `data.color`:**
- Рамка highlighted PricingCard → `style={{ borderColor: data.color }}`
- Текст акцентных заголовков → `style={{ color: data.color }}`
- Фон DemoBanner → `style={{ backgroundColor: data.color }}`
- Gradient в NicheCTA → `style={{ background: \`linear-gradient(135deg, ${data.color}33, transparent)\`` }}`
- Иконки в ServiceCard, WhyUs → `style={{ color: data.color }}`

**Статические Tailwind-классы** (цвет фиксирован в коде) использовать как обычно:
`bg-surface`, `border-border`, `text-primary` и т.д.

---

## Стратегия иконок Lucide React

**Проблема:** динамический импорт `import * as Icons from 'lucide-react'` грузит **все 1000+ иконок** в бандл — Lighthouse Performance падает.

**Решение — явный импорт нужных иконок в каждом файле данных:**

```tsx
// ✅ В src/data/barbershop.ts — только нужные иконки
import { Scissors, Zap, Star, Clock, Shield, Award } from 'lucide-react'

// В поле services хранится JSX-компонент, а не строка:
export type Service = {
  Icon: React.FC<{ size?: number; className?: string }>  // React-компонент иконки
  title: string
  description: string
  price?: string
}

// Использование:
{ Icon: Scissors, title: 'Классическая стрижка', price: 'от 800 ₽', description: '...' }
```

```tsx
// В NicheServices.tsx — просто рендерим компонент
{data.services.map(({ Icon, title, description, price }) => (
  <ServiceCard key={title} Icon={Icon} title={title} description={description} price={price} />
))}
```

**Обновлённый тип Service** (заменяет `icon: string` на компонент):
```ts
import type { LucideProps } from 'lucide-react'

export type Service = {
  Icon: React.FC<LucideProps>   // компонент иконки, импортируется в файле данных
  title: string
  description: string
  price?: string
}

export type NichePreview = {
  slug: string
  label: string
  tag: string
  Icon: React.FC<LucideProps>   // то же — компонент, не строка
  color: string
}
```

---

## Схема страницы ниши

```
[Header]
  └── [MobileMenu] (скрытый, открывается по бургеру)
[DemoBanner]              ← только на страницах ниш, фон = data.color (inline style)

[NicheHero]               ← next/image fill + priority + gradient overlay
[NicheAbout]              ← 2 колонки: текст+факты / фото. Данные: data.about
[NicheServices]           ← 6 ServiceCard (или 6 MenuCard для /coffee)
[NicheWhyUs]              ← 4 блока. Данные: data.whyUs
[NicheProcess]            ← 3 шага. Данные: data.process
[NicheGallery]            ← 6 next/image (или TutorResults для /tutor)
[NicheReviews]            ← 3 ReviewCard, мобиле: scroll-snap
[NichePricing]            ← 3 PricingCard (или PopularItems для /coffee)
[NicheFAQ]                ← аккордеон. Данные: data.faq (5 вопросов)
[NicheCTA]                ← кнопка → /contact, акцент = data.color (inline style)
[NicheContacts]           ← только непустые поля ContactInfo

[Footer]
```

---

## Схема главной страницы

```
[Header]

[HomeHero]
  Заголовок + подзаголовок + кнопки + мозаика превью ниш

[NicheGrid]
  6 карточек NicheCard → ссылки на страницы ниш

[WhyMe]
  4 преимущества

[HowItWorks]
  3 шага со стрелками

[HomeCTA]
  → /contact

[Footer]
```

---

## robots.ts (src/app/robots.ts)

```ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { allow: '/' },
    sitemap: 'https://твой-домен.ru/sitemap.xml',
  }
}
```

---

## sitemap.ts (src/app/sitemap.ts)

```ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const niches = ['barbershop', 'auto', 'dental', 'beauty', 'tutor', 'coffee']
  return [
    { url: 'https://твой-домен.ru', priority: 1 },
    { url: 'https://твой-домен.ru/contact', priority: 0.9 },
    ...niches.map(slug => ({
      url: `https://твой-домен.ru/${slug}`,
      priority: 0.8,
    })),
  ]
}
```

---

## Правила именования

| Элемент        | Пример                                    |
|----------------|-------------------------------------------|
| Компонент      | `NicheHero.tsx` (PascalCase)              |
| Файл данных    | `barbershop.ts` (lowercase)               |
| Утилита        | `utils.ts` (lowercase)                    |
| CSS переменная | `--font-playfair`, `--font-inter`         |
| Пропс ниши     | `data: NicheData`                         |
| Акцент ниши    | `style={{ color: data.color }}` или через `data-color` атрибут + CSS |

---

## Порядок разработки

1. Инициализация проекта + зависимости
2. Типы данных (`types.ts`)
3. Данные ниш (6 файлов + `niches.ts`)
4. `next.config.mjs`, `tailwind.config.ts`, шрифты
5. `robots.ts`, `sitemap.ts`
6. Layout: `Header.tsx` + `MobileMenu.tsx` + `Footer.tsx`
7. UI компоненты (`Button`, `Badge`, `FadeIn`, `StarRating`, карточки)
8. Секции (`DemoBanner`, `NicheHero`, `NicheServices`, ...)
9. Страницы ниш (каждая — 10 минут, данные уже готовы)
10. Главная страница
11. Страница `/contact` + Formspree форма с валидацией
12. Служебные страницы: `not-found.tsx`, `loading.tsx`, `error.tsx`
13. Yandex.Metrika
14. Деплой на Vercel
15. Проверка: адаптив, OG-превью, Lighthouse

---

## Детальный план каждой страницы

---

### /barbershop — Барбершоп

**Акцент:** #c9a84c (золото) | Настроение: брутальность, стиль, мужской уют

```
[DemoBanner]
  Фон: #c9a84c | Текст тёмный
  "Это демо-шаблон барбершопа. Адаптируем под ваш бизнес."  [Хочу такой сайт]

[Hero]
  Фон: #0d0d0d + Unsplash фото барбера за работой
  Градиент: от чёрного слева → прозрачный справа
  Бейдж: "С 2018 года · Москва"
  Заголовок: "Barbershop «Топор»"
  Подзаголовок: "Классические стрижки. Мужской стиль."
  Кнопки: [Записаться] (золотой) · [Смотреть работы] (outline)

[Услуги] — 6 карточек, иконки золотые
  Классическая стрижка · от 800 ₽
  Стрижка бороды · от 500 ₽
  Бритьё опасной бритвой · от 700 ₽
  Камуфляж седины · от 1200 ₽
  Оформление усов · от 400 ₽
  Комплекс "Джентльмен" · от 1800 ₽

[Галерея] — 6 Unsplash фото барбершопа, сетка 3×2

[Отзывы] — 3 карточки
  Алексей М. · "Хожу уже 2 года, всегда доволен"
  Дмитрий К. · "Лучшее бритьё в Москве"
  Иван С. · "Атмосфера огонь, мастера профи"

[Цены] — 3 тарифа
  Базовый: Стрижка · 800 ₽
  Стандарт (highlighted + бейдж "Популярное"): Стрижка + Борода · 1300 ₽
  VIP: Полный комплекс · 2500 ₽

[CTA]
  "Хотите такой сайт для своего барбершопа?"  [Написать фрилансеру]

[Контакты]
  Адрес: ул. Большая Никитская, 15, Москва
  Телефон: +7 (999) 123-45-67
  Часы: Пн–Вс 10:00–21:00
  Instagram: @topor.barber
```

---

### /auto — Автосервис

**Акцент:** #e05c2a (оранжевый) | Настроение: сила, надёжность, скорость

```
[DemoBanner]
  Фон: #e05c2a
  "Это демо-шаблон автосервиса. Адаптируем под ваш бизнес."  [Хочу такой сайт]

[Hero]
  Unsplash фото авто в боксе
  Бейдж: "Работаем с 2015 · 3000+ клиентов"
  Заголовок: "АвтоМастер — сервис полного цикла"
  Подзаголовок: "Ремонт и обслуживание любых авто. Гарантия 1 год."
  Кнопки: [Записаться на ТО] · [Рассчитать стоимость]

[Услуги] — 6 карточек, иконки оранжевые
  Замена масла и фильтров · от 1500 ₽
  Ремонт ходовой части · от 2000 ₽
  Кузовной ремонт · по запросу
  Компьютерная диагностика · 990 ₽
  Шиномонтаж · от 800 ₽
  Детейлинг (химчистка) · от 3500 ₽

[Галерея] — 6 Unsplash фото: боксы, мастера, до/после

[Отзывы] — 3 карточки (role = марка авто)
  Сергей Л. · BMW 3 Series · "Быстро диагностировали стук"
  Михаил Д. · Toyota Camry · "ТО чётко, цена честная"
  Олег Р. · Kia Rio · "Кузов восстановили — не отличить"

[Цены] — 3 тарифа
  Базовое ТО · 2500 ₽
  Расширенное ТО (highlighted) · 5900 ₽
  Полный пакет · 9900 ₽

[CTA]
  "Хотите такой сайт для своего автосервиса?"  [Написать фрилансеру]

[Контакты]
  Адрес: Варшавское шоссе, 46, Москва
  WhatsApp: +7 (999) 234-56-78
  Часы: Пн–Сб 9:00–20:00, Вс — выходной
```

---

### /dental — Стоматология

**Акцент:** #3ab8c5 (голубой) | Настроение: чистота, доверие, профессионализм

```
[DemoBanner]
  Фон: #3ab8c5
  "Это демо-шаблон стоматологии. Адаптируем под вашу клинику."  [Хочу такой сайт]

[Hero]
  Unsplash фото стоматологического кабинета
  Бейдж: "Лицензированная клиника · Современное оборудование"
  Заголовок: "Стоматология «Dental Pro»"
  Подзаголовок: "Безболезненное лечение. Голливудская улыбка. Онлайн-запись."
  Кнопки: [Записаться онлайн] · [Узнать цены]

[Услуги] — 6 карточек, иконки голубые
  Лечение кариеса · от 2500 ₽
  Профессиональное отбеливание · от 8000 ₽
  Имплантация · от 25 000 ₽
  Брекеты и выравнивание · от 35 000 ₽
  Гигиена и чистка · от 3500 ₽
  Протезирование · по плану лечения

[Галерея] — 6 Unsplash фото: до/после улыбок, кабинет, оборудование

[Отзывы] — 3 карточки
  Наталья В. · "Боялась — в итоге совсем не больно"
  Андрей М. · "Поставили имплант, результат отличный"
  Елена К. · "Наконец клиника, где не страшно"

[Цены] — 3 тарифа
  Консультация + осмотр · 500 ₽ (бесплатно при лечении)
  Лечение кариеса (highlighted) · от 2500 ₽
  Комплексная гигиена · 3500 ₽

[CTA]
  "Хотите такой сайт для своей клиники?"  [Написать фрилансеру]

[Контакты]
  Адрес: Проспект Мира, 87, Москва
  Телефон: +7 (999) 345-67-89
  Часы: Пн–Пт 9:00–20:00, Сб 10:00–17:00
```

---

### /beauty — Салон красоты

**Акцент:** #d4608a (розовый) | Настроение: элегантность, уход, женственность

```
[DemoBanner]
  Фон: #d4608a
  "Это демо-шаблон салона красоты. Адаптируем под ваш салон."  [Хочу такой сайт]

[Hero]
  Unsplash фото мастера за маникюром или ресницами
  Бейдж: "5 лет · 800+ постоянных клиентов"
  Заголовок: "Beauty Studio «Пион»"
  Подзаголовок: "Ваша красота — наша профессия. Запись онлайн 24/7."
  Кнопки: [Записаться] · [Наши работы]

[Услуги] — 6 карточек, иконки розовые
  Маникюр с покрытием · от 1500 ₽
  Педикюр · от 1800 ₽
  Наращивание ресниц · от 2000 ₽
  Окрашивание волос · от 3000 ₽
  Уход за лицом · от 2500 ₽
  Оформление бровей · от 800 ₽

[Галерея] — 6 Unsplash фото: ногти, ресницы, причёски, интерьер

[Отзывы] — 3 карточки
  Алина С. · "Лучший маникюр в городе, хожу год"
  Вика Т. · "Ресницы держатся 4 недели!"
  Катя М. · "Атмосфера как дома, мастера обожаю"

[Цены] — 3 тарифа
  Маникюр с покрытием · 1500 ₽
  Маникюр + педикюр (highlighted) · 3000 ₽
  Комплекс ухода · 4500 ₽

[CTA]
  "Хотите такой сайт для своего салона?"  [Написать фрилансеру]

[Контакты]
  Адрес: ул. Тверская, 22, Москва
  Телефон: +7 (999) 456-78-90
  Часы: Пн–Вс 10:00–21:00
  Instagram: @pion.beauty
  ВКонтакте: vk.com/pionbeauty
```

---

### /tutor — Репетитор

**Акцент:** #5b8dee (синий) | Настроение: доверие, знания, рост

```
[DemoBanner]
  Фон: #5b8dee
  "Это демо-шаблон сайта репетитора. Адаптируем под вас."  [Хочу такой сайт]

[Hero]
  Unsplash фото преподавателя за столом / с доской
  Бейдж: "3 года опыта · 50+ учеников · Средний балл ЕГЭ — 84"
  Заголовок: "Репетитор по математике и физике"
  Подзаголовок: "Подготовка к ЕГЭ и ОГЭ. Первый урок — бесплатно."
  Кнопки: [Записаться на пробный урок] · [Результаты учеников]

[Услуги] — 6 карточек
  Подготовка к ЕГЭ (математика)
  Подготовка к ОГЭ
  Физика: базовый и профильный уровень
  Устранение пробелов в знаниях
  Олимпиадная математика
  Онлайн-занятия (Google Meet)

[TutorResults] — 3 карточки с прогресс-баром (вместо галереи)
  Мария Д. · Математика ЕГЭ · 42 → 89
  Иван К. · Физика ЕГЭ · 38 → 76
  Ксения Р. · ОГЭ математика · 3 → 5

[Отзывы] — 3 карточки
  Мама Марии: "Дочь поступила в МГТУ"
  Иван К.: "Объясняет понятно, не как в школе"
  Папа Ксении: "Ребёнок перестал бояться математики"

[Цены] — 3 тарифа
  Разовый урок (60 мин) · 1500 ₽
  Пакет 8 уроков (highlighted, экономия 10%) · 10 800 ₽
  Пакет ЕГЭ 20 уроков (экономия 20%) · 24 000 ₽

[CTA]
  "Хотите такой сайт для себя?"  [Написать фрилансеру]

[Контакты]
  Telegram: @tutor_kovalev
  WhatsApp: +7 (999) 000-11-22
  Email: kovalev@example.com
  Формат: Онлайн / Москва, ЦАО
```

---

### /coffee — Кофейня

**Акцент:** #a0704a (коричневый) | Настроение: уют, атмосфера, тепло

```
[DemoBanner]
  Фон: #a0704a
  "Это демо-шаблон кофейни. Адаптируем под ваше заведение."  [Хочу такой сайт]

[Hero]
  Unsplash фото кофе крупным планом или интерьера
  Бейдж: "Specialty кофе · Обжарка напрямую с ферм"
  Заголовок: "Кофейня «Зерно»"
  Подзаголовок: "Specialty кофе. Авторская выпечка. Уютная атмосфера."
  Кнопки: [Смотреть меню] · [Как нас найти]

[Меню] — 6 карточек (поле services, заголовок секции = "Меню")
  Эспрессо · Классика в чистом виде · 150 ₽
  Капучино · Эспрессо + молочная пена · 220 ₽
  Флэт Уайт · Мягкий и насыщенный · 240 ₽
  Матча латте · Японский зелёный чай · 260 ₽
  Фильтр-кофе · Пуровер, кемекс · 200 ₽
  Авторский напиток · Сезонный рецепт · 280 ₽

[Галерея] — 6 Unsplash фото: напитки, выпечка, интерьер, бариста

[Отзывы] — 3 карточки
  Оля Н. · "Лучший капучино в районе"
  Тима В. · "Атмосфера огонь, работаю отсюда"
  Аня М. · "Матча латте влюбила с первого глотка"

[Популярное] — 3 карточки с фото (поле pricing, заголовок = "Популярное")
  Капучино + круассан · 380 ₽
  Флэт Уайт + эклер (highlighted, "Хит дня") · 420 ₽
  Матча + тарт · 460 ₽

[CTA]
  "Хотите такой сайт для своей кофейни?"  [Написать фрилансеру]

[Контакты]
  Адрес: ул. Пятницкая, 12, Москва
  Телефон: +7 (999) 567-89-01
  Часы: Пн–Пт 8:00–22:00, Сб–Вс 9:00–23:00
  Instagram: @zerno.coffee
```

---

### /contact — Страница контактов фрилансера

```
[Hero-заголовок]
  "Обсудим ваш сайт"
  "Оставьте заявку — отвечу в течение часа. Без обязательств."

[Форма (Formspree) + Контакты — 2 колонки]

  Левая — форма:
    Имя * (валидация: обязательное, мин. 2 символа)
    Телефон или Telegram * (валидация: обязательное, мин. 5 символов)
    Ниша * (select): Барбершоп / Автосервис / Стоматология /
                     Салон красоты / Репетитор / Кофейня / Другое
    Комментарий (textarea, необязательно)
    Кнопка [Отправить заявку]
    Состояния:
      → отправка: spinner + "Отправляем..."
      → успех: зелёный блок "Заявка получена! Свяжусь в течение часа."
      → ошибка: красный блок "Что-то пошло не так. Напишите напрямую."

  Правая — контакты:
    Telegram: @elmanoaffpart (кнопка-ссылка)
    Email: unfazed88rabota@gmail.com (кнопка-ссылка)
    "Отвечаю с 10:00 до 22:00"

[WhatNext — "Как это происходит"]
  1. Получаю заявку — читаю, изучаю вашу нишу
  2. Связываюсь — обсуждаем детали за 15 минут
  3. Делаю сайт — результат с правками включены

[FAQ — аккордеон]
  Сколько стоит сайт?
  Сколько времени занимает разработка?
  Могу ли я сам редактировать сайт?
  Делаете ли вы дизайн с нуля?
  Что входит в поддержку после запуска?
```
