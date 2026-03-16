import Link from 'next/link'
import Image from '@/components/ui/DemoImage'
import { ArrowRight, MapPin, Clock } from 'lucide-react'
import type { NicheData } from '@/data/types'
import HeroCentered from './HeroCentered'
import dynamic from 'next/dynamic'
const CoffeeFinder = dynamic(() => import('./CoffeeFinder'))
import FadeIn from '@/components/ui/FadeIn'
import { BLUR_DATA_URL } from '@/lib/utils'

export default function CoffeeHome({ data }: { data: NicheData }) {
  const preview = data.services.slice(0, 3)

  return (
    <>
      <HeroCentered data={data} />

      {/* Coffee finder */}
      <section className="py-20" style={{ background: 'linear-gradient(180deg, #FEF3C7 0%, #FFFBEB 100%)' }}>
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn>
            <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest" style={{ color: data.color }}>
              Навигатор
            </p>
            <h2 className="text-center font-serif text-3xl font-bold text-[#1C0A00]">Найди свой кофе</h2>
            <p className="mx-auto mt-3 max-w-sm text-center text-sm text-[#78350F]">
              Выберите любимые ноты — подберём идеальный напиток из нашего меню
            </p>
          </FadeIn>
          <div className="mt-10">
            <CoffeeFinder color={data.color} />
          </div>
        </div>
      </section>

      {/* Menu preview — editorial style */}
      <section className="bg-[#1C0A00] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="flex items-end justify-between">
              <div>
                <p className="mb-2 font-serif text-sm italic" style={{ color: data.color }}>Наш выбор</p>
                <h2 className="font-serif text-3xl font-bold text-white">Популярное в меню</h2>
              </div>
              <Link href={`/${data.slug}/menu`} className="hidden items-center gap-1 text-sm font-semibold sm:flex" style={{ color: data.color }}>
                Всё меню <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {preview.map((s, i) => (
              <FadeIn key={s.title} variant="card" delay={i * 0.07}>
                <div className="flex h-full flex-col rounded-2xl bg-[#2D1A00] p-6 ring-1 ring-white/10">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: `${data.color}30` }}>
                    <s.Icon size={18} style={{ color: data.color }} />
                  </div>
                  <h3 className="font-serif font-semibold text-white">{s.title}</h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-white/50">{s.description}</p>
                  {s.price && <p className="mt-3 text-sm font-semibold" style={{ color: data.color }}>{s.price}</p>}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Origins teaser */}
      <section className="py-16" style={{ backgroundColor: '#FEF3C7' }}>
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-serif text-xs italic text-[#78350F]">Прямые поставки</p>
                <h2 className="mt-1 font-serif text-2xl font-bold text-[#1C0A00]">Откуда наш кофе</h2>
              </div>
              <Link href={`/${data.slug}/coffee-info`} className="text-sm font-semibold" style={{ color: data.color }}>
                Подробнее →
              </Link>
            </div>
          </FadeIn>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { flag: '🇪🇹', country: 'Эфиопия', region: 'Yirgacheffe', sca: 88 },
              { flag: '🇨🇴', country: 'Колумбия', region: 'Huila', sca: 86 },
              { flag: '🇰🇪', country: 'Кения', region: 'Kirinyaga', sca: 87 },
              { flag: '🇬🇹', country: 'Гватемала', region: 'Antigua', sca: 85 },
            ].map(o => (
              <div key={o.country} className="flex items-center gap-3 rounded-2xl bg-white px-5 py-3 shadow-sm ring-1 ring-amber-200">
                <span className="text-2xl">{o.flag}</span>
                <div>
                  <p className="font-semibold text-[#1C0A00]">{o.country}</p>
                  <p className="text-xs text-[#78350F]">{o.region} · SCA {o.sca}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-[#1C0A00] py-14">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold text-white">Атмосфера</h2>
              <Link href={`/${data.slug}/gallery`} className="text-sm font-semibold" style={{ color: data.color }}>
                Все фото →
              </Link>
            </div>
          </FadeIn>
          {'gallery' in data && (
            <div className="grid grid-cols-3 gap-3">
              {(data.gallery as string[]).slice(0, 6).map((src, i) => (
                <FadeIn key={src} variant="card" delay={i * 0.05}>
                  <div className="relative aspect-square overflow-hidden rounded-2xl">
                    <Image src={src} alt="Coffee" fill className="object-cover brightness-90 transition-all hover:brightness-100" sizes="33vw" placeholder="blur" blurDataURL={BLUR_DATA_URL} />
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Events teaser */}
      <section className="py-14" style={{ backgroundColor: '#FEF3C7' }}>
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn>
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold text-[#1C0A00]">Ближайшие события</h2>
              <Link href={`/${data.slug}/events`} className="text-sm font-semibold" style={{ color: data.color }}>
                Все события →
              </Link>
            </div>
          </FadeIn>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              { title: 'Джаз-вечер с Trío Bohème', date: '21 марта', time: '19:00', price: 'Вход свободный' },
              { title: 'Каппинг: Эфиопия vs Кения', date: '28 марта', time: '18:00', price: '750 ₽' },
            ].map(e => (
              <FadeIn key={e.title} variant="card">
                <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm ring-1 ring-amber-200">
                  <div>
                    <p className="font-semibold text-[#1C0A00]">{e.title}</p>
                    <p className="mt-0.5 text-sm text-[#78350F]">{e.date} · {e.time}</p>
                  </div>
                  <span className="ml-3 shrink-0 rounded-xl px-3 py-1 text-xs font-semibold text-white" style={{ backgroundColor: data.color }}>
                    {e.price}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Info + CTA */}
      <section className="bg-[#1C0A00] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn>
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
              <div className="flex flex-col gap-3 text-white/60">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin size={14} style={{ color: data.color }} /> {data.contacts.address}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock size={14} style={{ color: data.color }} /> {data.contacts.hours}
                </div>
              </div>
              <Link href={`/${data.slug}/contacts`}
                className="rounded-2xl px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: data.color }}>
                Как нас найти
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
