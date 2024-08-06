import { createSlice } from '@reduxjs/toolkit'

export const allUserSlice = createSlice({
  name: 'allUser',
  initialState: {
    allUsers: undefined,
  },
  reducers: {
    get_allUsers: (state, action) => {
      state.allUsers = action.payload
    },

    follow_user: (state, action) => {
      const user = state.allUsers.find((user) => user.id === action.payload.id)
      if (user) {
        user.logged_in_user_is_following = !user.logged_in_user_is_following
        user.amount_of_followers += user.logged_in_user_is_following ? 1 : -1
      }
    },
    add_friend: (state, action) => {
      const user = state.allUsers.find((user) => user.id === action.payload.id)
      if (user) {
        user.logged_in_user_is_friends = true
        user.amount_of_friends += 1
      }
    },
    // remove_friend: (state, action) => {
    //   const User = state.allUsers.find((User) => User.id === action.payload.id)
    //   if (User) {
    //     User.logged_in_user_is_friends = false
    //     User.amount_of_friends -= 1
    //   }
    // },
  },
})

export const { get_allUsers, follow_user, add_friend, remove_friend } = allUserSlice.actions

export default allUserSlice.reducer
