import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getNicheBySlug, allNiches } from '@/data/niches'
import MastersSection from '@/components/sections/MastersSection'
import { barbershopMasters } from '@/data/extras/barbershop-masters'
import { beautyMasters } from '@/data/extras/beauty-masters'

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
  return { title: `Мастера — ${data.title}` }
}

export default async function MastersPage({ params }: { params: Promise<{ niche: string }> }) {
  const { niche } = await params
  const data = getNicheBySlug(niche)
  if (!data) notFound()

  const masters = niche === 'barbershop' ? barbershopMasters : niche === 'beauty' ? beautyMasters : null
  if (!masters) notFound()

  return <MastersSection masters={masters} color={data.color} slug={niche} />
}
