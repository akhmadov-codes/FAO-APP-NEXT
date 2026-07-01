import axiosClient from '@/api/axiosClient'

export const authService = {
  login: async (username, password) => {
    console.log(username, password)

    const response = await axiosClient.post('/auth/login/', { username, password })
    return response.data
  }
}
