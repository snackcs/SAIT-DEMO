import type { Metadata } from 'next'
import { nicheStaticParams, resolveNiche, nicheMetadata } from '@/lib/nichePageFactory'
import NicheContacts from '@/components/sections/NicheContacts'
import NicheFAQ from '@/components/sections/NicheFAQ'

export const generateStaticParams = nicheStaticParams

export async function generateMetadata({ params }: { params: Promise<{ niche: string }> }): Promise<Metadata> {
  return nicheMetadata(params, (d) => `Контакты — ${d.title}`)
}

export default async function ContactsPage({ params }: { params: Promise<{ niche: string }> }) {
  const data = await resolveNiche(params)
  return (
    <>
      <NicheContacts data={data} />
      <NicheFAQ faq={data.faq} color={data.color} />
    </>
  )
}
