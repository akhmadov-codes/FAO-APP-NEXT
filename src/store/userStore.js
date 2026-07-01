import { create } from 'zustand'
import { userService } from '@/services/userService'

export const useUserStore = create((set, get) => ({
  users: [],
  pagination: {
    nextPage: null,
    previousPage: null,
    currentPage: 1,
    totalPages: 1,
    totalCount: 0
  },
  currentUser: null,
  isLoading: false,
  error: null,

  fetchUsers: async (page = 1) => {
    set({ isLoading: true, error: null })
    try {
      const data = await userService.getAll(page)
      set({
        users: data.result || [],
        pagination: {
          nextPage: data.meta?.next_page,
          previousPage: data.meta?.previous_page,
          currentPage: data.meta?.current_page,
          totalPages: data.meta?.total_pages,
          totalCount: data.count
        },
        isLoading: false
      })
    } catch (err) {
      set({
        error: err.message || 'Foydalanuvchilarni yuklashda xatolik',
        isLoading: false
      })
    }
  },
  createUser: async (userData) => {
    set({ isLoading: true })
    try {
      await userService.create(userData)
      set({
        isLoading: false
      })

      return true
    } catch (err) {
      console.log("Foydalanuvchi qo'shishda xatolik:", err.response?.data)
      set({ isLoading: false })
      return false
    }
  },
  updateUser: async (id, updatedFields) => {
    set({ isLoading: true, error: null })
    try {
      await userService.update(id, updatedFields)

      set({
        isLoading: false
      })
      return { success: true }
    } catch (err) {
      const backendError = err.response?.data
      let errorMessage = "Ma'lumotlarni yangilashda kutilmagan xatolik yuz berdi."

      if (backendError) {
        errorMessage = Object.values(backendError).flat().join(', ')
      } else if (err.message) {
        errorMessage = err.message
      }

      set({ isLoading: false, error: errorMessage })
      return { success: false, message: errorMessage }
    }
  },
  deleteUser: async (id) => {
    set({ isLoading: true })
    try {
      const response = await userService.delete(id)
      const currentUsers = get().users
      const updatedUsers = currentUsers.filter((user) => user.id !== id)
      set({
        users: updatedUsers,
        isLoading: false
      })
      return true
    } catch (err) {
      console.error("Foydalanuvchini o'chirishda xatolik:", err)
      set({ isLoading: false })
      return false
    }
  }
}))
