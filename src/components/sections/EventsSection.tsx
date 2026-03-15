import type { CoffeeEvent } from '@/data/extras/coffee-events'
import { Music, Coffee, BookOpen, Star } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'

const TYPE_CONFIG: Record<CoffeeEvent['type'], { label: string; Icon: typeof Music }> = {
  music: { label: 'Музыка', Icon: Music },
  tasting: { label: 'Каппинг', Icon: Coffee },
  workshop: { label: 'Воркшоп', Icon: BookOpen },
  other: { label: 'Событие', Icon: Star },
}

export default function EventsSection({
  events,
  color,
}: {
  events: CoffeeEvent[]
  color: string
}) {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn>
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest" style={{ color }}>
            Мероприятия
          </p>
          <h1 className="text-center font-serif text-3xl font-bold text-[#0F172A] md:text-4xl">
            Афиша событий
          </h1>
          <p className="mx-auto mt-4 max-w-md text-center text-sm text-[#475569]">
            Живая музыка, каппинги и воркшопы. Что-то происходит каждую неделю.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {events.map((event, i) => {
            const { label, Icon } = TYPE_CONFIG[event.type]
            return (
              <FadeIn key={event.title} variant="card" delay={i * 0.07}>
                <div className="flex flex-col rounded-3xl bg-[#F8FAFC] p-6 ring-1 ring-black/5">
                  {/* Header */}
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-white"
                      style={{ backgroundColor: color }}
                    >
                      <Icon size={20} />
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider" style={{ color }}>
                        {label}
                      </span>
                      <h3 className="mt-0.5 font-serif text-lg font-bold text-[#0F172A]">{event.title}</h3>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-[#475569]">{event.description}</p>

                  {/* Footer */}
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-black/5 pt-4">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="font-semibold text-[#0F172A]">{event.date}</span>
                      <span className="text-[#475569]">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[#94A3B8]">{event.spots} мест</span>
                      <span
                        className="rounded-xl px-3 py-1 text-xs font-semibold text-white"
                        style={{ backgroundColor: color }}
                      >
                        {event.price}
                      </span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            )
          })}
        </div>

        <FadeIn>
          <p className="mt-10 text-center text-sm text-[#475569]">
            Чтобы забронировать место на событие —{' '}
            <a href="/coffee/contacts" className="font-semibold underline" style={{ color }}>
              напишите нам
            </a>
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
