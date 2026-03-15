export type CoffeeEvent = {
  title: string
  date: string
  time: string
  description: string
  price: string
  spots: number
  type: 'music' | 'tasting' | 'workshop' | 'other'
}

export const coffeeEvents: CoffeeEvent[] = [
  {
    title: 'Джаз-вечер с Trío Bohème',
    date: '21 марта',
    time: '19:00',
    description: 'Акустический джаз, уютная атмосфера, авторские напитки по специальному меню вечера.',
    price: 'Вход свободный',
    spots: 40,
    type: 'music',
  },
  {
    title: 'Каппинг: Эфиопия vs Кения',
    date: '28 марта',
    time: '18:00',
    description: 'Сравниваем два топовых сорта — Yirgacheffe и Kirinyaga. Рассказываем о терруаре и методах обработки. Участники получат карточки ароматов.',
    price: '750 ₽',
    spots: 12,
    type: 'tasting',
  },
  {
    title: 'Воркшоп: пуровер дома',
    date: '4 апреля',
    time: '11:00',
    description: 'Научим заваривать фильтр-кофе дома. Рассказываем о помоле, воде, технике заваривания. Каждый участник получает пакет зерна домой.',
    price: '1 200 ₽',
    spots: 8,
    type: 'workshop',
  },
  {
    title: 'Инди-вечер: Open Mic',
    date: '11 апреля',
    time: '19:30',
    description: 'Открытая сцена для музыкантов и поэтов. Акустика, хорошая компания и specialty кофе до полуночи.',
    price: 'Вход свободный',
    spots: 50,
    type: 'music',
  },
  {
    title: 'Каппинг: Колумбия — путешествие по регионам',
    date: '18 апреля',
    time: '18:00',
    description: 'Дегустируем 4 сорта из разных регионов Колумбии. Изучаем влияние высоты и методов обработки на вкус.',
    price: '750 ₽',
    spots: 12,
    type: 'tasting',
  },
  {
    title: 'Воркшоп: Latte Art для начинающих',
    date: '25 апреля',
    time: '14:00',
    description: 'Учимся рисовать на молоке: сердечко, розетта, тюльпан. Инструктор — наш старший бариста с 5-летним опытом.',
    price: '1 500 ₽',
    spots: 6,
    type: 'workshop',
  },
]
