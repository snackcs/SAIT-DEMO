import type { LucideProps } from 'lucide-react'

export type LucideIcon = React.FC<LucideProps>

export type Service = {
  Icon: LucideIcon
  title: string
  description: string
  price?: string
}

export type PricingPlan = {
  name: string
  price: string
  features: string[]
  highlighted: boolean
  badge?: string
}

export type Review = {
  name: string
  role: string
  text: string
  rating: number
}

export type ContactInfo = {
  phone?: string
  address?: string
  hours?: string
  telegram?: string
  instagram?: string
  whatsapp?: string
  vk?: string
  email?: string
}

export type AboutInfo = {
  text: string
  facts: { label: string; value: string }[]
  image: string
}

export type WhyUsItem = {
  Icon: LucideIcon
  title: string
  text: string
}

export type ProcessStep = {
  title: string
  text: string
}

export type FaqItem = {
  question: string
  answer: string
}

export type TutorResult = {
  name: string
  subject: string
  before: number
  after: number
}

type NicheBase = {
  slug: string
  title: string
  tagline: string
  description: string
  color: string
  badge?: string
  heroImage: string
  about: AboutInfo
  services: Service[]
  whyUs: WhyUsItem[]
  process: ProcessStep[]
  pricing: PricingPlan[]
  reviews: Review[]
  faq: FaqItem[]
  contacts: ContactInfo
  seo: {
    title: string
    description: string
    ogImage: string
  }
}

export type NicheWithGallery = NicheBase & {
  hasGallery: true
  gallery: string[]
}

export type NicheWithResults = NicheBase & {
  hasGallery: false
  results: TutorResult[]
}

export type NicheData = NicheWithGallery | NicheWithResults

export type NicheTab = { href: string; label: string }

export type NichePreview = {
  slug: string
  label: string
  tag: string
  Icon: LucideIcon
  color: string
  tabs: NicheTab[]
}
