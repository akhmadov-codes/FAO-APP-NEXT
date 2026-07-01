'use client'
import { Users } from 'lucide-react'
import { toast } from 'sonner'

export default function AdminDashboard() {
  const onClick = () => {
    toast("Muvaffaqiyatli o'chirildi")
  }
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div onClick={onClick} className="flex items-center bg-white border rounded-md overflow-hidden shadow">
          <div className="p-4 bg-sky-400">
            <Users className="h-20 w-12 text-white" />
          </div>
          <div className="px-4 text-gray-700">
            <h3 className="text-md font-extrabold uppercase tracking-wider">Barcha foydalanuvchilar</h3>
            <p className="text-3xl text-black">454</p>
          </div>
        </div>
        <div className="flex items-center bg-white border rounded-md overflow-hidden shadow">
          <div className="p-4 bg-green-400">
            <Users className="h-20 w-12 text-white" />
          </div>
          <div className="px-4 text-gray-700">
            <h3 className="text-md font-extrabold uppercase tracking-wider">Barcha foydalanuvchilar</h3>
            <p className="text-3xl text-black">454</p>
          </div>
        </div>
        <div className="flex items-center bg-white border rounded-md overflow-hidden shadow">
          <div className="p-4 bg-gray-400">
            <Users className="h-20 w-12 text-white" />
          </div>
          <div className="px-4 text-gray-700">
            <h3 className="text-md font-extrabold uppercase tracking-wider">Barcha foydalanuvchilar</h3>
            <p className="text-3xl text-black">454</p>
          </div>
        </div>
        <div className="flex items-center bg-white border rounded-md overflow-hidden shadow">
          <div className="p-4 bg-blue-400">
            <Users className="h-20 w-12 text-white" />
          </div>
          <div className="px-4 text-gray-700">
            <h3 className="text-md font-extrabold uppercase tracking-wider">Barcha foydalanuvchilar</h3>
            <p className="text-3xl text-black">454</p>
          </div>
        </div>
      </div>
    </div>
  )
}
