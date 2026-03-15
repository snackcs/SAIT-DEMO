import type { NicheData } from '@/data/types'
import FadeIn from '@/components/ui/FadeIn'

export default function NicheProcess({ data }: { data: NicheData }) {
  return (
    <section className="bg-[#F8FAFC] py-24">
      <div className="mx-auto max-w-4xl px-6">
        <FadeIn>
          <p
            className="mb-3 text-center text-xs font-semibold uppercase tracking-widest"
            style={{ color: data.color }}
          >
            Как это работает
          </p>
          <h2 className="text-center font-serif text-3xl font-bold text-[#0F172A] md:text-4xl">
            Три шага к результату
          </h2>
        </FadeIn>

        <div className="mt-14 space-y-6">
          {data.process.map((step, i) => (
            <FadeIn key={step.title} variant="card" delay={i * 0.1}>
              <div className="flex gap-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl font-serif text-xl font-bold text-white"
                  style={{ backgroundColor: data.color }}
                >
                  {i + 1}
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-semibold text-[#0F172A]">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#475569]">{step.text}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
