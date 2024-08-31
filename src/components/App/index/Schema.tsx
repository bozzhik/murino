'use client'

import {cn} from '@/lib/utils'
import {isMobile} from '@bozzhik/is-mobile'
import {useState, useRef} from 'react'
import {motion} from 'framer-motion'
import {X} from 'lucide-react'

import Image from 'next/image'
import Heading from '#/UI/Heading'
import SchemaSVG from '##/index/SchemaSVG'

import fieldsImage from '%/schema/fields.webp'
import parkingImage from '%/schema/parking.webp'
import gymnastImage from '%/schema/gymnast.webp'
import toiletsImage from '%/schema/toilets.webp'
import showersImage from '%/schema/showers.webp'

const contentData = {
  fields: {image: fieldsImage, text: 'Поля с <span class="text-custom-green">новым</span> искусственным покрытием'},
  parking: {image: parkingImage, text: 'Парковка на <span class="text-custom-green">300</span> мест'},
  cloakroom: {image: showersImage, text: 'Дополнительная раздевалка'},
  gymnast: {image: gymnastImage, text: 'Гимнастический зал <span class="text-custom-green">(скоро будет готов)</span>'},
  toilets: {image: toiletsImage, text: 'Туалеты'},
  showers: {image: showersImage, text: '<span class="text-custom-green">ШЕСТЬ</span> раздевалок с душевыми и теплым полом'},
}

const spanStyles = 'block text-3xl xl:text-2xl sm:text-lg !leading-tight font-medium tracking-tighter uppercase text-center text-custom-gray'

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

  const gridConfig = {
    base: 'grid-cols-7',
    preview: 'col-span-3',
    schema: 'col-span-4',
  }

  const handleMouseEnter = (elementId) => {
    clearTimeout(hoveredTimeout.current)
    hoveredTimeout.current = setTimeout(() => {
      setHoveredElement(elementId)
    }, 250)
  }

  const handleMouseLeave = () => {
    clearTimeout(hoveredTimeout.current)
    setHoveredElement(null)
  }

  const PreviewSection = (image, label) => {
    return (
      <motion.div className="flex flex-col h-full gap-4" initial={{opacity: 0}} animate={{opacity: hoveredElement ? 1 : 0}} transition={{duration: 0.25}}>
        <ContentPreview image={image} label={label} />
      </motion.div>
    )
  }

  const renderContent = () => {
    if (hoveredElement) {
      switch (hoveredElement) {
        case 'fields':
          return PreviewSection(contentData.fields.image, contentData.fields.text)
        case 'parking':
          return PreviewSection(contentData.parking.image, contentData.parking.text)
        case 'cloakroom':
          return PreviewSection(contentData.cloakroom.image, contentData.cloakroom.text)
        case 'gymnast':
          return PreviewSection(contentData.gymnast.image, contentData.gymnast.text)
        case 'toilets':
          return PreviewSection(contentData.toilets.image, contentData.toilets.text)
        case 'showers':
          return PreviewSection(contentData.showers.image, contentData.showers.text)
        default:
          return null
      }
    } else {
      return (
        <div className="grid w-full h-full place-items-center">
          <span className={spanStyles}>
            Наведите курсор на одну <br /> из секций шатра
          </span>
        </div>
      )
    }
  }

  return (
    <div className="p-7 xl:p-5 rounded-small shadow-card">
      <div className={`grid ${gridConfig.base} gap-5`}>
        <div className={`grid ${gridConfig.preview} place-items-center p-5 border-[3px] border-custom-gray rounded-small`}>{renderContent()}</div>

        <div className={`grid ${gridConfig.schema} place-items-center p-5 xl:p-7 overflow-hidden shadow-card rounded-small `}>
          <SchemaSVG platform="desktop" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
        </div>
      </div>
    </div>
  )
}

function MobileSchema() {
  const [clickedElement, setClickedElement] = useState(null)
  const [showIntroText, setShowIntroText] = useState(true)

  const PreviewSection = (image, label) => (
    <div>
      <button onClick={() => setClickedElement(null)} className="absolute top-0 right-0 p-1.5 m-3.5 bg-white rounded-[10px]" title="close">
        <X />
      </button>

      <div className="space-y-3">
        <ContentPreview image={image} label={label} />
      </div>
    </div>
  )

  const renderContent = () => {
    if (clickedElement) {
      const {image, text} = contentData[clickedElement] || {}
      if (!image || !text) return null
      return PreviewSection(image, text)
    }
    return null
  }

  const handleMobileTouch = (elementId) => {
    setClickedElement(elementId)
    setShowIntroText(false)
  }

  return (
    <>
      <div className="relative p-2 space-y-4 shadow-card rounded-[10px]">
        {showIntroText && (
          <h1 className="mt-2 text-sm leading-tight text-center text-custom-95">
            Нажмите на одну из секций <br /> шатра на схеме
          </h1>
        )}

        {renderContent() || <SchemaSVG platform="mobile" onMobileTouch={handleMobileTouch} />}
      </div>
    </>
  )
}
