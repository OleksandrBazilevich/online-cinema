import { createAsyncThunk } from '@reduxjs/toolkit'
import { errorCatch } from 'api/api.helper'
import { toastr } from 'react-redux-toastr'

import { IAuthReq, IAuthResponse } from './user.types'
import { AuthService } from '@/services/auth/auth.service'
import { toastError } from '@/utils/toast-error'

export const register = createAsyncThunk<IAuthResponse, IAuthReq>(
  'auth/register',
  async ({ email, password, username }, thunkApi) => {
    try {
      const response = await AuthService.register(email, password, username)
      toastr.success('Registration', 'Completed successfully')

      return response.data
    } catch (error) {
      toastError(error)
      return thunkApi.rejectWithValue(error)
    }
  }
)

export const login = createAsyncThunk<IAuthResponse, IAuthReq>(
  'auth/login',
  async ({ email, password, username }, thunkApi) => {
    try {
      const response = await AuthService.login(email, password, username)
      toastr.success('Login', 'Completed successfully')

      return response.data
    } catch (error) {
      toastError(error)
      return thunkApi.rejectWithValue(error)
    }
  }
)

export const logout = createAsyncThunk('auth/logout', async () => {
  await AuthService.logout()
})

export const checkAuth = createAsyncThunk<IAuthResponse>(
  'auth/check-auth',
  async (_, thunkApi) => {
    try {
      const response = await AuthService.getNewTokes()

      return response.data
    } catch (error) {
      if (errorCatch(error) === 'jwt expired') {
        toastr.error(
          'Logout',
          'Your authorization is finished, please sign up again'
        )
        thunkApi.dispatch(logout())
      }

      return thunkApi.rejectWithValue(error)
    }
  }
)
