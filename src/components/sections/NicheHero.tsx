import Image from '@/components/ui/DemoImage'
import Link from 'next/link'
import type { NicheData } from '@/data/types'
import { BLUR_DATA_URL } from '@/lib/utils'
import Badge from '@/components/ui/Badge'

export default function NicheHero({ data }: { data: NicheData }) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24">
      {/* Background image */}
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

      {/* Overlay */}
      <div className="absolute inset-0 bg-[rgba(10,15,25,0.58)]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center text-white">
        {data.badge && (
          <Badge className="mb-6" style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white' }}>
            {data.badge}
          </Badge>
        )}

        <h1 className="font-serif text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
          {data.title}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
          {data.tagline}
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#contacts"
            className="rounded-xl px-8 py-4 text-base font-semibold text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: data.color }}
          >
            Записаться
          </a>
          <a
            href="#services"
            className="rounded-xl border border-white/30 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
          >
            Наши услуги
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50">
        <div className="flex h-8 w-5 items-start justify-center rounded-full border-2 border-white/30 p-1">
          <div className="h-2 w-0.5 animate-bounce rounded-full bg-white/60" />
        </div>
      </div>
    </section>
  )
}
