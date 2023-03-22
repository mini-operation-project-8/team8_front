import { configureStore } from '@reduxjs/toolkit'
import { postsSlice } from '../modules/postModule'
import { usersSlice } from '../modules/userModule'
import { commentsSlice } from '../modules/commentModule'
import { countSlice } from '../modules/countModule'


export const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
    users: usersSlice.reducer,
    comments: commentsSlice.reducer,
    count: countSlice.reducer,
  },
})