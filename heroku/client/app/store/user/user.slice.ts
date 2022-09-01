import { createSlice } from '@reduxjs/toolkit'

import { checkAuth, login, logout, register } from './user.actions'
import { IInitialState } from './user.types'
import { getLocalStorage } from '@/utils/local-storage'

const initialState: IInitialState = {
  isLoading: false,
  user: getLocalStorage('user'),
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.user = payload.user
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.user = payload.user
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false
        state.user = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false
        state.user = null
      })
      .addCase(checkAuth.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.user = payload.user
      })
  },
})

export const { reducer } = userSlice
