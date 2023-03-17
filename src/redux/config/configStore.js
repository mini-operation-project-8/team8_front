import { configureStore } from '@reduxjs/toolkit'
import { postsSlice, usersSlice } from '../modules/postModule'

export const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
    users: usersSlice.reducer
  },
})