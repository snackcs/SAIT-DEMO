import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { nicheStaticParams, resolveNiche, nicheMetadata } from '@/lib/nichePageFactory'
import MenuSection from '@/components/sections/MenuSection'
import { coffeeMenu } from '@/data/extras/coffee-menu'

export const generateStaticParams = nicheStaticParams

export async function generateMetadata({ params }: { params: Promise<{ niche: string }> }): Promise<Metadata> {
  return nicheMetadata(params, (d) => `Меню — ${d.title}`)
}

export default async function MenuPage({ params }: { params: Promise<{ niche: string }> }) {
  const { niche } = await params
  const data = await resolveNiche(params)
  if (niche !== 'coffee') notFound()
  return <MenuSection items={coffeeMenu} color={data.color} />
}
