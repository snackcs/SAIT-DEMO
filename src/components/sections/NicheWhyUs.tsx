import type { NicheData } from '@/data/types'
import FadeIn from '@/components/ui/FadeIn'

export default function NicheWhyUs({ data }: { data: NicheData }) {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <p
            className="mb-3 text-center text-xs font-semibold uppercase tracking-widest"
            style={{ color: data.color }}
          >
            Почему мы
          </p>
          <h2 className="text-center font-serif text-3xl font-bold text-[#0F172A] md:text-4xl">
            Наши преимущества
          </h2>
        </FadeIn>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {data.whyUs.map((item, i) => (
            <FadeIn key={item.title} variant="card" delay={i * 0.08}>
              <div className="flex gap-5 rounded-3xl bg-[#F8FAFC] p-6">
                <div
                  className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${data.color}18` }}
                >
                  <item.Icon size={20} style={{ color: data.color }} />
                </div>
                <div>
                  <h3 className="font-semibold text-[#0F172A]">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#475569]">{item.text}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
