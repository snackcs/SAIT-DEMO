import type { NicheData } from '@/data/types'
import FadeIn from '@/components/ui/FadeIn'

export default function NicheCTA({ data }: { data: NicheData }) {
  return (
    <section className="py-24" style={{ backgroundColor: data.color }}>
      <div className="mx-auto max-w-3xl px-6 text-center text-white">
        <FadeIn>
          <h2 className="font-serif text-3xl font-bold md:text-4xl">
            Готовы? Запишитесь прямо сейчас
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/80">
            Оставьте заявку — перезвоним в течение 15 минут в рабочее время.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="#contacts"
              className="rounded-xl bg-white px-8 py-4 text-base font-semibold text-[#0F172A] transition-colors hover:bg-white/90"
            >
              Записаться
            </a>
            {data.contacts.phone && (
              <a
                href={`tel:${data.contacts.phone.replace(/\s/g, '')}`}
                className="rounded-xl border border-white/40 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10"
              >
                {data.contacts.phone}
              </a>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
