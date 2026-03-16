import { notFound } from 'next/navigation'
import { getNicheBySlug } from '@/data/niches'
import DemoBanner from '@/components/sections/DemoBanner'
import NicheHeader from '@/components/layout/NicheHeader'
import Footer from '@/components/layout/Footer'
import FloatingCTA from '@/components/sections/FloatingCTA'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { NicheJsonLd } from '@/components/ui/JsonLd'

export default async function NicheLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ niche: string }>
}) {
  const { niche } = await params
  const data = getNicheBySlug(niche)
  if (!data) notFound()

  return (
    <>
      <NicheJsonLd data={data} />
      <DemoBanner color={data.color} />
      <NicheHeader slug={data.slug} color={data.color} title={data.title} />
      <main>
        <ErrorBoundary>{children}</ErrorBoundary>
      </main>
      <Footer />
      <FloatingCTA
        color={data.color}
        phone={data.contacts.phone}
        telegram={data.contacts.telegram}
        whatsapp={data.contacts.whatsapp}
      />
    </>
  )
}
