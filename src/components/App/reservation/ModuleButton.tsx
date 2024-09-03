import * as React from 'react'
import {cn} from '@/lib/utils'

const moduleButtomStyles = {
  base: 'w-full py-5 xl:py-4 sm:py-3 sm:px-2 text-custom-gray bg-custom-d4 rounded-smallest',
  typo: 'text-2xl xl:text-xl sm:text-xl font-medium text-center uppercase',
  hover: 'hover:text-white hover:bg-custom-gray duration-200',
}
const {base, typo, hover} = moduleButtomStyles

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export const ModuleButton = React.forwardRef<HTMLButtonElement, ButtonProps>(({className, asChild = false, ...props}, ref) => {
  return <button className={cn([base, typo, hover], className)} ref={ref} {...props} />
})
ModuleButton.displayName = 'ModuleButton'
