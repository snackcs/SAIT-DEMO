'use client'

import { useState } from 'react'
import { MessageCircle, Phone, X, Send } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function FloatingCTA({
  color,
  phone,
  telegram,
  whatsapp,
}: {
  color: string
  phone?: string
  telegram?: string
  whatsapp?: string
}) {
  const [open, setOpen] = useState(false)

  const tel = (phone ?? whatsapp ?? '').replace(/[\s\-()]/g, '')
  const tg = telegram?.replace('@', '')

  const actions = [
    ...(tel ? [{
      label: 'Позвонить',
      href: `tel:${tel}`,
      Icon: Phone,
      bg: '#22C55E',
    }] : []),
    ...(whatsapp || tel ? [{
      label: 'WhatsApp',
      href: `https://wa.me/${tel.replace('+', '')}`,
      Icon: MessageCircle,
      bg: '#25D366',
    }] : []),
    ...(tg ? [{
      label: 'Telegram',
      href: `https://t.me/${tg}`,
      Icon: Send,
      bg: '#0088CC',
    }] : []),
  ]

  return (
    <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-2">
      {/* Action buttons */}
      <div className={cn('flex flex-col items-end gap-2 transition-all duration-300', open ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-0 translate-y-4')}>
        {actions.map(({ label, href, Icon, bg }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 rounded-full py-2.5 pl-4 pr-4 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
            style={{ backgroundColor: bg }}
          >
            <Icon size={17} />
            {label}
          </a>
        ))}
      </div>

      {/* Main button */}
      <button
        onClick={() => setOpen(v => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
        style={{ backgroundColor: color }}
        aria-label="Связаться"
      >
        <div className={cn('absolute transition-all duration-200', open ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90')}>
          <X size={22} className="text-white" />
        </div>
        <div className={cn('absolute transition-all duration-200', open ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0')}>
          <MessageCircle size={22} className="text-white" />
        </div>
      </button>

      {/* Pulse ring (only when closed) */}
      {!open && (
        <span
          className="absolute bottom-0 right-0 -z-10 h-14 w-14 animate-ping rounded-full opacity-30"
          style={{ backgroundColor: color }}
        />
      )}
    </div>
  )
}
