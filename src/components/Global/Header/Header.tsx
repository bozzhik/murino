import Image from 'next/image'
import LogoImage from '%/logo.svg'

import HeaderSwitch from '#/Global/Header/HeaderSwitch'

export default function Header() {
  return (
    <header className="absolute flex items-center justify-between py-10 mx-16 text-white sm:py-5 sm:mx-3">
      <div className="flex gap-3 sm:gap-2.5">
        <Image quality={100} className="object-contain xl:s-14 sm:s-9" src={LogoImage} width={72} height={0} priority alt="Логотип Мурино Арена" />
        <span className="text-3xl xl:text-2xl sm:text-lg tracking-[-0.015em] !leading-none sm:hidden">
          футбольный <br />
          шатер
        </span>
      </div>

      <HeaderSwitch className="right-16 sm:right-3" />
    </header>
  )
}
