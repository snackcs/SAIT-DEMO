import Link from 'next/link'

const niches = [
  { href: '/barbershop', label: 'Барбершоп' },
  { href: '/auto', label: 'Автосервис' },
  { href: '/dental', label: 'Стоматология' },
  { href: '/beauty', label: 'Студия красоты' },
  { href: '/tutor', label: 'Репетитор' },
  { href: '/coffee', label: 'Кофейня' },
]

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="font-serif text-2xl font-bold">
              Project<span className="text-[#2563eb]">XJ</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Показываем как может выглядеть сайт для вашей ниши. Адаптируем под ваш бизнес.
            </p>
          </div>

          {/* Demos */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">
              Демо-примеры
            </p>
            <ul className="space-y-2">
              {niches.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">
              Хотите такой сайт?
            </p>
            <p className="mb-6 text-sm text-white/60">
              Сделаем сайт под вашу нишу за 7–14 дней. Обсудим детали бесплатно.
            </p>
            <Link
              href="/contact"
              className="inline-block rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#0F172A] transition-colors hover:bg-white/90"
            >
              Обсудить проект
            </Link>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-white/30">
          © {new Date().getFullYear()} ProjectXJ — Демонстрационный сайт. Все данные вымышлены.
        </div>
      </div>
    </footer>
  )
}
