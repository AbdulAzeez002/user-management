

import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import goalReducer from '../features/goals/goalSlice'
import adminReducer from '../features/admin/adminSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
    users:adminReducer
  },
})