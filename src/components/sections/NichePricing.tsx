import type { NicheData } from '@/data/types'
import { Check, Star, Wrench, BookOpen, Coffee } from 'lucide-react'
import Link from 'next/link'
import FadeIn from '@/components/ui/FadeIn'
import type { ComponentType } from 'react'

// ─── Barbershop: full price-menu list (dark, gold) ───────────────────────────
function PricingMenuBoard({ data }: { data: NicheData }) {
  return (
    <section className="bg-[#0F0A00] py-24">
      <div className="mx-auto max-w-3xl px-6">
        <FadeIn>
          <p className="mb-3 text-center font-serif text-xs italic tracking-widest" style={{ color: data.color }}>
            Прейскурант
          </p>
          <h2 className="text-center font-serif text-3xl font-bold text-white md:text-4xl">Цены</h2>
          <p className="mx-auto mt-3 max-w-xs text-center text-sm text-white/40">
            Окончательная стоимость — после консультации с мастером
          </p>
        </FadeIn>

        <div className="mt-10 flex items-center gap-4">
          <div className="h-px flex-1" style={{ backgroundColor: `${data.color}50` }} />
          <span style={{ color: data.color }}>✦</span>
          <div className="h-px flex-1" style={{ backgroundColor: `${data.color}50` }} />
        </div>

        <div className="mt-2 divide-y divide-[#c9a84c]/10">
          {data.pricing.map((plan, i) => (
            <FadeIn key={plan.name} delay={i * 0.04}>
              <div className="flex items-center gap-4 py-4">
                {plan.highlighted
                  ? <Star size={12} fill={data.color} stroke="none" className="shrink-0" />
                  : <span className="w-3 shrink-0 font-mono text-xs text-white/20">{i + 1}</span>
                }
                <div className="flex-1 min-w-0">
                  <span className={`text-sm font-semibold ${plan.highlighted ? 'text-white' : 'text-white/80'}`}>
                    {plan.name}
                  </span>
                  {plan.badge && (
                    <span className="ml-2 text-xs font-medium" style={{ color: data.color }}>
                      {plan.badge}
                    </span>
                  )}
                  <div className="mt-0.5 flex flex-wrap gap-x-2">
                    {plan.features.map(f => (
                      <span key={f} className="text-xs text-white/30">{f}</span>
                    ))}
                  </div>
                </div>
                <span
                  className={`shrink-0 font-serif text-base font-bold ${plan.highlighted ? '' : 'text-white/60'}`}
                  style={plan.highlighted ? { color: data.color } : {}}
                >
                  {plan.price}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="mt-2 flex items-center gap-4">
          <div className="h-px flex-1" style={{ backgroundColor: `${data.color}50` }} />
          <span style={{ color: data.color }}>✦</span>
          <div className="h-px flex-1" style={{ backgroundColor: `${data.color}50` }} />
        </div>

        <FadeIn>
          <p className="mt-8 text-center">
            <Link
              href={`/${data.slug}/contacts`}
              className="inline-block rounded-xl px-8 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
              style={{ backgroundColor: data.color }}
            >
              Записаться
            </Link>
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

// ─── Auto: workshop rate-sheet table ─────────────────────────────────────────
function PricingWorkOrder({ data }: { data: NicheData }) {
  return (
    <section className="bg-[#0D1117] py-24">
      <div className="mx-auto max-w-4xl px-6">
        <FadeIn>
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest" style={{ color: data.color }}>
            Прайс-лист
          </p>
          <h2 className="text-center font-serif text-3xl font-bold text-white md:text-4xl">Стоимость работ</h2>
          <p className="mx-auto mt-3 max-w-sm text-center text-sm text-white/40">
            Точная стоимость — после диагностики. Без скрытых наценок.
          </p>
        </FadeIn>

        {/* Table header */}
        <div className="mt-12 overflow-hidden rounded-2xl bg-[#161B22] ring-1 ring-white/5">
          <div className="flex items-center gap-4 border-b border-white/10 bg-[#0D1117] px-5 py-3">
            <Wrench size={14} style={{ color: data.color }} />
            <span className="flex-1 font-mono text-xs uppercase tracking-widest text-white/30">Вид работы</span>
            <span className="w-28 shrink-0 text-right font-mono text-xs uppercase tracking-widest text-white/30">Стоимость</span>
          </div>

          {data.pricing.map((plan, i) => (
            <FadeIn key={plan.name} delay={i * 0.04}>
              <div
                className={`flex items-center gap-4 px-5 py-4 transition-colors hover:bg-white/[0.03] ${
                  i < data.pricing.length - 1 ? 'border-b border-white/5' : ''
                } ${plan.highlighted ? 'bg-[#2563eb]/5' : ''}`}
              >
                {/* Number */}
                <span className="w-6 shrink-0 font-mono text-xs text-white/20">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {/* Name + features */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-semibold ${plan.highlighted ? 'text-white' : 'text-white/80'}`}>
                      {plan.name}
                    </span>
                    {plan.badge && (
                      <span
                        className="rounded px-1.5 py-0.5 text-[10px] font-bold text-white"
                        style={{ backgroundColor: data.color }}
                      >
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 flex flex-wrap gap-x-3">
                    {plan.features.map(f => (
                      <span key={f} className="text-xs text-white/30">{f}</span>
                    ))}
                  </div>
                </div>
                {/* Price */}
                <span
                  className="w-28 shrink-0 text-right font-mono text-sm font-bold"
                  style={plan.highlighted ? { color: data.color } : { color: 'rgba(255,255,255,0.7)' }}
                >
                  {plan.price}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <p className="text-xs text-white/30">* Гарантия на все работы — 6 месяцев или 10 000 км</p>
            <Link
              href={`/${data.slug}/contacts`}
              className="rounded-xl px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: data.color }}
            >
              Записаться
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ─── Dental: 2-column price list with highlighted CTA at top ─────────────────
function PricingMedical({ data }: { data: NicheData }) {
  const highlight = data.pricing.find(p => p.highlighted)
  const rest = data.pricing.filter(p => !p.highlighted)

  return (
    <section className="bg-[#F0F9FF] py-24">
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn>
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest" style={{ color: data.color }}>
            Планы лечения
          </p>
          <h2 className="text-center font-serif text-3xl font-bold text-[#0F172A] md:text-4xl">Стоимость</h2>
          <div className="mt-3 flex flex-wrap justify-center gap-3">
            {['ДМС принимаем', '0% рассрочка', 'Налоговый вычет'].map(t => (
              <span key={t} className="flex items-center gap-1.5 rounded-full border border-current px-3 py-1 text-xs font-medium" style={{ color: data.color }}>
                <Check size={11} /> {t}
              </span>
            ))}
          </div>
        </FadeIn>

        {/* Popular CTA card */}
        {highlight && (
          <FadeIn>
            <div
              className="mt-10 overflow-hidden rounded-2xl ring-2 ring-sky-400"
            >
              <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center" style={{ backgroundColor: `${data.color}10` }}>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="rounded-full px-3 py-0.5 text-xs font-bold text-white"
                      style={{ backgroundColor: data.color }}
                    >
                      {highlight.badge ?? 'Популярное'}
                    </span>
                    <h3 className="font-semibold text-[#0F172A]">{highlight.name}</h3>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-3">
                    {highlight.features.map(f => (
                      <span key={f} className="flex items-center gap-1.5 text-sm text-[#475569]">
                        <Check size={13} style={{ color: data.color }} /> {f}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-2">
                  <p className="font-serif text-2xl font-bold" style={{ color: data.color }}>
                    {highlight.price}
                  </p>
                  <Link
                    href={`/${data.slug}/contacts`}
                    className="shrink-0 rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: data.color }}
                  >
                    Записаться
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        )}

        {/* Rest: 2-column list */}
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {rest.map((plan, i) => (
            <FadeIn key={plan.name} delay={i * 0.04}>
              <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3.5 ring-1 ring-black/5 transition-shadow hover:shadow-sm">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[#0F172A]">{plan.name}</span>
                    {plan.badge && (
                      <span className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ backgroundColor: data.color }}>
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 flex flex-wrap gap-x-2">
                    {plan.features.map(f => (
                      <span key={f} className="text-xs text-[#94A3B8]">{f}</span>
                    ))}
                  </div>
                </div>
                <span className="ml-4 shrink-0 text-sm font-bold" style={{ color: data.color }}>
                  {plan.price}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <p className="mt-6 text-center text-xs text-[#94A3B8]">
            * Цены ориентировочные. Окончательная стоимость определяется после осмотра.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

// ─── Beauty: service price menu with accent rows ──────────────────────────────
function PricingBeauty({ data }: { data: NicheData }) {
  return (
    <section className="py-24" style={{ background: 'linear-gradient(180deg, #fff0f6 0%, #ffffff 100%)' }}>
      <div className="mx-auto max-w-4xl px-6">
        <FadeIn>
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest" style={{ color: data.color }}>
            Прайс
          </p>
          <h2 className="text-center font-serif text-3xl font-bold text-[#0F172A] md:text-4xl">Цены</h2>
          <p className="mx-auto mt-3 max-w-xs text-center text-sm text-[#475569]">
            Итоговая стоимость зависит от сложности. Консультация бесплатна.
          </p>
        </FadeIn>

        <div className="mt-10 overflow-hidden rounded-2xl bg-white ring-1 ring-pink-100 shadow-sm">
          {data.pricing.map((plan, i) => (
            <FadeIn key={plan.name} delay={i * 0.04}>
              <div
                className={`flex items-center gap-4 px-5 py-4 transition-colors hover:bg-pink-50/50 ${
                  i < data.pricing.length - 1 ? 'border-b border-pink-100' : ''
                } ${plan.highlighted ? 'bg-pink-50' : ''}`}
              >
                {/* Left accent bar for highlighted */}
                {plan.highlighted && (
                  <div className="h-8 w-1 shrink-0 rounded-full" style={{ backgroundColor: data.color }} />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-semibold ${plan.highlighted ? 'text-[#0F172A]' : 'text-[#334155]'}`}>
                      {plan.name}
                    </span>
                    {plan.badge && (
                      <span className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ backgroundColor: data.color }}>
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 flex flex-wrap gap-x-2">
                    {plan.features.map(f => (
                      <span key={f} className="text-xs text-[#94A3B8]">{f}</span>
                    ))}
                  </div>
                </div>
                <span
                  className={`shrink-0 text-sm font-bold ${plan.highlighted ? '' : 'text-[#475569]'}`}
                  style={plan.highlighted ? { color: data.color } : {}}
                >
                  {plan.price}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <p className="mt-8 text-center">
            <Link
              href={`/${data.slug}/contacts`}
              className="inline-block rounded-2xl px-10 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: data.color }}
            >
              Записаться на процедуру
            </Link>
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

// ─── Tutor: 2-section — small packages list + big course cards ────────────────
function PricingCourse({ data }: { data: NicheData }) {
  const smallPlans = data.pricing.slice(0, 3)   // разовый + пакет 4 + пакет 8
  const bigPlans = data.pricing.slice(3)         // пакет 16 + интенсив + годовой

  return (
    <section className="bg-[#FFFBEB] py-24">
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn>
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest" style={{ color: data.color }}>
            Пакеты занятий
          </p>
          <h2 className="text-center font-serif text-3xl font-bold text-[#0F172A] md:text-4xl">Стоимость</h2>
          <p className="mx-auto mt-3 max-w-sm text-center text-sm text-[#64748B]">
            Первый урок — бесплатная диагностика. Без предоплаты.
          </p>
        </FadeIn>

        {/* Section 1: small packages comparison table */}
        <FadeIn>
          <p className="mt-12 mb-3 text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">
            Базовые форматы
          </p>
        </FadeIn>
        <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-amber-100">
          {smallPlans.map((plan, i) => (
            <FadeIn key={plan.name} delay={i * 0.05}>
              <div
                className={`flex items-center gap-4 px-5 py-4 ${
                  i < smallPlans.length - 1 ? 'border-b border-amber-50' : ''
                } ${plan.highlighted ? 'bg-amber-50' : ''}`}
              >
                <BookOpen size={16} className="shrink-0 text-[#94A3B8]" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[#0F172A]">{plan.name}</span>
                    {plan.badge && (
                      <span className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ backgroundColor: data.color }}>
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 flex flex-wrap gap-x-2">
                    {plan.features.map(f => (
                      <span key={f} className="text-xs text-[#94A3B8]">{f}</span>
                    ))}
                  </div>
                </div>
                <span className="shrink-0 text-sm font-bold" style={{ color: data.color }}>
                  {plan.price}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Section 2: big programs as cards */}
        <FadeIn>
          <p className="mt-8 mb-3 text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">
            Расширенные программы
          </p>
        </FadeIn>
        <div className="grid gap-4 sm:grid-cols-3">
          {bigPlans.map((plan, i) => (
            <FadeIn key={plan.name} variant="card" delay={i * 0.08}>
              <div
                className={`flex h-full flex-col rounded-2xl p-5 ring-1 ${plan.highlighted ? 'ring-transparent' : 'ring-amber-200'}`}
                style={{ backgroundColor: plan.highlighted ? data.color : 'white' }}
              >
                <p className={`font-serif text-base font-bold ${plan.highlighted ? 'text-white' : 'text-[#0F172A]'}`}>
                  {plan.name}
                </p>
                <p className={`mt-1 font-serif text-2xl font-bold ${plan.highlighted ? 'text-white' : 'text-[#0F172A]'}`}>
                  {plan.price}
                </p>
                <ul className="mt-4 flex-1 space-y-2">
                  {plan.features.map(f => (
                    <li key={f} className={`flex items-start gap-2 text-xs ${plan.highlighted ? 'text-white/80' : 'text-[#475569]'}`}>
                      <Check size={12} className="mt-0.5 shrink-0" style={!plan.highlighted ? { color: data.color } : {}} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/${data.slug}/contacts`}
                  className="mt-5 block rounded-xl py-2.5 text-center text-sm font-semibold transition-opacity hover:opacity-90"
                  style={
                    plan.highlighted
                      ? { backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }
                      : { backgroundColor: data.color, color: 'white' }
                  }
                >
                  Выбрать
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <p className="mt-6 text-center text-xs text-[#94A3B8]">
            * Гарантия: при выполнении д/з на годовом курсе ЕГЭ — от 80 баллов или возврат средств
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

// ─── Coffee: membership / abonnement ─────────────────────────────────────────
const VISIT_COUNTS = ['По желанию', '8 визитов', 'Неограниченно']
const COFFEE_EXTRAS = ['Без абонемента', 'Экономия ~360 ₽', 'Максимальная выгода']

function PricingMembership({ data }: { data: NicheData }) {
  return (
    <section className="py-24" style={{ background: 'linear-gradient(180deg, #FEF3C7 0%, #FFFBEB 100%)' }}>
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn>
          <p className="mb-3 text-center font-serif text-xs italic tracking-widest" style={{ color: data.color }}>
            Меню и абонементы
          </p>
          <h2 className="text-center font-serif text-3xl font-bold text-[#1C0A00] md:text-4xl">Цены</h2>
          <p className="mx-auto mt-3 max-w-sm text-center text-sm text-[#78350F]">
            Приходите сколько угодно — или возьмите абонемент и экономьте
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {data.pricing.map((plan, i) => (
            <FadeIn key={plan.name} variant="card" delay={i * 0.08}>
              <div
                className="relative flex h-full flex-col overflow-hidden rounded-3xl"
                style={plan.highlighted ? { backgroundColor: data.color } : { backgroundColor: 'white', outline: '1px solid #FDE68A' }}
              >
                <div className="px-6 pb-4 pt-6">
                  <div className="mb-3 flex items-center justify-between">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={plan.highlighted ? { backgroundColor: 'rgba(255,255,255,0.2)' } : { backgroundColor: `${data.color}20` }}
                    >
                      <Coffee size={18} style={plan.highlighted ? { color: 'white' } : { color: data.color }} />
                    </div>
                    {plan.badge && (
                      <span
                        className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase"
                        style={plan.highlighted ? { backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' } : { backgroundColor: data.color, color: 'white' }}
                      >
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <p className={`font-serif text-base font-semibold ${plan.highlighted ? 'text-white' : 'text-[#1C0A00]'}`}>
                    {plan.name}
                  </p>
                  <p className={`mt-1 font-serif text-3xl font-bold ${plan.highlighted ? 'text-white' : 'text-[#1C0A00]'}`}>
                    {plan.price}
                  </p>
                  <p className={`mt-0.5 text-xs ${plan.highlighted ? 'text-white/70' : 'text-[#78350F]'}`}>
                    {VISIT_COUNTS[i]} · {COFFEE_EXTRAS[i]}
                  </p>
                </div>

                <div className={`mx-6 h-px ${plan.highlighted ? 'bg-white/20' : 'bg-amber-100'}`} />

                <div className="flex flex-1 flex-col p-6">
                  <ul className="flex-1 space-y-2.5">
                    {plan.features.map(f => (
                      <li key={f} className={`flex items-start gap-2 text-sm ${plan.highlighted ? 'text-white/90' : 'text-[#78350F]'}`}>
                        <Check size={14} className="mt-0.5 shrink-0" style={!plan.highlighted ? { color: data.color } : { color: 'white' }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/${data.slug}/contacts`}
                    className="mt-5 block rounded-2xl py-2.5 text-center text-sm font-semibold transition-opacity hover:opacity-90"
                    style={plan.highlighted
                      ? { backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }
                      : { backgroundColor: `${data.color}15`, color: data.color }
                    }
                  >
                    {i === 0 ? 'Прийти сегодня' : 'Оформить'}
                  </Link>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Component registry — добавить нишу = одна строка ────────────────────────
const PRICING_REGISTRY: Record<string, ComponentType<{ data: NicheData }>> = {
  barbershop: PricingMenuBoard,
  auto: PricingWorkOrder,
  dental: PricingMedical,
  beauty: PricingBeauty,
  tutor: PricingCourse,
  coffee: PricingMembership,
}

export default function NichePricing({ data }: { data: NicheData }) {
  const Component = PRICING_REGISTRY[data.slug] ?? PricingMenuBoard
  return <Component data={data} />
}
