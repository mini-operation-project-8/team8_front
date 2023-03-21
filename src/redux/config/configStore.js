import { configureStore } from '@reduxjs/toolkit'
import { postsSlice } from '../modules/postModule'
import { usersSlice } from '../modules/userModule'
import { commentsSlice } from '../modules/commentModule'


export const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
    users: usersSlice.reducer,
    comments: commentsSlice.reducer
  },
})