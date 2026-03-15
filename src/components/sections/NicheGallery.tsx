import type { NicheWithGallery } from '@/data/types'
import FadeIn from '@/components/ui/FadeIn'
import GalleryLightbox from './GalleryLightbox'

export default function NicheGallery({ data }: { data: NicheWithGallery }) {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest" style={{ color: data.color }}>
            Наши работы
          </p>
          <h2 className="text-center font-serif text-3xl font-bold text-[#0F172A] md:text-4xl">
            Галерея
          </h2>
          <p className="mx-auto mt-3 max-w-xs text-center text-sm text-[#475569]">
            Нажмите на фото, чтобы открыть полный размер
          </p>
        </FadeIn>

        <GalleryLightbox images={data.gallery} color={data.color} />
      </div>
    </section>
  )
}
