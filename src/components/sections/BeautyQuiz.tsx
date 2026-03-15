'use client'

import { useState } from 'react'
import { ArrowRight, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const QUESTIONS = [
  {
    id: 'concern',
    label: 'Что вас интересует?',
    options: ['Ногти', 'Брови и ресницы', 'Уход за лицом', 'Всё понемногу'],
  },
  {
    id: 'time',
    label: 'Сколько времени у вас?',
    options: ['До 1 часа', '1–2 часа', '2–3 часа', 'Весь день'],
  },
  {
    id: 'vibe',
    label: 'Что важнее для вас?',
    options: ['Практичный результат', 'Эстетика и уход', 'Расслабление', 'Всё сразу'],
  },
]

const RESULTS: Record<string, { title: string; desc: string; price: string; href: string }> = {
  Ногти: { title: 'Маникюр + гель-лак', desc: 'Аппаратный маникюр, покрытие Kodi. Ногти будут держаться 3–4 недели без сколов.', price: 'от 1 800 ₽', href: '/beauty/services' },
  'Брови и ресницы': { title: 'Брови + ламинирование ресниц', desc: 'Коррекция и окраска бровей + ламинирование ресниц. Результат — выразительный взгляд на 4–6 недель.', price: 'от 2 500 ₽', href: '/beauty/services' },
  'Уход за лицом': { title: 'Косметологический уход', desc: 'Чистка, пилинг или увлажняющий уход — подберём программу под ваш тип кожи.', price: 'от 2 200 ₽', href: '/beauty/services' },
  'Всё понемногу': { title: 'Комплекс «Весь день красоты»', desc: 'Маникюр + брови + базовый уход за лицом. Приходите на полдня — уйдёте другим человеком.', price: 'от 5 500 ₽', href: '/beauty/services' },
}

export default function BeautyQuiz({ color }: { color: string }) {
  const [answers, setAnswers] = useState<string[]>([])
  const [current, setCurrent] = useState(0)

  const result = answers[0] ? RESULTS[answers[0]] : null

  const handleAnswer = (opt: string) => {
    const next = [...answers]
    next[current] = opt
    setAnswers(next)
    if (current < QUESTIONS.length - 1) {
      setCurrent(current + 1)
    }
  }

  const reset = () => { setAnswers([]); setCurrent(0) }

  const isDone = answers.length === QUESTIONS.length

  return (
    <div className="rounded-3xl bg-white p-7 shadow-md ring-1 ring-black/5">
      <p className="mb-1 text-xs font-semibold uppercase tracking-widest" style={{ color }}>
        Подбор процедуры
      </p>
      <h3 className="font-serif text-xl font-bold text-[#0F172A]">Квиз за 30 секунд</h3>

      {!isDone ? (
        <>
          {/* Progress */}
          <div className="mt-4 flex gap-1.5">
            {QUESTIONS.map((_, i) => (
              <div key={i} className={cn('h-1 flex-1 rounded-full transition-all', i <= current ? '' : 'bg-[#E2E8F0]')}
                style={i <= current ? { backgroundColor: color } : {}} />
            ))}
          </div>

          <p className="mt-5 font-semibold text-[#0F172A]">{QUESTIONS[current].label}</p>

          <div className="mt-4 grid grid-cols-2 gap-2">
            {QUESTIONS[current].options.map(opt => (
              <button key={opt} onClick={() => handleAnswer(opt)}
                className={cn('rounded-2xl px-4 py-3 text-sm font-medium text-left transition-all ring-1',
                  answers[current] === opt ? 'text-white ring-0' : 'bg-[#F8FAFC] text-[#475569] ring-black/10 hover:bg-[#F1F5F9]'
                )} style={answers[current] === opt ? { backgroundColor: color } : {}}>
                {opt}
              </button>
            ))}
          </div>
        </>
      ) : result ? (
        <div className="mt-5">
          <div className="rounded-2xl p-5" style={{ backgroundColor: `${color}12` }}>
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color }}>Наша рекомендация</p>
            <h4 className="mt-1 font-serif text-lg font-bold text-[#0F172A]">{result.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-[#475569]">{result.desc}</p>
            <p className="mt-3 text-base font-bold" style={{ color }}>{result.price}</p>
          </div>
          <div className="mt-4 flex gap-3">
            <Link href="/beauty/contacts"
              className="flex-1 rounded-xl py-3 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: color }}>
              Записаться
            </Link>
            <button onClick={reset}
              className="flex items-center justify-center gap-1.5 rounded-xl px-4 py-3 text-sm text-[#475569] ring-1 ring-black/10 hover:bg-[#F1F5F9]">
              <RotateCcw size={14} /> Заново
            </button>
          </div>
        </div>
      ) : null}

      {!isDone && answers.length > 0 && (
        <button onClick={reset} className="mt-3 text-xs text-[#94A3B8] underline">Начать заново</button>
      )}
    </div>
  )
}
