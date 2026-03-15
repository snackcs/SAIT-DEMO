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
  { slug: 'barbershop', label: 'Барбершоп', tag: 'Бьюти', Icon: Scissors, color: '#c9a84c' },
  { slug: 'auto', label: 'Автосервис', tag: 'Авто', Icon: Car, color: '#2563eb' },
  { slug: 'dental', label: 'Стоматология', tag: 'Медицина', Icon: Smile, color: '#0ea5e9' },
  { slug: 'beauty', label: 'Студия красоты', tag: 'Бьюти', Icon: Sparkles, color: '#be185d' },
  { slug: 'tutor', label: 'Репетитор', tag: 'Образование', Icon: BookOpen, color: '#7c3aed' },
  { slug: 'coffee', label: 'Кофейня', tag: 'Общепит', Icon: Coffee, color: '#92400e' },
]

export function getNicheBySlug(slug: string): NicheData | undefined {
  return allNiches.find((n) => n.slug === slug)
}
