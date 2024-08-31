'use client'

import {cn} from '@/lib/utils'
import {isMobile} from '@bozzhik/is-mobile'
import {useState, useRef} from 'react'
import {linksData} from '@/lib/data'

import Link from 'next/link'
import Image from 'next/image'

import {Copy} from 'lucide-react'
import VkImage from '%/socials/vk.svg'
import TgImage from '%/socials/tg.svg'
import MapImage from '%/contacts/map.svg'

const buttonStyles = {
  default: 'py-2.5 sm:px-2 text-4xl xl:text-3xl sm:text-xl text-center uppercase rounded-smallest sm:rounded-xl duration-200 hover:text-custom-gray hover:ring-[3px] hover:ring-custom-gray',
  light: 'text-custom-gray bg-custom-d4',
  dark: 'text-white bg-custom-gray hover:bg-transparent',
}

const ContactSection = ({heading, className = '', children}) => (
  <div className={cn('flex flex-col p-5 sm:p-3 w-full gap-4 border-[3px] border-custom-gray rounded-small', className)}>
    <h1 className="text-xl font-medium text-center uppercase sm:text-base sm:leading-tight text-custom-gray" dangerouslySetInnerHTML={{__html: heading}} />
    {children}
  </div>
)

const SocialButtons = () => (
  <div className="flex flex-col gap-3 sm:gap-2">
    {['vk', 'tg'].map((socialMedia) => (
      <Link href={linksData[socialMedia].href} className={cn(buttonStyles.default, buttonStyles.dark, 'group inline-flex justify-center items-center gap-3 sm:gap-2')} target="_blank" key={socialMedia}>
        <Image quality={100} className="duration-200 s-9 sm:s-7 group-hover:scale-110" src={socialMedia === 'vk' ? VkImage : TgImage} width={70} height={70} alt="" />
        {linksData[socialMedia].text}
      </Link>
    ))}
  </div>
)

export default function Contacts() {
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const buttonRef = useRef<HTMLAnchorElement>(null)

  const handleCopyClick = async (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault()
    try {
      const input = document.createElement('input')
      input.value = linksData.copy.text
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      setCopiedText('Скопировано!')
      setTimeout(() => setCopiedText(null), 2500)
    } catch (error) {
      console.error('Failed to copy text: ', error)
      alert('Не скопировано!')
    }
  }

  return (
    <section data-section="contacts-index" id="contacts">
      <div className="flex items-center justify-between sm:flex-col rounded-small shadow-card p-7 sm:p-3 gap-7">
        <div className="relative w-full overflow-hidden rounded-small shadow-card">
          <iframe className="w-full h-[70vh] sm:h-[30vh]" src={`https://yandex.ru/map-widget/v1/?ll=30.476999%2C60.043193&mode=search&oid=76918350984&ol=biz&source=serp_navig&z=${!isMobile ? '17.5' : '16'}`} frameBorder="1" title="map"></iframe>
        </div>

        <div className="flex flex-col items-center gap-5 justify-self-center w-[75%] sm:w-full px-10 sm:px-0">
          <ContactSection heading={`телефон <span class='text-neutral-400'>(круглосуточно)</span>`}>
            <div className="flex flex-col gap-6 sm:gap-2">
              <Link href={linksData.tel.href} ref={buttonRef} className={cn(buttonStyles.default, buttonStyles.light)} target="_blank">
                {linksData.tel.text}
              </Link>

              <SocialButtons />
            </div>
          </ContactSection>

          <ContactSection heading="адрес">
            <div className="flex flex-col gap-3 sm:gap-2">
              <Link href={linksData.copy.href} onClick={handleCopyClick} className={cn(buttonStyles.default, buttonStyles.light, 'group py-4 inline-flex justify-center items-center gap-3 text-2xl xl:text-lg sm:text-sm font-medium')} target="_blank">
                {copiedText ? (
                  <span>{copiedText}</span>
                ) : (
                  <>
                    {linksData.copy.text}
                    <Copy className="duration-200 group-hover:scale-[1.25] s-5" />
                  </>
                )}
              </Link>

              <Link href={linksData.map.href} className={cn(buttonStyles.default, buttonStyles.dark, 'group inline-flex justify-center items-center gap-3 sm:gap-2 xl:text-2xl sm:text-lg normal-case')} target="_blank">
                <Image quality={100} className="duration-200 s-9 sm:s-7 group-hover:scale-110" src={MapImage} width={70} height={70} alt="" />
                {linksData.map.text}
              </Link>
            </div>
          </ContactSection>
        </div>
      </div>
    </section>
  )
}
