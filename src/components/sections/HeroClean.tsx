import Image from 'next/image'
import Link from 'next/link'
import type { NicheData } from '@/data/types'
import { BLUR_DATA_URL } from '@/lib/utils'
import { Shield, Award, Users } from 'lucide-react'

const trustIcons = [Shield, Award, Users]

export default function HeroClean({ data }: { data: NicheData }) {
  return (
    <section className="bg-white">
      {/* Top text block */}
      <div className="mx-auto max-w-5xl px-6 pb-12 pt-16 text-center">
        <span
          className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-semibold"
          style={{ backgroundColor: `${data.color}15`, color: data.color }}
        >
          {data.badge ?? data.description}
        </span>
        <h1 className="font-serif text-4xl font-bold text-[#0F172A] md:text-5xl lg:text-6xl">
          {data.title}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#475569]">
          {data.tagline}
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href={`/${data.slug}/contacts`}
            className="rounded-xl px-8 py-3.5 text-sm font-semibold text-white"
            style={{ backgroundColor: data.color }}
          >
            Записаться на приём
          </Link>
          <Link
            href={`/${data.slug}/services`}
            className="rounded-xl border border-[#E2E8F0] px-8 py-3.5 text-sm font-semibold text-[#0F172A] hover:bg-[#F8FAFC]"
          >
            Услуги и цены
          </Link>
        </div>

        {/* Trust badges */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {data.about.facts.map((f, i) => {
            const Icon = trustIcons[i] ?? Shield
            return (
              <div
                key={f.label}
                className="flex items-center gap-2 rounded-2xl bg-[#F8FAFC] px-4 py-3 ring-1 ring-black/5"
              >
                <Icon size={16} style={{ color: data.color }} />
                <span className="text-sm font-semibold text-[#0F172A]">{f.value}</span>
                <span className="text-sm text-[#475569]">{f.label}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Hero image */}
      <div className="relative h-72 overflow-hidden md:h-96">
        <Image
          src={data.heroImage}
          alt={data.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{ backgroundColor: data.color }}
        />
      </div>
    </section>
  )
}
