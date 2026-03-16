import Link from 'next/link'
import { ArrowRight, Trophy, Target, BookOpen } from 'lucide-react'
import type { NicheData } from '@/data/types'
import HeroSplit from './HeroSplit'
import dynamic from 'next/dynamic'
const ScoreCalculator = dynamic(() => import('./ScoreCalculator'))
import FadeIn from '@/components/ui/FadeIn'

const ACHIEVEMENTS = [
  { icon: Trophy, text: '93% учеников поступили в выбранный ВУЗ' },
  { icon: Target, text: 'Средний балл выпускников — 82' },
  { icon: BookOpen, text: '5 лет преподавания, более 200 учеников' },
]

export default function TutorHome({ data }: { data: NicheData }) {
  const preview = data.services.slice(0, 3)

  return (
    <>
      <HeroSplit data={data} />

      {/* Score calculator */}
      <section className="bg-[#FFFBEB] py-20">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn>
            <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest" style={{ color: data.color }}>
              Прогноз
            </p>
            <h2 className="text-center font-serif text-3xl font-bold text-[#0F172A]">Сколько баллов получит ваш ребёнок?</h2>
            <p className="mx-auto mt-3 max-w-sm text-center text-sm text-[#475569]">
              Введите текущий уровень и время до экзамена — рассчитаем прогноз
            </p>
          </FadeIn>
          <div className="mt-10">
            <ScoreCalculator color={data.color} />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="flex items-end justify-between">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: data.color }}>Формат</p>
                <h2 className="font-serif text-3xl font-bold text-[#0F172A]">Как я работаю</h2>
              </div>
              <Link href={`/${data.slug}/services`} className="hidden items-center gap-1 text-sm font-semibold sm:flex" style={{ color: data.color }}>
                Подробнее <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {preview.map((s, i) => (
              <FadeIn key={s.title} variant="card" delay={i * 0.07}>
                <div className="flex h-full flex-col rounded-3xl bg-[#FFFBEB] p-6 ring-1 ring-amber-100">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: `${data.color}20` }}>
                    <s.Icon size={20} style={{ color: data.color }} />
                  </div>
                  <h3 className="font-serif font-semibold text-[#0F172A]">{s.title}</h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-[#475569]">{s.description}</p>
                  {s.price && <p className="mt-3 text-sm font-bold" style={{ color: data.color }}>{s.price}</p>}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="bg-[#FFFBEB] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn>
            <div className="grid gap-4 sm:grid-cols-3">
              {ACHIEVEMENTS.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-amber-100">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: `${data.color}20` }}>
                    <Icon size={18} style={{ color: data.color }} />
                  </div>
                  <p className="text-sm leading-relaxed text-[#0F172A]">{text}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Program teaser */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: data.color }}>Программа</p>
                <h2 className="mt-1 font-serif text-2xl font-bold text-[#0F172A]">17 недель подготовки</h2>
              </div>
              <Link href={`/${data.slug}/program`} className="text-sm font-semibold" style={{ color: data.color }}>
                Вся программа →
              </Link>
            </div>
          </FadeIn>
          <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
            {['Диагностика и база', 'Задания 1–12', 'Профильная часть', 'Задание 19', 'Пробные экзамены'].map((m, i) => (
              <div key={m} className="flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 ring-1 ring-black/10">
                <span className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white" style={{ backgroundColor: data.color }}>{i + 1}</span>
                <span className="text-sm text-[#0F172A]">{m}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ backgroundColor: data.color }}>
        <div className="mx-auto max-w-xl px-6 text-center text-white">
          <FadeIn>
            <h2 className="font-serif text-2xl font-bold">Первое занятие бесплатно</h2>
            <p className="mt-2 text-sm text-white/80">Диагностика уровня + индивидуальный план подготовки</p>
            <Link href={`/${data.slug}/contacts`} className="mt-6 inline-block rounded-xl bg-white px-8 py-3 text-sm font-semibold" style={{ color: data.color }}>
              Записаться на диагностику
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
