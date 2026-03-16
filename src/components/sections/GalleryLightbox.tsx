'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from '@/components/ui/DemoImage'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { BLUR_DATA_URL } from '@/lib/utils'
import FadeIn from '@/components/ui/FadeIn'

export default function GalleryLightbox({
  images,
  color,
}: {
  images: string[]
  color: string
}) {
  const [open, setOpen] = useState<number | null>(null)

  const close = () => setOpen(null)
  const prev = useCallback(() => setOpen(i => (i !== null ? (i - 1 + images.length) % images.length : null)), [images.length])
  const next = useCallback(() => setOpen(i => (i !== null ? (i + 1) % images.length : null)), [images.length])

  useEffect(() => {
    if (open === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, prev, next])

  // Lock scroll when open
  useEffect(() => {
    document.body.style.overflow = open !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* Grid */}
      <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3">
        {images.map((src, i) => (
          <FadeIn key={src} variant="card" delay={i * 0.06}>
            <button
              onClick={() => setOpen(i)}
              className="group relative aspect-square w-full overflow-hidden rounded-3xl focus:outline-none focus-visible:ring-2"
              style={{ '--tw-ring-color': color } as React.CSSProperties}
            >
              <Image
                src={src}
                alt={`Фото ${i + 1}`}
                fill
                sizes="(max-width:768px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/30">
                <ZoomIn size={28} className="scale-0 text-white transition-transform duration-300 group-hover:scale-100" />
              </div>
            </button>
          </FadeIn>
        ))}
      </div>

      {/* Lightbox overlay */}
      {open !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={close}
        >
          {/* Counter */}
          <div className="absolute left-1/2 top-5 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white backdrop-blur-sm">
            {open + 1} / {images.length}
          </div>

          {/* Close */}
          <button
            onClick={close}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            <X size={20} />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Image */}
          <div
            className="relative max-h-[85vh] max-w-4xl w-full"
            style={{ aspectRatio: '4/3' }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[open]}
              alt={`Фото ${open + 1}`}
              fill
              className="rounded-2xl object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dot nav */}
          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setOpen(i) }}
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: i === open ? 24 : 6,
                  backgroundColor: i === open ? color : 'rgba(255,255,255,0.4)',
                }}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
