'use client'

import { useState } from 'react'
import type { CarBrand } from '@/data/extras/auto-brands'
import { brandCategories } from '@/data/extras/auto-brands'
import FadeIn from '@/components/ui/FadeIn'
import { cn } from '@/lib/utils'

export default function BrandsSection({
  brands,
  color,
}: {
  brands: CarBrand[]
  color: string
}) {
  const [active, setActive] = useState<string>('all')
  const filtered = active === 'all' ? brands : brands.filter((b) => b.category === active)

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn>
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest" style={{ color }}>
            Марки авто
          </p>
          <h1 className="text-center font-serif text-3xl font-bold text-[#0F172A] md:text-4xl">
            Работаем с любым авто
          </h1>
          <p className="mx-auto mt-4 max-w-md text-center text-sm text-[#475569]">
            Опыт работы с отечественными, японскими, немецкими и корейскими марками с 2015 года.
          </p>
        </FadeIn>

        {/* Filter tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {brandCategories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              className={cn(
                'rounded-xl px-4 py-2 text-sm font-medium transition-colors',
                active === cat.key ? 'text-white' : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]',
              )}
              style={active === cat.key ? { backgroundColor: color } : {}}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Brands grid */}
        <div className="mt-10 grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
          {filtered.map((brand, i) => (
            <FadeIn key={brand.name} variant="card" delay={i * 0.04}>
              <div className="flex flex-col items-center justify-center rounded-2xl bg-[#F8FAFC] p-4 text-center ring-1 ring-black/5 transition-shadow hover:shadow-md">
                <p className="font-semibold text-[#0F172A]">{brand.name}</p>
                <p className="mt-0.5 text-xs text-[#475569]">{brand.country}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
