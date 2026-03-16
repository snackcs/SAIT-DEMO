'use client'

import { useState } from 'react'
import Image from '@/components/ui/DemoImage'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BLUR_DATA_URL } from '@/lib/utils'

const MASTERS = [
  { id: 'artem', name: 'Артём Волков', role: 'Старший барбер', exp: '7 лет', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80' },
  { id: 'denis', name: 'Денис Крылов', role: 'Барбер', exp: '5 лет', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80' },
  { id: 'maxim', name: 'Максим Зайцев', role: 'Барбер', exp: '3 года', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80' },
]

const SERVICES = ['Классическая стрижка — 800 ₽', 'Стрижка + борода — 1 200 ₽', 'Оформление бороды — 500 ₽', 'Бритьё опасной бритвой — 700 ₽']

const TIMES = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00']
const BOOKED = ['11:00', '14:00', '17:00']

export default function BookingWidget({ color }: { color: string }) {
  const [step, setStep] = useState(1)
  const [master, setMaster] = useState('')
  const [service, setService] = useState('')
  const [time, setTime] = useState('')
  const [done, setDone] = useState(false)

  if (done) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl bg-white/10 px-8 py-12 text-center text-white backdrop-blur-sm ring-1 ring-white/20">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white">
          <Check size={28} style={{ color }} />
        </div>
        <h3 className="font-serif text-2xl font-bold">Запись подтверждена!</h3>
        <p className="text-sm text-white/70">
          {MASTERS.find(m => m.id === master)?.name} · {service.split('—')[0].trim()} · {time}
        </p>
        <p className="text-xs text-white/50">Ждём вас! Мастер свяжется за 30 минут до записи.</p>
        <button onClick={() => { setDone(false); setStep(1); setMaster(''); setService(''); setTime('') }} className="mt-2 text-xs text-white/60 underline">
          Изменить запись
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-sm ring-1 ring-white/20">
      {/* Progress */}
      <div className="mb-6 flex items-center gap-2">
        {[1,2,3].map(s => (
          <div key={s} className="flex items-center gap-2">
            <div className={cn('flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all',
              step >= s ? 'text-[#0F0A00]' : 'bg-white/20 text-white/50'
            )} style={step >= s ? { backgroundColor: color } : {}}>
              {step > s ? <Check size={14} /> : s}
            </div>
            {s < 3 && <div className={cn('h-px w-8 transition-all', step > s ? 'bg-white/50' : 'bg-white/20')} />}
          </div>
        ))}
        <span className="ml-2 text-xs text-white/60">
          {step === 1 ? 'Выберите мастера' : step === 2 ? 'Выберите услугу' : 'Выберите время'}
        </span>
      </div>

      {/* Step 1: Master */}
      {step === 1 && (
        <div className="grid grid-cols-3 gap-3">
          {MASTERS.map(m => (
            <button key={m.id} onClick={() => { setMaster(m.id); setStep(2) }}
              className={cn('flex flex-col items-center gap-2 rounded-2xl p-3 text-center transition-all ring-1',
                master === m.id ? 'ring-2 ring-white' : 'bg-white/5 ring-white/10 hover:bg-white/10'
              )}>
              <div className="relative h-14 w-14 overflow-hidden rounded-full">
                <Image src={m.photo} alt={m.name} fill className="object-cover" placeholder="blur" blurDataURL={BLUR_DATA_URL} sizes="56px" />
              </div>
              <p className="text-xs font-semibold text-white leading-tight">{m.name}</p>
              <p className="text-[10px] text-white/50">{m.exp}</p>
            </button>
          ))}
        </div>
      )}

      {/* Step 2: Service */}
      {step === 2 && (
        <div className="space-y-2">
          {SERVICES.map(s => (
            <button key={s} onClick={() => { setService(s); setStep(3) }}
              className="w-full rounded-2xl bg-white/5 px-4 py-3 text-left text-sm text-white transition-all hover:bg-white/15 ring-1 ring-white/10">
              {s}
            </button>
          ))}
          <button onClick={() => setStep(1)} className="mt-1 text-xs text-white/40 underline">← Назад</button>
        </div>
      )}

      {/* Step 3: Time */}
      {step === 3 && (
        <div>
          <div className="grid grid-cols-5 gap-2">
            {TIMES.map(t => {
              const isBooked = BOOKED.includes(t)
              return (
                <button key={t} disabled={isBooked} onClick={() => { setTime(t); setDone(true) }}
                  className={cn('rounded-xl py-2 text-sm font-medium transition-all',
                    isBooked ? 'cursor-not-allowed bg-white/5 text-white/25 line-through' :
                    time === t ? 'text-[#0F0A00]' : 'bg-white/10 text-white hover:bg-white/20'
                  )} style={!isBooked && time === t ? { backgroundColor: color } : {}}>
                  {t}
                </button>
              )
            })}
          </div>
          <button onClick={() => setStep(2)} className="mt-3 text-xs text-white/40 underline">← Назад</button>
        </div>
      )}
    </div>
  )
}
