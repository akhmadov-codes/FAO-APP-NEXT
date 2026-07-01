import axiosClient from '@/api/axiosClient'

export const userService = {
  getAll: async (page = 1) => {
    const response = await axiosClient.get(`/users/?page=${page}`)
    return response.data
  },
  create: async (userData) => {
    const response = await axiosClient.post('/users/', userData)
    console.log('PUT response:', response)
    return response.data
  },
  update: async (id, updatedFields) => {
    const response = await axiosClient.patch(`/user/${id}/`, updatedFields)
    return response.data
  },
  delete: async (id) => {
    const response = await axiosClient.delete(`/user/${id}/`)
    console.log(response)
    return response.data
  }
}
