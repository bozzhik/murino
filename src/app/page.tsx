import Hero from '##/Hero'
import About from '##/About'
import Gallery from '##/Gallery'
import Schema from '##/Schema'
import Prices from '##/Prices'
import Contacts from '##/Contacts'

import Footer from '#/Global/Footer'

export default function Index() {
  return (
    <div>
      <Hero />
      <About />
      <Gallery />
      <Schema />
      <Prices />
      <Contacts />
      <Footer />
    </div>
  )
}
