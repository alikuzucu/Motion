import { createSlice } from '@reduxjs/toolkit'

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: undefined,
    error: null,
  },
  reducers: {
    get_posts: (state, action) => {
      state.posts = action.payload
    },
    // new action to add new Post to the post feed
    create_post: (state, action) => {
      state.posts.push(action.payload)
    },
    update_post: (state, action) => {
      const updatedPost = action.payload
      const index = state.posts.findIndex((post) => post.id === updatedPost.id)
      if (index !== -1) {
        state.posts[index] = updatedPost
      }
    },
    delete_post: (state, action) => {
      const postId = action.payload
      state.posts = state.posts.filter((post) => post.id !== postId)
    },
    update_likes: (state, action) => {
      const { postId, likes } = action.payload
      const post = state.posts.find((post) => post.id === postId)
      if (post) {
        post.amount_of_likes = likes
      }
    },
    set_error: (state, action) => {
      state.error = action.payload
    },
  },
})

export const { get_posts, create_post, update_likes, set_error, update_post, delete_post } =
  postSlice.actions

export default postSlice.reducer
