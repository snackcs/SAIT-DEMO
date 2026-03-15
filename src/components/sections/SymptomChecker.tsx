'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const SYMPTOMS = [
  { id: 'pain', label: 'Боль в зубе', doctor: 'Терапевт', icon: '🦷' },
  { id: 'sensitivity', label: 'Чувствительность зубов', doctor: 'Терапевт', icon: '❄️' },
  { id: 'gums', label: 'Кровоточат дёсны', doctor: 'Пародонтолог', icon: '🩸' },
  { id: 'missing', label: 'Отсутствует зуб', doctor: 'Имплантолог', icon: '🔩' },
  { id: 'crooked', label: 'Кривые зубы', doctor: 'Ортодонт', icon: '📐' },
  { id: 'whitening', label: 'Хочу отбелить', doctor: 'Терапевт', icon: '✨' },
  { id: 'child', label: 'Ребёнок', doctor: 'Детский стоматолог', icon: '👶' },
  { id: 'aesthetic', label: 'Виниры / эстетика', doctor: 'Эстетист', icon: '💎' },
]

const DOCTOR_INFO: Record<string, { desc: string; wait: string }> = {
  'Терапевт': { desc: 'Лечит кариес, пульпит, реставрирует зубы. Стартовая точка для большинства задач.', wait: 'Запись от 1 дня' },
  'Пародонтолог': { desc: 'Лечит заболевания дёсен и тканей, окружающих зуб. Чистки, кюретаж.', wait: 'Запись от 2 дней' },
  'Имплантолог': { desc: 'Восстанавливает утраченные зубы с помощью имплантов Nobel Biocare.', wait: 'Консультация бесплатно' },
  'Ортодонт': { desc: 'Выравнивает зубы брекетами или элайнерами Invisalign. Любой возраст.', wait: 'Запись от 3 дней' },
  'Детский стоматолог': { desc: 'Лечение молочных и постоянных зубов у детей. Без боли и страха.', wait: 'Приём с 1 года' },
  'Эстетист': { desc: 'Виниры E.max, реставрации, изменение формы и цвета зубов.', wait: 'Запись от 2 дней' },
}

export default function SymptomChecker({ color }: { color: string }) {
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id])
  }

  const selectedSymptoms = SYMPTOMS.filter(s => selected.includes(s.id))
  const doctorCounts: Record<string, number> = {}
  selectedSymptoms.forEach(s => { doctorCounts[s.doctor] = (doctorCounts[s.doctor] || 0) + 1 })
  const topDoctor = Object.entries(doctorCounts).sort((a, b) => b[1] - a[1])[0]?.[0]
  const doctorInfo = topDoctor ? DOCTOR_INFO[topDoctor] : null

  return (
    <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-black/5">
      <p className="mb-1 text-xs font-semibold uppercase tracking-widest" style={{ color }}>
        Онлайн-навигатор
      </p>
      <h3 className="font-serif text-xl font-bold text-[#0F172A]">К какому врачу идти?</h3>
      <p className="mt-1.5 text-sm text-[#475569]">Отметьте симптомы — подберём специалиста</p>

      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {SYMPTOMS.map(s => (
          <button key={s.id} onClick={() => toggle(s.id)}
            className={cn('flex flex-col items-center gap-1.5 rounded-2xl px-3 py-3 text-center text-xs font-medium transition-all ring-1',
              selected.includes(s.id) ? 'text-white ring-0' : 'bg-[#F8FAFC] text-[#475569] ring-black/10 hover:bg-[#EFF6FF]'
            )} style={selected.includes(s.id) ? { backgroundColor: color } : {}}>
            <span className="text-xl">{s.icon}</span>
            {s.label}
          </button>
        ))}
      </div>

      {doctorInfo && topDoctor && (
        <div className="mt-5 rounded-2xl p-5" style={{ backgroundColor: `${color}10` }}>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color }}>Рекомендуем</p>
          <p className="mt-1 text-lg font-bold text-[#0F172A]">{topDoctor}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-[#475569]">{doctorInfo.desc}</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-[#94A3B8]">{doctorInfo.wait}</span>
            <Link href="/dental/doctors"
              className="rounded-xl px-4 py-2 text-xs font-semibold text-white"
              style={{ backgroundColor: color }}>
              Записаться
            </Link>
          </div>
        </div>
      )}

      {selected.length === 0 && (
        <p className="mt-4 text-center text-xs text-[#94A3B8]">Выберите хотя бы один симптом</p>
      )}
    </div>
  )
}
