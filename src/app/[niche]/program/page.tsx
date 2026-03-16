import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { nicheStaticParams, resolveNiche, nicheMetadata } from '@/lib/nichePageFactory'
import ProgramSection from '@/components/sections/ProgramSection'
import { tutorProgram } from '@/data/extras/tutor-program'

export const generateStaticParams = nicheStaticParams

export async function generateMetadata({ params }: { params: Promise<{ niche: string }> }): Promise<Metadata> {
  return nicheMetadata(params, (d) => `Программа — ${d.title}`)
}

export default async function ProgramPage({ params }: { params: Promise<{ niche: string }> }) {
  const { niche } = await params
  const data = await resolveNiche(params)
  if (niche !== 'tutor') notFound()
  return <ProgramSection modules={tutorProgram} color={data.color} />
}
