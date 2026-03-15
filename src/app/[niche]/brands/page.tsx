import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getNicheBySlug, allNiches } from '@/data/niches'
import BrandsSection from '@/components/sections/BrandsSection'
import { carBrands } from '@/data/extras/auto-brands'

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
  return { title: `Бренды авто — ${data.title}` }
}

export default async function BrandsPage({ params }: { params: Promise<{ niche: string }> }) {
  const { niche } = await params
  const data = getNicheBySlug(niche)
  if (!data || niche !== 'auto') notFound()

  return <BrandsSection brands={carBrands} color={data.color} />
}
