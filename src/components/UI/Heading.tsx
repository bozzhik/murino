import {cn} from '@/lib/utils'

type Props = {
  size?: 'full' | 'half'
  className?: string
  text: string
}

export default function Heading({size = 'half', className, text}: Props) {
  return <div className={cn('py-5 xl:py-3.5 sm:py-2.5 text-3xl xl:text-xl sm:text-lg font-medium uppercase tracking-tighter text-center text-white bg-custom-green rounded-smallest', size === 'half' ? 'w-[60%] mx-auto sm:w-full' : '', className)}>{text}</div>
}
