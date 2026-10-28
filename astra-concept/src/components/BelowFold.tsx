import { useEffect } from 'react'
import { Booking, type Prefill } from './Booking'
import { Contact } from './Contact'
import { Doctors } from './Doctors'
import { Footer } from './Footer'
import { Journey } from './Journey'
import { Reviews } from './Reviews'
import { Services } from './Services'
import { Showcase } from './Showcase'
import { Why } from './Why'

/** Everything under the hero. Loaded as its own chunk once the first screen has settled. */
export function Sections({ prefill }: { prefill: Prefill | null }) {
  useEffect(() => {
    window.dispatchEvent(new Event('astra:below-mounted'))
  }, [])
  return (
    <>
      <Services />
      <Showcase />
      <Doctors />
      <Booking prefill={prefill} />
      <Why />
      <Journey />
      <Reviews />
      <Contact />
    </>
  )
}

export { Footer }
