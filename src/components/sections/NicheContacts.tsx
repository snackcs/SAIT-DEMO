import type { NicheData } from '@/data/types'
import { MapPin, Phone, Clock, Send, Instagram, MessageCircle } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'
import NicheMap from '@/components/ui/NicheMap'
import NicheContactForm from './NicheContactForm'

export default function NicheContacts({ data }: { data: NicheData }) {
  const c = data.contacts

  return (
    <section id="contacts" className="bg-white py-24">
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn>
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest" style={{ color: data.color }}>
            Контакты
          </p>
          <h2 className="text-center font-serif text-3xl font-bold text-[#0F172A] md:text-4xl">
            Свяжитесь с нами
          </h2>
        </FadeIn>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          {/* Left: info + map */}
          <FadeIn variant="card">
            <div className="space-y-5">
              {c.address && (
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: `${data.color}18` }}>
                    <MapPin size={18} style={{ color: data.color }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#475569]">Адрес</p>
                    <p className="mt-1 text-sm text-[#0F172A]">{c.address}</p>
                  </div>
                </div>
              )}

              {c.phone && (
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: `${data.color}18` }}>
                    <Phone size={18} style={{ color: data.color }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#475569]">Телефон</p>
                    <a href={`tel:${c.phone.replace(/\s/g, '')}`}
                      className="mt-1 block text-sm font-semibold text-[#0F172A] transition-opacity hover:opacity-70">
                      {c.phone}
                    </a>
                  </div>
                </div>
              )}

              {c.hours && (
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: `${data.color}18` }}>
                    <Clock size={18} style={{ color: data.color }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#475569]">Режим работы</p>
                    <p className="mt-1 text-sm text-[#0F172A]">{c.hours}</p>
                  </div>
                </div>
              )}

              {/* Social links row */}
              <div className="flex flex-wrap gap-2 pt-1">
                {c.telegram && (
                  <a href={`https://t.me/${c.telegram.replace('@', '')}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: '#0088CC' }}>
                    <Send size={13} /> Telegram
                  </a>
                )}
                {c.whatsapp && (
                  <a href={`https://wa.me/${c.whatsapp.replace(/[\s\-()+ ]/g, '')}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: '#25D366' }}>
                    <MessageCircle size={13} /> WhatsApp
                  </a>
                )}
                {c.instagram && (
                  <a href={`https://instagram.com/${c.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90">
                    <Instagram size={13} /> Instagram
                  </a>
                )}
              </div>
            </div>

            {/* Map */}
            <div className="mt-6">
              <NicheMap slug={data.slug} />
            </div>
          </FadeIn>

          {/* Right: form */}
          <FadeIn variant="card" delay={0.12}>
            <NicheContactForm color={data.color} />
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
