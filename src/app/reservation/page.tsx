import {cn} from '@/lib/utils'
import {ArrowDownLeft} from 'lucide-react'

import Link from 'next/link'
import Module from '##/reservation/Module'

export default function ReservPage() {
  return (
    <main className={cn('my-5 sm:mx-3 flex flex-col items-center gap-10 sm:gap-7')}>
      <Link href="/" className="flex gap-1 tracking-tight px-3 py-1.5 text-white uppercase rounded-md bg-custom-gray group hover:bg-[#555] duration-300">
        <ArrowDownLeft className="duration-300 group-hover:rotate-45" />
        на главную
      </Link>

      <Module />
    </main>
  )
}
