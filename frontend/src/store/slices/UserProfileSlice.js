import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  loading: false,
  error: null,
}

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    getUserProfileStart(state) {
      state.loading = true
      state.error = null
    },
    getUserProfileSuccess(state, action) {
      state.loading = false
      state.user = action.payload
      state.error = null
    },
    getUserProfileFailure(state, action) {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  getUserProfileStart,
  getUserProfileSuccess,
  getUserProfileFailure,
} = userProfileSlice.actions

export default userProfileSlice.reducer
