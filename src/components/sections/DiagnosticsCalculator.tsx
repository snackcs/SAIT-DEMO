'use client'

import { useState } from 'react'
import { Clock, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const ITEMS = [
  { id: 'computer', name: 'Компьютерная диагностика', duration: '30–40 мин', price: 800 },
  { id: 'electric', name: 'Диагностика электрики', duration: '45–60 мин', price: 1200 },
  { id: 'engine', name: 'Диагностика двигателя', duration: '60–90 мин', price: 2000 },
  { id: 'suspension', name: 'Диагностика подвески', duration: '30–45 мин', price: 1000 },
  { id: 'brakes', name: 'Диагностика тормозов', duration: '20–30 мин', price: 600 },
  { id: 'ac', name: 'Диагностика кондиционера', duration: '20–30 мин', price: 800 },
]

export default function DiagnosticsCalculator({ color }: { color: string }) {
  const [checked, setChecked] = useState<string[]>([])

  const toggle = (id: string) => {
    setChecked(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id])
  }

  const total = ITEMS.filter(i => checked.includes(i.id)).reduce((s, i) => s + i.price, 0)
  const totalDuration = checked.length > 0
    ? `~${ITEMS.filter(i => checked.includes(i.id)).reduce((s, i) => s + parseInt(i.duration), 0) + checked.length * 10} мин`
    : null

  return (
    <div className="rounded-2xl bg-[#161B22] p-6 ring-1 ring-white/10">
      <p className="mb-1 text-xs font-semibold uppercase tracking-widest" style={{ color }}>
        Калькулятор
      </p>
      <h3 className="font-serif text-xl font-bold text-white">Составьте чек-лист</h3>
      <p className="mt-1 text-sm text-white/50">Выберите нужные виды диагностики</p>

      <div className="mt-5 space-y-2">
        {ITEMS.map(item => (
          <button key={item.id} onClick={() => toggle(item.id)}
            className={cn('flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all ring-1',
              checked.includes(item.id) ? 'ring-0' : 'bg-white/5 ring-white/10 hover:bg-white/10'
            )} style={checked.includes(item.id) ? { backgroundColor: `${color}25`, borderColor: color } : {}}>
            <div className={cn('flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all',
              checked.includes(item.id) ? 'border-0' : 'border-white/30'
            )} style={checked.includes(item.id) ? { backgroundColor: color } : {}}>
              {checked.includes(item.id) && <svg viewBox="0 0 12 10" fill="none" className="h-3 w-3"><path d="M1 5l3.5 3.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            </div>
            <span className="flex-1 text-sm font-medium text-white">{item.name}</span>
            <span className="flex items-center gap-1 text-xs text-white/40">
              <Clock size={11} /> {item.duration}
            </span>
            <span className="text-sm font-semibold" style={{ color }}>от {item.price} ₽</span>
          </button>
        ))}
      </div>

      {/* Total */}
      <div className="mt-5 flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
        <div>
          <p className="text-xs text-white/40">Итого</p>
          <p className="text-xl font-bold text-white">
            {total > 0 ? `от ${total.toLocaleString('ru')} ₽` : '0 ₽'}
          </p>
          {totalDuration && <p className="text-xs text-white/40">{totalDuration}</p>}
        </div>
        <Link href="/auto/contacts"
          className={cn('flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-sm font-semibold transition-opacity',
            checked.length === 0 ? 'cursor-not-allowed opacity-40' : 'hover:opacity-90'
          )} style={{ backgroundColor: color, color: 'white' }}>
          Записаться <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  )
}
