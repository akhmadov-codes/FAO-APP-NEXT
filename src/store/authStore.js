import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authService } from '@/services/authService'
import { toast } from 'sonner'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      loginAction: async (username, password) => {
        set({ isLoading: true, error: null })

        try {
          const data = await authService.login(username, password)
          console.log(data.data)
          set({
            user: data.user,
            token: data.access,
            isAuthenticated: true,
            isLoading: false,
            error: null
          })
          toast.success('Xush kelibsiz!')
          return { success: true }
        } catch (err) {
          console.log("API'dan kelgan toliq xatolik:", err.response?.data)
          const errMsg = 'Login yoki parol xato!'
          toast.error(errMsg)
          set({
            error: errMsg,
            isLoading: false
          })
          return { success: false, error: errMsg }
        }
      },

      logoutAction: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null
        })
      }
    }),
    {
      name: 'auth-storage'
    }
  )
)
