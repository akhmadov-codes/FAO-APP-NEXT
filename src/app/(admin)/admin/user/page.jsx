'use client'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useUserStore } from '@/store/userStore'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Plus, Trash2, Edit2, Search, SlidersHorizontal } from 'lucide-react'
import Pagination from '@/components/admin/dashboard/page-pagination'
import { useModalStore } from '@/store/dialogStore'
import DeleteUserView from '@/components/modals/user-form/user-details-view'
import UserCreateModal from '@/components/modals/user-form/user-create-views'
import UserEditModal from '@/components/modals/user-form/user-edit-views'

export default function AdminUsers() {
  const { users, pagination, fetchUsers, isLoading } = useUserStore()
  const { openModal, closeModal } = useModalStore()
  useEffect(() => {
    fetchUsers(1)
  }, [fetchUsers])
  const textStyle = 'font-medium text-[#1b1e21] text-[16px] tracking-tight leading-relaxed antialiased'

  return (
    <div className="space-y-6">
      {/* 1. SAHIFA TEPA QISMI (Header) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl uppercase font-bold text-[#1b1e21] tracking-tight">Foydalanuvchilar</h1>
          <p className="text-sm text-slate-500 mt-0.5">Tizimdagi barcha foydalanuvchilar ro'yxati va ularni boshqarish bo'limi</p>
        </div>
        <Button onClick={() => openModal(UserCreateModal, { title: "Foydalanuvchini qo'shish", color: 'bg-blue-400' })} variant={'default'}>
          <Plus strokeWidth={4} /> Qo'shish
        </Button>
      </div>

      {/* 2. QIDIRUV VA FILTR SECSIYASI */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative bg-white flex-1 max-w-md">
          <Input type="text" placeholder="Ism yoki telefon bo'yicha qidirish..." />
        </div>
      </div>

      {/* 3. TO'LIQ ENLI QATOR-KARDLAR (Label bilan) */}
      <div className="space-y-3.5">
        {users.map((user) => (
          <div key={user.id} className="w-full bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* 1-Blok: Avatar va Ismi-Familiyasi */}
            <div className="flex items-center gap-4 min-w-[300px] flex-1">
              {/* Dumaloq chiroyli avatar */}
              <div className="w-12 h-12 text-white/90 rounded-xl bg-blue-400 border border-blue-100 flex items-center justify-center font-bold text-lg shrink-0">{user.initials}</div>
              <div className="space-y-0.5 truncate">
                <div className="font-medium">Foydalanuvchi ismi familiyasi:</div>
                <h3 className="font-bold text-slate-800 tracking-tight text-base truncate">
                  {user.last_name} {user.first_name}
                </h3>
              </div>
            </div>

            {/* 2-Blok: Telefon raqami */}
            <div className="flex flex-col min-w-[250px] space-y-0.5">
              <span className="font-medium">Foydalanuvchi telefon raqami:</span>
              <span className="font-semibold text-slate-700">{user.phone_number || '—'}</span>
            </div>

            {/* 3-Blok: Tizimdagi roli */}
            <div className="flex flex-col min-w-[150px] space-y-1">
              <span className="font-medium">Tizimdagi roli:</span>
              <div>
                <span className="font-bold text-white/90 text-[10px] tracking-wider uppercase bg-blue-400 px-2 py-0.5 rounded-md">{user.role}</span>
              </div>
            </div>

            {/* 4-Blok: Holati (Status) */}
            <div className="flex flex-col min-w-[140px] space-y-1">
              <span className="font-medium"> Tizimdagi holati:</span>
              <div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${user.is_delete === false ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${user.is_delete === false ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                  {user.is_delete === false ? 'Faol' : "O'chirilgan"}
                </span>
              </div>
            </div>

            {/* 5-Blok: Amallar (Tugmalar) */}
            <div className="flex items-center justify-end gap-2 border-t pt-3 md:border-t-0 md:pt-0 border-slate-100">
              <Button onClick={() => openModal(UserEditModal, { title: 'Foydalanuvchini tahrirlash', color: 'bg-yellow-400', user: user })} variant="secondary" size="sm" className="text-white bg-blue-400 hover:bg-blue-500 rounded-xl h-9 px-4 transition flex items-center gap-1.5">
                <Edit2 className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">Tahrirlash</span>
              </Button>
              <Button onClick={() => openModal(DeleteUserView, { title: "Foydalanuvchini o'chirish", color: 'bg-rose-400', user: user })} variant="destructive" size="icon" className="text-rose-400 bg-rose-50 hover:bg-rose-100 border border-rose-100 rounded-xl h-9 w-9 transition shrink-0">
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* 4. PAGINATION */}
      <Pagination pagination={pagination} onChangePage={(targetPage) => fetchUsers(targetPage)} isLoading={isLoading} />
    </div>
  )
}
