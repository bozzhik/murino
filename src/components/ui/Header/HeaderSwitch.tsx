'use client'

import {useState, useEffect} from 'react'
import {isMobile} from '@/lib/utils'

import Link from 'next/link'

interface HeaderLinkProps {
  link: string
  active?: boolean
  children: React.ReactNode
  classes?: string
}

function HeaderLink({link, active, classes, children}: HeaderLinkProps) {
  return (
    <Link href={link} className={`text-[22px] xl:text-lg px-8 py-3 xl:px-6 xl:py-2 rounded-large ${active ? 'text-white !bg-custom-green duration-200' : ''} ${classes}`}>
      {children}
    </Link>
  )
}

const links = [
  {title: 'О нас', link: '#about-us'},
  {title: 'Цены', link: '#prices'},
  {title: 'Контакты', link: '#contacts'},
  {title: 'Забронировать', link: '#prices'},
]

export default function HeaderSwitch() {
  const [activeLink, setActiveLink] = useState(links[0].link)
  const [showDynamicLink, setShowDynamicLink] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === 'undefined') {
        return
      }

      const scrollPosition = window.scrollY
      const offsetBeforeHighlight = 200

      !isMobile &&
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
    <nav className={`fixed z-50 sm:bottom-5 justify-center sm:w-[90%] sm:right-5 right-20 text-custom-gray rounded-large p-[3px] font-book flex gap-1 sm:gap-0 bg-white shadow-base ${!showDynamicLink && isMobile && 'bg-transparent shadow-none'}`}>
      {!isMobile &&
        links.slice(0, 3).map((link, index) => (
          <HeaderLink key={index} link={link.link} active={link.link === activeLink}>
            {link.title}
          </HeaderLink>
        ))}
      {showDynamicLink &&
        links.slice(-1).map((link, index) => (
          <HeaderLink key={index} link={link.link} classes="bg-custom-e4 sm:bg-transparent sm:uppercase hover:bg-custom-green hover:text-white duration-200">
            {link.title}
          </HeaderLink>
        ))}
    </nav>
  )
}
