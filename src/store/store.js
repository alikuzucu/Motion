import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../store/slices/UserSlice'
import postReducer from '../store/slices/PostSlice'
import allUserReducer from '../store/slices/AllUserSlice'
import UserProfileReducer from './slices/UserProfileSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    allUser: allUserReducer,
    userProfile: UserProfileReducer,
  },
})
