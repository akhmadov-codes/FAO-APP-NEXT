import axios from 'axios'
import { useAuthStore } from '@/store/authStore'

const axiosClient = axios.create({
  baseURL: 'http://localhost:8000/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

axiosClient.interceptors.request.use(
  (config) => {
    // Zustand store'dan token va login holatini to'g'ridan-to'g'ri olamiz
    // (useAuthStore.getState() funksiyasi komponentlardan tashqarida, sof JS fayllarda store-ni o'qish uchun ishlatiladi)
    const token = useAuthStore.getState().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 3. RESPONSE INTERCEPTOR: Django'dan javob qaytib kelganda birinchi bo'lib ishga tushadi
axiosClient.interceptors.response.use(
  (response) => {
    // Agar so'rov muvaffaqiyatli bo'lsa, to'g'ridan-to'g'ri javobni qaytaramiz
    return response
  },
  (error) => {
    // Agar Django 401 Unauthorized (Token eskirgan yoki xato) qaytarsa
    if (error.response && error.response.status === 401) {
      console.warn('Token eskirgan yoki haqiqiy emas. Tizimdan chiqilmoqda...')

      // Zustand store-ni tozalaymiz (localStorage ham o'chadi)
      useAuthStore.getState().logoutAction()

      // Foydalanuvchini avtomatik login sahifasiga qaytaramiz
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  }
)

export default axiosClient
