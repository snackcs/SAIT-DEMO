import type { DiagnosticService } from '@/data/extras/auto-diagnostics'
import FadeIn from '@/components/ui/FadeIn'
import { Check, Clock } from 'lucide-react'
import Link from 'next/link'

export default function DiagnosticsSection({
  diagnostics,
  color,
  slug,
}: {
  diagnostics: DiagnosticService[]
  color: string
  slug: string
}) {
  return (
    <section className="bg-[#F8FAFC] py-24">
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn>
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest" style={{ color }}>
            Диагностика
          </p>
          <h1 className="text-center font-serif text-3xl font-bold text-[#0F172A] md:text-4xl">
            Виды диагностики
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-center text-sm text-[#475569]">
            Современное оборудование. Показываем результаты на экране до начала ремонта. Цена фиксированная.
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {diagnostics.map((d, i) => (
            <FadeIn key={d.name} variant="card" delay={i * 0.07}>
              <div className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                <div className="flex items-start justify-between gap-4">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: `${color}18` }}
                  >
                    <d.Icon size={22} style={{ color }} />
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#475569]">
                    <Clock size={12} />
                    {d.duration}
                  </div>
                </div>

                <h3 className="mt-4 font-semibold text-[#0F172A]">{d.name}</h3>
                <p className="mt-1 text-sm text-[#475569]">{d.description}</p>

                <div className="mt-4 flex-1">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#475569]">
                    Включает:
                  </p>
                  <ul className="space-y-1.5">
                    {d.includes.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-[#475569]">
                        <Check size={12} style={{ color }} className="shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-[#E2E8F0] pt-4">
                  <p className="font-semibold" style={{ color }}>{d.price}</p>
                  <Link
                    href={`/${slug}/contacts`}
                    className="rounded-xl px-4 py-2 text-xs font-semibold text-white"
                    style={{ backgroundColor: color }}
                  >
                    Записаться
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
