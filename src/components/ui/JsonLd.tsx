import type { NicheData } from '@/data/types'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

/** LocalBusiness schema для нишевой страницы */
export function NicheJsonLd({ data, section }: { data: NicheData; section?: string }) {
  const url = section ? `${BASE_URL}/${data.slug}/${section}` : `${BASE_URL}/${data.slug}`

  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: data.title,
    description: data.description,
    url,
    image: data.seo.ogImage,
    telephone: data.contacts.phone,
    address: data.contacts.address
      ? {
          '@type': 'PostalAddress',
          streetAddress: data.contacts.address,
          addressCountry: 'RU',
        }
      : undefined,
    openingHours: data.contacts.hours,
    sameAs: [
      data.contacts.instagram ? `https://instagram.com/${data.contacts.instagram.replace('@', '')}` : undefined,
      data.contacts.telegram ? `https://t.me/${data.contacts.telegram.replace('@', '')}` : undefined,
    ].filter(Boolean),
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: data.title, item: `${BASE_URL}/${data.slug}` },
      ...(section
        ? [{ '@type': 'ListItem', position: 3, name: section, item: url }]
        : []),
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  )
}

/** FAQ schema */
export function FaqJsonLd({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
