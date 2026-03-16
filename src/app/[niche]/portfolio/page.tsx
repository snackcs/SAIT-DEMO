import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { nicheStaticParams, resolveNiche, nicheMetadata } from '@/lib/nichePageFactory'
import PortfolioSection from '@/components/sections/PortfolioSection'
import { beautyPortfolio } from '@/data/extras/beauty-portfolio'

export const generateStaticParams = nicheStaticParams

export async function generateMetadata({ params }: { params: Promise<{ niche: string }> }): Promise<Metadata> {
  return nicheMetadata(params, (d) => `Портфолио — ${d.title}`)
}

export default async function PortfolioPage({ params }: { params: Promise<{ niche: string }> }) {
  const { niche } = await params
  const data = await resolveNiche(params)
  if (niche !== 'beauty') notFound()
  return <PortfolioSection items={beautyPortfolio} color={data.color} />
}
