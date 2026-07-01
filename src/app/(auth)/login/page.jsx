'use client'

import { useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import Logo from '@/app/assets/logo/logo.png'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { User, KeyRound } from 'lucide-react'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { isLoading, loginAction } = useAuthStore()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username || !password) {
      toast.error("Iltimos, barcha maydonlarni to'ldiring!")
      return
    }
    const data = await loginAction(username, password)

    if (data.success) {
      router.push('admin/')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-5 shadow-md border border-t-4 border-t-blue-400 border-gray-100">
        {/* Sarlavha qismi */}
        <div className="flex flex-col justify-center items-center">
          <Image src={Logo} alt="Agro Logo" width={100} height={100} priority />
          <span className="text-2xl py-2 text-black font-semibold uppercase tracking-wider">Agro Admin</span>
        </div>

        {/* Forma qismi */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* USERNAME INPUTI */}
          <div className="relative w-full">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input className="pl-10" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Foydalanuvchi nomi kiriting ..." required />
          </div>

          {/* PASSWORD INPUTI */}
          <div className="relative w-full">
            <KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input className="pl-10" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Foydalanuvchi parol kiriting ..." required />
          </div>
          {/* TUGMA */}
          <Button className="w-full" type="submit" variant={'default'} disabled={isLoading}>
            {isLoading ? 'Kirilmoqda...' : 'Kirish'}
          </Button>
        </form>
      </div>
    </div>
  )
}
