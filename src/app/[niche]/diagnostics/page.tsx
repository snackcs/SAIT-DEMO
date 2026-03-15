import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getNicheBySlug, allNiches } from '@/data/niches'
import DiagnosticsSection from '@/components/sections/DiagnosticsSection'
import { autoDiagnostics } from '@/data/extras/auto-diagnostics'

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
  return { title: `Диагностика — ${data.title}` }
}

export default async function DiagnosticsPage({ params }: { params: Promise<{ niche: string }> }) {
  const { niche } = await params
  const data = getNicheBySlug(niche)
  if (!data || niche !== 'auto') notFound()

  return <DiagnosticsSection diagnostics={autoDiagnostics} color={data.color} slug={niche} />
}
