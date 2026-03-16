import Image from '@/components/ui/DemoImage'
import Link from 'next/link'
import type { Master } from '@/data/extras/barbershop-masters'
import { BLUR_DATA_URL } from '@/lib/utils'
import FadeIn from '@/components/ui/FadeIn'

export default function MastersSection({
  masters,
  color,
  slug,
}: {
  masters: Master[]
  color: string
  slug: string
}) {
  return (
    <section className="bg-[#F8FAFC] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest" style={{ color }}>
            Команда
          </p>
          <h1 className="text-center font-serif text-3xl font-bold text-[#0F172A] md:text-4xl">
            Наши мастера
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-center text-sm text-[#475569]">
            Каждый мастер — сертифицированный специалист с многолетним опытом. Выберите своего и запишитесь онлайн.
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {masters.map((master, i) => (
            <FadeIn key={master.name} variant="card" delay={i * 0.08}>
              <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={master.photo}
                    alt={master.name}
                    fill
                    sizes="(max-width:1024px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-500 hover:scale-105"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wide" style={{ color }}>
                    {master.role}
                  </p>
                  <h3 className="mt-1 font-serif text-xl font-bold text-[#0F172A]">{master.name}</h3>
                  <p className="mt-1 text-sm text-[#475569]">Опыт: {master.experience}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {master.specialties.map((s) => (
                      <span
                        key={s}
                        className="rounded-full px-2.5 py-1 text-xs font-medium"
                        style={{ backgroundColor: `${color}15`, color }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    {master.instagram && (
                      <span className="text-xs text-[#475569]">{master.instagram}</span>
                    )}
                    <Link
                      href={`/${slug}/contacts`}
                      className="ml-auto rounded-xl px-4 py-2 text-xs font-semibold text-white"
                      style={{ backgroundColor: color }}
                    >
                      Записаться
                    </Link>
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
