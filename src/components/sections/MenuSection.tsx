'use client'

import { useState } from 'react'
import type { MenuItem } from '@/data/extras/coffee-menu'
import { menuCategories } from '@/data/extras/coffee-menu'
import { cn } from '@/lib/utils'
import FadeIn from '@/components/ui/FadeIn'

export default function MenuSection({
  items,
  color,
}: {
  items: MenuItem[]
  color: string
}) {
  const [active, setActive] = useState<string>('all')
  const filtered = active === 'all' ? items : items.filter((item) => item.category === active)

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn>
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest" style={{ color }}>
            Напитки и еда
          </p>
          <h1 className="text-center font-serif text-3xl font-bold text-[#0F172A] md:text-4xl">Меню</h1>
          <p className="mx-auto mt-4 max-w-md text-center text-sm text-[#475569]">
            Specialty кофе из лучших регионов мира. Всё готовится на заказ.
          </p>
        </FadeIn>

        {/* Filter tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {menuCategories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              className={cn(
                'rounded-xl px-5 py-2 text-sm font-medium transition-colors',
                active === cat.key ? 'text-white' : 'bg-[#F8FAFC] text-[#475569] hover:bg-[#F1F5F9]',
              )}
              style={active === cat.key ? { backgroundColor: color } : {}}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu grid */}
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, i) => (
            <FadeIn key={`${item.name}-${i}`} variant="card" delay={i * 0.04}>
              <div className="relative flex flex-col rounded-2xl bg-[#F8FAFC] p-5 ring-1 ring-black/5">
                {item.popular && (
                  <span
                    className="absolute right-4 top-4 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white"
                    style={{ backgroundColor: color }}
                  >
                    Хит
                  </span>
                )}
                <p className="pr-12 font-semibold text-[#0F172A]">{item.name}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-[#64748B]">{item.description}</p>
                <p className="mt-auto pt-4 text-base font-bold" style={{ color }}>
                  {item.price}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
