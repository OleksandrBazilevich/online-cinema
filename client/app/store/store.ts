import { configureStore } from '@reduxjs/toolkit'

import { rootReducer } from './rootReducer'

export const store = configureStore({
  reducer: rootReducer,
})

export type TypeRootState = ReturnType<typeof store.getState>
