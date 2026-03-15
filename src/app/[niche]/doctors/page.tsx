import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getNicheBySlug, allNiches } from '@/data/niches'
import DoctorsSection from '@/components/sections/DoctorsSection'
import { dentalDoctors } from '@/data/extras/dental-doctors'

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
  return { title: `Врачи — ${data.title}` }
}

export default async function DoctorsPage({ params }: { params: Promise<{ niche: string }> }) {
  const { niche } = await params
  const data = getNicheBySlug(niche)
  if (!data || niche !== 'dental') notFound()

  return <DoctorsSection doctors={dentalDoctors} color={data.color} slug={niche} />
}
