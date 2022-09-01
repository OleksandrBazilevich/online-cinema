import { getContentType } from 'api/api.helper'
import { axiosClassic } from 'api/interceptors'
import Cookies from 'js-cookie'

import { removeTokensFromCookie, saveToStorage } from './auth.helper'
import { getAuthUrl } from '@/config/api.config'
import { IAuthResponse } from '@/store/user/user.types'

export const AuthService = {
  async register(email: string, password: string, username: string) {
    const response = await axiosClassic.post<IAuthResponse>(
      getAuthUrl('register'),
      {
        email,
        password,
        username,
      }
    )
    if (response.data.accessToken) saveToStorage(response.data)

    return response
  },

  async login(email: string, password: string, username: string) {
    const response = await axiosClassic.post<IAuthResponse>(
      getAuthUrl('login'),
      {
        email,
        password,
        username,
      }
    )
    if (response.data.accessToken) saveToStorage(response.data)
    return response
  },

  logout() {
    removeTokensFromCookie()
    localStorage.removeItem('user')
  },

  async getNewTokes() {
    const refreshToken = Cookies.get('refreshToken')
    const response = await axiosClassic.post<IAuthResponse>(
      getAuthUrl('login/access-token'),
      { refreshToken },
      { headers: getContentType() }
    )
    if (response.data.accessToken) saveToStorage(response.data)

    return response
  },
}
