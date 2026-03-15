# DESIGN.md — Дизайн-система проекта demo-sait

> **Авторитетный документ по дизайну.** Этот файл имеет приоритет над разделом «Дизайн-система» в PROJECT_PLAN.md.
> Цветовая палитра изменена: **светлая базовая тема** (не тёмная), Hero и CTA — тёмные через overlay.

---

## 0. Принцип документа

Проект — один цельный премиальный продукт: сайт-витрина фрилансера с демо-лендингами для 6 ниш бизнеса.

**Архитектурный принцип:**
- Единая UI-система (токены, компоненты, отступы, типографика, анимации)
- Каждая ниша наследует базовую систему и переопределяет только: `accentColor`, `heroImage`, `mood`, `некоторые визуальные детали`
- Ни одна ниша не ломает общую сетку, компоненты и поведение

**Ощущение результата:**
- Дорогой и продуманный продукт
- Студийное качество, не шаблонный конструктор
- Визуальная целостность при индивидуальном характере каждой ниши

---

## 1. Общее визуальное направление

**Стиль:** modern premium minimal

| Характеристика | Описание |
|---------------|----------|
| Контраст | Мягкий, не кричащий — ставка на воздух и композицию |
| Типографика | Крупные заголовки, чистые пропорции, хорошее line-height |
| Отступы | Щедрые — интерфейс дышит, не давит |
| Карточки | Аккуратные, с мягкими тенями и скруглениями |
| Цвет | Нейтральная светлая база + акцент ниши через inline style |
| Анимации | Спокойные, премиальные — fade + slight-up, без летающих блоков |
| Адаптив | Полностью корректный от 375px до 1440px+ |

**Чего не должно быть:**
- Кислотных цветов
- Дешёвых градиентов (синий в красный)
- Резких shadow-border комбинаций
- Слишком маленьких шрифтов в карточках
- Плотного текстового набора без воздуха
- Разных радиусов без системы

---

## 2. Дизайн-токены

### 2.1 Цветовая система

#### Базовая палитра (глобальная — все страницы)

```
background:   #F8FAFC   ← основной фон страниц
surface:      #FFFFFF   ← фон карточек
surface-alt:  #F1F5F9   ← альтернативный фон секций (чередование)
text-primary: #0F172A   ← основной текст, заголовки
text-secondary:#475569  ← второстепенный текст, описания
border:       rgba(15, 23, 42, 0.10)  ← границы карточек и инпутов
accent-global:#1E3A5F   ← акцент главной страницы (не ниши)
```

#### Нишевые акцентные цвета

Применяются через `style={{ color: data.color }}` — Tailwind не поддерживает динамические классы.

| Ниша       | Основной акцент | Применение                        |
|------------|-----------------|-----------------------------------|
| barbershop | `#C9A84C`       | Золото — брутальность, статус     |
| auto       | `#E05C2A`       | Оранжевый — энергия, уверенность  |
| dental     | `#3AB8C5`       | Голубой — чистота, доверие        |
| beauty     | `#D4608A`       | Розовый — элегантность, уход      |
| tutor      | `#5B8DEE`       | Синий — интеллект, надёжность     |
| coffee     | `#A0704A`       | Коричневый — уют, атмосфера       |

#### Тёмные Hero / CTA секции

Hero-блоки и CTA не наследуют светлый фон — у них тёмный overlay поверх фото:

```
hero-overlay-dark:   rgba(10, 15, 25, 0.58)   ← основной слой затемнения
hero-overlay-light:  rgba(10, 15, 25, 0.24)   ← вторичный слой (градиент)
hero-overlay-soft:   rgba(10, 15, 25, 0.42)   ← для ниш со светлыми фото
cta-bg:              #0F172A                  ← фон финального CTA-блока
```

Градиент поверх hero-изображения: `linear-gradient(to right, rgba(10,15,25,0.70) 40%, rgba(10,15,25,0.20) 100%)`

#### CSS-переменные для tailwind.config.ts

```ts
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      background: '#F8FAFC',
      surface: '#FFFFFF',
      'surface-alt': '#F1F5F9',
      'text-primary': '#0F172A',
      'text-secondary': '#475569',
      border: 'rgba(15, 23, 42, 0.10)',
      'accent-global': '#1E3A5F',
      'hero-dark': '#0B0F1A',
    },
    fontFamily: {
      serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
    },
    borderRadius: {
      btn: '14px',
      card: '24px',
      'card-sm': '20px',
      'card-lg': '28px',
      gallery: '24px',
      badge: '999px',
      modal: '28px',
    },
    boxShadow: {
      sm: '0 8px 24px rgba(15, 23, 42, 0.06)',
      md: '0 14px 40px rgba(15, 23, 42, 0.09)',
      lg: '0 24px 60px rgba(15, 23, 42, 0.12)',
    },
    maxWidth: {
      container: '1280px',
      prose: '760px',
    },
  },
}
```

---

### 2.2 Типографическая шкала

Шрифты: **Playfair Display** (serif) — заголовки, **Inter** (sans) — текст.
Оба с `subsets: ['latin', 'cyrillic']`.

#### Desktop (1024px+)

| Роль      | size / line-height / weight | Tailwind-класс              |
|-----------|-----------------------------|-----------------------------|
| h1        | 56px / 64px / 700          | `text-[56px] leading-[64px] font-bold font-serif` |
| h2        | 40px / 48px / 700          | `text-[40px] leading-[48px] font-bold font-serif` |
| h3        | 28px / 36px / 600          | `text-[28px] leading-[36px] font-semibold` |
| h4        | 22px / 30px / 600          | `text-[22px] leading-[30px] font-semibold` |
| body-lg   | 18px / 30px / 400          | `text-lg leading-[30px]` |
| body      | 16px / 28px / 400          | `text-base leading-7` |
| body-sm   | 14px / 22px / 400          | `text-sm leading-[22px]` |
| caption   | 12px / 18px / 500          | `text-xs leading-[18px] font-medium` |
| btn-text  | 15px / 20px / 600          | `text-[15px] leading-5 font-semibold` |

#### Tablet (768px–1023px)

| Роль  | size / line-height |
|-------|--------------------|
| h1    | 48px / 56px        |
| h2    | 34px / 42px        |
| h3    | 24px / 32px        |
| h4    | 20px / 28px        |

#### Mobile (0–767px)

| Роль  | size / line-height |
|-------|--------------------|
| h1    | 36px / 44px        |
| h2    | 28px / 36px        |
| h3    | 22px / 30px        |
| h4    | 18px / 26px        |
| body  | 16px / 26px        |

#### Правила применения

- **h1** — строго один раз на странице (Hero)
- **h2** — заголовки секций
- **h3 / h4** — подзаголовки карточек, имена в отзывах
- **max-width длинных абзацев:** `max-w-prose` (760px) — текст не растягивается на всю ширину
- **Никаких плотных абзацев** — минимум `leading-7` для основного текста
- Заголовки страниц ниш на Hero — шрифт **serif** (Playfair Display), крупно
- Текст карточек, описания — **sans** (Inter)

---

### 2.3 Spacing (отступы)

Базовая шкала: `4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 120`

#### Секции

| Контекст            | Desktop | Tablet | Mobile |
|---------------------|---------|--------|--------|
| Padding секции      | 96px    | 80px   | 64px   |
| Плотная секция      | 48px    | 40px   | 32px   |
| Gap между секциями  | 0 (смена фона) | — | — |

#### Карточки

| Тип карточки     | Padding |
|------------------|---------|
| Standard card    | 24px    |
| Compact card     | 20px    |
| Large card       | 32px    |

#### Сетки (gap)

| Контекст        | Desktop | Tablet | Mobile |
|-----------------|---------|--------|--------|
| Card grid gap   | 24px    | 20px   | 16px   |
| Column gap      | 32px    | 24px   | —      |

#### Кнопки

| Тип кнопки     | Padding (top/bottom + left/right) |
|----------------|-----------------------------------|
| Primary        | 14px 22px                         |
| Large          | 16px 28px                         |

#### Формы

- Поле input / textarea: `14px 16px`
- Gap между полями: `20px`

#### Внутри секций

| Элемент                                     | Расстояние |
|---------------------------------------------|------------|
| Заголовок секции → описание                 | 16px       |
| Описание секции → контент (карточки/сетка)  | 32px       |
| Между блоками Hero (badge → h1 → text → btn)| 24px       |

---

### 2.4 Border-radius

```
btn:       14px  ← кнопки, инпуты, textarea
card-sm:   20px  ← маленькие карточки, badge-карточки
card:      24px  ← стандартные карточки
card-lg:   28px  ← крупные feature-карточки, hero-card
gallery:   24px  ← плитки галереи
badge:    999px  ← теги, чипы, бейджи
modal:     28px  ← плавающие панели, модальные окна
```

**Правило:** интерфейс не должен быть острым. Ощущение — `rounded-2xl / rounded-3xl`.
Никакого микса `rounded-sm` и `rounded-3xl` в одном компоненте.

---

### 2.5 Тени (shadow tokens)

```
shadow-sm:  0 8px 24px rgba(15, 23, 42, 0.06)   ← карточки по умолчанию
shadow-md:  0 14px 40px rgba(15, 23, 42, 0.09)  ← hover у карточек
shadow-lg:  0 24px 60px rgba(15, 23, 42, 0.12)  ← крупные панели, hero-card
```

**Правила:**
- Карточки в default-состоянии: `shadow-sm`
- Карточки при hover: `shadow-md`
- Крупные floating-блоки: `shadow-lg`
- На тёмных hero-секциях: `shadow` не используется — вместо него `border + glass + backdrop-blur`
- Никаких грубых жёстких теней — всегда мягкое рассеивание

---

### 2.6 Анимации (motion tokens)

**Принцип:** спокойные, дорогие анимации. Fade + slight-up. Не отвлекают, усиливают ощущение качества.

#### Параметры

```ts
// Easing — используется везде
const ease = [0.22, 1, 0.36, 1]

// Длительности
const duration = {
  section: 0.6,    // появление целой секции
  card:    0.45,   // появление карточки
  micro:   0.2,    // кнопки, hover-эффекты
}

// Задержки
const delay = {
  sectionContent: 0.1,  // контент после появления секции
  stagger:        0.08, // между карточками в списке
}
```

#### Варианты появления

```ts
// Секция / крупный блок
const sectionVariant = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}

// Карточка
const cardVariant = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
}

// Hero-контент
const heroVariant = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}

// Изображение / медиа-блок
const imageVariant = {
  hidden:  { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease } },
}

// Контейнер с stagger
const containerVariant = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}
```

#### Hover-эффекты (CSS / Tailwind)

```
Кнопка hover:    translateY(-2px) + shadow-md (0.2s ease)
Карточка hover:  translateY(-4px) + shadow-md → shadow-lg (0.2s ease)
Изображение в карточке hover: scale(1.02) (0.3s ease) — только если clickable
```

---

### 2.7 Брейкпоинты

```
mobile:  0 – 639px
sm:      640px
md:      768px
lg:      1024px
xl:      1280px
2xl:     1440px
```

**Правила адаптива:**

| Контекст                   | Desktop      | Tablet   | Mobile     |
|----------------------------|--------------|----------|------------|
| Card grid (3 колонки)      | grid-cols-3  | grid-cols-2 | grid-cols-1 |
| Card grid (4 колонки)      | grid-cols-4  | grid-cols-2 | grid-cols-1 |
| Hero layout                | 2 колонки    | 1 колонка  | 1 колонка  |
| About layout               | 2 колонки    | 1 колонка  | 1 колонка  |
| WhyUs layout               | 4 блока      | 2 блока   | 1 блок     |
| Process steps              | horizontal   | horizontal | vertical   |
| Главное меню               | horizontal   | horizontal | drawer     |
| Форма + контакты           | 2 колонки    | 1 колонка  | 1 колонка  |
| Reviews                    | 3 карточки   | 2 карточки | scroll-snap |

---

### 2.8 Контейнер

```
max-width:          1280px
padding x desktop:  32px (px-8)
padding x tablet:   24px (px-6)
padding x mobile:   16px (px-4)
max-width prose:    760px (длинные текстовые блоки)
gap крупных колонок: 32px
```

Контейнер-класс (оборачивает весь контент страницы):
```tsx
<div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
```

---

## 3. Состояния компонентов

### 3.1 Кнопки

**Primary:**
```
default:  bg-accent, text-white, shadow-sm, border-radius: 14px
hover:    translateY(-2px), shadow-md, слегка темнее фон (brightness-90)
active:   translateY(0), shadow-sm
focus-visible: ring-2 ring-offset-2 ring-accent
disabled: opacity-50, pointer-events-none, cursor-not-allowed
```

**Outline:**
```
default:  border border-border, bg-transparent, text-text-primary
hover:    bg-surface-alt, border-text-secondary
focus-visible: ring-2 ring-offset-2 ring-text-primary
```

**Ghost:**
```
default:  bg-transparent, text-text-secondary
hover:    bg-surface-alt, text-text-primary
```

**На тёмном фоне (Hero / CTA):**
```
primary:  bg-white или bg-accent, text-dark
outline:  border-white/40, text-white, hover: bg-white/10
```

---

### 3.2 Карточки

```
default:
  background: surface (#FFFFFF)
  border: 1px solid border (rgba(15,23,42,0.10))
  border-radius: 24px
  shadow: shadow-sm
  padding: 24px

hover (интерактивная карточка):
  translateY(-4px)
  shadow: shadow-md
  border-color: rgba(15,23,42,0.18)
  transition: all 0.2s [0.22,1,0.36,1]

hover (карточка с изображением):
  изображение внутри: scale(1.02)
  transition: transform 0.3s ease

focus-visible:
  ring-2 ring-offset-2 ring-accent-global
```

---

### 3.3 Инпуты / формы

```
default:
  border: 1px solid border
  border-radius: 14px
  padding: 14px 16px
  background: surface
  color: text-primary
  font-size: 16px

focus:
  border-color: accent-global (или нишевой accent)
  ring: 0 0 0 3px rgba(accent, 0.15)
  background: surface (без изменений)

error:
  border-color: #EF4444 (red-500)
  ring: 0 0 0 3px rgba(239, 68, 68, 0.12)
  helper-text: #EF4444, font-size 13px

placeholder:
  color: #94A3B8 (читаемый, но приглушённый)

disabled:
  background: surface-alt
  opacity: 0.6
```

---

### 3.4 Hero-секции

```
min-height desktop: 88vh
min-height tablet:  75vh
mobile: auto, padding-top 120px, padding-bottom 72px

background: next/image с fill + priority
overlay layer 1: rgba(10, 15, 25, 0.58) — основное затемнение
overlay layer 2: gradient left→right rgba(10,15,25,0.70) 40% → rgba(10,15,25,0.10) 100%

для ниш со светлыми фото (dental, beauty):
overlay: rgba(10, 15, 25, 0.48) — чуть мягче

Текст на Hero: белый, всегда высокий контраст (WCAG AA min)

Структура контента Hero:
  [Badge / trust-chip]   ← сверху, маленький
  [H1 — крупный serif]
  [Подзаголовок body-lg]
  [Кнопки 2 шт: primary + outline]
  [Опционально: stat-row или trust-badges снизу]
```

---

## 4. Темы по нишам (theme tokens)

Каждая ниша наследует базовую систему. Переопределяет только свой `accentColor` и визуальное настроение.

### 4.1 Барбершоп — Barbershop «Топор»

```
accentColor:   #C9A84C (золото / bronze)
mood:          premium urban, мужественный, тёмный, статусный
hero style:    очень тёмный overlay (0.65), крупная serif-типографика
               декоративная золотая линия под H1
card style:    тёмные поверхности или смешанные с surface
               border: 1px solid rgba(201,168,76, 0.25)
typography:    serif для всех заголовков ниши
CTA text:      "Записаться"
```

**Атмосфера:** глубокий контраст, атмосферные фото мастеров и инструментов, брутальная элегантность.

---

### 4.2 Автосервис — АвтоМастер

```
accentColor:   #E05C2A (оранжевый / industrial)
mood:          технологичный, уверенный, надёжный, прямой
hero style:    тёмный overlay (0.55), акцент на горизонтальные линии
               оранжевые иконки, технические детали
card style:    surface (#FFF) с оранжевыми акцентами
               чёткая структура: иконка + название + цена
typography:    sans-serif для всей ниши (технический стиль)
CTA text:      "Оставить заявку"
```

**Атмосфера:** профессиональный сервис, фото автомобилей и боксов, ощущение скорости и точности.

---

### 4.3 Стоматология — Dental Pro

```
accentColor:   #3AB8C5 (cool blue / cyan)
mood:          чистота, доверие, медицинская аккуратность, спокойствие
hero style:    мягкий overlay (0.48), много воздуха, светлее других ниш
               нет агрессивных элементов
card style:    чисто белые карточки, мягкие тени, минимальные рамки
               иконки: stroke-only, светло-голубые
typography:    sans-serif + serif только для h1 Hero
CTA text:      "Записаться на приём"
```

**Атмосфера:** стерильно, безопасно, профессионально. Фото кабинета, оборудования, до/после. Много белого.

---

### 4.4 Салон красоты — Beauty Studio «Пион»

```
accentColor:   #D4608A (dusty rose / muted pink)
mood:          элегантность, женственность, утончённость, luxury-уход
hero style:    мягкий overlay (0.50), тёплые розовые полутона в градиенте
               акцент на фото ногтей, ресниц, красивых рук
card style:    ivory-white поверхности, rosy-border (rgba(212,96,138,0.15))
               очень аккуратные тени, premium-ощущение
typography:    serif заголовки + sans для текста
CTA text:      "Записаться"
```

**Атмосфера:** эстетика, уход, красота результата. Цвета — мягкие, ни одного кислотного элемента.

---

### 4.5 Репетитор — Репетитор Алексей Ковалёв

```
accentColor:   #5B8DEE (slate blue / intellectual)
mood:          интеллектуальный, уверенный, дружелюбный, системный
hero style:    умеренный overlay (0.52), фото за столом или доской
               акцент на статистику (баллы ЕГЭ, количество учеников)
card style:    чистые белые карточки с синими акцентами
               stat-блоки с прогресс-барами (TutorResults)
typography:    sans-serif для всей ниши (академический стиль)
CTA text:      "Записаться на пробное занятие"
```

**Атмосфера:** доверие, польза, системность. Чуть теплее, чем типичный образовательный сайт.

---

### 4.6 Кофейня — «Зерно»

```
accentColor:   #A0704A (warm coffee brown)
mood:          уютный, атмосферный, тёплый lifestyle, editorial
hero style:    мягкий тёплый overlay (0.50), большие фото напитков и интерьера
               warm-коричневые полутона
card style:    cream/ivory поверхности, мягкие тёплые тени
               MenuCard: крупное изображение сверху, название + цена снизу
typography:    serif для заголовков (editorial стиль) + sans для текста
CTA text:      "Смотреть меню" / "Найти нас"
```

**Атмосфера:** вкусно, уютно, хочется зайти. Тёплые текстуры, кофейные тона. Не маркетинг — lifestyle.

---

## 5. Правила для фонов и чередования секций

### Принцип чередования

Страница не должна быть монотонной — секции чередуются по тону:

```
hero           ← тёмный (overlay поверх фото)
about          ← светлый (#F8FAFC / surface)
services       ← surface-alt (#F1F5F9)
why-us         ← surface (#FFFFFF) с акцентными иконками
process        ← surface-alt или светлый gradient
gallery        ← тёмный / полупрозрачный или surface
reviews        ← surface (#FFFFFF)
pricing        ← surface-alt (#F1F5F9)
faq            ← surface (#FFFFFF)
cta            ← тёмный (#0F172A с акцентным gradient)
contacts       ← surface (#FFFFFF)
```

### Запрещено

- Делать все секции одного тона — страница становится плоской
- Использовать более 2 тёмных секций подряд (кроме hero)
- Чередовать случайные цвета без системы

### Тёмные секции (NicheCTA)

```css
background: #0F172A
overlay: linear-gradient(135deg, {accentColor}33 0%, transparent 60%)
text: white
```

---

## 6. Изображения и медиа

**Требования к фото:**
- Крупные, чистые, современные, высокого качества
- Единый тональный диапазон внутри ниши (тёплый/холодный/нейтральный)
- Без дешёвого стокового ощущения

**Технические правила:**
- Все изображения через `next/image` — автооптимизация WebP, lazy loading
- Hero: `fill` + `priority` (загружается первым)
- Gallery: фиксированные размеры и ratio (3:2 или 4:3)
- About image: фиксированный ratio 4:3 или 1:1
- URL: `https://images.unsplash.com/photo-{ID}?w=1200&q=80` — конкретные ID

**Ratio по секциям:**

| Секция    | Ratio | Размер (w) |
|-----------|-------|------------|
| Hero      | 16:9  | 1600px     |
| About     | 4:3   | 800px      |
| Gallery   | 3:2   | 800px      |
| Card      | 16:9  | 600px      |
| og:image  | 1.91:1| 1200px     |

**Иконки:**
- Только `lucide-react` — stroke-based, лаконичные
- Stroke width: 1.5 (дефолт) — выглядит дорого
- Размеры: 20px (карточки), 24px (WhyUs, Process), 18px (навигация)
- Цвет через `style={{ color: data.color }}` для нишевых акцентов

**Gallery / изображения в карточках:**
- `border-radius: 24px`
- Можно `overflow: hidden` для clip
- Hover: `scale(1.02)` на изображении внутри карточки

---

## 7. Формы и CTA

### Форма контактов (/contact)

```
Поля:
  Имя *           — text input, placeholder "Ваше имя"
  Телефон / Telegram * — text input, placeholder "+7 999 ... или @username"
  Ниша *          — select
  Комментарий     — textarea, 4 строки, необязательное

Кнопка: [Отправить заявку]  ← primary, крупная (padding: 16px 28px)

Состояния:
  sending:  spinner + "Отправляем..."
  success:  зелёный блок, текст "Заявка получена! Свяжусь в течение часа."
  error:    красный блок, текст "Что-то пошло не так. Напишите напрямую в Telegram."

Micro-trust рядом с кнопкой:
  "Ответ в течение часа · Без предоплаты · Telegram / Email"
```

### CTA на страницах ниш (NicheCTA)

- Текст кнопки — **специфичен для ниши** (см. theme tokens, раздел 4)
- Кнопка всегда primary, на тёмном фоне — белая или в `accentColor`
- Рядом: иконка мессенджера (Telegram), короткий trust

### DemoBanner (только на страницах ниш)

```
position: top (под Header), sticky при скролле → можно скрыть через dismiss
height: 44px desktop, 52px mobile (текст переносится)
background: data.color (inline style)
text color: определяется автоматически через яркость цвета (тёмный/светлый)
text: "Это демо-шаблон. Контент и стиль адаптируем под ваш бизнес."
button: [Хочу такой сайт] → /contact
mobile: текст сокращается до "Это демо.", кнопка остаётся
```

---

## 8. Главная страница — визуальный подход

Главная — витрина. Визуально — самая нейтральная и универсальная страница.

```
hero:
  Светлый или полутёмный hero (не как нишевые — без heavy overlay)
  Заголовок + подзаголовок + 2 кнопки
  Правая часть: мозаика из 6 превью ниш (animated grid)

NicheGrid:
  6 карточек NicheCard — каждая передаёт атмосферу своей ниши
  Hover: карточка поднимается, цветовой акцент усиливается
  Клик → страница ниши

WhyMe:
  4 чистых блока без лишней красоты — иконка + заголовок + текст

HowItWorks:
  3 шага горизонтально, с номерами и стрелками между ними

HomeCTA:
  Тёмный фон (#0F172A), акцентный gradient (accent-global)
  Заголовок + кнопка + контакты (Telegram, Email)
```

---

## 9. Реализация в tailwind.config.ts (итоговый)

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background:    '#F8FAFC',
        surface:       '#FFFFFF',
        'surface-alt': '#F1F5F9',
        'text-primary':'#0F172A',
        'text-secondary':'#475569',
        border:        'rgba(15, 23, 42, 0.10)',
        'accent-global':'#1E3A5F',
        'hero-dark':   '#0B0F1A',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:  ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero':    ['56px', { lineHeight: '64px', fontWeight: '700' }],
        'section': ['40px', { lineHeight: '48px', fontWeight: '700' }],
        'card-h':  ['28px', { lineHeight: '36px', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '30px', fontWeight: '400' }],
        'caption': ['12px', { lineHeight: '18px', fontWeight: '500' }],
        'btn':     ['15px', { lineHeight: '20px', fontWeight: '600' }],
      },
      borderRadius: {
        btn:      '14px',
        'card-sm':'20px',
        card:     '24px',
        'card-lg':'28px',
        gallery:  '24px',
        badge:    '999px',
        modal:    '28px',
      },
      boxShadow: {
        sm:  '0 8px 24px rgba(15, 23, 42, 0.06)',
        md:  '0 14px 40px rgba(15, 23, 42, 0.09)',
        lg:  '0 24px 60px rgba(15, 23, 42, 0.12)',
      },
      maxWidth: {
        container: '1280px',
        prose:     '760px',
      },
      spacing: {
        section:    '96px',   // py-section
        'section-md':'80px',  // md:
        'section-sm':'64px',  // mobile
      },
    },
  },
  plugins: [],
}

export default config
```

### CSS-переменные в globals.css

```css
@layer base {
  :root {
    --font-playfair: 'Playfair Display', serif;
    --font-inter: 'Inter', sans-serif;
  }

  body {
    @apply bg-background text-text-primary font-sans;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3 {
    @apply font-serif;
  }
}
```

### Motion tokens (src/lib/motion.ts)

```ts
export const ease = [0.22, 1, 0.36, 1] as const

export const motionTokens = {
  duration: { section: 0.6, card: 0.45, micro: 0.2 },
  delay:    { content: 0.1, stagger: 0.08 },
  ease,
}

export const variants = {
  section: {
    hidden:  { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
  },
  card: {
    hidden:  { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
  },
  image: {
    hidden:  { opacity: 0, scale: 0.97 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease } },
  },
  container: {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  },
}
```

---

## 10. Итоговый принцип

Этот дизайн работает тогда, когда соблюдены **три условия**:

### 1. Система не нарушается
Все отступы, радиусы, тени и шрифты берутся строго из токенов. Нет случайных `rounded-sm` рядом с `rounded-3xl`, нет случайных `text-[13px]` вместо `text-sm`.

### 2. Нишевость — через content, не через компоненты
Барбершоп и кофейня используют **одни и те же компоненты** (`NicheHero`, `NicheServices`, `ServiceCard`). Разница — в `accentColor`, `heroImage`, тексте и иконках. Компоненты не переписываются под каждую нишу.

### 3. Воздух и контраст важнее украшений
Лишний элемент — хуже пустого места. Каждый блок должен нести смысл и дышать. Padding секций не урезать ради «вместить больше». Текст не делать мельче ради компактности.

**Результат:** один дорогой продукт, в котором каждая страница узнаётся как часть целого — и при этом живёт своим характером.
