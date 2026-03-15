import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getNicheBySlug, allNiches } from '@/data/niches'
import NicheContacts from '@/components/sections/NicheContacts'
import NicheFAQ from '@/components/sections/NicheFAQ'

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
  return { title: `Контакты — ${data.title}` }
}

export default async function ContactsPage({ params }: { params: Promise<{ niche: string }> }) {
  const { niche } = await params
  const data = getNicheBySlug(niche)
  if (!data) notFound()

  return (
    <>
      <NicheContacts data={data} />
      <NicheFAQ faq={data.faq} color={data.color} />
    </>
  )
}
