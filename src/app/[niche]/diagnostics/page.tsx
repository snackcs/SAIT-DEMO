import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { nicheStaticParams, resolveNiche, nicheMetadata } from '@/lib/nichePageFactory'
import DiagnosticsSection from '@/components/sections/DiagnosticsSection'
import { autoDiagnostics } from '@/data/extras/auto-diagnostics'

export const generateStaticParams = nicheStaticParams

export async function generateMetadata({ params }: { params: Promise<{ niche: string }> }): Promise<Metadata> {
  return nicheMetadata(params, (d) => `Диагностика — ${d.title}`)
}

export default async function DiagnosticsPage({ params }: { params: Promise<{ niche: string }> }) {
  const { niche } = await params
  const data = await resolveNiche(params)
  if (niche !== 'auto') notFound()
  return <DiagnosticsSection diagnostics={autoDiagnostics} color={data.color} slug={niche} />
}
