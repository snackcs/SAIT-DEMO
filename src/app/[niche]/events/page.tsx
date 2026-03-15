import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getNicheBySlug, allNiches } from '@/data/niches'
import EventsSection from '@/components/sections/EventsSection'
import { coffeeEvents } from '@/data/extras/coffee-events'

export function generateStaticParams() {
  return allNiches.map((n) => ({ niche: n.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ niche: string }>
}): Promise<Metadata> {
  const { niche } = await params
  const data = getNicheBySlug(niche)
  if (!data) return {}
  return { title: `События — ${data.title}` }
}

export default async function EventsPage({ params }: { params: Promise<{ niche: string }> }) {
  const { niche } = await params
  const data = getNicheBySlug(niche)
  if (!data || niche !== 'coffee') notFound()

  return <EventsSection events={coffeeEvents} color={data.color} />
}
