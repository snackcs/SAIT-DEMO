'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

const NICHE_TABS: Record<string, { href: string; label: string }[]> = {
  barbershop: [
    { href: '/barbershop', label: 'Главная' },
    { href: '/barbershop/masters', label: 'Мастера' },
    { href: '/barbershop/services', label: 'Услуги' },
    { href: '/barbershop/gallery', label: 'Галерея' },
    { href: '/barbershop/pricing', label: 'Цены' },
    { href: '/barbershop/contacts', label: 'Контакты' },
  ],
  auto: [
    { href: '/auto', label: 'Главная' },
    { href: '/auto/services', label: 'Услуги' },
    { href: '/auto/diagnostics', label: 'Диагностика' },
    { href: '/auto/brands', label: 'Бренды авто' },
    { href: '/auto/pricing', label: 'Цены' },
    { href: '/auto/contacts', label: 'Контакты' },
  ],
  dental: [
    { href: '/dental', label: 'Главная' },
    { href: '/dental/doctors', label: 'Врачи' },
    { href: '/dental/services', label: 'Услуги' },
    { href: '/dental/before-after', label: 'До и после' },
    { href: '/dental/pricing', label: 'Цены' },
    { href: '/dental/contacts', label: 'Контакты' },
  ],
  beauty: [
    { href: '/beauty', label: 'Главная' },
    { href: '/beauty/masters', label: 'Мастера' },
    { href: '/beauty/services', label: 'Услуги' },
    { href: '/beauty/portfolio', label: 'Портфолио' },
    { href: '/beauty/pricing', label: 'Цены' },
    { href: '/beauty/contacts', label: 'Контакты' },
  ],
  tutor: [
    { href: '/tutor', label: 'Главная' },
    { href: '/tutor/about', label: 'Обо мне' },
    { href: '/tutor/program', label: 'Программа' },
    { href: '/tutor/gallery', label: 'Результаты' },
    { href: '/tutor/pricing', label: 'Цены' },
    { href: '/tutor/contacts', label: 'Контакты' },
  ],
  coffee: [
    { href: '/coffee', label: 'Главная' },
    { href: '/coffee/menu', label: 'Меню' },
    { href: '/coffee/coffee-info', label: 'О кофе' },
    { href: '/coffee/gallery', label: 'Атмосфера' },
    { href: '/coffee/events', label: 'События' },
    { href: '/coffee/contacts', label: 'Контакты' },
  ],
}

export default function NicheHeader({
  slug,
  color,
}: {
  slug: string
  color: string
  title: string
}) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const tabs = NICHE_TABS[slug] ?? []

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between gap-4 py-3">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-[#475569] transition-colors hover:text-[#0F172A]"
          >
            <ArrowLeft size={14} />
            Все демо
          </Link>

          <nav className="hidden items-center gap-0.5 md:flex">
            {tabs.map((tab) => {
              const isActive =
                tab.href === `/${slug}`
                  ? pathname === `/${slug}`
                  : pathname.startsWith(tab.href)
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={cn(
                    'rounded-lg px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap',
                    isActive
                      ? 'font-semibold text-white'
                      : 'text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A]',
                  )}
                  style={isActive ? { backgroundColor: color } : {}}
                >
                  {tab.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="hidden rounded-lg px-3 py-2 text-xs font-semibold text-white transition-colors hover:opacity-90 sm:block"
              style={{ backgroundColor: color }}
            >
              Хочу такой сайт
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              className="rounded-lg p-2 text-[#0F172A] hover:bg-[#F1F5F9] md:hidden"
              aria-label="Меню"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <div
          className={cn(
            'overflow-hidden transition-all duration-300 md:hidden',
            open ? 'max-h-96 pb-3' : 'max-h-0',
          )}
        >
          <nav className="grid grid-cols-3 gap-1">
            {tabs.map((tab) => {
              const isActive =
                tab.href === `/${slug}`
                  ? pathname === `/${slug}`
                  : pathname.startsWith(tab.href)
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'rounded-lg px-2 py-2 text-center text-xs font-medium transition-colors',
                    isActive ? 'font-semibold text-white' : 'bg-[#F8FAFC] text-[#475569]',
                  )}
                  style={isActive ? { backgroundColor: color } : {}}
                >
                  {tab.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </header>
  )
}
