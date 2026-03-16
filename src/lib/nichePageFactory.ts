import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { allNiches, getNicheBySlug } from '@/data/niches'
import type { NicheData } from '@/data/types'

/** generateStaticParams для всех niche-страниц */
export function nicheStaticParams() {
  return allNiches.map((n) => ({ niche: n.slug }))
}

/** Получить данные ниши или вызвать notFound() */
export async function resolveNiche(
  params: Promise<{ niche: string }>,
): Promise<NicheData> {
  const { niche } = await params
  const data = getNicheBySlug(niche)
  if (!data) notFound()
  return data
}

/** Сгенерировать Metadata для section-страниц */
export async function nicheMetadata(
  params: Promise<{ niche: string }>,
  titleFn: (data: NicheData) => string,
  descriptionFn?: (data: NicheData) => string,
): Promise<Metadata> {
  const { niche } = await params
  const data = getNicheBySlug(niche)
  if (!data) return {}

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  const canonical = `${siteUrl}/${niche}`

  return {
    title: titleFn(data),
    description: descriptionFn ? descriptionFn(data) : data.description,
    alternates: { canonical },
    openGraph: {
      title: titleFn(data),
      description: descriptionFn ? descriptionFn(data) : data.description,
      locale: 'ru_RU',
      type: 'website',
    },
  }
}
