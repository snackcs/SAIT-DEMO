export type Master = {
  name: string
  role: string
  experience: string
  specialties: string[]
  photo: string
  instagram?: string
}

export const barbershopMasters: Master[] = [
  {
    name: 'Артём Волков',
    role: 'Старший барбер',
    experience: '7 лет',
    specialties: ['Классические стрижки', 'Оформление бород', 'Бритьё опасной бритвой'],
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    instagram: '@artem.barber',
  },
  {
    name: 'Денис Крылов',
    role: 'Барбер',
    experience: '5 лет',
    specialties: ['Фейдовые стрижки', 'Камуфляж седины', 'Мужской уход'],
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80',
    instagram: '@denis.cuts',
  },
  {
    name: 'Максим Зайцев',
    role: 'Барбер',
    experience: '3 года',
    specialties: ['Современные стрижки', 'Укладка', 'Стрижки машинкой'],
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80',
    instagram: '@maxim.barber',
  },
]
