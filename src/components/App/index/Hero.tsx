import Image from 'next/image'
import Link from 'next/link'
import Button from '#/UI/Button'
import {linksData} from '@/lib/data'

import HeroBackground from '%/hero/background.webp'
import HeroText from '%/hero/text.svg'

import TelImage from '%/socials/tel.svg'
import VkImage from '%/socials/vk.svg'
import TgImage from '%/socials/tg.svg'

const screenHeight = 'h-screen !h-svh'

const iconsData = [
  {link: linksData.tel.href, image: TelImage},
  {link: linksData.vk.href, image: VkImage},
  {link: linksData.tg.href, image: TgImage},
]

function HeroSocials() {
  return (
    <div className="flex gap-2.5 xl:gap-2 sm:gap-2.5">
      {iconsData.map((icon, index) => (
        <Link href={icon.link} target="_blank" title="icon" key={index} className="duration-200 s-14 xl:s-12 sm:s-11 hover:scale-110 sm:hover:scale-100 sm:active:scale-110 ">
          <Image className="object-cover s-full" src={icon.image} alt={`${icon.link} icon`} width={48} height={48} />
        </Link>
      ))}
    </div>
  )
}

export default function Hero() {
  return (
    <section data-section="hero-index" id="hero" className={`relative ${screenHeight}`}>
      <div className="absolute inset-0 grid place-items-center s-full -z-10">
        <Image priority quality={100} className="xl:w-[30%] sm:w-[70%] mt-5 xl:mt-2 sm:mt-10 object-cover" src={HeroText} alt="" />
      </div>

      <div className="flex items-end justify-between w-full h-full px-16 py-12 sm:justify-center sm:px-3 sm:py-5">
        <Button variant="hero" href="/reservation" className="sm:hidden">
          Забронировать
        </Button>

        <HeroSocials />
      </div>

      <div className="absolute inset-0 bg-black s-full -z-20">
        <Image priority quality={100} className="object-cover opacity-65 -z-10" src={HeroBackground} fill alt="" />
      </div>
    </section>
  )
}
