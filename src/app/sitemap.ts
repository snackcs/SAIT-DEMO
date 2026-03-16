import type { MetadataRoute } from 'next'
import { allNiches } from '@/data/niches'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

const SECTION_SLUGS: Record<string, string[]> = {
  barbershop: ['masters', 'services', 'gallery', 'pricing', 'contacts'],
  auto: ['services', 'diagnostics', 'brands', 'pricing', 'contacts'],
  dental: ['doctors', 'services', 'before-after', 'pricing', 'contacts'],
  beauty: ['masters', 'services', 'portfolio', 'pricing', 'contacts'],
  tutor: ['about', 'program', 'gallery', 'pricing', 'contacts'],
  coffee: ['menu', 'coffee-info', 'gallery', 'events', 'contacts'],
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ]

  const nicheRoutes: MetadataRoute.Sitemap = allNiches.flatMap((niche) => {
    const sections = SECTION_SLUGS[niche.slug] ?? []
    return [
      { url: `${BASE_URL}/${niche.slug}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.9 },
      ...sections.map((section) => ({
        url: `${BASE_URL}/${niche.slug}/${section}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })),
    ]
  })

  return [...staticRoutes, ...nicheRoutes]
}
