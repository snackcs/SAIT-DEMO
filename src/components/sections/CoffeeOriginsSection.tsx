import type { CoffeeOrigin } from '@/data/extras/coffee-origins'
import FadeIn from '@/components/ui/FadeIn'

export default function CoffeeOriginsSection({
  origins,
  color,
}: {
  origins: CoffeeOrigin[]
  color: string
}) {
  return (
    <section className="bg-[#F8FAFC] py-24">
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn>
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest" style={{ color }}>
            Происхождение
          </p>
          <h2 className="text-center font-serif text-3xl font-bold text-[#0F172A] md:text-4xl">
            Откуда наш кофе
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-center text-sm text-[#475569]">
            Мы работаем напрямую с фермерами. Каждая партия имеет паспорт происхождения и оценку SCA.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {origins.map((origin, i) => (
            <FadeIn key={origin.country} variant="card" delay={i * 0.08}>
              <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-black/5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-3xl">{origin.flag}</p>
                    <h3 className="mt-2 font-serif text-xl font-bold text-[#0F172A]">{origin.country}</h3>
                    <p className="text-sm text-[#475569]">{origin.region}</p>
                  </div>
                  {/* SCA Score */}
                  <div
                    className="flex flex-col items-center justify-center rounded-2xl px-4 py-3 text-white"
                    style={{ backgroundColor: color }}
                  >
                    <span className="text-2xl font-bold leading-none">{origin.sca}</span>
                    <span className="mt-0.5 text-[10px] font-medium uppercase tracking-wider opacity-80">SCA</span>
                  </div>
                </div>

                <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-[#F8FAFC] px-3 py-2">
                    <dt className="text-xs text-[#94A3B8]">Ферма</dt>
                    <dd className="mt-0.5 font-medium text-[#0F172A]">{origin.farm}</dd>
                  </div>
                  <div className="rounded-xl bg-[#F8FAFC] px-3 py-2">
                    <dt className="text-xs text-[#94A3B8]">Обработка</dt>
                    <dd className="mt-0.5 font-medium text-[#0F172A]">{origin.process}</dd>
                  </div>
                  <div className="col-span-2 rounded-xl bg-[#F8FAFC] px-3 py-2">
                    <dt className="text-xs text-[#94A3B8]">Высота</dt>
                    <dd className="mt-0.5 font-medium text-[#0F172A]">{origin.altitude}</dd>
                  </div>
                </dl>

                <div className="mt-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Вкусовые ноты</p>
                  <div className="flex flex-wrap gap-2">
                    {origin.notes.map((note) => (
                      <span
                        key={note}
                        className="rounded-full border px-3 py-1 text-xs font-medium"
                        style={{ borderColor: color, color }}
                      >
                        {note}
                      </span>
                    ))}
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
