import type { NicheData } from '@/data/types'
import FadeIn from '@/components/ui/FadeIn'

export default function NicheServices({ data }: { data: NicheData }) {
  const { slug } = data

  /* ── Barbershop: numbered price-list rows (no grid boxes) ── */
  if (slug === 'barbershop') {
    return (
      <section id="services" className="bg-[#0F0A00] py-24">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn>
            <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-[#c9a84c]/60">
              Услуги
            </p>
            <h2 className="text-center font-serif text-3xl font-bold text-white md:text-4xl">
              Что мы предлагаем
            </h2>
          </FadeIn>

          {/* Divider */}
          <div className="mt-10 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#c9a84c]/20" />
            <span className="text-sm text-[#c9a84c]/40">✦</span>
            <div className="h-px flex-1 bg-[#c9a84c]/20" />
          </div>

          {/* List rows */}
          <div className="mt-2 divide-y divide-[#c9a84c]/10">
            {data.services.map((service, i) => (
              <FadeIn key={service.title} delay={i * 0.04}>
                <div className="flex items-center gap-4 py-4">
                  <span className="w-6 shrink-0 font-mono text-xs text-[#c9a84c]/30">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <service.Icon size={15} className="shrink-0" style={{ color: '#c9a84c' }} />
                  <div className="min-w-0 flex-1">
                    <span className="text-sm font-semibold text-white">{service.title}</span>
                    <span className="ml-2 text-xs text-white/35">{service.description}</span>
                  </div>
                  {service.price && (
                    <span className="shrink-0 text-sm font-bold" style={{ color: '#c9a84c' }}>
                      {service.price}
                    </span>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="mt-2 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#c9a84c]/20" />
            <span className="text-sm text-[#c9a84c]/40">✦</span>
            <div className="h-px flex-1 bg-[#c9a84c]/20" />
          </div>
        </div>
      </section>
    )
  }

  /* ── Auto: horizontal 2-section cards (price left | content right) ── */
  if (slug === 'auto') {
    return (
      <section id="services" className="bg-[#0D1117] py-24">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-[#2563eb]/60">
              Услуги
            </p>
            <h2 className="text-center font-serif text-3xl font-bold text-white md:text-4xl">
              Что мы предлагаем
            </h2>
          </FadeIn>

          <div className="mt-14 grid gap-3 sm:grid-cols-2">
            {data.services.map((service, i) => (
              <FadeIn key={service.title} variant="card" delay={i * 0.04}>
                <div className="flex overflow-hidden rounded-xl bg-[#161B22] ring-1 ring-white/5 transition-all hover:ring-[#2563eb]/30">
                  {/* Left: icon + price */}
                  <div className="flex w-28 shrink-0 flex-col items-center justify-center gap-2 bg-[#0D1117] px-3 py-5">
                    <service.Icon size={22} style={{ color: '#2563eb' }} />
                    {service.price && (
                      <span className="text-center font-mono text-xs font-bold leading-tight text-[#2563eb]">
                        {service.price}
                      </span>
                    )}
                  </div>
                  {/* Right: title + desc */}
                  <div className="flex flex-1 flex-col justify-center border-l border-white/5 px-4 py-4">
                    <p className="text-sm font-semibold text-white">{service.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-white/40">{service.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    )
  }

  /* ── Dental: centered icon, centered text (clinic poster grid) ── */
  if (slug === 'dental') {
    return (
      <section id="services" className="bg-[#F0F9FF] py-24">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <p
              className="mb-3 text-center text-xs font-semibold uppercase tracking-widest"
              style={{ color: data.color }}
            >
              Услуги
            </p>
            <h2 className="text-center font-serif text-3xl font-bold text-[#0F172A] md:text-4xl">
              Что мы предлагаем
            </h2>
          </FadeIn>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.services.map((service, i) => (
              <FadeIn key={service.title} variant="card" delay={i * 0.06}>
                <div className="flex flex-col items-center rounded-2xl bg-white p-6 text-center ring-1 ring-black/5 transition-shadow hover:shadow-md">
                  {/* Large centered icon */}
                  <div
                    className="mb-4 flex h-14 w-14 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${data.color}15` }}
                  >
                    <service.Icon size={26} style={{ color: data.color }} />
                  </div>
                  <h3 className="text-sm font-semibold text-[#0F172A]">{service.title}</h3>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-[#64748B]">
                    {service.description}
                  </p>
                  {service.price && (
                    <div
                      className="mt-4 rounded-xl px-4 py-1.5 text-xs font-bold"
                      style={{ backgroundColor: `${data.color}12`, color: data.color }}
                    >
                      {service.price}
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    )
  }

  /* ── Beauty: horizontal cards with thick colored left stripe ── */
  if (slug === 'beauty') {
    return (
      <section id="services" className="bg-[#FDF2F8] py-24">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <p
              className="mb-3 text-center text-xs font-semibold uppercase tracking-widest"
              style={{ color: data.color }}
            >
              Услуги
            </p>
            <h2 className="text-center font-serif text-3xl font-bold text-[#0F172A] md:text-4xl">
              Что мы предлагаем
            </h2>
          </FadeIn>

          <div className="mt-14 grid gap-3 sm:grid-cols-2">
            {data.services.map((service, i) => (
              <FadeIn key={service.title} variant="card" delay={i * 0.05}>
                <div className="flex h-full overflow-hidden rounded-2xl bg-white ring-1 ring-pink-100 transition-shadow hover:shadow-md">
                  {/* Left colored stripe with icon */}
                  <div
                    className="flex w-16 shrink-0 flex-col items-center justify-center"
                    style={{
                      background: `linear-gradient(180deg, ${data.color}25, ${data.color}45)`,
                    }}
                  >
                    <service.Icon size={20} style={{ color: data.color }} />
                  </div>
                  {/* Content */}
                  <div className="flex flex-1 flex-col justify-between p-4">
                    <div>
                      <h3 className="text-sm font-semibold text-[#0F172A]">{service.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-[#64748B]">
                        {service.description}
                      </p>
                    </div>
                    {service.price && (
                      <p className="mt-2 text-xs font-bold" style={{ color: data.color }}>
                        {service.price}
                      </p>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    )
  }

  /* ── Tutor: horizontal card with icon+title row + price footer ── */
  if (slug === 'tutor') {
    return (
      <section id="services" className="bg-[#FFFBEB] py-24">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <p
              className="mb-3 text-center text-xs font-semibold uppercase tracking-widest"
              style={{ color: data.color }}
            >
              Услуги
            </p>
            <h2 className="text-center font-serif text-3xl font-bold text-[#0F172A] md:text-4xl">
              Что мы предлагаем
            </h2>
          </FadeIn>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {data.services.map((service, i) => (
              <FadeIn key={service.title} variant="card" delay={i * 0.06}>
                <div className="flex h-full flex-col rounded-2xl bg-white ring-1 ring-[#7c3aed]/10 transition-all hover:shadow-sm hover:ring-[#7c3aed]/20">
                  {/* Top: icon + title */}
                  <div className="flex items-start gap-3 p-5">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${data.color}15` }}
                    >
                      <service.Icon size={18} style={{ color: data.color }} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[#0F172A]">{service.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-[#64748B]">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  {/* Footer: price separator */}
                  {service.price && (
                    <div className="mt-auto flex items-center justify-between border-t border-[#7c3aed]/10 px-5 py-3">
                      <span className="text-xs text-[#94A3B8]">Стоимость</span>
                      <span className="text-sm font-bold" style={{ color: data.color }}>
                        {service.price}
                      </span>
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    )
  }

  /* ── Default (coffee + fallback) ── */
  return (
    <section id="services" className="bg-[#F8FAFC] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <p
            className="mb-3 text-center text-xs font-semibold uppercase tracking-widest"
            style={{ color: data.color }}
          >
            Услуги
          </p>
          <h2 className="text-center font-serif text-3xl font-bold text-[#0F172A] md:text-4xl">
            Что мы предлагаем
          </h2>
        </FadeIn>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.services.map((service, i) => (
            <FadeIn key={service.title} variant="card" delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-md">
                <div
                  className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: `${data.color}18` }}
                >
                  <service.Icon size={22} style={{ color: data.color }} />
                </div>
                <h3 className="font-semibold text-[#0F172A]">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#475569]">
                  {service.description}
                </p>
                {service.price && (
                  <p className="mt-4 text-sm font-semibold" style={{ color: data.color }}>
                    {service.price}
                  </p>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
