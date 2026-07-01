'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '@/app/assets/logo/logo.png'
import { useRouter } from 'next/navigation'
import { UserNav } from '@/components/admin/dashboard/user-nav'
import { usePathname } from 'next/navigation'
import { Home, BookUp, ChevronRight, FileText, FilePen, Network, User } from 'lucide-react'

export default function AdminLayout({ children }) {
  const pathname = usePathname()
  const [isDevonxonaOpen, setIsDevonxonaOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      <aside className="w-72 bg-gray-900 text-white flex flex-col">
        <div className="flex flex-col border-b border-b-gray-700 justify-center items-center py-4">
          <Image src={Logo} alt="Agro Logo" width={100} height={100} priority />
          <span className="text-[18px] py-2 text-white font-semibold uppercase tracking-wider">Agro Admin</span>
        </div>
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <ul className="space-y-1">
            <li>
              <Link href="/admin" className={`flex items-center w-full h-12 px-4 rounded-xl transition duration-150 font-semibold text-[16px] ${pathname === '/admin' ? 'bg-[#3286FB] text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-slate-800'}`}>
                <Home className="w-5 h-5 shrink-0" />
                <span className="ml-4">Bosh sahifa</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/user" className={`flex items-center w-full h-12 px-4 rounded-xl transition duration-150 font-semibold text-[16px] ${pathname.startsWith('/admin/user') ? 'bg-[#3286FB] text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-slate-800'}`}>
                <User className="w-5 h-5 shrink-0" />
                <span className="ml-4">Foydalanuvchilar</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/blog" className={`flex items-center w-full h-12 px-4 rounded-xl transition duration-150 font-semibold text-[16px] ${pathname.startsWith('/admin/blog') ? 'bg-[#3286FB] text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-slate-800'}`}>
                <Network className="w-5 h-5 shrink-0" />
                <span className="ml-4">Axborot xizmati</span>
              </Link>
            </li>
            <li className="space-y-1">
              <div onClick={() => setIsDevonxonaOpen(!isDevonxonaOpen)} className={`flex items-center justify-between w-full h-12 px-4 rounded-xl cursor-pointer select-none transition duration-150 font-semibold text-[16px] ${pathname.startsWith('/admin/dock-in') ? 'text-blue-400 bg-slate-800/50' : 'text-gray-400 hover:text-white hover:bg-slate-800'}`}>
                <div className="flex items-center">
                  <BookUp className="w-5 h-5 shrink-0" />
                  <span className="ml-4">Devonxona</span>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform duration-200 text-slate-500 ${isDevonxonaOpen ? 'rotate-90' : ''}`} />
              </div>
              {isDevonxonaOpen && (
                <ul className="pl-4 space-y-1 animation-fade-in">
                  <li>
                    <Link href="/admin/dock-in-transmitted" className={`flex items-center w-full h-11 px-4 rounded-xl transition duration-150 text-[14px] ${pathname.startsWith('/admin/dock-in-transmitted') ? 'text-blue-400 font-semibold bg-slate-800/30' : 'text-gray-400 hover:text-white hover:bg-slate-800'}`}>
                      <FileText className="w-4 h-4 shrink-0" />
                      <span className="ml-3">Yaratilgan hujjatlar</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/admin/dock-in-execution" className={`flex items-center w-full h-11 px-4 rounded-xl transition duration-150 text-[14px] ${pathname.startsWith('/admin/dock-in-execution') ? 'text-blue-400 font-semibold bg-slate-800/30' : 'text-gray-400 hover:text-white hover:bg-slate-800'}`}>
                      <FilePen className="w-4 h-4 shrink-0" />
                      <span className="ml-3">Yaratilgan topshiriqlar</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-slate-700 text-xs text-slate-500 text-center">© {new Date().getFullYear()} Agro Dashboard</div>
      </aside>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-10 shrink-0">
          <div className="hidden xl:block"></div>
          <div className="flex items-center">
            <UserNav />
          </div>
        </header>
        <main className="flex-1 p-10 overflow-x-hidden overflow-y-auto bg-gray-50">{children}</main>
      </div>
    </div>
  )
}
