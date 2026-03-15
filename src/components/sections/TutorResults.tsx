import type { NicheWithResults } from '@/data/types'
import FadeIn from '@/components/ui/FadeIn'
import { TrendingUp } from 'lucide-react'

export default function TutorResults({ data }: { data: NicheWithResults }) {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn>
          <p
            className="mb-3 text-center text-xs font-semibold uppercase tracking-widest"
            style={{ color: data.color }}
          >
            Результаты
          </p>
          <h2 className="text-center font-serif text-3xl font-bold text-[#0F172A] md:text-4xl">
            До и после — реальные баллы
          </h2>
        </FadeIn>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.results.map((r, i) => (
            <FadeIn key={r.name} variant="card" delay={i * 0.07}>
              <div className="rounded-3xl bg-[#F8FAFC] p-6 ring-1 ring-black/5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[#0F172A]">{r.name}</p>
                    <p className="text-xs text-[#475569]">{r.subject}</p>
                  </div>
                  <TrendingUp size={18} style={{ color: data.color }} />
                </div>

                <div className="mt-5 flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#475569]">{r.before}</p>
                    <p className="text-xs text-[#475569]">было</p>
                  </div>
                  <div className="flex-1 h-1 rounded-full bg-[#E2E8F0]">
                    <div
                      className="h-1 rounded-full transition-all"
                      style={{ width: `${r.after}%`, backgroundColor: data.color }}
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold" style={{ color: data.color }}>
                      {r.after}
                    </p>
                    <p className="text-xs text-[#475569]">стало</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
