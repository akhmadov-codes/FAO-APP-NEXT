import { Red_Hat_Display } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import GlobalDialog from '@/components/admin/dashboard/global-dialog'
import './globals.css'

const redHatDisplay = Red_Hat_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-red-hat'
})

export const metadata = {
  title: 'Agro admin',
  description: ''
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${redHatDisplay.className} min-h-full flex flex-col tracking-wide antialiased`}>
        <Toaster />
        <GlobalDialog />
        {children}
      </body>
    </html>
  )
}
