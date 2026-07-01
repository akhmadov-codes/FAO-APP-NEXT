import axiosClient from '@/api/axiosClient'

export const blogService = {
  // Ro'yxatni olish (Sahifa raqami bilan)
  getList: async (page = 1) => {
    const response = await axiosClient.get(`/blogs/?page=${page}`)
    return response.data // { count, next, previous, results: [...] }
  },

  // Yaratish
  create: async (blogData) => {
    try {
      const response = await axiosClient.post('/blogs/', blogData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Tahrirlash (Patch)
  update: async (id, updatedFields) => {
    try {
      const response = await axiosClient.patch(`/blogs/${id}/`, updatedFields)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // O'chirish
  delete: async (id) => {
    try {
      await axiosClient.delete(`/blogs/${id}/`)
      return true
    } catch (error) {
      throw error
    }
  }
}
