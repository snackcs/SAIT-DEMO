export type BeforeAfterCase = {
  title: string
  description: string
  duration: string
  before: string
  after: string
}

export const dentalCases: BeforeAfterCase[] = [
  {
    title: 'Виниры E.max',
    description: 'Установка 8 керамических виниров на верхнюю челюсть. Коррекция формы и цвета.',
    duration: '2 визита',
    before: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?w=600&q=80',
  },
  {
    title: 'Отбеливание Zoom 4',
    description: 'Клиническое отбеливание. Результат — посветление на 7 тонов за 1 час.',
    duration: '1 визит',
    before: 'https://images.unsplash.com/photo-1588776814546-daab30f11f98?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&q=80',
  },
  {
    title: 'Имплантация Nobel Biocare',
    description: 'Восстановление 3 отсутствующих зубов. Установка и протезирование за 2 этапа.',
    duration: '3 месяца',
    before: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600&q=80',
  },
  {
    title: 'Комплексная реставрация',
    description: 'Лечение кариеса 6 зубов, замена старых пломб на современные световые.',
    duration: '3 визита',
    before: 'https://images.unsplash.com/photo-1616391182219-e080b4d1043a?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80',
  },
]
