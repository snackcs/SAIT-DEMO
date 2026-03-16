import { Scissors, Car, Smile, Sparkles, BookOpen, Coffee } from 'lucide-react'
import type { NichePreview, NicheData } from './types'
import { barbershopData } from './barbershop'
import { autoData } from './auto'
import { dentalData } from './dental'
import { beautyData } from './beauty'
import { tutorData } from './tutor'
import { coffeeData } from './coffee'

export const allNiches: NicheData[] = [
  barbershopData,
  autoData,
  dentalData,
  beautyData,
  tutorData,
  coffeeData,
]

export const nichePreviews: NichePreview[] = [
  {
    slug: 'barbershop', label: 'Барбершоп', tag: 'Бьюти', Icon: Scissors, color: '#c9a84c',
    tabs: [
      { href: '/barbershop', label: 'Главная' },
      { href: '/barbershop/masters', label: 'Мастера' },
      { href: '/barbershop/services', label: 'Услуги' },
      { href: '/barbershop/gallery', label: 'Галерея' },
      { href: '/barbershop/pricing', label: 'Цены' },
      { href: '/barbershop/contacts', label: 'Контакты' },
    ],
  },
  {
    slug: 'auto', label: 'Автосервис', tag: 'Авто', Icon: Car, color: '#2563eb',
    tabs: [
      { href: '/auto', label: 'Главная' },
      { href: '/auto/services', label: 'Услуги' },
      { href: '/auto/diagnostics', label: 'Диагностика' },
      { href: '/auto/brands', label: 'Бренды авто' },
      { href: '/auto/pricing', label: 'Цены' },
      { href: '/auto/contacts', label: 'Контакты' },
    ],
  },
  {
    slug: 'dental', label: 'Стоматология', tag: 'Медицина', Icon: Smile, color: '#0ea5e9',
    tabs: [
      { href: '/dental', label: 'Главная' },
      { href: '/dental/doctors', label: 'Врачи' },
      { href: '/dental/services', label: 'Услуги' },
      { href: '/dental/before-after', label: 'До и после' },
      { href: '/dental/pricing', label: 'Цены' },
      { href: '/dental/contacts', label: 'Контакты' },
    ],
  },
  {
    slug: 'beauty', label: 'Студия красоты', tag: 'Бьюти', Icon: Sparkles, color: '#be185d',
    tabs: [
      { href: '/beauty', label: 'Главная' },
      { href: '/beauty/masters', label: 'Мастера' },
      { href: '/beauty/services', label: 'Услуги' },
      { href: '/beauty/portfolio', label: 'Портфолио' },
      { href: '/beauty/pricing', label: 'Цены' },
      { href: '/beauty/contacts', label: 'Контакты' },
    ],
  },
  {
    slug: 'tutor', label: 'Репетитор', tag: 'Образование', Icon: BookOpen, color: '#7c3aed',
    tabs: [
      { href: '/tutor', label: 'Главная' },
      { href: '/tutor/about', label: 'Обо мне' },
      { href: '/tutor/program', label: 'Программа' },
      { href: '/tutor/gallery', label: 'Результаты' },
      { href: '/tutor/pricing', label: 'Цены' },
      { href: '/tutor/contacts', label: 'Контакты' },
    ],
  },
  {
    slug: 'coffee', label: 'Кофейня', tag: 'Общепит', Icon: Coffee, color: '#92400e',
    tabs: [
      { href: '/coffee', label: 'Главная' },
      { href: '/coffee/menu', label: 'Меню' },
      { href: '/coffee/coffee-info', label: 'О кофе' },
      { href: '/coffee/gallery', label: 'Атмосфера' },
      { href: '/coffee/events', label: 'События' },
      { href: '/coffee/contacts', label: 'Контакты' },
    ],
  },
]

export function getNicheBySlug(slug: string): NicheData | undefined {
  return allNiches.find((n) => n.slug === slug)
}
