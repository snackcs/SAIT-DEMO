'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { href: '/barbershop', label: 'Барбершоп' },
  { href: '/auto', label: 'Автосервис' },
  { href: '/dental', label: 'Стоматология' },
  { href: '/beauty', label: 'Студия красоты' },
  { href: '/tutor', label: 'Репетитор' },
  { href: '/coffee', label: 'Кофейня' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-8 z-40 px-4">
      <div className="mx-auto max-w-6xl">
        <nav className="flex items-center justify-between rounded-2xl bg-white/90 px-6 py-3 shadow-md backdrop-blur-md ring-1 ring-black/5">
          {/* Logo */}
          <Link href="/" className="font-serif text-lg font-bold text-[#0F172A]">
            Project<span className="text-[#2563eb]">XJ</span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="rounded-xl px-3 py-2 text-sm font-medium text-[#475569] transition-colors hover:bg-[#F1F5F9] hover:text-[#0F172A]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            href="/contact"
            className="hidden rounded-xl bg-[#0F172A] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1e293b] lg:block"
          >
            Хочу такой сайт
          </Link>

          {/* Burger */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-xl p-2 text-[#0F172A] transition-colors hover:bg-[#F1F5F9] lg:hidden"
            aria-label="Меню"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {/* Mobile dropdown */}
        <div
          className={cn(
            'mt-2 overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-black/5 transition-all duration-300 lg:hidden',
            open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
          )}
        >
          <ul className="flex flex-col p-3">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-[#475569] transition-colors hover:bg-[#F1F5F9] hover:text-[#0F172A]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 border-t border-[#E2E8F0] pt-2">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="block rounded-xl bg-[#0F172A] px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Хочу такой сайт
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
