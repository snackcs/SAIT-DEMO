import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getNicheBySlug, allNiches } from '@/data/niches'
import NichePricing from '@/components/sections/NichePricing'
import NicheReviews from '@/components/sections/NicheReviews'

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
  return { title: `Цены и отзывы — ${data.title}` }
}

export default async function PricingPage({ params }: { params: Promise<{ niche: string }> }) {
  const { niche } = await params
  const data = getNicheBySlug(niche)
  if (!data) notFound()

  return (
    <>
      <NichePricing data={data} />
      <NicheReviews data={data} />
    </>
  )
}
