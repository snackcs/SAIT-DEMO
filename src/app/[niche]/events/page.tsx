import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { nicheStaticParams, resolveNiche, nicheMetadata } from '@/lib/nichePageFactory'
import EventsSection from '@/components/sections/EventsSection'
import { coffeeEvents } from '@/data/extras/coffee-events'

export const generateStaticParams = nicheStaticParams

export async function generateMetadata({ params }: { params: Promise<{ niche: string }> }): Promise<Metadata> {
  return nicheMetadata(params, (d) => `События — ${d.title}`)
}

export default async function EventsPage({ params }: { params: Promise<{ niche: string }> }) {
  const { niche } = await params
  const data = await resolveNiche(params)
  if (niche !== 'coffee') notFound()
  return <EventsSection events={coffeeEvents} color={data.color} />
}
