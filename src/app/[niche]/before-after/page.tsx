import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { nicheStaticParams, resolveNiche, nicheMetadata } from '@/lib/nichePageFactory'
import BeforeAfterSection from '@/components/sections/BeforeAfterSection'
import { dentalCases } from '@/data/extras/dental-before-after'

export const generateStaticParams = nicheStaticParams

export async function generateMetadata({ params }: { params: Promise<{ niche: string }> }): Promise<Metadata> {
  return nicheMetadata(params, (d) => `До и после — ${d.title}`)
}

export default async function BeforeAfterPage({ params }: { params: Promise<{ niche: string }> }) {
  const { niche } = await params
  const data = await resolveNiche(params)
  if (niche !== 'dental') notFound()
  return <BeforeAfterSection cases={dentalCases} color={data.color} />
}
