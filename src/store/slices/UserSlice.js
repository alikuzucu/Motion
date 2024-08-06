import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    // had to add the accessToken to the local storage, otherwise it didnt persist in the browser
    accessToken: localStorage.getItem('accessToken') || undefined,
  },
  reducers: {
    login_user: (state, action) => {
      state.accessToken = action.payload
    },
    logout_user: (state) => {
      state.accessToken = null
      // on logout the token will be removed from the local storage
      localStorage.removeItem('accessToken')
    },
  },
})

export const { login_user, logout_user } = userSlice.actions

export default userSlice.reducer
