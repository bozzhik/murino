'use client'

import {cn} from '@/lib/utils'
import {useState, useEffect} from 'react'
import {isMobile} from '@bozzhik/is-mobile'

import Link from 'next/link'

const links = [
  {title: 'О нас', link: '#about-us', mobile: false},
  {title: 'Цены', link: '#prices', mobile: true},
  {title: 'Контакты', link: '#contacts', mobile: false},
  {title: 'Забронировать', link: '#contacts', mobile: false},
]

function HeaderLink({link, active, className, children}: {link: string; active?: boolean; children: React.ReactNode; className?: string}) {
  return (
    <Link href={link} className={cn('text-[22px] xl:text-lg sm:text-base px-8 py-3 xl:px-6 xl:py-2 sm:px-4 rounded-large duration-200', !isMobile && active && 'text-white bg-custom-green', className)}>
      {children}
    </Link>
  )
}

export default function HeaderSwitch({className}) {
  const [activeLink, setActiveLink] = useState(links[0].link)
  const [showDynamicLink, setShowDynamicLink] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === 'undefined') {
        return
      }

      const scrollPosition = window.scrollY
      const offsetBeforeHighlight = 200

      links.forEach((link) => {
        const section = document.querySelector(link.link) as HTMLElement
        if (section) {
          const sectionTop = section.offsetTop - offsetBeforeHighlight
          const sectionHeight = section.offsetHeight

          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveLink(link.link)
          }
        }
      })

      const heroSection = document.querySelector('#hero') as HTMLElement
      if (heroSection) {
        const heroSectionTop = heroSection.offsetTop
        setShowDynamicLink(scrollPosition >= heroSectionTop + heroSection.offsetHeight)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [showDynamicLink])

  return (
    <nav className={`fixed z-50 justify-center ${className} text-custom-gray rounded-large p-[3px] font-book flex gap-1 sm:gap-0 bg-white shadow-base`}>
      {links.slice(0, 3).map((link, index) => (
        <HeaderLink key={index} link={link.link} active={link.link === activeLink} className={!link.mobile && 'sm:hidden'}>
          {link.title}
        </HeaderLink>
      ))}

      {!isMobile
        ? showDynamicLink &&
          links.slice(-1).map((link, index) => (
            <HeaderLink key={index} link={link.link} className={`bg-custom-d4 ${!link.mobile && 'sm:hidden'}`}>
              {link.title}
            </HeaderLink>
          ))
        : links.slice(-1).map((link, index) => (
            <HeaderLink key={index} link={link.link} className="text-white bg-custom-green">
              {link.title}
            </HeaderLink>
          ))}
    </nav>
  )
}
