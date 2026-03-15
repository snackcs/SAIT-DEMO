export type CoffeeOrigin = {
  country: string
  region: string
  farm: string
  process: string
  altitude: string
  notes: string[]
  sca: number
  flag: string
}

export const coffeeOrigins: CoffeeOrigin[] = [
  {
    country: 'Эфиопия',
    region: 'Yirgacheffe',
    farm: 'Kochere Cooperative',
    process: 'Натуральный',
    altitude: '1800–2200 м',
    notes: ['Жасмин', 'Персик', 'Черника'],
    sca: 88,
    flag: '🇪🇹',
  },
  {
    country: 'Колумбия',
    region: 'Huila',
    farm: 'Finca El Paraíso',
    process: 'Мытый',
    altitude: '1650–1900 м',
    notes: ['Тёмный шоколад', 'Лесной орех', 'Карамель'],
    sca: 86,
    flag: '🇨🇴',
  },
  {
    country: 'Кения',
    region: 'Kirinyaga',
    farm: 'Karimikui Factory',
    process: 'Мытый / Дважды',
    altitude: '1700–1900 м',
    notes: ['Чёрная смородина', 'Томат', 'Цитрус'],
    sca: 87,
    flag: '🇰🇪',
  },
  {
    country: 'Гватемала',
    region: 'Antigua',
    farm: 'La Hermosa',
    process: 'Honey',
    altitude: '1500–1700 м',
    notes: ['Молочный шоколад', 'Абрикос', 'Коричневый сахар'],
    sca: 85,
    flag: '🇬🇹',
  },
]
