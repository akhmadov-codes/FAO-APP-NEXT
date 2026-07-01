'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner } from 'sonner'
import { CheckCircle2, Info, AlertTriangle, XCircle, Loader2 } from 'lucide-react'

const Toaster = ({ ...props }) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      icons={{
        success: <CheckCircle2 className="size-5 text-emerald-700 dark:text-emerald-400 shrink-0" />,
        info: <Info className="size-5 text-blue-700 dark:text-blue-400 shrink-0" />,
        warning: <AlertTriangle className="size-5 text-amber-700 dark:text-amber-400 shrink-0" />,
        error: <XCircle className="size-5 text-rose-700 dark:text-rose-400 shrink-0" />,
        loading: <Loader2 className="size-5 text-zinc-600 animate-spin shrink-0" />
      }}
      style={{
        '--border-radius': '20px',
        '--toast-padding': '16px'
      }}
      toastOptions={{
        classNames: {
          // Asosiy toast konteyneri (border-l-4 shu yerda)
          toast: 'group flex items-start gap-3 w-full border border-l-4 shadow-md font-sans p-4 transition-all duration-300',
          title: 'text-[14px] font-bold tracking-tight',
          description: 'text-[13px] opacity-90 mt-1 block leading-relaxed',
          closeButton: 'top-4 right-4 border-none bg-transparent hover:bg-black/5 dark:hover:bg-white/10 text-current transition-colors',

          // Har bir holat uchun alohida Tailwind klasslari (Siz yuborgan dizayn asosida)
          success: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-600 text-emerald-800 dark:text-emerald-300',
          error: 'bg-rose-50 dark:bg-rose-950/40 border-rose-600 text-rose-800 dark:text-rose-300',
          warning: 'bg-amber-50 dark:bg-amber-950/40 border-amber-600 text-amber-800 dark:text-amber-300',
          info: 'bg-blue-50 dark:bg-blue-950/40 border-blue-600 text-blue-800 dark:text-blue-300'
        }
      }}
      {...props}
    />
  )
}

export { Toaster }
