import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getNicheBySlug, allNiches } from '@/data/niches'
import BarberHome from '@/components/sections/BarberHome'
import AutoHome from '@/components/sections/AutoHome'
import DentalHome from '@/components/sections/DentalHome'
import BeautyHome from '@/components/sections/BeautyHome'
import TutorHome from '@/components/sections/TutorHome'
import CoffeeHome from '@/components/sections/CoffeeHome'
import type { NicheData } from '@/data/types'
import type { ComponentType } from 'react'

export function generateStaticParams() {
  return allNiches.map((n) => ({ niche: n.slug }))
}

const HOME_REGISTRY: Record<string, ComponentType<{ data: NicheData }>> = {
  barbershop: BarberHome,
  auto: AutoHome,
  dental: DentalHome,
  beauty: BeautyHome,
  tutor: TutorHome,
  coffee: CoffeeHome,
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ niche: string }>
}): Promise<Metadata> {
  const { niche } = await params
  const data = getNicheBySlug(niche)
  if (!data) return {}
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  return {
    title: data.seo.title,
    description: data.seo.description,
    alternates: { canonical: `${siteUrl}/${niche}` },
    openGraph: {
      type: 'website',
      locale: 'ru_RU',
      url: `${siteUrl}/${niche}`,
      title: data.seo.title,
      description: data.seo.description,
      images: [{ url: data.seo.ogImage, width: 1200, alt: data.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.seo.title,
      description: data.seo.description,
      images: [data.seo.ogImage],
    },
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

  const HomeComponent = HOME_REGISTRY[niche]
  if (!HomeComponent) notFound()
  return <HomeComponent data={data} />
}
