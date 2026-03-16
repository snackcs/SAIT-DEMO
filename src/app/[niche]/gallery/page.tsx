import type { Metadata } from 'next'
import { nicheStaticParams, resolveNiche, nicheMetadata } from '@/lib/nichePageFactory'
import NicheGallery from '@/components/sections/NicheGallery'
import TutorResults from '@/components/sections/TutorResults'
import type { NicheWithGallery, NicheWithResults } from '@/data/types'


export const generateStaticParams = nicheStaticParams

export async function generateMetadata({ params }: { params: Promise<{ niche: string }> }): Promise<Metadata> {
  const { niche } = await params
  const label = niche === 'tutor' ? 'Результаты' : 'Галерея'
  return nicheMetadata(params, (d) => `${label} — ${d.title}`)
}

export default async function GalleryPage({ params }: { params: Promise<{ niche: string }> }) {
  const data = await resolveNiche(params)
  if (!data.hasGallery) return <TutorResults data={data as NicheWithResults} />
  const d = data as NicheWithGallery
  return <NicheGallery images={d.gallery} color={d.color} />
}
