# PROJECT_PLAN — demo-sait

## Цель

Многостраничный Next.js сайт-витрина с демо-лендингами под 6 ниш. Каждая страница ниши продаёт услуги фрилансера через CTA "Хочу такой сайт".

---

## Фазы разработки

### Фаза 1 — Инициализация проекта

- [ ] Создать Next.js 14 проект с TypeScript (`npx create-next-app@latest`)
  - TypeScript: Yes
  - ESLint: Yes
  - Tailwind CSS: Yes
  - App Router: Yes
  - `src/` directory: Yes
  - import alias `@/*`: Yes
- [ ] Установить зависимости:
  ```bash
  npm install framer-motion lucide-react clsx tailwind-merge @formspree/react
  npm install --save-dev @types/node
  ```
- [ ] Настроить `next.config.mjs`:
  - Разрешить домен `images.unsplash.com` для `next/image`
  - **Не отключать** TypeScript и ESLint ошибки — они защищают от багов
- [ ] Настроить `tailwind.config.ts` — дизайн-токены (цвета, шрифты, отступы)
- [ ] Настроить `src/lib/utils.ts` — функция `cn()` через `clsx` + `tailwind-merge`
- [ ] Настроить шрифты через `next/font/google` в `app/layout.tsx`:
  - Заголовки: **Playfair Display** (serif) — обязательно `subsets: ['latin', 'cyrillic']`
  - Текст: **Inter** (sans) — обязательно `subsets: ['latin', 'cyrillic']`
  - Без `cyrillic` subset — русский текст отрендерится системным шрифтом
- [ ] Создать `.env.example` с переменными (коммитится в репо):
  ```bash
  NEXT_PUBLIC_FORMSPREE_ID=xabc1234
  NEXT_PUBLIC_SITE_URL=https://твой-домен.ru
  ```
  Скопировать в `.env.local` и заполнить реальными значениями. `.env.local` — в `.gitignore`.
- [ ] Выбор хостинга: **Vercel** (лучшая интеграция с Next.js, автодеплой из GitHub)
  - После деплоя добавить env variables вручную: Settings → Environment Variables
- [ ] Создать `.gitignore`, инициализировать git, создать репо на GitHub

### Фаза 2 — Типы данных и структура (src/data)

Ключевое решение: `NicheData` не одинаковый для всех ниш. У кофейни — меню, у репетитора — результаты учеников. Поэтому используем **гибкую типизацию** с общей базой и уникальными полями.

```ts
import type { LucideProps } from 'lucide-react'
type LucideIcon = React.FC<LucideProps>

// Общие типы
type Service = {
  Icon: LucideIcon    // компонент иконки, импортируется явно в файле данных (НЕ строка!)
  title: string
  description: string
  price?: string      // необязательно (у репетитора цена в Pricing)
}

type PricingPlan = {
  name: string
  price: string
  features: string[]
  highlighted: boolean
  badge?: string      // напр. "Популярное"
}

type Review = {
  name: string
  role: string        // "клиент" / "ученик" / "мама ученика" / "BMW 3 Series"
  text: string
  rating: number      // 1-5
}

type ContactInfo = {
  phone?: string
  address?: string
  hours?: string
  telegram?: string
  instagram?: string
  whatsapp?: string
  vk?: string
  email?: string
}

type AboutInfo = {
  text: string
  facts: { label: string; value: string }[]  // 3 факта
  image: string           // images.unsplash.com/photo-{id}?w=800&q=80
}

type WhyUsItem = {
  Icon: LucideIcon
  title: string
  text: string
}

type ProcessStep = {
  title: string
  text: string
}

type FaqItem = {
  question: string
  answer: string
}

// Базовый тип — общий для всех ниш
type NicheBase = {
  slug: string
  title: string
  tagline: string
  description: string
  color: string           // hex акцентного цвета — применяется через inline style (не Tailwind!)
  badge?: string          // бейдж в Hero, напр. "С 2018 года · Москва"
  heroImage: string       // images.unsplash.com/photo-{id}?w=1600&q=80
  about: AboutInfo
  services: Service[]
  whyUs: WhyUsItem[]      // 4 элемента
  process: ProcessStep[]  // 3 шага
  pricing: PricingPlan[]
  reviews: Review[]
  faq: FaqItem[]          // 5 вопросов — уникальных для ниши
  contacts: ContactInfo
  seo: {
    title: string         // <title> страницы
    description: string   // meta description (до 160 символов)
    ogImage: string       // images.unsplash.com/photo-{id}?w=1200&q=80
  }
}

// Расширения для специфичных ниш
type NicheWithGallery = NicheBase & {
  hasGallery: true
  gallery: string[]       // массив images.unsplash.com URL
}

type NicheWithResults = NicheBase & {
  hasGallery: false
  results: {              // для репетитора вместо галереи
    name: string
    subject: string
    before: number
    after: number
  }[]
}

export type NicheData = NicheWithGallery | NicheWithResults
```

Файлы данных:
- [ ] `src/data/types.ts` — все типы выше
- [ ] `src/data/niches.ts` — краткий список ниш для главной страницы
- [ ] `src/data/barbershop.ts` — тип `NicheWithGallery`
- [ ] `src/data/auto.ts` — тип `NicheWithGallery`
- [ ] `src/data/dental.ts` — тип `NicheWithGallery`
- [ ] `src/data/beauty.ts` — тип `NicheWithGallery`
- [ ] `src/data/tutor.ts` — тип `NicheWithResults`
- [ ] `src/data/coffee.ts` — тип `NicheWithGallery` (меню хранится в `services`)

### Фаза 3 — SEO и метаданные (РАНЬШЕ, не в конце)

Перенесено в начало: OG-превью — инструмент продажи, а не украшение.

- [ ] `src/app/layout.tsx` — базовые metadata (title template, description, robots)
- [ ] OG-изображение для каждой страницы ниши — через `generateMetadata()` в `page.tsx`
- [ ] `src/app/robots.ts` — Next.js генерация `robots.txt`:
  - Главная и /contact — индексировать
  - Страницы ниш `/barbershop`, `/auto` и т.д. — индексировать (органика!)
- [ ] `src/app/sitemap.ts` — автогенерация `sitemap.xml`

### Фаза 4 — Layout компоненты

- [ ] `src/components/layout/Header.tsx`
  - Логотип / имя слева
  - Навигация по центру: Главная · Примеры · Контакты
  - Кнопка [Заказать сайт] → /contact
  - При скролле: backdrop-blur + непрозрачный фон
- [ ] `src/components/layout/MobileMenu.tsx` (отдельный компонент!)
  - Бургер-кнопка в Header на мобиле
  - Меню выезжает снизу (drawer)
  - Закрывается при клике на ссылку или вне меню
- [ ] `src/components/layout/Footer.tsx`
  - Логотип + описание слева
  - Ссылки на страницы ниш по центру
  - Telegram + Email справа
  - Копирайт снизу

### Фаза 5 — UI компоненты (src/components/ui)

- [ ] `Button.tsx` — варианты: `primary`, `outline`, `ghost`; размеры: `sm`, `md`, `lg`
- [ ] `Badge.tsx` — бейдж/тег
- [ ] `FadeIn.tsx` — обёртка Framer Motion для анимации появления
- [ ] `NicheCard.tsx` — карточка ниши на главной (hover эффект — акцент через `style={{ borderColor }}`)
- [ ] `ServiceCard.tsx` — карточка услуги с иконкой и ценой
- [ ] `MenuCard.tsx` — карточка пункта меню для `/coffee` (те же пропсы, другой визуал)
- [ ] `ReviewCard.tsx` — карточка отзыва со звёздами
- [ ] `PricingCard.tsx` — карточка тарифа (выделенная / обычная)
- [ ] `StarRating.tsx` — SVG-звёзды для отзывов

### Фаза 6 — Переиспользуемые секции (src/components/sections)

Каждая принимает `data: NicheData` через пропсы:

- [ ] `DemoBanner.tsx`
  - Полоска под Header, фон = `data.color` (через `style={{ backgroundColor: data.color }}`)
  - Текст: "Это демо-шаблон. Адаптируем под ваш бизнес."
  - Кнопка: [Хочу такой сайт] → /contact
  - Мобиле: текст укорачивается, кнопка остаётся

- [ ] `NicheHero.tsx`
  - Фоновое изображение через `next/image` с `fill` + `priority`
  - Градиент поверх (тёмный слева → прозрачный справа)
  - Бейдж, заголовок, подзаголовок, две кнопки
  - Акцентный цвет через `style={{ color: data.color }}`

- [ ] `NicheAbout.tsx`
  - 2 колонки: текст + фото (`data.about.image`)
  - Заголовок, абзац (`data.about.text`), 3 факта (`data.about.facts`)

- [ ] `NicheWhyUs.tsx`
  - 4 блока с иконками (`data.whyUs`)
  - Иконки и акцент — через `style={{ color: data.color }}`

- [ ] `NicheProcess.tsx`
  - 3 шага (`data.process`) со стрелками между ними на десктопе
  - Мобиле: вертикальный список

- [ ] `NicheServices.tsx`
  - Сетка 3×2 `ServiceCard`
  - Иконки — **компоненты**, импортированные явно в каждом файле данных (`data.services[].Icon`)
  - **Не использовать** `import * as Icons from 'lucide-react'` — грузит 1000+ иконок в бандл

- [ ] `NicheGallery.tsx`
  - Сетка 3×2 изображений `next/image`
  - Изображения: `https://images.unsplash.com/photo-{ID}?w=800&q=80` — конкретные ID хардкодятся в файлах данных ниш
  - **`source.unsplash.com` отключён с 2022 года** — не использовать
  - **Не использовать placehold.co** — внешний сервис, ненадёжен в продакшне

- [ ] `NicheReviews.tsx`
  - 3 карточки `ReviewCard`
  - Мобиле: горизонтальный scroll-snap

- [ ] `NichePricing.tsx`
  - 3 карточки `PricingCard`
  - Highlighted карточка с рамкой в `data.color` и бейджем

- [ ] `NicheCTA.tsx`
  - Тёмный фон с gradient в `data.color`
  - Заголовок, подзаголовок, кнопка → /contact

- [ ] `NicheContacts.tsx`
  - Рендерит только те контакты, которые есть в `data.contacts`
  - Не рендерит пустые поля

- [ ] `NicheFAQ.tsx`
  - Аккордеон, 5 вопросов из `data.faq`
  - Вопросы уникальны для каждой ниши (задаются в файле данных)
  - Открытие/закрытие через `useState`

- [ ] `TutorResults.tsx`
  - Специфичная секция для `/tutor` вместо галереи
  - 3 карточки с прогресс-баром роста баллов

### Фаза 7 — Страницы ниш

Каждая страница использует `generateMetadata()` для SEO:

- [ ] `src/app/barbershop/page.tsx`
- [ ] `src/app/auto/page.tsx`
- [ ] `src/app/dental/page.tsx`
- [ ] `src/app/beauty/page.tsx`
- [ ] `src/app/tutor/page.tsx`
- [ ] `src/app/coffee/page.tsx`

Структура каждой страницы:
```
DemoBanner
NicheHero
NicheAbout
NicheServices       ← MenuCard для /coffee вместо ServiceCard
NicheWhyUs
NicheProcess
NicheGallery        ← TutorResults для /tutor вместо галереи
NicheReviews
NichePricing        ← PopularItems для /coffee вместо тарифов
NicheFAQ
NicheCTA
NicheContacts
```

### Фаза 8 — Главная страница (src/app/page.tsx)

- [ ] `HomeHero` — заголовок, подзаголовок, мозаика из 6 превью ниш
- [ ] `NicheGrid` — сетка 6 карточек `NicheCard`
- [ ] `WhyMe` — 4 преимущества
- [ ] `HowItWorks` — 3 шага
- [ ] `HomeCTA` — финальный блок → /contact

### Фаза 9 — Страница контактов

- [ ] `src/app/contact/page.tsx`
- [ ] Форма через **Formspree** (не mailto!):
  - Настроить аккаунт на formspree.io, получить `formId`
  - Записать в `.env.local` как `NEXT_PUBLIC_FORMSPREE_ID=xabc1234`
  - Использовать `@formspree/react` хук `useForm(process.env.NEXT_PUBLIC_FORMSPREE_ID!)`
  - Поля: имя, телефон/Telegram, ниша (select), комментарий
  - **Клиентская валидация**: обязательные поля, мин. длина имени, формат телефона/Telegram
  - Состояния формы: дефолт / отправка (spinner) / успех / ошибка
  - ⚠️ **Free tier: 50 submissions/month.** При росте трафика — перейти на платный план ($8/мес) или подключить спам-фильтр в настройках Formspree
- [ ] `WhatNext` — 3 шага
- [ ] `FAQ` — аккордеон, 5 вопросов

### Фаза 10 — Служебные страницы

- [ ] `src/app/not-found.tsx` — кастомная 404 страница:
  - Заголовок "Страница не найдена"
  - Кнопка → на главную
  - В стиле сайта, не дефолтный Next.js экран
- [ ] `src/app/loading.tsx` — глобальный loading state (skeleton или спиннер)
- [ ] `src/app/error.tsx` — глобальный error boundary

### Фаза 11 — Аналитика

- [ ] Подключить **Yandex.Metrika** (для РФ аудитории):
  - Создать компонент `src/components/YandexMetrika.tsx`
  - Добавить в `app/layout.tsx` через `next/script` с `strategy="afterInteractive"`
  - Настроить цели: клик на CTA, отправка формы, переход на страницы ниш
- [ ] Проверить что аналитика не блокирует рендер страницы
- [ ] ⚠️ **ФЗ-152 / cookie consent**: Яндекс.Метрика пишет cookies без согласия пользователя, что формально нарушает ФЗ-152. Минимальный шаг — добавить уведомление внизу экрана: "Мы используем cookies для аналитики. Продолжая использовать сайт, вы соглашаетесь с этим." с кнопкой "Понятно". Состояние хранить в `localStorage`.

### Фаза 12 — Финальная полировка

- [ ] Проверить адаптивность: 375px / 768px / 1280px / 1440px
- [ ] Проверить все CTA → /contact
- [ ] Проверить DemoBanner на всех страницах ниш
- [ ] Проверить валидацию формы
- [ ] Проверить OG-превью через [opengraph.xyz](https://www.opengraph.xyz)
- [ ] Lighthouse audit: Performance > 90, SEO = 100, Accessibility > 90
- [ ] Проверить `sitemap.xml` и `robots.txt` после деплоя

---

## Дизайн-система

### Цветовая палитра (глобальная)

| Токен          | Цвет    | Назначение              |
|----------------|---------|-------------------------|
| background     | #0a0a0a | Фон сайта               |
| surface        | #141414 | Фон карточек            |
| border         | #2a2a2a | Границы                 |
| text-primary   | #f5f5f5 | Основной текст          |
| text-secondary | #888888 | Вторичный текст         |
| accent         | #e8c547 | Акцент фрилансера       |

### Акцентные цвета ниш

| Ниша       | Цвет    | Настроение                |
|------------|---------|---------------------------|
| barbershop | #c9a84c | Золото, брутальность      |
| auto       | #e05c2a | Оранжевый, энергия        |
| dental     | #3ab8c5 | Голубой, чистота          |
| beauty     | #d4608a | Розовый, элегантность     |
| tutor      | #5b8dee | Синий, доверие            |
| coffee     | #a0704a | Коричневый, уют           |

### Типографика

- Заголовки: **Playfair Display** (serif) — `next/font/google`, `subsets: ['latin', 'cyrillic']`
- Текст: **Inter** (sans) — `next/font/google`, `subsets: ['latin', 'cyrillic']`
- Без `cyrillic` subset русский текст отрендерится системным fallback-шрифтом
- Оба шрифта загружаются в `app/layout.tsx`, передаются через CSS-переменные в Tailwind

### Стратегия изображений

- **Используемый формат**:
  ```
  https://images.unsplash.com/photo-{КОНКРЕТНЫЙ_ID}?w=1200&q=80
  ```
  Конкретные photo ID подбираются вручную на unsplash.com и хардкодятся в файлах данных ниш.
- ⚠️ **`source.unsplash.com` отключён с 2022 года** — не использовать. Только `images.unsplash.com`.
- **Продакшн**: заменить на собственные или лицензионные фото
- Все изображения через `next/image` — автоматическая оптимизация WebP, lazy loading
- Домен `images.unsplash.com` добавить в `next.config.mjs` → `images.remotePatterns`

---

## Стек (финальный)

| Инструмент      | Версия | Зачем                                  |
|-----------------|--------|----------------------------------------|
| Next.js         | 14     | App Router, SSG, `next/image`, `next/font` |
| TypeScript      | 5      | Строгая типизация, без отключений      |
| Tailwind CSS    | 3      | Стили, адаптив, дизайн-токены          |
| Framer Motion   | 11     | Анимации появления секций              |
| Lucide React    | latest | Иконки                                 |
| clsx            | latest | Условные классы                        |
| tailwind-merge  | latest | Безопасное объединение Tailwind классов |
| @formspree/react| latest | Форма без бекенда                      |
| Yandex.Metrika  | —      | Аналитика                              |
| Vercel          | —      | Хостинг, автодеплой из GitHub          |
