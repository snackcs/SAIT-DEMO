import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { nicheStaticParams, resolveNiche, nicheMetadata } from '@/lib/nichePageFactory'
import CoffeeOriginsSection from '@/components/sections/CoffeeOriginsSection'
import { coffeeOrigins } from '@/data/extras/coffee-origins'

export const generateStaticParams = nicheStaticParams

export async function generateMetadata({ params }: { params: Promise<{ niche: string }> }): Promise<Metadata> {
  return nicheMetadata(params, (d) => `О кофе — ${d.title}`)
}

export default async function CoffeeInfoPage({ params }: { params: Promise<{ niche: string }> }) {
  const { niche } = await params
  const data = await resolveNiche(params)
  if (niche !== 'coffee') notFound()
  return <CoffeeOriginsSection origins={coffeeOrigins} color={data.color} />
}
