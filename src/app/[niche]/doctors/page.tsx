import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { nicheStaticParams, resolveNiche, nicheMetadata } from '@/lib/nichePageFactory'
import DoctorsSection from '@/components/sections/DoctorsSection'
import { dentalDoctors } from '@/data/extras/dental-doctors'

export const generateStaticParams = nicheStaticParams

export async function generateMetadata({ params }: { params: Promise<{ niche: string }> }): Promise<Metadata> {
  return nicheMetadata(params, (d) => `Врачи — ${d.title}`)
}

export default async function DoctorsPage({ params }: { params: Promise<{ niche: string }> }) {
  const { niche } = await params
  const data = await resolveNiche(params)
  if (niche !== 'dental') notFound()
  return <DoctorsSection doctors={dentalDoctors} color={data.color} slug={niche} />
}
