'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { FaqItem } from '@/data/types'
import FadeIn from '@/components/ui/FadeIn'
import { cn } from '@/lib/utils'

function FAQItem({
  question,
  answer,
  color,
  index,
}: {
  question: string
  answer: string
  color: string
  index: number
}) {
  const [open, setOpen] = useState(false)

  return (
    <FadeIn variant="card" delay={index * 0.06}>
      <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-black/5">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left text-sm font-semibold text-[#0F172A] transition-colors hover:bg-[#F8FAFC]"
        >
          <span>{question}</span>
          <ChevronDown
            size={18}
            className={cn(
              'shrink-0 text-[#475569] transition-transform duration-200',
              open && 'rotate-180',
            )}
            style={open ? { color } : {}}
          />
        </button>
        <div
          className={cn(
            'overflow-hidden transition-all duration-300',
            open ? 'max-h-96' : 'max-h-0',
          )}
        >
          <p className="px-6 pb-5 text-sm leading-relaxed text-[#475569]">{answer}</p>
        </div>
      </div>
    </FadeIn>
  )
}

export default function NicheFAQ({ faq, color }: { faq: FaqItem[]; color: string }) {
  return (
    <section className="bg-[#F8FAFC] py-24">
      <div className="mx-auto max-w-3xl px-6">
        <FadeIn>
          <p
            className="mb-3 text-center text-xs font-semibold uppercase tracking-widest"
            style={{ color }}
          >
            FAQ
          </p>
          <h2 className="text-center font-serif text-3xl font-bold text-[#0F172A] md:text-4xl">
            Частые вопросы
          </h2>
        </FadeIn>

        <div className="mt-10 space-y-3">
          {faq.map((item, i) => (
            <FAQItem
              key={item.question}
              question={item.question}
              answer={item.answer}
              color={color}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
