'use client'

import {cn} from '@/lib/utils'
import {isMobile} from '@bozzhik/is-mobile'
import {useState, useRef} from 'react'
import {motion} from 'framer-motion'
import {X} from 'lucide-react'

import Image from 'next/image'
import Heading from '#/UI/Heading'
import SchemaSVG from '##/index/SchemaSVG'

import fieldOneImage from '%/schema/field1.jpg'
import fieldTwoImage from '%/schema/field2.jpg'
import fieldThreeImage from '%/schema/field3.jpg'
import parkingImage from '%/schema/parking.jpg'
// import canteenImage from '%/schema/none.webp'
import toiletsImage from '%/schema/toilets.jpg'
import showersImage from '%/schema/showers.jpg'

const contentData = {
  field_one: {image: fieldOneImage, text: 'Поле с <span class="text-custom-green">новым</span> искусственным покрытием'},
  field_two: {image: fieldTwoImage, text: 'Поле с <span class="text-custom-green">новым</span> искусственным покрытием'},
  field_three: {image: fieldThreeImage, text: 'Поле с <span class="text-custom-green">новым</span> искусственным покрытием'},
  parking: {image: parkingImage, text: 'Парковка на <span class="text-custom-green">300</span> мест'},
  // canteen: {image: canteenImage, text: 'Столовая <span class="text-custom-green">(скоро будет готова)</span>'},
  toilets: {image: toiletsImage, text: 'Туалеты'},
  showers: {image: showersImage, text: '<span class="text-custom-green">ШЕСТЬ</span> раздевалок с душевыми и теплым полом'},
}

const spanStyles = 'block text-2xl xl:text-xl sm:text-base !leading-tight font-medium tracking-tighter uppercase text-center text-custom-gray'

export default function Schema() {
  return (
    <section data-section="about-index" id="schema" className="space-y-5">
      <Heading text="Cхема шатра" />
      {!isMobile ? <DesktopSchema /> : <MobileSchema />}
    </section>
  )
}

const ContentPreview = ({image, label}) => (
  <>
    <Image priority={true} loading="eager" quality={100} className="object-cover w-full h-full rounded-smallest sm:rounded-[10px]" src={image} alt={label} />
    <span className={cn(spanStyles)} dangerouslySetInnerHTML={{__html: label}} />
  </>
)

function DesktopSchema() {
  const [hoveredElement, setHoveredElement] = useState(null)
  const hoveredTimeout = useRef(null)

  const handleMouseEnter = (elementId) => {
    clearTimeout(hoveredTimeout.current)
    hoveredTimeout.current = setTimeout(() => setHoveredElement(elementId), 250)
  }

  const handleMouseLeave = () => {
    clearTimeout(hoveredTimeout.current)
    setHoveredElement(null)
  }

  const renderContent = () => {
    if (!hoveredElement) {
      return (
        <div className="grid w-full h-full place-items-center">
          <span className={spanStyles}>
            Наведите курсор на одну <br /> из секций шатра
          </span>
        </div>
      )
    }

    const {image, text} = contentData[hoveredElement] || {}
    return (
      <motion.div className="flex flex-col h-full gap-4" initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.25}}>
        <ContentPreview image={image} label={text} />
      </motion.div>
    )
  }

  const gridConfig = {
    base: 'grid-cols-7',
    preview: 'col-span-3',
    schema: 'col-span-4',
  }

  return (
    <div className="p-7 xl:p-5 rounded-small shadow-card">
      <div className={`grid ${gridConfig.base} gap-7 xl:gap-5`}>
        <div className={`grid ${gridConfig.preview} place-items-center p-5 border-[3px] border-custom-gray rounded-small`}>{renderContent()}</div>

        <div className={`grid ${gridConfig.schema} place-items-center p-5 overflow-hidden shadow-card rounded-small`}>
          <SchemaSVG platform="desktop" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
        </div>
      </div>
    </div>
  )
}

function MobileSchema() {
  const [clickedElement, setClickedElement] = useState(null)
  const [showIntroText, setShowIntroText] = useState(true)

  const handleMobileTouch = (elementId) => {
    setClickedElement(elementId)
    setShowIntroText(false)
  }

  const renderContent = () => {
    if (!clickedElement) return null
    const {image, text} = contentData[clickedElement] || {}
    return (
      <div>
        <button onClick={() => setClickedElement(null)} className="absolute top-0 right-0 p-1.5 m-3.5 bg-white rounded-[10px]" title="close">
          <X />
        </button>

        <div className="space-y-3">
          <ContentPreview image={image} label={text} />
        </div>
      </div>
    )
  }

  return (
    <div className="relative p-2 space-y-4 shadow-card rounded-[10px]">
      {showIntroText && (
        <h1 className="mt-2 text-sm leading-tight text-center text-custom-95">
          Нажмите на одну из секций <br /> шатра на схеме
        </h1>
      )}

      {renderContent() || <SchemaSVG platform="mobile" onMobileTouch={handleMobileTouch} />}
    </div>
  )
}
