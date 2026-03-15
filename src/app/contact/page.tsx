import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FadeIn from '@/components/ui/FadeIn'
import { Send, MessageCircle, Clock, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Заказать сайт — обсудим ваш проект',
  description:
    'Напишите нам — обсудим задачу, предложим структуру и назовём стоимость. Бесплатная консультация.',
}

const faqs = [
  { q: 'Сколько стоит сайт?', a: 'Зависит от объёма. Базовый лендинг — от 25 000 ₽. Обсудим детали и назовём точную цену.' },
  { q: 'Сколько времени займёт?', a: 'Лендинг — 7–14 дней. Многостраничный сайт — 3–4 недели.' },
  { q: 'Что нужно от меня?', a: 'Ваш логотип, фото (если есть), список услуг и цен. Остальное сделаем сами.' },
  { q: 'Будет ли сайт работать на телефоне?', a: 'Да, все сайты полностью адаптивны — выглядят хорошо на любом устройстве.' },
]

export default function ContactPage() {
  return (
    <>
      <Header />

      <main className="pt-24">
        {/* Hero */}
        <section className="bg-[#0F172A] py-24">
          <div className="mx-auto max-w-3xl px-6 text-center text-white">
            <FadeIn>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/50">
                Контакт
              </p>
              <h1 className="font-serif text-4xl font-bold md:text-5xl">
                Обсудим ваш проект
              </h1>
              <p className="mt-4 text-base leading-relaxed text-white/70">
                Опишите задачу — отвечаю в течение нескольких часов в рабочее время.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Form + info */}
        <section className="bg-[#F8FAFC] py-24">
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Form */}
              <FadeIn>
                <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5">
                  <h2 className="font-serif text-2xl font-bold text-[#0F172A]">Написать</h2>
                  <p className="mt-2 text-sm text-[#475569]">Расскажите о своём бизнесе и задаче.</p>

                  <form className="mt-8 space-y-4">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-[#475569]">
                        Имя *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ваше имя"
                        className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] outline-none transition-colors focus:border-[#0F172A] focus:ring-1 focus:ring-[#0F172A]"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-[#475569]">
                        Телефон или Telegram *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="+7 999 123-45-67 или @username"
                        className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] outline-none transition-colors focus:border-[#0F172A] focus:ring-1 focus:ring-[#0F172A]"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-[#475569]">
                        Ниша и задача
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Например: барбершоп в Казани, нужен сайт с записью онлайн"
                        className="w-full resize-none rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] outline-none transition-colors focus:border-[#0F172A] focus:ring-1 focus:ring-[#0F172A]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F172A] py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#1e293b]"
                    >
                      <Send size={16} />
                      Отправить заявку
                    </button>
                  </form>
                </div>
              </FadeIn>

              {/* Info */}
              <FadeIn delay={0.12}>
                <div className="space-y-6">
                  {/* Quick contacts */}
                  <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                    <h3 className="mb-4 font-semibold text-[#0F172A]">Написать напрямую</h3>
                    <div className="space-y-3">
                      <a
                        href="https://t.me/elmanoaffpart"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 rounded-xl bg-[#F8FAFC] px-4 py-3 text-sm font-medium text-[#0F172A] transition-colors hover:bg-[#F1F5F9]"
                      >
                        <MessageCircle size={18} className="text-blue-500" />
                        Telegram: @elmanoaffpart
                      </a>
                    </div>
                  </div>

                  {/* Working hours */}
                  <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                    <div className="flex items-center gap-3">
                      <Clock size={18} className="text-[#475569]" />
                      <div>
                        <p className="text-sm font-semibold text-[#0F172A]">Пн–Пт 10:00–20:00</p>
                        <p className="text-xs text-[#475569]">Отвечаю в течение нескольких часов</p>
                      </div>
                    </div>
                  </div>

                  {/* Process */}
                  <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                    <h3 className="mb-4 font-semibold text-[#0F172A]">Что будет дальше</h3>
                    <div className="space-y-3">
                      {['Отвечу и уточню детали', 'Предложу структуру и стоимость', 'Начнём работу'].map((s, i) => (
                        <div key={s} className="flex items-center gap-3">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-500">
                            {i + 1}
                          </div>
                          <p className="text-sm text-[#475569]">{s}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-3xl px-6">
            <FadeIn>
              <h2 className="text-center font-serif text-2xl font-bold text-[#0F172A]">
                Частые вопросы
              </h2>
            </FadeIn>
            <div className="mt-10 space-y-4">
              {faqs.map((f, i) => (
                <FadeIn key={f.q} variant="card" delay={i * 0.06}>
                  <div className="rounded-2xl bg-[#F8FAFC] p-5">
                    <div className="flex items-start gap-3">
                      <CheckCircle size={16} className="mt-0.5 shrink-0 text-blue-500" />
                      <div>
                        <p className="text-sm font-semibold text-[#0F172A]">{f.q}</p>
                        <p className="mt-1 text-sm leading-relaxed text-[#475569]">{f.a}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
