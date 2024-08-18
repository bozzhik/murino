import Image from 'next/image'
import Link from 'next/link'

import HeaderSwitch from '#/Global/Header/HeaderSwitch'
import LogoImage from '%/logo.svg'

export default function Header() {
  return (
    <header className="flex items-center justify-between mx-20 text-white sm:mx-0">
      <Link href="/" className="flex gap-3 sm:ml-5">
        <Image quality={100} className="object-contain xl:w-14" src={LogoImage} width={72} height={0} priority alt="Логотип Мурино Арена" />
        <span className="text-[32px] xl:text-2xl !leading-none sm:hidden">
          футбольный <br />
          шатер
        </span>
      </Link>
      <HeaderSwitch />
    </header>
  )
}
