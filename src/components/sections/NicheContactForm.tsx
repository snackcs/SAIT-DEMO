'use client'

import { useState } from 'react'
import { Check, Loader2, AlertCircle } from 'lucide-react'

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID

export default function NicheContactForm({ color }: { color: string }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [serverError, setServerError] = useState<string | null>(null)
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({})

  const validate = () => {
    const e: { name?: string; phone?: string } = {}
    if (!name.trim()) e.name = 'Введите имя'
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) e.phone = 'Введите корректный номер'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('loading')
    setServerError(null)

    try {
      if (FORMSPREE_ID) {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ name, phone, message }),
        })
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error((data as { error?: string }).error ?? 'Ошибка сервера')
        }
      } else {
        // Демо-режим: имитация сети
        await new Promise((r) => setTimeout(r, 1000))
      }
      setStatus('done')
    } catch (err) {
      setStatus('error')
      setServerError(
        err instanceof Error ? err.message : 'Не удалось отправить заявку. Попробуйте позже.',
      )
    }
  }

  if (status === 'done') {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl bg-[#F8FAFC] px-8 py-12 text-center">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full"
          style={{ backgroundColor: `${color}20` }}
        >
          <Check size={28} style={{ color }} />
        </div>
        <h3 className="font-serif text-xl font-bold text-[#0F172A]">Заявка отправлена!</h3>
        <p className="text-sm text-[#475569]">Перезвоним в течение 15 минут в рабочее время.</p>
        <button
          onClick={() => { setStatus('idle'); setName(''); setPhone(''); setMessage('') }}
          className="mt-2 text-xs text-[#94A3B8] underline"
        >
          Отправить ещё одну заявку
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-3xl bg-[#F8FAFC] p-8">
      <h3 className="font-serif text-xl font-bold text-[#0F172A]">Записаться онлайн</h3>
      <p className="mt-2 text-sm text-[#475569]">
        Оставьте номер — перезвоним в течение 15 минут в рабочее время.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-3" aria-label="Форма записи">
        {/* Name */}
        <div>
          <label htmlFor="form-name" className="sr-only">Ваше имя</label>
          <input
            id="form-name"
            type="text"
            placeholder="Ваше имя"
            value={name}
            autoComplete="name"
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'error-name' : undefined}
            onChange={(e) => { setName(e.target.value); setErrors(v => ({ ...v, name: undefined })) }}
            className="w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#0F172A] outline-none transition-colors focus:ring-2"
            style={{ borderColor: errors.name ? '#EF4444' : '#E2E8F0' }}
          />
          {errors.name && (
            <p id="error-name" role="alert" className="mt-1 text-xs text-red-500">{errors.name}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="form-phone" className="sr-only">Номер телефона</label>
          <input
            id="form-phone"
            type="tel"
            placeholder="Номер телефона"
            value={phone}
            autoComplete="tel"
            aria-required="true"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'error-phone' : undefined}
            onChange={(e) => { setPhone(e.target.value); setErrors(v => ({ ...v, phone: undefined })) }}
            className="w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#0F172A] outline-none transition-colors focus:ring-2"
            style={{ borderColor: errors.phone ? '#EF4444' : '#E2E8F0' }}
          />
          {errors.phone && (
            <p id="error-phone" role="alert" className="mt-1 text-xs text-red-500">{errors.phone}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="form-message" className="sr-only">Комментарий</label>
          <textarea
            id="form-message"
            placeholder="Комментарий (необязательно)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="w-full resize-none rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm text-[#0F172A] outline-none transition-colors focus:ring-2"
          />
        </div>

        {/* Server error */}
        {status === 'error' && serverError && (
          <div role="alert" className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            <AlertCircle size={16} className="shrink-0" />
            {serverError}
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-70"
          style={{ backgroundColor: color }}
        >
          {status === 'loading' ? (
            <><Loader2 size={16} className="animate-spin" aria-hidden="true" /> Отправляем...</>
          ) : (
            'Отправить заявку'
          )}
        </button>
      </form>

      <p className="mt-3 text-center text-xs text-[#94A3B8]">
        Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
      </p>
    </div>
  )
}
