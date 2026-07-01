import * as React from 'react'
import { cva } from 'class-variance-authority'
import { Slot } from 'radix-ui'

import { cn } from '@/lib/utils'

const buttonVariants = cva('group/button inline-flex shrink-0 items-center justify-center cursor-pointer rounded-xl border border-transparent bg-clip-padding text-sm font-bold whitespace-nowrap transition-all outline-none select-none ' + 'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 ' + 'active:scale-[95%] disabled:pointer-events-none disabled:opacity-50 ' + 'aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 ' + "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
  variants: {
    variant: {
      default: 'bg-[#3286FB] text-white hover:bg-[#5199ff]',
      warning: 'bg-rose-500 text-white hover:bg-rose-400',
      outline: 'border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
      secondary: 'bg-secondary text-secondary-foreground rounded-[16px]',
      ghost: 'font-medium hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50',
      destructive: 'bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40',
      link: 'font-medium text-primary underline-offset-4 hover:underline'
    },
    size: {
      default: 'h-12 gap-1.5 px-6 has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4',
      xs: "h-6 gap-1 text-xs px-2 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
      sm: "h-8 gap-1 text-[0.8rem] px-3 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
      lg: 'h-14 gap-2 px-8 text-base has-data-[icon=inline-end]:pr-6 has-data-[icon=inline-start]:pl-6',
      icon: 'size-12 rounded-lg',
      'icon-xs': "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
      'icon-sm': 'size-8 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg',
      'icon-lg': 'size-14 rounded-xl'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
})

function Button({ className, variant = 'default', size = 'default', asChild = false, ...props }) {
  const Comp = asChild ? Slot.Root : 'button'

  return <Comp data-slot="button" data-variant={variant} data-size={size} className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants }
