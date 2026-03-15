import type { NicheData } from '@/data/types'
import StarRating from '@/components/ui/StarRating'
import FadeIn from '@/components/ui/FadeIn'

function nameToHsl(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  const hue = Math.abs(hash) % 360
  return `hsl(${hue}, 55%, 55%)`
}

function getInitials(name: string): string {
  return name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase()
}

const PLATFORMS = ['Google', '2ГИС', 'Яндекс', 'Яндекс', 'Google', '2ГИС']

export default function NicheReviews({ data }: { data: NicheData }) {
  return (
    <section className="bg-[#F8FAFC] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest" style={{ color: data.color }}>
            Отзывы
          </p>
          <h2 className="text-center font-serif text-3xl font-bold text-[#0F172A] md:text-4xl">
            Что говорят клиенты
          </h2>
          <div className="mt-4 flex items-center justify-center gap-3">
            <StarRating rating={5} />
            <span className="text-sm font-semibold text-[#0F172A]">5.0</span>
            <span className="text-sm text-[#475569]">· {data.reviews.length * 12}+ отзывов на всех платформах</span>
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {data.reviews.map((review, i) => (
            <FadeIn key={review.name} variant="card" delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                <div className="mb-4 flex items-center justify-between">
                  <StarRating rating={review.rating} />
                  <span className="rounded-full bg-[#F1F5F9] px-2.5 py-1 text-[10px] font-semibold text-[#64748B]">
                    {PLATFORMS[i]}
                  </span>
                </div>

                <p className="flex-1 text-sm leading-relaxed text-[#475569]">
                  &ldquo;{review.text}&rdquo;
                </p>

                <div className="mt-6 flex items-center gap-3 border-t border-[#E2E8F0] pt-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ backgroundColor: nameToHsl(review.name) }}
                  >
                    {getInitials(review.name)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0F172A]">{review.name}</p>
                    <p className="text-xs text-[#475569]">{review.role}</p>
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
