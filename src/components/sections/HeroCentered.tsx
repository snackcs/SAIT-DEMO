import Image from '@/components/ui/DemoImage'
import Link from 'next/link'
import type { NicheData } from '@/data/types'
import { BLUR_DATA_URL } from '@/lib/utils'
import Badge from '@/components/ui/Badge'

export default function HeroCentered({ data }: { data: NicheData }) {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden">
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
      <div className="absolute inset-0 bg-[rgba(10,15,25,0.62)]" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center text-white">
        {data.badge && (
          <Badge className="mb-5" style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white' }}>
            {data.badge}
          </Badge>
        )}
        <h1 className="font-serif text-4xl font-bold leading-tight md:text-6xl">{data.title}</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/75">{data.tagline}</p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href={`/${data.slug}/contacts`}
            className="rounded-xl px-8 py-3.5 text-sm font-semibold text-white"
            style={{ backgroundColor: data.color }}
          >
            Записаться
          </Link>
          <Link
            href={`/${data.slug}/services`}
            className="rounded-xl border border-white/30 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10"
          >
            Наши услуги
          </Link>
        </div>
      </div>
    </section>
  )
}
