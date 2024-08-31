import Link from 'next/link'
import {linksData} from '@/lib/data'

const FooterLink = ({href, text}) => (
  <Link href={href} target="_blank" className="underline duration-200 hover:no-underline">
    {text}
  </Link>
)

export default function Footer() {
  const {copy, tel} = linksData

  return (
    <footer className="p-5 !mt-10 xl:!mt-7 sm:pb-3 text-lg sm:p-0 xl:text-base sm:text-xs">
      <section className="flex justify-between sm:hidden">
        <div className="flex items-center gap-4">
          <h1 className="text-xl">©</h1>
          <h1>OOO «Кронос»</h1>
        </div>
        <div className="flex gap-7">
          {copy && <FooterLink href={copy.href} text={copy.text} />}
          {tel && <FooterLink href={tel.href} text={tel.text} />}
          <h1>Круглосуточно</h1>
        </div>
      </section>

      <section className="hidden sm:grid sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <h1>OOO «Кронос»</h1>
          {copy && <FooterLink href={copy.href} text={copy.text} />}
        </div>
        <div className="flex flex-col items-end gap-1">
          {tel && <FooterLink href={tel.href} text={tel.text} />}
          <h1>Круглосуточно</h1>
        </div>
      </section>
    </footer>
  )
}
