'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { sectionVariants, cardVariants } from '@/lib/motion'

type FadeInProps = {
  children: React.ReactNode
  className?: string
  variant?: 'section' | 'card'
  delay?: number
}

export default function FadeIn({
  children,
  className,
  variant = 'section',
  delay = 0,
}: FadeInProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const base = variant === 'card' ? cardVariants : sectionVariants

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        ...base,
        visible: {
          ...base.visible,
          transition: {
            ...(base.visible as { transition?: object }).transition,
            delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
