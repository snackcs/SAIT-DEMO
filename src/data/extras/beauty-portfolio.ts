export type PortfolioItem = {
  image: string
  category: 'nails' | 'lashes' | 'brows'
  title: string
}

export const beautyPortfolio: PortfolioItem[] = [
  { image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80', category: 'nails', title: 'Маникюр с дизайном' },
  { image: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=600&q=80', category: 'lashes', title: 'Наращивание 3D' },
  { image: 'https://images.unsplash.com/photo-1515688594390-b649af70d282?w=600&q=80', category: 'brows', title: 'Оформление бровей' },
  { image: 'https://images.unsplash.com/photo-1632345031435-8727f592d8db?w=600&q=80', category: 'nails', title: 'Гель-лак омбре' },
  { image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80', category: 'lashes', title: 'Ресницы mega volume' },
  { image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80', category: 'brows', title: 'Ламинирование бровей' },
  { image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80', category: 'nails', title: 'Педикюр + гель' },
  { image: 'https://images.unsplash.com/photo-1632345031435-8727f592d8db?w=600&q=80', category: 'nails', title: 'Французский маникюр' },
  { image: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=600&q=80', category: 'lashes', title: 'Классика 1D' },
]

export const portfolioCategories = [
  { key: 'all', label: 'Все работы' },
  { key: 'nails', label: 'Маникюр' },
  { key: 'lashes', label: 'Ресницы' },
  { key: 'brows', label: 'Брови' },
] as const
