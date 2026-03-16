'use client'

import { useState } from 'react'
import FadeIn from '@/components/ui/FadeIn'
import { cn } from '@/lib/utils'

export type SlimService = {
  title: string
  description: string
  price?: string
}

const CATEGORIES = [
  { id: 'all',   label: 'Все' },
  { id: 'nails', label: 'Ногти' },
  { id: 'brows', label: 'Брови & Ресницы' },
  { id: 'hair',  label: 'Волосы' },
  { id: 'face',  label: 'Уход & Тело' },
]

function getCategory(title: string): string {
  const t = title.toLowerCase()
  if (t.includes('маникюр') || t.includes('педикюр') || t.includes('рук')) return 'nails'
  if (t.includes('бровей') || t.includes('ресниц') || t.includes('микроблейдинг') || t.includes('перманент') || t.includes('ламинирование')) return 'brows'
  if (t.includes('волос') || t.includes('окрашивание')) return 'hair'
  return 'face'
}

/* Первая буква каждого слова в заголовке — как аватар вместо иконки */
function ServiceInitial({ title, color }: { title: string; color: string }) {
  const initial = title.trim()[0]?.toUpperCase() ?? '✦'
  return (
    <div
      className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl font-serif text-lg font-bold text-white"
      style={{ backgroundColor: color }}
    >
      {initial}
    </div>
  )
}

export default function BeautyServicesSection({
  services,
  color,
}: {
  services: SlimService[]
  color: string
}) {
  const [active, setActive] = useState('all')

  const filtered = active === 'all'
    ? services
    : services.filter(s => getCategory(s.title) === active)

  return (
    <section id="services" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <p
            className="mb-3 text-center text-xs font-semibold uppercase tracking-widest"
            style={{ color }}
          >
            Услуги
          </p>
          <h2 className="text-center font-serif text-3xl font-bold text-[#0F172A] md:text-4xl">
            Что мы предлагаем
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-center text-sm text-[#475569]">
            Выберите категорию — покажем только нужное
          </p>
        </FadeIn>

        {/* Category tabs */}
        <FadeIn>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
                  active === cat.id
                    ? 'text-white shadow-md'
                    : 'bg-[#F8F0F6] text-[#475569] hover:bg-[#F0E5EE]',
                )}
                style={active === cat.id ? { backgroundColor: color } : {}}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Cards grid */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((service, i) => (
            <FadeIn key={service.title} variant="card" delay={i * 0.05}>
              <div className="group flex h-full flex-col rounded-2xl bg-[#FDF8FB] p-6 ring-1 ring-pink-100 transition-all hover:-translate-y-0.5 hover:shadow-md">
                <ServiceInitial title={service.title} color={color} />
                <h3 className="font-semibold text-[#0F172A]">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#64748B]">
                  {service.description}
                </p>
                {service.price && (
                  <div className="mt-4 flex items-center justify-between border-t border-pink-100 pt-3">
                    <span className="text-xs text-[#94A3B8]">Стоимость</span>
                    <span className="text-sm font-bold" style={{ color }}>
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
