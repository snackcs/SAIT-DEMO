import Link from 'next/link'

export default function DemoBanner({ color }: { color: string }) {
  return (
    <div
      className="relative z-50 flex items-center justify-center gap-3 px-4 py-2.5 text-sm font-medium text-white"
      style={{ backgroundColor: color }}
    >
      <span>Это демо-сайт. Адаптируем под ваш бизнес.</span>
      <Link
        href="/contact"
        className="rounded-lg bg-white/20 px-3 py-1 text-xs font-semibold transition-colors hover:bg-white/30"
      >
        Хочу такой сайт →
      </Link>
    </div>
  )
}
