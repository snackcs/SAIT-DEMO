import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { nicheStaticParams, resolveNiche, nicheMetadata } from '@/lib/nichePageFactory'
import BrandsSection from '@/components/sections/BrandsSection'
import { carBrands } from '@/data/extras/auto-brands'

export const generateStaticParams = nicheStaticParams

export async function generateMetadata({ params }: { params: Promise<{ niche: string }> }): Promise<Metadata> {
  return nicheMetadata(params, (d) => `Бренды авто — ${d.title}`)
}

export default async function BrandsPage({ params }: { params: Promise<{ niche: string }> }) {
  const { niche } = await params
  const data = await resolveNiche(params)
  if (niche !== 'auto') notFound()
  return <BrandsSection brands={carBrands} color={data.color} />
}
