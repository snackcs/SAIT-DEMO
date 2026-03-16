import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Sparkles } from 'lucide-react'
import type { NicheData } from '@/data/types'
import HeroCentered from './HeroCentered'
import dynamic from 'next/dynamic'
const BeautyQuiz = dynamic(() => import('./BeautyQuiz'))
import FadeIn from '@/components/ui/FadeIn'
import { BLUR_DATA_URL } from '@/lib/utils'

export default function BeautyHome({ data }: { data: NicheData }) {
  const preview = data.services.slice(0, 3)

  return (
    <>
      <HeroCentered data={data} />

      {/* Services — soft feminine */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #fff0f6 0%, #fff 60%, #fdf2fb 100%)' }}>
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="flex items-end justify-between">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: data.color }}>Услуги</p>
                <h2 className="font-serif text-3xl font-bold text-[#0F172A]">Что мы предлагаем</h2>
              </div>
              <Link href={`/${data.slug}/services`} className="hidden items-center gap-1 text-sm font-semibold sm:flex" style={{ color: data.color }}>
                Все услуги <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {preview.map((s, i) => (
              <FadeIn key={s.title} variant="card" delay={i * 0.07}>
                <div className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-pink-100">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: `linear-gradient(135deg, ${data.color}20, ${data.color}40)` }}>
                    <s.Icon size={22} style={{ color: data.color }} />
                  </div>
                  <h3 className="font-serif font-semibold text-[#0F172A]">{s.title}</h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-[#475569]">{s.description}</p>
                  {s.price && <p className="mt-3 text-sm font-semibold" style={{ color: data.color }}>{s.price}</p>}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Beauty quiz */}
      <section className="py-20" style={{ background: 'linear-gradient(180deg, #fdf2fb 0%, #fff0f6 100%)' }}>
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn>
            <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest" style={{ color: data.color }}>
              Подбор
            </p>
            <h2 className="text-center font-serif text-3xl font-bold text-[#0F172A]">Какая процедура вам нужна?</h2>
            <p className="mx-auto mt-3 max-w-sm text-center text-sm text-[#475569]">
              Пройдите мини-квиз за 30 секунд — подберём идеальный вариант
            </p>
          </FadeIn>
          <div className="mt-10">
            <BeautyQuiz color={data.color} />
          </div>
        </div>
      </section>

      {/* Masters teaser */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold text-[#0F172A]">Наши мастера</h2>
              <Link href={`/${data.slug}/masters`} className="text-sm font-semibold" style={{ color: data.color }}>
                Все мастера →
              </Link>
            </div>
          </FadeIn>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { name: 'Екатерина Смирнова', role: 'Маникюр', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80' },
              { name: 'Алина Петрова', role: 'Брови и ресницы', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80' },
              { name: 'Мария Козлова', role: 'Косметолог', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80' },
              { name: 'Дарья Новикова', role: 'Универсальный', photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&q=80' },
            ].map((m, i) => (
              <FadeIn key={m.name} variant="card" delay={i * 0.07}>
                <div className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-pink-100">
                  <div className="relative aspect-square overflow-hidden">
                    <Image src={m.photo} alt={m.name} fill className="object-cover object-top transition-transform duration-500 group-hover:scale-105" sizes="25vw" placeholder="blur" blurDataURL={BLUR_DATA_URL} />
                  </div>
                  <div className="p-3 text-center">
                    <p className="text-sm font-semibold text-[#0F172A]">{m.name}</p>
                    <p className="mt-0.5 text-xs" style={{ color: data.color }}>{m.role}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio teaser */}
      <section className="py-14" style={{ background: 'linear-gradient(135deg, #fdf2fb 0%, #fff0f6 100%)' }}>
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: data.color }}>Работы</p>
                <h2 className="mt-1 font-serif text-2xl font-bold text-[#0F172A]">Портфолио</h2>
              </div>
              <Link href={`/${data.slug}/portfolio`} className="flex items-center gap-1 text-sm font-semibold" style={{ color: data.color }}>
                <Sparkles size={14} /> Все работы
              </Link>
            </div>
          </FadeIn>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {[
              'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=300&q=80',
              'https://images.unsplash.com/photo-1586495777744-4e6232bf5b41?w=300&q=80',
              'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&q=80',
              'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=300&q=80',
              'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=300&q=80',
              'https://images.unsplash.com/photo-1631214524020-3c69a5857c95?w=300&q=80',
            ].map((src, i) => (
              <FadeIn key={src} variant="card" delay={i * 0.05}>
                <div className="relative aspect-square overflow-hidden rounded-2xl">
                  <Image src={src} alt="Portfolio" fill className="object-cover" sizes="16vw" placeholder="blur" blurDataURL={BLUR_DATA_URL} />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ backgroundColor: data.color }}>
        <div className="mx-auto max-w-xl px-6 text-center text-white">
          <FadeIn>
            <h2 className="font-serif text-2xl font-bold">Записаться онлайн</h2>
            <p className="mt-2 text-sm text-white/80">Свободные окошки на ближайшие дни — смотрите онлайн</p>
            <Link href={`/${data.slug}/contacts`} className="mt-6 inline-block rounded-2xl bg-white px-8 py-3 text-sm font-semibold" style={{ color: data.color }}>
              Выбрать время
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
