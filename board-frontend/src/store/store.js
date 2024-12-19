import { configureStore } from '@reduxjs/toolkit'
import { authReducer, postReducer } from '../features'
//import authReducer from '../features/authSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
  }
})

export default store
