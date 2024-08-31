'use client'

import {useState} from 'react'
import {isMobile} from '@bozzhik/is-mobile'
import {cn} from '@/lib/utils'
import Image from 'next/image'
import {buttonVariants} from '#/UI/Button'

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
    <section data-section="about-index" id="about" className="space-y-10 xl:space-y-7 sm:space-y-5">
      <div className={cn(buttonVariants.base, 'bg-custom-green text-white rounded-smallest sm:py-4', 'w-[60%] mx-auto sm:w-auto sm:mx-3')}>Почему нас выбирают?</div>

      <div className="flex flex-col mx-3 gap-10 xl:gap-7 sm:gap-3.5">
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
