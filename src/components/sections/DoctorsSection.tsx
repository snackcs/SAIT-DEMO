import Image from '@/components/ui/DemoImage'
import Link from 'next/link'
import type { Doctor } from '@/data/extras/dental-doctors'
import { BLUR_DATA_URL } from '@/lib/utils'
import FadeIn from '@/components/ui/FadeIn'
import { CheckCircle } from 'lucide-react'

export default function DoctorsSection({
  doctors,
  color,
  slug,
}: {
  doctors: Doctor[]
  color: string
  slug: string
}) {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest" style={{ color }}>
            Специалисты
          </p>
          <h1 className="text-center font-serif text-3xl font-bold text-[#0F172A] md:text-4xl">
            Наши врачи
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-center text-sm text-[#475569]">
            Каждый врач — специалист с профильной специализацией и опытом от 8 лет. Лечим с уважением к пациенту.
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {doctors.map((doctor, i) => (
            <FadeIn key={doctor.name} variant="card" delay={i * 0.07}>
              <div className="flex gap-5 rounded-3xl bg-[#F8FAFC] p-6 ring-1 ring-black/5">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
                  <Image
                    src={doctor.photo}
                    alt={doctor.name}
                    fill
                    sizes="96px"
                    className="object-cover object-top"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wide" style={{ color }}>
                    {doctor.specialty}
                  </p>
                  <h3 className="mt-0.5 font-serif text-lg font-bold text-[#0F172A]">{doctor.name}</h3>
                  <p className="text-sm text-[#475569]">Стаж: {doctor.experience}</p>
                  <p className="mt-1 text-xs text-[#475569]">{doctor.education}</p>
                  <ul className="mt-3 space-y-1">
                    {doctor.achievements.map((a) => (
                      <li key={a} className="flex items-center gap-1.5 text-xs text-[#475569]">
                        <CheckCircle size={12} style={{ color }} className="shrink-0" />
                        {a}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/${slug}/contacts`}
                    className="mt-4 inline-block rounded-xl px-4 py-2 text-xs font-semibold text-white"
                    style={{ backgroundColor: color }}
                  >
                    Записаться к врачу
                  </Link>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
