import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getNicheBySlug, allNiches } from '@/data/niches'
import NicheAbout from '@/components/sections/NicheAbout'
import NicheWhyUs from '@/components/sections/NicheWhyUs'
import NicheProcess from '@/components/sections/NicheProcess'

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
  return { title: `О нас — ${data.title}`, description: data.about.text.slice(0, 160) }
}

export default async function AboutPage({ params }: { params: Promise<{ niche: string }> }) {
  const { niche } = await params
  const data = getNicheBySlug(niche)
  if (!data) notFound()

  return (
    <>
      <NicheAbout data={data} />
      <NicheWhyUs data={data} />
      <NicheProcess data={data} />
    </>
  )
}
