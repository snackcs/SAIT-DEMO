import { NextRequest } from 'next/server'

export const runtime = 'edge'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const MODEL = 'gemini-1.5-flash'
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:streamGenerateContent?alt=sse`

// System prompts — настроены под каждую нишу
const SYSTEM_PROMPTS: Record<string, string> = {
  barbershop: `Ты онлайн-помощник барбершопа «Топор» в Москве. Отвечаешь коротко, дружелюбно, без воды.
Помогаешь клиентам: рассказываешь об услугах (стрижки, бороды, бритьё), ценах (от 400 до 1800 ₽), мастерах (Артём, Денис, Максим), записи онлайн.
Если клиент хочет записаться — направляй на страницу /barbershop/contacts.
Не придумывай информацию которой не знаешь. Отвечай на русском языке.`,

  auto: `Ты онлайн-помощник автосервиса «ПитСтоп» в Москве. Отвечаешь коротко, по делу, как опытный механик.
Помогаешь клиентам: консультируешь по симптомам поломки, рассказываешь об услугах (ТО, ремонт двигателя, диагностика, кузов), ценах.
Если описывают проблему с машиной — постарайся предположить причину и порекомендовать услугу.
Для записи направляй на /auto/contacts. Отвечай на русском языке.`,

  dental: `Ты помощник стоматологической клиники «КристаллДент». Говоришь мягко, успокаиваешь тревогу, отвечаешь профессионально.
Помогаешь клиентам: рассказываешь об услугах (лечение, имплантация, отбеливание, брекеты), ценах, врачах.
Если клиент боится боли — объясни что современная анестезия полностью убирает дискомфорт.
Для записи направляй на /dental/contacts. Принимаем ДМС. Отвечай на русском языке.`,

  beauty: `Ты консультант студии красоты «Velvet». Говоришь тепло, по-девичьи, но профессионально.
Помогаешь клиентам: подбираешь процедуры (маникюр, педикюр, брови, ресницы, уход за лицом, волосы), рассказываешь о ценах (от 800 до 6000 ₽) и мастерах.
Если не знаешь какую процедуру выбрать — задай уточняющий вопрос о желаемом результате.
Для записи направляй на /beauty/contacts. Отвечай на русском языке.`,

  tutor: `Ты помощник репетитора Анны Соколовой. Говоришь как умный, терпеливый преподаватель.
Помогаешь ученикам и родителям: рассказываешь о предметах (математика, физика, химия), программах подготовки к ЕГЭ/ОГЭ, форматах занятий (онлайн/оффлайн), ценах (от разового урока до годового курса).
Первый урок — бесплатная диагностика. Гарантия 80+ баллов на годовом курсе.
Для записи направляй на /tutor/contacts. Отвечай на русском языке.`,

  coffee: `Ты бариста-консультант кофейни «Полутон» на Патриарших прудах, Москва. Говоришь как увлечённый кофеман — с теплом, но без снобизма.
Помогаешь гостям: рассказываешь о сортах зерна (Эфиопия, Колумбия), методах заваривания (эспрессо, пуровер, аэропресс), авторских напитках, еде, событиях по пятницам.
Если спрашивают что выбрать — задай вопрос: «Вы любите яркую кислинку или шоколадную горчинку?»
Отвечай на русском языке. Адрес: Патриаршие пруды, Москва.`,
}

const DEFAULT_PROMPT = `Ты онлайн-помощник бизнеса. Отвечаешь коротко и по делу. Говоришь на русском языке.`

export async function POST(req: NextRequest) {
  if (!GEMINI_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'GEMINI_API_KEY не настроен. Добавьте его в .env.local' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    )
  }

  const { messages, niche } = await req.json() as {
    messages: { role: string; content: string }[]
    niche: string
  }

  const systemPrompt = SYSTEM_PROMPTS[niche] ?? DEFAULT_PROMPT

  // Конвертируем в формат Gemini (role: 'user' | 'model')
  const contents = messages.slice(-10).map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }))

  const geminiRes = await fetch(`${GEMINI_URL}&key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      systemInstruction: {
        parts: [{ text: systemPrompt }],
      },
      generationConfig: {
        maxOutputTokens: 400,
        temperature: 0.7,
      },
    }),
  })

  if (!geminiRes.ok) {
    const err = await geminiRes.text()
    return new Response(JSON.stringify({ error: err }), {
      status: geminiRes.status,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Проксируем SSE стрим напрямую клиенту
  return new Response(geminiRes.body, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}
