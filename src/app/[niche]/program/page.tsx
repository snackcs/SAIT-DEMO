import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getNicheBySlug, allNiches } from '@/data/niches'
import ProgramSection from '@/components/sections/ProgramSection'
import { tutorProgram } from '@/data/extras/tutor-program'

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
  return { title: `Программа — ${data.title}` }
}

export default async function ProgramPage({ params }: { params: Promise<{ niche: string }> }) {
  const { niche } = await params
  const data = getNicheBySlug(niche)
  if (!data || niche !== 'tutor') notFound()

  return <ProgramSection modules={tutorProgram} color={data.color} />
}
