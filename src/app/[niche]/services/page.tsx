import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getNicheBySlug, allNiches } from '@/data/niches'
import NicheServices from '@/components/sections/NicheServices'
import FadeIn from '@/components/ui/FadeIn'
import Link from 'next/link'

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
  return { title: `Услуги — ${data.title}`, description: data.description }
}

export default async function ServicesPage({ params }: { params: Promise<{ niche: string }> }) {
  const { niche } = await params
  const data = getNicheBySlug(niche)
  if (!data) notFound()

  return (
    <>
      <NicheServices data={data} />

      {/* CTA after services */}
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
