import Image from 'next/image'
import Link from 'next/link'

import Header from '#/Global/Header/Header'
import Button from '#/UI/Button'

import HeroBackground from '%/hero/background.webp'
import HeroText from '%/hero/text.svg'

import TelImage from '%/socials/tel.svg'
import VkImage from '%/socials/vk.svg'
import TgImage from '%/socials/tg.svg'

import {linksData} from '@/lib/data'

const iconsData = [
  {link: linksData.tel.href, target: '', image: TelImage},
  {link: linksData.vk.href, target: '_blank', image: VkImage},
  {link: linksData.tg.href, target: '_blank', image: TgImage},
]

function HeroSocials() {
  return (
    <div className="flex gap-4">
      {iconsData.map((icon, index) => (
        <Link href={icon.link} target={icon.target} title="icon" key={index} className="duration-200 s-14 xl:s-10 hover:scale-110">
          <Image quality={100} className="object-cover s-full" src={icon.image} alt={`${icon.link} icon`} width={48} height={48} />
        </Link>
      ))}
    </div>
  )
}

const screenHeight = 'h-[100vh] h-[100svh]'

export default function Hero() {
  return (
    <section id="hero" className={`relative flex flex-col flex-1 justify-between py-12 sm:py-7 duration-500 ${screenHeight}`}>
      <Header />
      <div className="grid place-items-center">
        <Image priority quality={100} className="xl:w-[30%] sm:w-[70%] object-cover" src={HeroText} alt="" />
      </div>
      <div className="flex items-center justify-between mx-20 sm:flex-col sm:gap-5 sm:mx-5">
        <Button style="hero" link="#contacts" classes="sm:text-lg sm:w-full">
          Забронировать
        </Button>
        <HeroSocials />
      </div>

      <div className="absolute inset-0 bg-black s-full -z-10">
        <Image priority quality={100} className="object-cover opacity-65 -z-10" src={HeroBackground} fill alt="" />
      </div>
    </section>
  )
}
