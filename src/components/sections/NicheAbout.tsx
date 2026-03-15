import Image from 'next/image'
import type { NicheData } from '@/data/types'
import { BLUR_DATA_URL } from '@/lib/utils'
import FadeIn from '@/components/ui/FadeIn'

export default function NicheAbout({ data }: { data: NicheData }) {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Image */}
          <FadeIn variant="card">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src={data.about.image}
                alt={`О нас — ${data.title}`}
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
            </div>
          </FadeIn>

          {/* Text */}
          <FadeIn delay={0.12}>
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-widest"
              style={{ color: data.color }}
            >
              О нас
            </p>
            <h2 className="font-serif text-3xl font-bold text-[#0F172A] md:text-4xl">
              Кто мы такие
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#475569]">{data.about.text}</p>

            {/* Facts */}
            <div className="mt-10 grid grid-cols-3 gap-4">
              {data.about.facts.map((f) => (
                <div key={f.label} className="rounded-2xl bg-[#F8FAFC] p-4 text-center">
                  <p className="font-serif text-2xl font-bold text-[#0F172A]">{f.value}</p>
                  <p className="mt-1 text-xs text-[#475569]">{f.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
