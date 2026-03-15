import type { LucideIcon } from '@/data/types'
import { Cpu, Zap, Droplets, Wind, Gauge, Thermometer } from 'lucide-react'

export type DiagnosticService = {
  Icon: LucideIcon
  name: string
  description: string
  includes: string[]
  duration: string
  price: string
}

export const autoDiagnostics: DiagnosticService[] = [
  {
    Icon: Cpu,
    name: 'Компьютерная диагностика',
    description: 'Сканирование всех электронных блоков управления. Считывание ошибок, анализ датчиков.',
    includes: ['Двигатель (ECU)', 'Трансмиссия', 'ABS и ESP', 'Подушки безопасности', 'Климат'],
    duration: '30–40 мин',
    price: 'от 800 ₽',
  },
  {
    Icon: Zap,
    name: 'Диагностика электрики',
    description: 'Проверка проводки, АКБ, генератора, стартера. Поиск утечки тока.',
    includes: ['Аккумулятор', 'Генератор', 'Стартер', 'Утечка тока', 'Освещение'],
    duration: '45–60 мин',
    price: 'от 1 200 ₽',
  },
  {
    Icon: Droplets,
    name: 'Диагностика двигателя',
    description: 'Замер компрессии, проверка системы питания, давление масла и охлаждения.',
    includes: ['Компрессия', 'Система питания', 'Давление масла', 'Охлаждение', 'ГРМ'],
    duration: '60–90 мин',
    price: 'от 2 000 ₽',
  },
  {
    Icon: Wind,
    name: 'Диагностика подвески',
    description: 'Визуальный осмотр и инструментальная проверка ходовой части на стенде.',
    includes: ['Амортизаторы', 'Рычаги', 'Сайлентблоки', 'Рулевые наконечники', 'Подшипники'],
    duration: '30–45 мин',
    price: 'от 1 000 ₽',
  },
  {
    Icon: Gauge,
    name: 'Диагностика тормозов',
    description: 'Проверка тормозного пути, состояния колодок, дисков и тормозной жидкости.',
    includes: ['Тормозные колодки', 'Диски', 'Суппорты', 'Тормозная жидкость', 'ABS'],
    duration: '20–30 мин',
    price: 'от 600 ₽',
  },
  {
    Icon: Thermometer,
    name: 'Диагностика кондиционера',
    description: 'Проверка давления фреона, работы компрессора, состояния радиатора.',
    includes: ['Давление фреона', 'Компрессор', 'Радиатор', 'Испаритель', 'Утечки'],
    duration: '20–30 мин',
    price: 'от 800 ₽',
  },
]
