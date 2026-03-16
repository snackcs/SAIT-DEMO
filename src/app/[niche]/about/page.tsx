import type { Metadata } from 'next'
import { nicheStaticParams, resolveNiche, nicheMetadata } from '@/lib/nichePageFactory'
import NicheAbout from '@/components/sections/NicheAbout'
import NicheWhyUs from '@/components/sections/NicheWhyUs'
import NicheProcess from '@/components/sections/NicheProcess'

export const generateStaticParams = nicheStaticParams

export async function generateMetadata({ params }: { params: Promise<{ niche: string }> }): Promise<Metadata> {
  return nicheMetadata(params, (d) => `О нас — ${d.title}`, (d) => d.about.text.slice(0, 160))
}

export default async function AboutPage({ params }: { params: Promise<{ niche: string }> }) {
  const data = await resolveNiche(params)
  return (
    <>
      <NicheAbout data={data} />
      <NicheWhyUs data={data} />
      <NicheProcess data={data} />
    </>
  )
}
