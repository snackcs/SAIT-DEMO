import type { ProgramModule } from '@/data/extras/tutor-program'
import FadeIn from '@/components/ui/FadeIn'

export default function ProgramSection({
  modules,
  color,
}: {
  modules: ProgramModule[]
  color: string
}) {
  return (
    <section className="bg-[#F8FAFC] py-24">
      <div className="mx-auto max-w-4xl px-6">
        <FadeIn>
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest" style={{ color }}>
            Учебный план
          </p>
          <h1 className="text-center font-serif text-3xl font-bold text-[#0F172A] md:text-4xl">
            Программа подготовки
          </h1>
          <p className="mx-auto mt-4 max-w-md text-center text-sm text-[#475569]">
            17 недель интенсивной подготовки. Каждый модуль строится на предыдущем.
          </p>
        </FadeIn>

        <div className="mt-14 space-y-6">
          {modules.map((mod, i) => (
            <FadeIn key={mod.number} variant="card" delay={i * 0.07}>
              <div className="relative flex gap-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                {/* Number badge */}
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-lg font-bold text-white"
                  style={{ backgroundColor: color }}
                >
                  {mod.number}
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="font-serif text-lg font-bold text-[#0F172A]">{mod.title}</h3>
                    <span
                      className="rounded-full px-3 py-0.5 text-xs font-medium text-white"
                      style={{ backgroundColor: color }}
                    >
                      {mod.duration}
                    </span>
                  </div>

                  <ul className="mt-3 grid grid-cols-1 gap-1 sm:grid-cols-2">
                    {mod.topics.map((topic) => (
                      <li key={topic} className="flex items-center gap-2 text-sm text-[#475569]">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: color }} />
                        {topic}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-4 rounded-xl bg-[#F8FAFC] px-4 py-2.5 text-sm font-medium text-[#0F172A]">
                    Результат: {mod.result}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* CTA */}
        <FadeIn>
          <div className="mt-12 rounded-3xl p-8 text-center text-white" style={{ backgroundColor: color }}>
            <p className="font-serif text-2xl font-bold">Готовы начать подготовку?</p>
            <p className="mt-2 text-sm opacity-90">Первое занятие — бесплатная диагностика уровня</p>
            <a
              href="/tutor/contacts"
              className="mt-6 inline-block rounded-xl bg-white px-8 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ color }}
            >
              Записаться на диагностику
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
