import {cn} from '@/lib/utils'

interface Props {
  children: React.ReactNode
  direction?: 'row' | 'col'
  className?: string
}

export const directionClasses = {
  row: 'sm:flex-col',
  col: 'flex-col',
}

export default function ModuleContent({children, direction = 'row', className}: Props) {
  return <main className={cn('flex w-full gap-2 sm:gap-2', directionClasses[direction], className)}>{children}</main>
}
