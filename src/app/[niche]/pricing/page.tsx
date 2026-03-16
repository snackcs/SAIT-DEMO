import type { Metadata } from 'next'
import { nicheStaticParams, resolveNiche, nicheMetadata } from '@/lib/nichePageFactory'
import NichePricing from '@/components/sections/NichePricing'
import NicheReviews from '@/components/sections/NicheReviews'

export const generateStaticParams = nicheStaticParams

export async function generateMetadata({ params }: { params: Promise<{ niche: string }> }): Promise<Metadata> {
  return nicheMetadata(params, (d) => `Цены и отзывы — ${d.title}`)
}

export default async function PricingPage({ params }: { params: Promise<{ niche: string }> }) {
  const data = await resolveNiche(params)
  return (
    <>
      <NichePricing data={data} />
      <NicheReviews data={data} />
    </>
  )
}
