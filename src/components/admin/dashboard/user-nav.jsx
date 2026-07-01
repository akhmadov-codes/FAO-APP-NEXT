'use client'

import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import userLogo from '@/app/assets/bg_font/user.png'
import Image from 'next/image'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { LogOut } from 'lucide-react'
import { toast } from 'sonner'

export function UserNav() {
  const { user, logoutAction } = useAuthStore()
  const router = useRouter()
  if (!user) {
    return <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
  }

  const handleLogout = () => {
    logoutAction()
    toast.success('Tizimdan chiqdingiz')
    router.push('/login') // Loginga push qiladi
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex transition-colors items-center pr-2 cursor-pointer hover:bg-gray-200 gap-2 wfull justify-between rounded-full">
          <Image src={userLogo} alt="Agro Logo" width={40} height={40} priority />
          <h1 className="text-sm font-semibold uppercase">
            {user.last_name} {user.first_name}
          </h1>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent sideOffset={15} className="w-64 p-2 rounded-2xl shadow-2xl" align="end" forceMount>
        {/* <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-xl font-medium leading-none text-gray-800">
              {user.first_name} {user.last_name}
            </p>
            <p className="text-lg font-medium leading-none text-gray-800">{user.role}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator /> */}
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 justify-between focus:text-red-600 focus:bg-red-50 font-medium">
          Chiqish <LogOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
