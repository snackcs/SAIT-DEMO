export type Doctor = {
  name: string
  specialty: string
  experience: string
  education: string
  achievements: string[]
  photo: string
}

export const dentalDoctors: Doctor[] = [
  {
    name: 'Игорь Александров',
    specialty: 'Главный врач, Имплантолог',
    experience: '18 лет',
    education: 'МГМСУ им. Евдокимова, специализация Nobel Biocare',
    achievements: ['Установил 1200+ имплантов', 'Сертификат All-on-4', 'Член РААИ'],
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80',
  },
  {
    name: 'Татьяна Белова',
    specialty: 'Ортодонт',
    experience: '12 лет',
    education: 'Первый МГМУ им. Сеченова, ординатура по ортодонтии',
    achievements: ['Специалист по Invisalign', '800+ случаев лечения', 'Победитель конкурса молодых ортодонтов 2019'],
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80',
  },
  {
    name: 'Роман Сидоров',
    specialty: 'Терапевт, Эстетическая стоматология',
    experience: '10 лет',
    education: 'РНИМУ им. Пирогова',
    achievements: ['Специалист по реставрации E.max', 'Лечение под микроскопом', 'Сертификат CEREC'],
    photo: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&q=80',
  },
  {
    name: 'Ольга Фёдорова',
    specialty: 'Детский стоматолог',
    experience: '8 лет',
    education: 'МГМСУ, специализация детская стоматология',
    achievements: ['Лечение без страха', 'Седация закисью азота', 'Специалист по молочным зубам'],
    photo: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=600&q=80',
  },
]
