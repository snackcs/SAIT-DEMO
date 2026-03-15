import type { NicheData } from '@/data/types'
import Header from './Header'
import Footer from './Footer'
import DemoBanner from '@/components/sections/DemoBanner'

export default function NicheLayout({
  data,
  children,
}: {
  data: NicheData
  children: React.ReactNode
}) {
  return (
    <>
      <DemoBanner color={data.color} />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
