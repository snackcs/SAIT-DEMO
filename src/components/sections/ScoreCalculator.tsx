'use client'

import { useState } from 'react'
import { TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const LEVELS = [
  { min: 0, max: 35, label: 'Начальный уровень', module: 'Модуль 1 — Диагностика и база', color: '#EF4444' },
  { min: 36, max: 55, label: 'Базовый уровень', module: 'Модуль 2 — Задания 1–12', color: '#F59E0B' },
  { min: 56, max: 70, label: 'Средний уровень', module: 'Модуль 3 — Профильная часть', color: '#3B82F6' },
  { min: 71, max: 85, label: 'Хороший уровень', module: 'Модуль 4 — Задание 19', color: '#8B5CF6' },
  { min: 86, max: 100, label: 'Продвинутый', module: 'Модуль 5 — Пробные экзамены', color: '#10B981' },
]

function getLevel(score: number) {
  return LEVELS.find(l => score >= l.min && score <= l.max) ?? LEVELS[0]
}

function calcPredicted(current: number, weeks: number): number {
  const gain = Math.min(weeks * 2.8, 100 - current)
  return Math.round(current + gain)
}

export default function ScoreCalculator({ color }: { color: string }) {
  const [current, setCurrent] = useState(45)
  const [weeks, setWeeks] = useState(10)

  const predicted = calcPredicted(current, weeks)
  const gain = predicted - current
  const currentLevel = getLevel(current)
  const predictedLevel = getLevel(predicted)

  return (
    <div className="rounded-3xl bg-[#FFFBEB] p-7 ring-1 ring-amber-200">
      <p className="mb-1 text-xs font-semibold uppercase tracking-widest" style={{ color }}>
        Прогноз ЕГЭ
      </p>
      <h3 className="font-serif text-xl font-bold text-[#0F172A]">Калькулятор баллов</h3>
      <p className="mt-1 text-sm text-[#64748B]">Введите текущий результат и количество недель</p>

      <div className="mt-6 space-y-5">
        {/* Current score slider */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium text-[#0F172A]">Текущий балл</label>
            <span className="rounded-lg px-3 py-1 text-sm font-bold text-white" style={{ backgroundColor: currentLevel.color }}>
              {current}
            </span>
          </div>
          <input type="range" min={0} max={100} value={current} onChange={e => setCurrent(+e.target.value)}
            className="w-full accent-purple-600 cursor-pointer" style={{ accentColor: color }} />
          <div className="mt-1 flex justify-between text-xs text-[#94A3B8]"><span>0</span><span>100</span></div>
        </div>

        {/* Weeks slider */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium text-[#0F172A]">Недель занятий</label>
            <span className="rounded-lg px-3 py-1 text-sm font-bold" style={{ color, backgroundColor: `${color}18` }}>
              {weeks} нед.
            </span>
          </div>
          <input type="range" min={4} max={20} value={weeks} onChange={e => setWeeks(+e.target.value)}
            className="w-full cursor-pointer" style={{ accentColor: color }} />
          <div className="mt-1 flex justify-between text-xs text-[#94A3B8]"><span>4 нед.</span><span>20 нед.</span></div>
        </div>
      </div>

      {/* Result */}
      <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-[#94A3B8]">Прогноз после курса</p>
            <p className="text-4xl font-bold text-[#0F172A]">{predicted}</p>
            <p className="text-xs" style={{ color: predictedLevel.color }}>{predictedLevel.label}</p>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ backgroundColor: `${color}18` }}>
            <TrendingUp size={24} style={{ color }} />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#E2E8F0]">
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${predicted}%`, backgroundColor: predictedLevel.color }} />
          </div>
          <span className="text-sm font-bold" style={{ color }}>+{gain} баллов</span>
        </div>
        <p className="mt-3 text-xs text-[#64748B]">
          Начнём с «{currentLevel.module}»
        </p>
      </div>

      <Link href="/tutor/contacts"
        className="mt-4 flex w-full items-center justify-center rounded-2xl py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: color }}>
        Записаться на диагностику бесплатно
      </Link>
    </div>
  )
}
