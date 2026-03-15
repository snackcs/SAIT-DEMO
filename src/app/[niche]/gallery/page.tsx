import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getNicheBySlug, allNiches } from '@/data/niches'
import NicheGallery from '@/components/sections/NicheGallery'
import TutorResults from '@/components/sections/TutorResults'
import type { NicheWithGallery, NicheWithResults } from '@/data/types'

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
  const label = niche === 'tutor' ? 'Результаты' : 'Галерея'
  return { title: `${label} — ${data.title}` }
}

export default async function GalleryPage({ params }: { params: Promise<{ niche: string }> }) {
  const { niche } = await params
  const data = getNicheBySlug(niche)
  if (!data) notFound()

  if (!data.hasGallery) {
    return <TutorResults data={data as NicheWithResults} />
  }

  return <NicheGallery data={data as NicheWithGallery} />
}
