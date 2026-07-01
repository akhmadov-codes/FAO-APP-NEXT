import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }) {
  return <input type={type} data-slot="input" className={cn('border-2 border-[rgba(226,230,245,1)] card-dark rounded-[16px] px-6 py-3 outline-none transition duration-200 w-full focus:ring-1 focus:ring-blue-400 focus:border-blue-400', className)} {...props} />
}

export { Input }
