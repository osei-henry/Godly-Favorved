import Hero from '../Components/Hero'
import Services from '../Components/Services'
import Insurance from '../Components/Insurance'
import Doctors from '../Components/Doctors'
import Testimonials from '../Components/Testimonials'
import Gallery from '../Components/Gallery'
import LatestPosts from '../Components/LatestPosts'
import FAQ from '../Components/FAQ'
import Booking from '../Components/Booking'
import Contact from '../Components/Contact'
import { clinic } from '../Data/clinic'

export default function Home() {
  return (
    <>
      <title>{`${clinic.name} | Eye care you can trust`}</title>
      <Hero />
      <Services />
      <Insurance />
      <Doctors />
      <Testimonials />
      <Gallery />
      <LatestPosts />
      <FAQ />
      <Booking />
      <Contact />
    </>
  )
}