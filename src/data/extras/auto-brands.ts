export type CarBrand = {
  name: string
  country: string
  category: 'japanese' | 'german' | 'korean' | 'russian' | 'american' | 'european'
}

export const carBrands: CarBrand[] = [
  { name: 'Toyota', country: 'Япония', category: 'japanese' },
  { name: 'Honda', country: 'Япония', category: 'japanese' },
  { name: 'Nissan', country: 'Япония', category: 'japanese' },
  { name: 'Mazda', country: 'Япония', category: 'japanese' },
  { name: 'Mitsubishi', country: 'Япония', category: 'japanese' },
  { name: 'BMW', country: 'Германия', category: 'german' },
  { name: 'Mercedes-Benz', country: 'Германия', category: 'german' },
  { name: 'Audi', country: 'Германия', category: 'german' },
  { name: 'Volkswagen', country: 'Германия', category: 'german' },
  { name: 'Porsche', country: 'Германия', category: 'german' },
  { name: 'Kia', country: 'Южная Корея', category: 'korean' },
  { name: 'Hyundai', country: 'Южная Корея', category: 'korean' },
  { name: 'Genesis', country: 'Южная Корея', category: 'korean' },
  { name: 'Lada', country: 'Россия', category: 'russian' },
  { name: 'УАЗ', country: 'Россия', category: 'russian' },
  { name: 'Haval', country: 'Китай', category: 'european' },
  { name: 'Chery', country: 'Китай', category: 'european' },
  { name: 'Geely', country: 'Китай', category: 'european' },
]

export const brandCategories = [
  { key: 'all', label: 'Все марки' },
  { key: 'japanese', label: 'Японские' },
  { key: 'german', label: 'Немецкие' },
  { key: 'korean', label: 'Корейские' },
  { key: 'russian', label: 'Российские' },
  { key: 'european', label: 'Китайские' },
] as const
