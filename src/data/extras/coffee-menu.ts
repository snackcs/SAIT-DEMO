export type MenuItem = {
  name: string
  description: string
  price: string
  category: 'espresso' | 'filter' | 'signature' | 'food'
  popular?: boolean
}

export const coffeeMenu: MenuItem[] = [
  // Espresso
  { name: 'Эспрессо', description: 'Двойной shot, Ethiopia Yirgacheffe, 18г', price: '150 ₽', category: 'espresso' },
  { name: 'Американо', description: 'Двойной эспрессо + горячая вода 180мл', price: '170 ₽', category: 'espresso' },
  { name: 'Капучино', description: 'Двойной эспрессо + молоко 180мл, t° 60–65°', price: '210 ₽', category: 'espresso', popular: true },
  { name: 'Флэт уайт', description: 'Двойной ристретто + молоко 130мл, плотная текстура', price: '230 ₽', category: 'espresso', popular: true },
  { name: 'Латте', description: 'Двойной эспрессо + молоко 280мл', price: '240 ₽', category: 'espresso' },
  { name: 'Раф классический', description: 'Эспрессо + сливки 33% + ваниль', price: '270 ₽', category: 'espresso' },
  // Filter
  { name: 'Пуровер V60', description: 'Kenya AA, цитрусовые ноты, 300мл', price: '280 ₽', category: 'filter', popular: true },
  { name: 'Аэропресс', description: 'Colombia Huila, шоколад + орех, 250мл', price: '260 ₽', category: 'filter' },
  { name: 'Кемекс', description: 'Ethiopia Sidama, жасмин + персик, 400мл', price: '320 ₽', category: 'filter' },
  { name: 'Холодный брю', description: 'Медленная экстракция 12 часов, Ethiopia, 300мл', price: '290 ₽', category: 'filter' },
  // Signature
  { name: 'Апельсин-кардамон', description: 'Эспрессо + апельсиновый сироп + кардамон + молоко', price: '290 ₽', category: 'signature', popular: true },
  { name: 'Матча-кокос', description: 'Церемониальная матча + кокосовое молоко + агава', price: '310 ₽', category: 'signature' },
  { name: 'Гриб-чага', description: 'Экстракт чаги + миндальное молоко + мёд', price: '320 ₽', category: 'signature' },
  { name: 'Розовый латте', description: 'Питайя + кокосовое молоко + ваниль', price: '300 ₽', category: 'signature' },
  // Food
  { name: 'Круассан масляный', description: 'Выпекаем каждое утро, 110г', price: '180 ₽', category: 'food', popular: true },
  { name: 'Бананово-ореховый хлеб', description: 'Фирменная рецептура, кусок 120г', price: '160 ₽', category: 'food', popular: true },
  { name: 'Авокадо-тост', description: 'Цельнозерновой хлеб, авокадо, помидор, яйцо', price: '390 ₽', category: 'food' },
  { name: 'Чизкейк нью-йорк', description: 'Классический, крем-чиз, песочное тесто, 120г', price: '240 ₽', category: 'food' },
]

export const menuCategories = [
  { key: 'all', label: 'Всё меню' },
  { key: 'espresso', label: 'Эспрессо' },
  { key: 'filter', label: 'Фильтр' },
  { key: 'signature', label: 'Авторские' },
  { key: 'food', label: 'Еда' },
] as const
