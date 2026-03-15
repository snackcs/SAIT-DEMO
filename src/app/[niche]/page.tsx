import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getNicheBySlug, allNiches } from '@/data/niches'
import BarberHome from '@/components/sections/BarberHome'
import AutoHome from '@/components/sections/AutoHome'
import DentalHome from '@/components/sections/DentalHome'
import BeautyHome from '@/components/sections/BeautyHome'
import TutorHome from '@/components/sections/TutorHome'
import CoffeeHome from '@/components/sections/CoffeeHome'

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
  return {
    title: data.seo.title,
    description: data.seo.description,
    openGraph: { images: [data.seo.ogImage] },
  }
}

export default async function NicheHomePage({
  params,
}: {
  params: Promise<{ niche: string }>
}) {
  const { niche } = await params
  const data = getNicheBySlug(niche)
  if (!data) notFound()

  switch (niche) {
    case 'barbershop':
      return <BarberHome data={data} />
    case 'auto':
      return <AutoHome data={data} />
    case 'dental':
      return <DentalHome data={data} />
    case 'beauty':
      return <BeautyHome data={data} />
    case 'tutor':
      return <TutorHome data={data} />
    case 'coffee':
      return <CoffeeHome data={data} />
    default:
      notFound()
  }
}
