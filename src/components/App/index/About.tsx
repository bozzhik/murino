'use client'

import {cn} from '@/lib/utils'
import {isMobile} from '@bozzhik/is-mobile'
import {useState} from 'react'

import Image from 'next/image'
import Heading from '#/UI/Heading'

const cardsData = Array.from({length: 3}, (_, index) => ({
  image: require(`%/about/${index + 1}.webp`).default,
  hoverImage: require(`%/about/${index + 1}_hover.webp`).default,
  mobileImage: require(`%/about/${index + 1}_mobile.webp`).default,
}))

const Card = ({image, hoverImage, mobileImage, isLastCard = false}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative w-full overflow-hidden rounded-small shadow-card" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {!isMobile && (
        <>
          <Image quality={100} className={`object-cover w-full transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`} src={image} alt="" width={isLastCard ? '2000' : '1000'} height={1000} />
          <Image quality={100} className={`absolute inset-0 object-cover -z-10 w-full transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} src={hoverImage} alt="" width={isLastCard ? '2000' : '1000'} height={1000} />
        </>
      )}
      {isMobile && <Image quality={100} className="object-cover w-full" src={mobileImage} alt="" width={isLastCard ? '2000' : '1000'} height={1000} />}
    </div>
  )
}

export default function About() {
  return (
    <section data-section="about-index" id="about" className={cn('scroll-m-10', 'space-y-10 xl:space-y-7 sm:space-y-5')}>
      <Heading text={'Почему нас выбирают?'} />

      <div className="flex flex-col gap-10 xl:gap-7 sm:gap-3.5">
        <div className="grid justify-between grid-cols-2 sm:grid-cols-1 gap-10 xl:gap-7 sm:gap-3.5">
          {cardsData.slice(0, 2).map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
        <div className="flex justify-between w-full h-full">
          {cardsData.slice(2, 3).map((card, index) => (
            <Card key={index} {...card} isLastCard />
          ))}
        </div>
      </div>
    </section>
  )
}
