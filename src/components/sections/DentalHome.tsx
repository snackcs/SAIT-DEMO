import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Award, Users, CheckCircle } from 'lucide-react'
import type { NicheData } from '@/data/types'
import HeroClean from './HeroClean'
import SymptomChecker from './SymptomChecker'
import FadeIn from '@/components/ui/FadeIn'
import { BLUR_DATA_URL } from '@/lib/utils'

const CERTS = ['Сертифицированы по Nobel Biocare', 'Invisalign Provider', 'CEREC-технология', 'Лицензия Минздрава']

export default function DentalHome({ data }: { data: NicheData }) {
  const preview = data.services.slice(0, 3)

  return (
    <>
      <HeroClean data={data} />

      {/* Symptom checker */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn>
            <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest" style={{ color: data.color }}>
              Навигатор
            </p>
            <h2 className="text-center font-serif text-3xl font-bold text-[#0F172A]">Не знаете к кому идти?</h2>
            <p className="mx-auto mt-3 max-w-sm text-center text-sm text-[#475569]">
              Отметьте симптомы — подберём нужного специалиста за 10 секунд
            </p>
          </FadeIn>
          <div className="mt-10">
            <SymptomChecker color={data.color} />
          </div>
        </div>
      </section>

      {/* Services — ultra clean */}
      <section className="bg-[#F0F9FF] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="flex items-end justify-between">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: data.color }}>Услуги</p>
                <h2 className="font-serif text-3xl font-bold text-[#0F172A]">Направления</h2>
              </div>
              <Link href={`/${data.slug}/services`} className="hidden items-center gap-1 text-sm font-semibold sm:flex" style={{ color: data.color }}>
                Все направления <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {preview.map((s, i) => (
              <FadeIn key={s.title} variant="card" delay={i * 0.07}>
                <div className="flex h-full flex-col rounded-2xl border-l-4 bg-white p-6 shadow-sm" style={{ borderColor: data.color }}>
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: `${data.color}15` }}>
                    <s.Icon size={18} style={{ color: data.color }} />
                  </div>
                  <h3 className="font-semibold text-[#0F172A]">{s.title}</h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-[#475569]">{s.description}</p>
                  {s.price && <p className="mt-3 text-sm font-semibold" style={{ color: data.color }}>{s.price}</p>}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Award size={20} style={{ color: data.color }} />
              {CERTS.map(c => (
                <span key={c} className="flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm text-[#0F172A]" style={{ borderColor: `${data.color}40` }}>
                  <CheckCircle size={14} style={{ color: data.color }} /> {c}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Doctors teaser */}
      <section className="bg-[#F0F9FF] py-16">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold text-[#0F172A]">Наши врачи</h2>
              <Link href={`/${data.slug}/doctors`} className="text-sm font-semibold" style={{ color: data.color }}>
                Все врачи →
              </Link>
            </div>
          </FadeIn>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { name: 'Игорь Александров', spec: 'Имплантолог', photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&q=80' },
              { name: 'Татьяна Белова', spec: 'Ортодонт', photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&q=80' },
              { name: 'Роман Сидоров', spec: 'Терапевт', photo: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&q=80' },
              { name: 'Ольга Фёдорова', spec: 'Детский', photo: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=300&q=80' },
            ].map((d, i) => (
              <FadeIn key={d.name} variant="card" delay={i * 0.07}>
                <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
                  <div className="relative aspect-square">
                    <Image src={d.photo} alt={d.name} fill className="object-cover object-top" sizes="25vw" placeholder="blur" blurDataURL={BLUR_DATA_URL} />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-semibold text-[#0F172A]">{d.name}</p>
                    <p className="text-xs" style={{ color: data.color }}>{d.spec}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn>
            <div className="grid grid-cols-3 divide-x divide-[#E2E8F0]">
              {data.about.facts.map((f) => (
                <div key={f.label} className="px-4 py-2 text-center">
                  <p className="font-serif text-3xl font-bold text-[#0F172A]">{f.value}</p>
                  <p className="mt-1 text-sm text-[#475569]">{f.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ backgroundColor: data.color }}>
        <div className="mx-auto max-w-xl px-6 text-center text-white">
          <FadeIn>
            <h2 className="font-serif text-2xl font-bold">Записаться на консультацию</h2>
            <p className="mt-2 text-sm text-white/80">Первичный осмотр и план лечения — бесплатно</p>
            <Link href={`/${data.slug}/contacts`} className="mt-6 inline-block rounded-xl bg-white px-8 py-3 text-sm font-semibold" style={{ color: data.color }}>
              Записаться
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
