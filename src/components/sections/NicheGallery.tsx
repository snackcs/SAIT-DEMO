'use client'

import FadeIn from '@/components/ui/FadeIn'
import dynamic from 'next/dynamic'

const GalleryLightbox = dynamic(() => import('./GalleryLightbox'), {
  loading: () => (
    <div className="mt-14 grid animate-pulse gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="aspect-[4/3] rounded-2xl bg-[#F1F5F9]" />
      ))}
    </div>
  ),
  ssr: false,
})

export default function NicheGallery({ images, color }: { images: string[]; color: string }) {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest" style={{ color }}>
            Наши работы
          </p>
          <h2 className="text-center font-serif text-3xl font-bold text-[#0F172A] md:text-4xl">
            Галерея
          </h2>
          <p className="mx-auto mt-3 max-w-xs text-center text-sm text-[#475569]">
            Нажмите на фото, чтобы открыть полный размер
          </p>
        </FadeIn>

        <GalleryLightbox images={images} color={color} />
      </div>
    </section>
  )
}
