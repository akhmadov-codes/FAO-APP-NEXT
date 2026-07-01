import { create } from 'zustand'
import { blogService } from '@/services/blogService'

export const useBlogStore = create((set) => ({
  blogs: [],
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

  fetchBlogs: async (page = 1) => {
    set({ isLoading: true, error: null })
    try {
      const data = await blogService.getList(page)
      set({
        blogs: data.result,
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
      set({ isLoading: false, error: 'Bloglarni yuklashda xatolik' })
    }
  },

  createBlog: async (blogData) => {
    set({ isLoading: true })
    try {
      await blogService.create(blogData)
      set({ isLoading: false })
      return { success: true }
    } catch (err) {
      set({ isLoading: false })
      return { success: false, message: err.response?.data ? Object.values(err.response.data).flat().join(', ') : 'Xatolik' }
    }
  },

  updateBlog: async (id, updatedFields) => {
    set({ isLoading: true })
    try {
      await blogService.update(id, updatedFields)
      set({ isLoading: false })
      return { success: true }
    } catch (err) {
      set({ isLoading: false })
      return { success: false, message: err.response?.data ? Object.values(err.response.data).flat().join(', ') : 'Xatolik' }
    }
  }
}))
