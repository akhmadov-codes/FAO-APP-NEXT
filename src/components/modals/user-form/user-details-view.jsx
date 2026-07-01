import { Button } from '@/components/ui/button'
import { useUserStore } from '@/store/userStore'

export default function UserDetailsView({ user, close }) {
  const deleteUser = useUserStore((state) => state.deleteUser)
  const isLoading = useUserStore((state) => state.isLoading)

  const handleConfirmDelete = async () => {
    const success = await deleteUser(user.id)

    console.log('Komponent oldi:', success)

    if (success) {
      close()
    } else {
      alert("Xatolik yuz berdi, qaytadan urinib ko'ring!")
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2 px-7 text-sm">
        <h1 className="text-sm">
          Siz rostan ham{' '}
          <span className="font-semibold">
            {user?.last_name} {user?.first_name}
          </span>{' '}
          foydalanuvchisini o'chirib tashlamoqchimisiz?
        </h1>
      </div>

      <div className="flex gap-3 justify-end border-t p-6">
        {/* Yuklanish paytida foydalanuvchi adashib qayta-qayta bosmasligi uchun tugmalarni bloklaymiz */}
        <Button variant="outline" onClick={close} disabled={isLoading}>
          Orqaga
        </Button>
        <Button variant="warning" onClick={handleConfirmDelete} disabled={isLoading}>
          {isLoading ? "O'chirilmoqda..." : "O'chirish"}
        </Button>
      </div>
    </div>
  )
}
