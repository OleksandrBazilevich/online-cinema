import Cookies from 'js-cookie'

import { IAuthResponse, ITokens } from '@/store/user/user.types'

export const saveTokensToCookie = (data: ITokens) => {
  Cookies.set('accessToken', data.accessToken, { expires: 60 })
  Cookies.set('refreshToken', data.refreshToken, { expires: 60 })
}

export const removeTokensFromCookie = () => {
  Cookies.remove('accessToken')
  Cookies.remove('refreshToken')
}

export const saveToStorage = (data: IAuthResponse) => {
  saveTokensToCookie(data)
  localStorage.setItem('user', JSON.stringify(data.user))
}
