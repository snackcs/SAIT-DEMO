'use client'

import { useState, useRef, useEffect } from 'react'
import { Bot, X, Send, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type Message = { role: 'user' | 'assistant'; content: string }

const GREETINGS: Record<string, string> = {
  barbershop: 'Привет! Я помощник барбершопа «Топор». Помогу выбрать услугу, рассказать о мастерах или записаться.',
  auto:       'Привет! Я помощник автосервиса «ПитСтоп». Опишите симптом — подскажу что проверить, или запишу на диагностику.',
  dental:     'Добрый день! Я помощник клиники «КристаллДент». Расскажу об услугах, врачах или помогу записаться без ожидания.',
  beauty:     'Привет! Я консультант студии «Velvet». Помогу подобрать процедуру или записаться к мастеру.',
  tutor:      'Здравствуйте! Я помощник репетитора Анны Соколовой. Расскажу о программах, ценах или запишу на бесплатную диагностику.',
  coffee:     'Привет! Я бариста «Полутона». Помогу выбрать зерно, напиток или расскажу о ближайших событиях.',
}

export default function AIChatWidget({
  niche,
  color,
}: {
  niche: string
  color: string
}) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const greeting = GREETINGS[niche] ?? 'Привет! Чем могу помочь?'

  // Скролл вниз при новых сообщениях
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streaming])

  // Фокус на инпут при открытии
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150)
  }, [open])

  async function sendMessage() {
    const text = input.trim()
    if (!text || streaming) return

    const userMsg: Message = { role: 'user', content: text }
    const newHistory = [...messages, userMsg]
    setMessages(newHistory)
    setInput('')
    setStreaming(true)

    // Добавляем пустое сообщение ассистента для стриминга
    setMessages(prev => [...prev, { role: 'assistant', content: '' }])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory,
          niche,
        }),
      })

      if (!res.ok || !res.body) {
        setMessages(prev => {
          const copy = [...prev]
          copy[copy.length - 1] = { role: 'assistant', content: 'Ошибка соединения. Попробуйте позже.' }
          return copy
        })
        return
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6).trim()
          if (data === '[DONE]') break

          try {
            const json = JSON.parse(data)
            const delta = json.choices?.[0]?.delta?.content ?? ''
            if (delta) {
              setMessages(prev => {
                const copy = [...prev]
                copy[copy.length - 1] = {
                  role: 'assistant',
                  content: copy[copy.length - 1].content + delta,
                }
                return copy
              })
            }
          } catch {
            // пропускаем битые чанки
          }
        }
      }
    } catch {
      setMessages(prev => {
        const copy = [...prev]
        copy[copy.length - 1] = {
          role: 'assistant',
          content: 'Не удалось получить ответ. Проверьте соединение.',
        }
        return copy
      })
    } finally {
      setStreaming(false)
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="fixed bottom-6 left-5 z-40 flex flex-col items-start gap-2">
      {/* Chat panel */}
      <div
        className={cn(
          'flex flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 transition-all duration-300',
          open
            ? 'h-[420px] w-[320px] sm:w-[360px] opacity-100 translate-y-0'
            : 'h-0 w-[320px] sm:w-[360px] opacity-0 translate-y-4 pointer-events-none',
        )}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3 text-white"
          style={{ backgroundColor: color }}
        >
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
              <Bot size={15} />
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight">AI-ассистент</p>
              <p className="text-[10px] text-white/70">Онлайн · отвечает мгновенно</p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-1 transition-colors hover:bg-white/20"
            aria-label="Закрыть чат"
          >
            <X size={16} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {/* Greeting bubble */}
          <div className="flex gap-2">
            <div
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: `${color}20` }}
            >
              <Bot size={13} style={{ color }} />
            </div>
            <div
              className="max-w-[80%] rounded-2xl rounded-tl-sm px-3 py-2 text-xs leading-relaxed text-[#0F172A]"
              style={{ backgroundColor: `${color}12` }}
            >
              {greeting}
            </div>
          </div>

          {/* Chat messages */}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn('flex gap-2', msg.role === 'user' ? 'flex-row-reverse' : '')}
            >
              {msg.role === 'assistant' && (
                <div
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${color}20` }}
                >
                  <Bot size={13} style={{ color }} />
                </div>
              )}
              <div
                className={cn(
                  'max-w-[80%] rounded-2xl px-3 py-2 text-xs leading-relaxed whitespace-pre-wrap',
                  msg.role === 'user'
                    ? 'rounded-tr-sm text-white'
                    : 'rounded-tl-sm text-[#0F172A]',
                )}
                style={
                  msg.role === 'user'
                    ? { backgroundColor: color }
                    : { backgroundColor: `${color}12` }
                }
              >
                {msg.content || (
                  <span className="flex items-center gap-1 text-[#94A3B8]">
                    <Loader2 size={11} className="animate-spin" /> печатает...
                  </span>
                )}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-[#F1F5F9] px-3 py-2.5">
          <div className="flex items-center gap-2 rounded-xl bg-[#F8FAFC] px-3 py-2 ring-1 ring-[#E2E8F0] focus-within:ring-2" style={{ '--tw-ring-color': color } as React.CSSProperties}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Написать сообщение..."
              disabled={streaming}
              className="flex-1 bg-transparent text-xs text-[#0F172A] outline-none placeholder:text-[#94A3B8] disabled:opacity-50"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || streaming}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-white transition-opacity hover:opacity-90 disabled:opacity-40"
              style={{ backgroundColor: color }}
              aria-label="Отправить"
            >
              {streaming
                ? <Loader2 size={13} className="animate-spin" />
                : <Send size={13} />
              }
            </button>
          </div>
          <p className="mt-1.5 text-center text-[9px] text-[#CBD5E1]">
            На основе AI · ответы могут быть неточными
          </p>
        </div>
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setOpen(v => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full text-white shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
        style={{ backgroundColor: color }}
        aria-label="AI-ассистент"
        aria-expanded={open}
      >
        <div className={cn('absolute transition-all duration-200', open ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90')}>
          <X size={22} />
        </div>
        <div className={cn('absolute transition-all duration-200', open ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0')}>
          <Bot size={22} />
        </div>
      </button>

      {/* Pulse ring when closed */}
      {!open && (
        <span
          className="absolute bottom-0 left-0 -z-10 h-14 w-14 animate-ping rounded-full opacity-25"
          style={{ backgroundColor: color }}
        />
      )}
    </div>
  )
}
