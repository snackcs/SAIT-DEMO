import Link from 'next/link'
import { ArrowRight, Shield, Clock, Wrench } from 'lucide-react'
import type { NicheData } from '@/data/types'
import HeroSplit from './HeroSplit'
import dynamic from 'next/dynamic'
const DiagnosticsCalculator = dynamic(() => import('./DiagnosticsCalculator'))
import FadeIn from '@/components/ui/FadeIn'

const TRUST = [
  { Icon: Shield, label: 'Официальная гарантия на все работы' },
  { Icon: Clock, label: 'Готовность авто за 24 часа' },
  { Icon: Wrench, label: 'Только оригинальные запчасти' },
]

export default function AutoHome({ data }: { data: NicheData }) {
  const preview = data.services.slice(0, 3)

  return (
    <>
      <HeroSplit data={data} />

      {/* Services — dark industrial */}
      <section className="bg-[#0D1117] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="flex items-end justify-between">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: data.color }}>Услуги</p>
                <h2 className="font-serif text-3xl font-bold text-white">Что мы делаем</h2>
              </div>
              <Link href={`/${data.slug}/services`} className="hidden items-center gap-1 text-sm font-semibold sm:flex" style={{ color: data.color }}>
                Все услуги <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {preview.map((s, i) => (
              <FadeIn key={s.title} variant="card" delay={i * 0.07}>
                <div className="flex h-full flex-col rounded-2xl bg-[#161B22] p-6 ring-1 ring-white/10">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: `${data.color}20` }}>
                    <s.Icon size={18} style={{ color: data.color }} />
                  </div>
                  <h3 className="font-mono text-sm font-semibold uppercase tracking-wide text-white/90">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-white/40">{s.description}</p>
                  {s.price && <p className="mt-3 font-mono text-sm font-bold" style={{ color: data.color }}>{s.price}</p>}
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Trust badges */}
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {TRUST.map(({ Icon, label }) => (
              <div key={label} className="flex items-center gap-3 rounded-xl bg-[#161B22] px-4 py-3 ring-1 ring-white/5">
                <Icon size={16} style={{ color: data.color }} />
                <span className="text-sm text-white/60">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diagnostics calculator */}
      <section className="bg-[#0D1117] py-20">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn>
            <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest" style={{ color: data.color }}>
              Онлайн-калькулятор
            </p>
            <h2 className="text-center font-serif text-3xl font-bold text-white">Составьте список диагностики</h2>
            <p className="mx-auto mt-3 max-w-sm text-center text-sm text-white/40">
              Отметьте нужное — сразу узнаете стоимость и время
            </p>
          </FadeIn>
          <div className="mt-10">
            <DiagnosticsCalculator color={data.color} />
          </div>
        </div>
      </section>

      {/* Stats row */}
      <section className="bg-[#161B22] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn>
            <div className="grid grid-cols-3 divide-x divide-white/10">
              {data.about.facts.map((f) => (
                <div key={f.label} className="px-4 py-2 text-center">
                  <p className="font-mono text-3xl font-bold text-white">{f.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-white/40">{f.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Brands teaser */}
      <section className="bg-[#0D1117] py-14">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl font-bold text-white">Работаем с 18 марками</h2>
              <Link href={`/${data.slug}/brands`} className="text-sm font-semibold" style={{ color: data.color }}>
                Все марки →
              </Link>
            </div>
          </FadeIn>
          <div className="mt-6 flex flex-wrap gap-2">
            {['Toyota', 'BMW', 'Mercedes-Benz', 'Kia', 'Audi', 'Honda', 'Volkswagen', 'Hyundai'].map(b => (
              <span key={b} className="rounded-lg bg-[#161B22] px-3 py-1.5 text-sm text-white/60 ring-1 ring-white/10">{b}</span>
            ))}
            <Link href={`/${data.slug}/brands`} className="rounded-lg px-3 py-1.5 text-sm font-semibold ring-1" style={{ color: data.color, borderColor: `${data.color}40` }}>
              +10 марок
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ backgroundColor: data.color }}>
        <div className="mx-auto max-w-xl px-6 text-center text-white">
          <FadeIn>
            <h2 className="font-serif text-2xl font-bold">Записаться на диагностику</h2>
            <p className="mt-2 text-sm text-white/80">Принимаем каждый день с 8:00 до 20:00</p>
            <Link href={`/${data.slug}/contacts`} className="mt-6 inline-block rounded-xl bg-white px-8 py-3 text-sm font-semibold" style={{ color: data.color }}>
              Записаться
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
