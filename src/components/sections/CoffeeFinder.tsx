'use client'

import { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const NOTES = [
  { id: 'fruity', label: 'Фруктовое', icon: '🍓' },
  { id: 'chocolate', label: 'Шоколадное', icon: '🍫' },
  { id: 'nutty', label: 'Ореховое', icon: '🌰' },
  { id: 'floral', label: 'Цветочное', icon: '🌸' },
  { id: 'citrus', label: 'Цитрусовое', icon: '🍋' },
  { id: 'caramel', label: 'Карамельное', icon: '🍮' },
]

const METHODS = [
  { id: 'espresso', label: 'Эспрессо', icon: '☕' },
  { id: 'filter', label: 'Фильтр', icon: '🫗' },
  { id: 'cold', label: 'Холодный', icon: '🧊' },
]

const RECOMMENDATIONS: Record<string, Record<string, { name: string; origin: string; notes: string; price: string }>> = {
  fruity: {
    espresso: { name: 'Флэт уайт', origin: 'Ethiopia Yirgacheffe', notes: 'Жасмин, персик, черника', price: '230 ₽' },
    filter: { name: 'Пуровер V60', origin: 'Kenya AA', notes: 'Цитрусовые, смородина', price: '280 ₽' },
    cold: { name: 'Холодный брю', origin: 'Ethiopia Sidama', notes: 'Жасмин, персик', price: '290 ₽' },
  },
  chocolate: {
    espresso: { name: 'Капучино', origin: 'Colombia Huila', notes: 'Тёмный шоколад, орех', price: '210 ₽' },
    filter: { name: 'Аэропресс', origin: 'Colombia Huila', notes: 'Шоколад, лесной орех', price: '260 ₽' },
    cold: { name: 'Холодный брю', origin: 'Colombia Huila', notes: 'Горький шоколад', price: '290 ₽' },
  },
  floral: {
    espresso: { name: 'Раф классический', origin: 'Ethiopia Yirgacheffe', notes: 'Ваниль, жасмин', price: '270 ₽' },
    filter: { name: 'Кемекс', origin: 'Ethiopia Sidama', notes: 'Жасмин, персик', price: '320 ₽' },
    cold: { name: 'Холодный брю', origin: 'Ethiopia', notes: 'Цветочные ноты', price: '290 ₽' },
  },
  caramel: {
    espresso: { name: 'Латте', origin: 'Guatemala Antigua', notes: 'Молочный шоколад, абрикос', price: '240 ₽' },
    filter: { name: 'Аэропресс', origin: 'Guatemala', notes: 'Коричневый сахар', price: '260 ₽' },
    cold: { name: 'Холодный брю', origin: 'Colombia', notes: 'Карамель, шоколад', price: '290 ₽' },
  },
}

const FALLBACK = { name: 'Капучино', origin: 'Colombia Huila', notes: 'Шоколад, орех, карамель', price: '210 ₽' }

export default function CoffeeFinder({ color }: { color: string }) {
  const [selectedNotes, setSelectedNotes] = useState<string[]>([])
  const [method, setMethod] = useState<string>('')
  const [shown, setShown] = useState(false)

  const toggleNote = (id: string) => {
    setShown(false)
    setSelectedNotes(prev => prev.includes(id) ? prev.filter(n => n !== id) : prev.length < 2 ? [...prev, id] : [prev[1], id])
  }

  const getResult = () => {
    const note = selectedNotes[0]
    const m = method || 'espresso'
    return RECOMMENDATIONS[note]?.[m] ?? FALLBACK
  }

  const result = shown ? getResult() : null

  return (
    <div className="rounded-3xl p-7 ring-1 ring-amber-900/20" style={{ backgroundColor: '#FEF3C7' }}>
      <p className="mb-1 text-xs font-semibold uppercase tracking-widest" style={{ color }}>
        Подбор кофе
      </p>
      <h3 className="font-serif text-xl font-bold text-[#1C0A00]">Найди свой кофе</h3>
      <p className="mt-1 text-sm text-[#78350F]">Выберите любимые вкусовые ноты</p>

      <div className="mt-5 grid grid-cols-3 gap-2">
        {NOTES.map(n => (
          <button key={n.id} onClick={() => toggleNote(n.id)}
            className={cn('flex flex-col items-center gap-1.5 rounded-2xl px-2 py-3 text-center text-xs font-medium transition-all ring-1',
              selectedNotes.includes(n.id) ? 'text-white ring-0' : 'bg-white/60 text-[#78350F] ring-amber-200 hover:bg-white/90'
            )} style={selectedNotes.includes(n.id) ? { backgroundColor: color } : {}}>
            <span className="text-2xl">{n.icon}</span>
            {n.label}
          </button>
        ))}
      </div>

      {selectedNotes.length > 0 && (
        <>
          <p className="mt-5 text-sm font-medium text-[#78350F]">Как предпочитаете пить?</p>
          <div className="mt-2 flex gap-2">
            {METHODS.map(m => (
              <button key={m.id} onClick={() => { setMethod(m.id); setShown(false) }}
                className={cn('flex flex-1 flex-col items-center gap-1 rounded-xl py-2.5 text-xs font-medium transition-all',
                  method === m.id ? 'text-white' : 'bg-white/60 text-[#78350F] hover:bg-white/90'
                )} style={method === m.id ? { backgroundColor: color } : {}}>
                <span className="text-lg">{m.icon}</span>
                {m.label}
              </button>
            ))}
          </div>
          <button onClick={() => setShown(true)}
            className="mt-4 w-full rounded-2xl py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: color }}>
            Подобрать кофе
          </button>
        </>
      )}

      {result && (
        <div className="mt-4 rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color }}>Ваш кофе</p>
          <h4 className="mt-1 font-serif text-lg font-bold text-[#1C0A00]">{result.name}</h4>
          <p className="mt-0.5 text-xs text-[#78350F]">{result.origin}</p>
          <p className="mt-2 text-sm text-[#64748B]">{result.notes}</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-base font-bold" style={{ color }}>{result.price}</span>
            <Link href="/coffee/menu"
              className="rounded-xl px-4 py-2 text-xs font-semibold text-white"
              style={{ backgroundColor: color }}>
              Смотреть меню
            </Link>
          </div>
        </div>
      )}

      {selectedNotes.length === 0 && (
        <p className="mt-4 text-center text-xs text-[#92400E]/60">Выберите до 2 вкусовых нот</p>
      )}
    </div>
  )
}
