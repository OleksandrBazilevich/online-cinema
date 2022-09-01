import { IUser } from '@/shared/types/user.types'

export interface IUserState {
  email: string
  isAdmin: boolean
  _id: string
}

export interface ITokens {
  accessToken: string
  refreshToken: string
}

export interface IInitialState {
  user: IUserState | null
  isLoading: boolean
}

export interface IAuthReq {
  email: string
  password: string
  username: string
}

export interface IAuthResponse extends ITokens {
  user: IUser & {
    isAdmin: boolean
  }
}
