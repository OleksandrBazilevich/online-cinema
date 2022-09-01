import { combineReducers } from '@reduxjs/toolkit'
import { reducer as toastrReducer } from 'react-redux-toastr'

import { reducer as userReducer } from './user/user.slice'

export const rootReducer = combineReducers({
  user: userReducer,
  toastr: toastrReducer,
})
