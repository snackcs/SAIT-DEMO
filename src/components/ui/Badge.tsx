import { cn } from '@/lib/utils'

type BadgeProps = {
  children: React.ReactNode
  className?: string
  color?: string
  style?: React.CSSProperties
}

export default function Badge({ children, className, color, style }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold',
        className,
      )}
      style={
        style
          ? style
          : color
            ? { backgroundColor: `${color}18`, color }
            : { backgroundColor: '#F1F5F9', color: '#475569' }
      }
    >
      {children}
    </span>
  )
}
