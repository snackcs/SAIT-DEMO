import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Star } from 'lucide-react'
import type { NicheData } from '@/data/types'
import HeroCentered from './HeroCentered'
import BookingWidget from './BookingWidget'
import FadeIn from '@/components/ui/FadeIn'
import { BLUR_DATA_URL } from '@/lib/utils'

export default function BarberHome({ data }: { data: NicheData }) {
  const preview = data.services.slice(0, 3)

  return (
    <>
      <HeroCentered data={data} />

      {/* Services — dark */}
      <section className="bg-[#0F0A00] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="flex items-end justify-between">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: data.color }}>
                  Услуги
                </p>
                <h2 className="font-serif text-3xl font-bold text-white">Что мы делаем</h2>
              </div>
              <Link href={`/${data.slug}/services`} className="hidden items-center gap-1 text-sm font-semibold sm:flex" style={{ color: data.color }}>
                Все услуги <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {preview.map((s, i) => (
              <FadeIn key={s.title} variant="card" delay={i * 0.07}>
                <div className="flex h-full flex-col rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 transition-all hover:bg-white/10">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: `${data.color}25` }}>
                    <s.Icon size={20} style={{ color: data.color }} />
                  </div>
                  <h3 className="font-semibold text-white">{s.title}</h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-white/50">{s.description}</p>
                  {s.price && <p className="mt-3 text-sm font-semibold" style={{ color: data.color }}>{s.price}</p>}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Booking widget — dark, amber */}
      <section className="bg-[#1A0F00] py-20">
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn>
            <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest" style={{ color: data.color }}>
              Онлайн-запись
            </p>
            <h2 className="text-center font-serif text-3xl font-bold text-white">Выберите мастера и время</h2>
            <p className="mx-auto mt-3 max-w-sm text-center text-sm text-white/50">
              Запись прямо сейчас — без звонков и ожидания
            </p>
          </FadeIn>
          <div className="mt-10">
            <BookingWidget color={data.color} />
          </div>
        </div>
      </section>

      {/* Facts + review — dark */}
      <section className="bg-[#0F0A00] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn>
            <div className="grid grid-cols-3 divide-x divide-white/10">
              {data.about.facts.map((f) => (
                <div key={f.label} className="px-4 py-2 text-center">
                  <p className="font-serif text-3xl font-bold text-white">{f.value}</p>
                  <p className="mt-1 text-sm text-white/50">{f.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Review — amber tint */}
      <section className="py-16" style={{ backgroundColor: `${data.color}18` }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <FadeIn>
            <div className="mb-4 flex justify-center gap-0.5">
              {[1,2,3,4,5].map(i => <Star key={i} size={16} fill={data.color} stroke="none" />)}
            </div>
            <p className="font-serif text-xl italic text-[#0F172A]">&ldquo;{data.reviews[0].text}&rdquo;</p>
            <p className="mt-4 text-sm font-semibold text-[#0F172A]">{data.reviews[0].name}</p>
            <p className="text-xs text-[#475569]">{data.reviews[0].role}</p>
            <Link href={`/${data.slug}/pricing`} className="mt-6 inline-flex items-center gap-1 text-sm font-semibold" style={{ color: data.color }}>
              Все отзывы и цены <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Masters teaser */}
      <section className="bg-[#1A0F00] py-16">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold text-white">Наши мастера</h2>
              <Link href={`/${data.slug}/masters`} className="text-sm font-semibold" style={{ color: data.color }}>
                Все мастера →
              </Link>
            </div>
          </FadeIn>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { name: 'Артём Волков', exp: '7 лет', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
              { name: 'Денис Крылов', exp: '5 лет', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80' },
              { name: 'Максим Зайцев', exp: '3 года', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
            ].map((m, i) => (
              <FadeIn key={m.name} variant="card" delay={i * 0.08}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                  <Image src={m.photo} alt={m.name} fill className="object-cover brightness-75 transition-all hover:brightness-90" sizes="33vw" placeholder="blur" blurDataURL={BLUR_DATA_URL} />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="font-semibold text-white">{m.name}</p>
                    <p className="text-xs" style={{ color: data.color }}>Опыт {m.exp}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
