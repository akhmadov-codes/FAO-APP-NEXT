import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUserStore } from '@/store/userStore'
import { toast } from 'sonner'

export default function UserCreateModal({ close }) {
  const createUser = useUserStore((state) => state.createUser)
  const isLoading = useUserStore((state) => state.isLoading)

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    username: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await createUser(formData)

    if (success) {
      close()
    } else {
      toast('Xatolik yuz berdi')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 min-w-xl">
      <div className="grid grid-cols-2 gap-5 p-6">
        {/* Ism */}
        <div className="grid gap-2">
          <label className="text-sm font-semibold text-slate-700">Ism *</label>
          <Input id="first_name" name="first_name" placeholder="Ismni kiriting" value={formData.first_name} onChange={handleChange} disabled={isLoading} />
        </div>

        {/* Familiya */}
        <div className="grid gap-2">
          <label className="text-sm font-semibold text-slate-700">Familiya *</label>
          <Input id="last_name" name="last_name" placeholder="Familiyani kiriting" value={formData.last_name} onChange={handleChange} disabled={isLoading} />
        </div>

        {/* Username */}
        <div className="grid gap-2">
          <label className="text-sm font-semibold text-slate-700">Foydalanuvchi nomi *</label>
          <Input id="username" name="username" placeholder="Username kiriting" value={formData.username} onChange={handleChange} disabled={isLoading} />
        </div>

        {/* Telefon */}
        <div className="grid gap-2">
          <label className="text-sm font-semibold text-slate-700">Telefon *</label>
          <Input id="phone_number" name="phone_number" placeholder="99899 123 45 67" value={formData.phone_number} onChange={handleChange} disabled={isLoading} />
        </div>

        {/* Parol */}
        <div className="grid gap-2 col-span-2">
          <label className="text-sm font-semibold text-slate-700">Foydalanuvchi paroli *</label>
          <Input id="password" name="password" type="password" placeholder="Parolni kiriting" value={formData.password} onChange={handleChange} disabled={isLoading} />
        </div>
      </div>

      {/* Pastki tugmalar */}
      <div className="flex gap-3 justify-end border-t pt-4 p-6">
        <Button variant="outline" type="button" onClick={close} disabled={isLoading}>
          Bekor qilish
        </Button>
        <Button variant="default" type="submit" disabled={isLoading}>
          {isLoading ? 'Saqlanmoqda...' : 'Saqlash'}
        </Button>
      </div>
    </form>
  )
}
