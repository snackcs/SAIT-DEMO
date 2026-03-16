import type { NicheData } from '@/data/types'
import FadeIn from '@/components/ui/FadeIn'
import type { ComponentType } from 'react'
import BeautyServicesSection, { type SlimService } from './BeautyServicesSection'

type Props = { data: NicheData }

/* ─────────────────────────────────────────────────────────────────────────────
   BARBERSHOP: светло-кремовый фон, сетка карточек с иконками
   Pricing: тёмный #0F0A00, нумерованный список — полная противоположность
───────────────────────────────────────────────────────────────────────────── */
function BarberServices({ data }: Props) {
  const COLOR = '#c9a84c'
  return (
    <section id="services" className="bg-[#FDFAF4] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest" style={{ color: COLOR }}>
            Услуги
          </p>
          <h2 className="text-center font-serif text-3xl font-bold text-[#1A1200] md:text-4xl">
            Что мы умеем
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-center text-sm text-[#78716C]">
            Каждая процедура — с горячим полотенцем и вниманием к деталям
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.services.map((service, i) => (
            <FadeIn key={service.title} variant="card" delay={i * 0.05}>
              <div className="flex h-full flex-col rounded-2xl bg-white p-6 ring-1 ring-[#EDE5D0] transition-all hover:-translate-y-0.5 hover:shadow-lg">
                <div
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: `${COLOR}1A` }}
                >
                  <service.Icon size={26} style={{ color: COLOR }} />
                </div>
                <h3 className="font-serif text-base font-bold text-[#1A1200]">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#78716C]">
                  {service.description}
                </p>
                {service.price && (
                  <div
                    className="mt-4 flex items-center justify-between border-t pt-3"
                    style={{ borderColor: `${COLOR}20` }}
                  >
                    <span className="text-xs text-[#A8A09A]">от</span>
                    <span className="font-serif text-sm font-bold" style={{ color: COLOR }}>
                      {service.price}
                    </span>
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   AUTO: светло-серый фон с карточками — отличается от тёмного pricing-table
───────────────────────────────────────────────────────────────────────────── */
function AutoServices({ data }: Props) {
  const COLOR = '#2563eb'
  return (
    <section id="services" className="bg-[#F1F5F9] py-24">
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn>
          {/* Синяя полоса-шапка */}
          <div
            className="mb-10 overflow-hidden rounded-2xl px-8 py-6"
            style={{ background: `linear-gradient(135deg, ${COLOR} 0%, #1d4ed8 100%)` }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
              Услуги
            </p>
            <h2 className="mt-1 font-serif text-2xl font-bold text-white md:text-3xl">
              Что мы предлагаем
            </h2>
            <p className="mt-1.5 text-sm text-white/70">
              Гарантия на все виды работ. Диагностика перед каждым ремонтом.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-3 sm:grid-cols-2">
          {data.services.map((service, i) => (
            <FadeIn key={service.title} variant="card" delay={i * 0.04}>
              <div className="flex overflow-hidden rounded-xl bg-white ring-1 ring-[#E2E8F0] transition-all hover:ring-[#2563eb]/30 hover:shadow-sm">
                <div
                  className="flex w-20 shrink-0 flex-col items-center justify-center gap-2 px-3 py-5"
                  style={{ backgroundColor: `${COLOR}0D` }}
                >
                  <service.Icon size={22} style={{ color: COLOR }} />
                  {service.price && (
                    <span
                      className="text-center font-mono text-[10px] font-bold leading-tight"
                      style={{ color: COLOR }}
                    >
                      {service.price}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col justify-center border-l border-[#E2E8F0] px-4 py-4">
                  <p className="text-sm font-semibold text-[#0F172A]">{service.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-[#64748B]">{service.description}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   DENTAL: белый фон, акцентная синяя шапка-badge — отличается от light-blue pricing
───────────────────────────────────────────────────────────────────────────── */
function DentalServices({ data }: Props) {
  return (
    <section id="services" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <p
            className="mb-3 text-center text-xs font-semibold uppercase tracking-widest"
            style={{ color: data.color }}
          >
            Услуги
          </p>
          <h2 className="text-center font-serif text-3xl font-bold text-[#0F172A] md:text-4xl">
            Направления клиники
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-center text-sm text-[#475569]">
            Полный спектр стоматологической помощи — от профилактики до имплантации
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.services.map((service, i) => (
            <FadeIn key={service.title} variant="card" delay={i * 0.06}>
              <div className="flex h-full flex-col rounded-2xl bg-white p-6 ring-1 ring-[#E0F2FE] shadow-sm transition-shadow hover:shadow-md">
                <div
                  className="mb-4 flex h-14 w-14 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${data.color}18` }}
                >
                  <service.Icon size={26} style={{ color: data.color }} />
                </div>
                <h3 className="text-sm font-semibold text-[#0F172A]">{service.title}</h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-[#64748B]">
                  {service.description}
                </p>
                {service.price && (
                  <div
                    className="mt-4 rounded-xl px-4 py-1.5 text-center text-xs font-bold"
                    style={{ backgroundColor: `${data.color}12`, color: data.color }}
                  >
                    {service.price}
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   BEAUTY: вынесен в отдельный client-component с табами по категориям.
   Передаём только сериализуемые поля — без Icon (функций).
───────────────────────────────────────────────────────────────────────────── */
function BeautyServices({ data }: Props) {
  const slim: SlimService[] = data.services.map(s => ({
    title: s.title,
    description: s.description,
    price: s.price,
  }))
  return <BeautyServicesSection services={slim} color={data.color} />
}

/* ─────────────────────────────────────────────────────────────────────────────
   TUTOR: белый фон с фиолетовым акцентом — отличается от жёлтого pricing
───────────────────────────────────────────────────────────────────────────── */
function TutorServices({ data }: Props) {
  return (
    <section id="services" className="bg-white py-24">
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn>
          <p
            className="mb-3 text-center text-xs font-semibold uppercase tracking-widest"
            style={{ color: data.color }}
          >
            Программы
          </p>
          <h2 className="text-center font-serif text-3xl font-bold text-[#0F172A] md:text-4xl">
            Что я преподаю
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-center text-sm text-[#475569]">
            Индивидуальный подход — первый урок бесплатная диагностика
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {data.services.map((service, i) => (
            <FadeIn key={service.title} variant="card" delay={i * 0.06}>
              <div className="flex h-full flex-col rounded-2xl bg-white ring-1 ring-[#EDE9FE] transition-all hover:shadow-md hover:ring-[#7c3aed]/30">
                <div className="flex items-start gap-3 p-5">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${data.color}15` }}
                  >
                    <service.Icon size={18} style={{ color: data.color }} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#0F172A]">{service.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-[#64748B]">
                      {service.description}
                    </p>
                  </div>
                </div>
                {service.price && (
                  <div className="mt-auto flex items-center justify-between border-t border-[#EDE9FE] px-5 py-3">
                    <span className="text-xs text-[#94A3B8]">Стоимость</span>
                    <span className="text-sm font-bold" style={{ color: data.color }}>
                      {service.price}
                    </span>
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   COFFEE: тёмный кофейный фон, menu-board стиль с разделением на Напитки / Еда
   Pricing: тёплый жёлто-янтарный фон с 3 карточками абонементов — полная противоположность
───────────────────────────────────────────────────────────────────────────── */
function CoffeeServices({ data }: Props) {
  const COLOR = '#d97706'
  const drinks = data.services.slice(0, 6)
  const extras = data.services.slice(6)

  return (
    <section id="services" className="bg-[#150A02] py-24">
      <div className="mx-auto max-w-4xl px-6">
        <FadeIn>
          <p className="mb-2 text-center font-serif text-xs italic tracking-widest" style={{ color: COLOR }}>
            Наше меню
          </p>
          <h2 className="text-center font-serif text-3xl font-bold text-white md:text-4xl">
            Что мы готовим
          </h2>
          <p className="mx-auto mt-3 max-w-xs text-center text-sm text-white/40">
            Specialty зерно, свежая выпечка, авторские напитки — каждый день
          </p>
        </FadeIn>

        {/* Divider */}
        <div className="mt-10 flex items-center gap-4">
          <div className="h-px flex-1" style={{ backgroundColor: `${COLOR}30` }} />
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: `${COLOR}80` }}>
            Напитки и еда
          </span>
          <div className="h-px flex-1" style={{ backgroundColor: `${COLOR}30` }} />
        </div>

        {/* Drinks grid */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {drinks.map((service, i) => (
            <FadeIn key={service.title} delay={i * 0.04}>
              <div className="group flex items-center gap-4 rounded-xl bg-[#1F0F05] px-5 py-4 ring-1 ring-white/5 transition-colors hover:bg-[#271405]">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${COLOR}20` }}
                >
                  <service.Icon size={20} style={{ color: COLOR }} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-white">{service.title}</p>
                  {service.description && (
                    <p className="mt-0.5 truncate text-xs text-white/35">{service.description}</p>
                  )}
                </div>
                {service.price && (
                  <span className="shrink-0 font-mono text-sm font-bold" style={{ color: COLOR }}>
                    {service.price}
                  </span>
                )}
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Extras */}
        {extras.length > 0 && (
          <>
            <div className="mt-10 flex items-center gap-4">
              <div className="h-px flex-1" style={{ backgroundColor: `${COLOR}30` }} />
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: `${COLOR}80` }}>
                Атмосфера & Опыт
              </span>
              <div className="h-px flex-1" style={{ backgroundColor: `${COLOR}30` }} />
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {extras.map((service, i) => (
                <FadeIn key={service.title} delay={i * 0.04}>
                  <div className="flex items-center gap-4 rounded-xl bg-[#1F0F05] px-5 py-4 ring-1 ring-white/5 transition-colors hover:bg-[#271405]">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${COLOR}20` }}
                    >
                      <service.Icon size={20} style={{ color: COLOR }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-white">{service.title}</p>
                      {service.description && (
                        <p className="mt-0.5 text-xs leading-relaxed text-white/35">{service.description}</p>
                      )}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   DEFAULT (fallback)
───────────────────────────────────────────────────────────────────────────── */
function DefaultServices({ data }: Props) {
  return (
    <section id="services" className="bg-[#F8FAFC] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <p
            className="mb-3 text-center text-xs font-semibold uppercase tracking-widest"
            style={{ color: data.color }}
          >
            Услуги
          </p>
          <h2 className="text-center font-serif text-3xl font-bold text-[#0F172A] md:text-4xl">
            Что мы предлагаем
          </h2>
        </FadeIn>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.services.map((service, i) => (
            <FadeIn key={service.title} variant="card" delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-md">
                <div
                  className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: `${data.color}18` }}
                >
                  <service.Icon size={22} style={{ color: data.color }} />
                </div>
                <h3 className="font-semibold text-[#0F172A]">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#475569]">
                  {service.description}
                </p>
                {service.price && (
                  <p className="mt-4 text-sm font-semibold" style={{ color: data.color }}>
                    {service.price}
                  </p>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Component registry ── */
const SERVICES_REGISTRY: Record<string, ComponentType<Props>> = {
  barbershop: BarberServices,
  auto:       AutoServices,
  dental:     DentalServices,
  beauty:     BeautyServices,
  tutor:      TutorServices,
  coffee:     CoffeeServices,
}

export default function NicheServices({ data }: Props) {
  const Component = SERVICES_REGISTRY[data.slug] ?? DefaultServices
  return <Component data={data} />
}
