import Image from 'next/image'
import Link from 'next/link'
import type { NicheData } from '@/data/types'
import { BLUR_DATA_URL } from '@/lib/utils'
import Badge from '@/components/ui/Badge'

export default function HeroSplit({ data }: { data: NicheData }) {
  return (
    <section className="min-h-[90vh] bg-[#0F172A]">
      <div className="mx-auto grid min-h-[90vh] max-w-7xl grid-cols-1 lg:grid-cols-2">
        {/* Left — text */}
        <div className="flex flex-col justify-center px-8 py-20 lg:px-16">
          {data.badge && (
            <Badge className="mb-5 self-start" style={{ backgroundColor: `${data.color}25`, color: data.color }}>
              {data.badge}
            </Badge>
          )}
          <h1 className="font-serif text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            {data.title}
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/65">{data.tagline}</p>

          {/* Stats row */}
          <div className="mt-10 flex gap-8">
            {data.about.facts.map((f) => (
              <div key={f.label}>
                <p className="font-serif text-2xl font-bold text-white">{f.value}</p>
                <p className="text-xs text-white/50">{f.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href={`/${data.slug}/contacts`}
              className="rounded-xl px-7 py-3.5 text-sm font-semibold text-white"
              style={{ backgroundColor: data.color }}
            >
              Связаться
            </Link>
            <Link
              href={`/${data.slug}/services`}
              className="rounded-xl border border-white/20 px-7 py-3.5 text-sm font-semibold text-white/80 hover:bg-white/10"
            >
              Услуги и цены
            </Link>
          </div>
        </div>

        {/* Right — image */}
        <div className="relative hidden lg:block">
          <Image
            src={data.heroImage}
            alt={data.title}
            fill
            priority
            sizes="50vw"
            className="object-cover opacity-80"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-transparent to-transparent" />
        </div>
      </div>
    </section>
  )
}
