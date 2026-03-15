import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { nichePreviews } from '@/data/niches'
import FadeIn from '@/components/ui/FadeIn'
import { ArrowRight, CheckCircle, Zap, Star, Users } from 'lucide-react'

const steps = [
  { n: '01', title: 'Выбираете демо', text: 'Смотрите примеры по вашей нише — барбершоп, автосервис, стоматология и другие.' },
  { n: '02', title: 'Оставляете заявку', text: 'Пишете в форму или в Telegram. Обсуждаем детали бесплатно.' },
  { n: '03', title: 'Получаете сайт', text: 'За 7–14 дней готов ваш собственный сайт с нужным контентом и вашим брендом.' },
]

const reasons = [
  { Icon: Zap, title: 'Быстро', text: 'Сайт за 7–14 дней — не за месяц.' },
  { Icon: Star, title: 'Качественно', text: 'Современный стек: Next.js, анимации, мобильная версия.' },
  { Icon: CheckCircle, title: 'Прозрачно', text: 'Фиксированная цена, никаких скрытых доплат.' },
  { Icon: Users, title: 'Под вашу нишу', text: 'Адаптируем контент, цвета и структуру под ваш бизнес.' },
]

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        {/* Hero */}
        <section className="flex min-h-screen items-center justify-center bg-[#0F172A] pt-24">
          <div className="mx-auto max-w-4xl px-6 text-center text-white">
            <FadeIn>
              <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/70">
                Демо-сайты для бизнеса
              </span>
              <h1 className="mt-6 font-serif text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
                Посмотрите как будет
                <br />
                <span className="text-blue-400">выглядеть ваш сайт</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
                Шесть готовых демо для разных ниш. Выберите похожую на ваш бизнес — адаптируем
                под вас за 7–14 дней.
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <a
                  href="#demos"
                  className="rounded-xl bg-blue-500 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-blue-600"
                >
                  Смотреть демо
                </a>
                <Link
                  href="/contact"
                  className="rounded-xl border border-white/20 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Обсудить проект
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Demo grid */}
        <section id="demos" className="bg-[#F8FAFC] py-24">
          <div className="mx-auto max-w-6xl px-6">
            <FadeIn>
              <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-[#475569]">
                Примеры
              </p>
              <h2 className="text-center font-serif text-3xl font-bold text-[#0F172A] md:text-4xl">
                Выберите свою нишу
              </h2>
            </FadeIn>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {nichePreviews.map((niche, i) => (
                <FadeIn key={niche.slug} variant="card" delay={i * 0.07}>
                  <Link
                    href={`/${niche.slug}`}
                    className="group flex flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div
                      className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl"
                      style={{ backgroundColor: `${niche.color}18` }}
                    >
                      <niche.Icon size={26} style={{ color: niche.color }} />
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#475569]">
                      {niche.tag}
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-[#0F172A]">{niche.label}</h3>
                    <div
                      className="mt-auto flex items-center pt-4 text-sm font-semibold"
                      style={{ color: niche.color }}
                    >
                      Смотреть демо
                      <ArrowRight
                        size={16}
                        className="ml-1 transition-transform group-hover:translate-x-1"
                      />
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-white py-24">
          <div className="mx-auto max-w-4xl px-6">
            <FadeIn>
              <h2 className="text-center font-serif text-3xl font-bold text-[#0F172A] md:text-4xl">
                Как это работает
              </h2>
            </FadeIn>
            <div className="mt-14 space-y-6">
              {steps.map((s, i) => (
                <FadeIn key={s.n} variant="card" delay={i * 0.1}>
                  <div className="flex gap-6 rounded-3xl bg-[#F8FAFC] p-6">
                    <p className="font-serif text-3xl font-bold text-[#E2E8F0]">{s.n}</p>
                    <div>
                      <p className="font-semibold text-[#0F172A]">{s.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-[#475569]">{s.text}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Why me */}
        <section className="bg-[#F8FAFC] py-24">
          <div className="mx-auto max-w-6xl px-6">
            <FadeIn>
              <h2 className="text-center font-serif text-3xl font-bold text-[#0F172A] md:text-4xl">
                Почему я
              </h2>
            </FadeIn>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {reasons.map((r, i) => (
                <FadeIn key={r.title} variant="card" delay={i * 0.08}>
                  <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                      <r.Icon size={20} className="text-blue-500" />
                    </div>
                    <p className="font-semibold text-[#0F172A]">{r.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-[#475569]">{r.text}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-[#0F172A] py-24">
          <div className="mx-auto max-w-3xl px-6 text-center text-white">
            <FadeIn>
              <h2 className="font-serif text-3xl font-bold md:text-4xl">
                Готовы обсудить ваш сайт?
              </h2>
              <p className="mt-4 text-base text-white/70">
                Напишите — разберём задачу, предложим структуру и назовём стоимость.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-block rounded-xl bg-blue-500 px-10 py-4 text-base font-semibold text-white transition-colors hover:bg-blue-600"
              >
                Написать
              </Link>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
