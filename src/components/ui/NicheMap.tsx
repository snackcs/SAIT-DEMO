const COORDS: Record<string, { lat: number; lon: number }> = {
  barbershop: { lat: 55.7565, lon: 37.6020 },
  auto:       { lat: 55.6835, lon: 37.6220 },
  dental:     { lat: 55.7625, lon: 37.6085 },
  beauty:     { lat: 55.7415, lon: 37.5390 },
  tutor:      { lat: 55.7620, lon: 37.6440 },
  coffee:     { lat: 55.7645, lon: 37.5920 },
}

export default function NicheMap({ slug }: { slug: string }) {
  const { lat, lon } = COORDS[slug] ?? COORDS.barbershop
  const d = 0.007
  const bbox = `${lon - d},${lat - d * 0.7},${lon + d},${lat + d * 0.7}`
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`

  return (
    <div className="overflow-hidden rounded-3xl ring-1 ring-black/10" style={{ height: 260 }}>
      <iframe
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        title="Карта"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  )
}
