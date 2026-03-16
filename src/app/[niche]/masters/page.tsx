import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { nicheStaticParams, resolveNiche, nicheMetadata } from '@/lib/nichePageFactory'
import MastersSection from '@/components/sections/MastersSection'
import { barbershopMasters } from '@/data/extras/barbershop-masters'
import { beautyMasters } from '@/data/extras/beauty-masters'

export const generateStaticParams = nicheStaticParams

export async function generateMetadata({ params }: { params: Promise<{ niche: string }> }): Promise<Metadata> {
  return nicheMetadata(params, (d) => `Мастера — ${d.title}`)
}

export default async function MastersPage({ params }: { params: Promise<{ niche: string }> }) {
  const { niche } = await params
  const data = await resolveNiche(params)
  const masters = niche === 'barbershop' ? barbershopMasters : niche === 'beauty' ? beautyMasters : null
  if (!masters) notFound()
  return <MastersSection masters={masters} color={data.color} slug={niche} />
}
