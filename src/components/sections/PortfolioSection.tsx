'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { PortfolioItem } from '@/data/extras/beauty-portfolio'
import { portfolioCategories } from '@/data/extras/beauty-portfolio'
import { BLUR_DATA_URL, cn } from '@/lib/utils'
import FadeIn from '@/components/ui/FadeIn'

export default function PortfolioSection({
  items,
  color,
}: {
  items: PortfolioItem[]
  color: string
}) {
  const [active, setActive] = useState<string>('all')
  const filtered = active === 'all' ? items : items.filter((item) => item.category === active)

  return (
    <section className="bg-[#F8FAFC] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest" style={{ color }}>
            Работы
          </p>
          <h1 className="text-center font-serif text-3xl font-bold text-[#0F172A] md:text-4xl">
            Портфолио
          </h1>
          <p className="mx-auto mt-4 max-w-md text-center text-sm text-[#475569]">
            Реальные работы наших мастеров. Хотите такой же результат? Записывайтесь!
          </p>
        </FadeIn>

        {/* Filter tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {portfolioCategories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              className={cn(
                'rounded-xl px-5 py-2 text-sm font-medium transition-colors',
                active === cat.key ? 'text-white' : 'bg-white text-[#475569] ring-1 ring-black/10 hover:bg-[#F1F5F9]',
              )}
              style={active === cat.key ? { backgroundColor: color } : {}}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
          {filtered.map((item, i) => (
            <FadeIn key={`${item.title}-${i}`} variant="card" delay={i * 0.05}>
              <div className="group relative overflow-hidden rounded-3xl">
                <div className="relative aspect-square">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width:768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
