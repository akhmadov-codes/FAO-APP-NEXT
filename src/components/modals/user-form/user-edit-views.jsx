import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUserStore } from '@/store/userStore'
import { toast } from 'sonner'

export default function UserEditModal({ user, close }) {
  const updateUser = useUserStore((state) => state.updateUser)
  const isLoading = useUserStore((state) => state.isLoading)

  // Inputlarni tahrirlanayotgan userning eski ma'lumotlari bilan to'ldiramiz
  const [formData, setFormData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    phone_number: user?.phone_number || '',
    username: user?.username || ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // 1. Faqat o'zgargan maydonlarni yig'ib olamiz
    const updatedFields = {}
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== (user[key] || '')) {
        updatedFields[key] = formData[key]
      }
    })

    // 2. Agar hech narsa o'zgartirilmagan bo'lsa so'rov yuborib o'tirmaymiz
    if (Object.keys(updatedFields).length === 0) {
      toast.info('Ogohlantirish', { description: "Hech qanday ma'lumot o'zgartirilmadi." })
      close()
      return
    }

    // 3. Majburiy maydonlar bo'sh qolmaganini tekshiramiz (agar o'zgartirilgan bo'lsa)
    if (updatedFields.hasOwnProperty('first_name') && !updatedFields.first_name) {
      toast.warning('Xatolik', { description: "Ism maydoni bo'sh bo'lishi mumkin emas." })
      return
    }

    const toastId = toast.loading("O'zgarishlar saqlanmoqda...")

    // Store'ga ID va faqat o'zgargan maydonlarni yuboramiz
    const result = await updateUser(user.id, updatedFields)

    if (result.success) {
      toast.success('Muvaffaqiyatli', {
        id: toastId,
        description: "Foydalanuvchi ma'lumotlari muvaffaqiyatli yangilandi."
      })
      close()
    } else {
      // Backenddan kelgan aniq xato matnini ko'rsatamiz
      toast.error('Xatolik yuz berdi', {
        id: toastId,
        description: result.message
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 min-w-xl">
      <div className="grid grid-cols-2 gap-5 p-6">
        {/* Ism */}
        <div className="grid gap-2">
          <label className="text-sm font-semibold text-slate-700">Ism *</label>
          <Input id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} disabled={isLoading} />
        </div>

        {/* Familiya */}
        <div className="grid gap-2">
          <label className="text-sm font-semibold text-slate-700">Familiya</label>
          <Input id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} disabled={isLoading} />
        </div>

        {/* Username */}
        <div className="grid gap-2">
          <label className="text-sm font-semibold text-slate-700">Foydalanuvchi nomi *</label>
          <Input id="username" name="username" value={formData.username} onChange={handleChange} disabled={isLoading} />
        </div>

        {/* Telefon */}
        <div className="grid gap-2">
          <label className="text-sm font-semibold text-slate-700">Telefon</label>
          <Input id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleChange} disabled={isLoading} />
        </div>
      </div>

      {/* Pastki tugmalar */}
      <div className="flex gap-3 justify-end border-t pt-4 p-6">
        <Button variant="outline" type="button" onClick={close} disabled={isLoading}>
          Bekor qilish
        </Button>
        <Button variant="default" type="submit" disabled={isLoading}>
          {isLoading ? 'Saqlanmoqda...' : "O'zgarishlarni saqlash"}
        </Button>
      </div>
    </form>
  )
}
