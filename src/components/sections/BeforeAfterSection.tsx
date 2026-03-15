import Image from 'next/image'
import type { BeforeAfterCase } from '@/data/extras/dental-before-after'
import { BLUR_DATA_URL } from '@/lib/utils'
import FadeIn from '@/components/ui/FadeIn'
import { Clock } from 'lucide-react'

export default function BeforeAfterSection({
  cases,
  color,
}: {
  cases: BeforeAfterCase[]
  color: string
}) {
  return (
    <section className="bg-[#F8FAFC] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest" style={{ color }}>
            Результаты
          </p>
          <h1 className="text-center font-serif text-3xl font-bold text-[#0F172A] md:text-4xl">
            До и после
          </h1>
          <p className="mx-auto mt-4 max-w-md text-center text-sm text-[#475569]">
            Реальные случаи наших пациентов. Фото сделаны в клинике до начала и после завершения лечения.
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {cases.map((c, i) => (
            <FadeIn key={c.title} variant="card" delay={i * 0.07}>
              <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
                {/* Images */}
                <div className="grid grid-cols-2">
                  <div className="relative">
                    <div className="absolute left-3 top-3 z-10 rounded-lg bg-black/60 px-2 py-1 text-xs font-semibold text-white">
                      До
                    </div>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={c.before}
                        alt={`До — ${c.title}`}
                        fill
                        sizes="25vw"
                        className="object-cover grayscale"
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL}
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <div
                      className="absolute right-3 top-3 z-10 rounded-lg px-2 py-1 text-xs font-semibold text-white"
                      style={{ backgroundColor: color }}
                    >
                      После
                    </div>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={c.after}
                        alt={`После — ${c.title}`}
                        fill
                        sizes="25vw"
                        className="object-cover"
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL}
                      />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-[#0F172A]">{c.title}</h3>
                    <div className="flex shrink-0 items-center gap-1 text-xs text-[#475569]">
                      <Clock size={12} />
                      {c.duration}
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-[#475569]">{c.description}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
