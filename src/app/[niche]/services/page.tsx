import type { Metadata } from 'next'
import { nicheStaticParams, resolveNiche, nicheMetadata } from '@/lib/nichePageFactory'
import NicheServices from '@/components/sections/NicheServices'
import FadeIn from '@/components/ui/FadeIn'
import Link from 'next/link'

export const generateStaticParams = nicheStaticParams

export async function generateMetadata({ params }: { params: Promise<{ niche: string }> }): Promise<Metadata> {
  return nicheMetadata(params, (d) => `Услуги — ${d.title}`, (d) => d.description)
}

export default async function ServicesPage({ params }: { params: Promise<{ niche: string }> }) {
  const data = await resolveNiche(params)
  const { niche } = await params

  return (
    <>
      <NicheServices data={data} />
      <section className="bg-white pb-24">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <FadeIn>
            <p className="text-sm text-[#475569]">Не нашли нужную услугу? Свяжитесь с нами — подберём решение.</p>
            <Link
              href={`/${niche}/contacts`}
              className="mt-5 inline-block rounded-xl px-8 py-3.5 text-sm font-semibold text-white"
              style={{ backgroundColor: data.color }}
            >
              Задать вопрос
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
