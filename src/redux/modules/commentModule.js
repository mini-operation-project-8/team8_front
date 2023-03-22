import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axios/api";

export const __getComments = createAsyncThunk(
    "getComments",
    async ({postId,commentId}, thunkAPI) => {
        console.log(postId);
        try {
            let result = await api.get(`/chitchat/${postId}/comments`);
            // let result = await api.get(`/chitchat/${postId}/commentList`);
            console.log(result);
            return thunkAPI.fulfillWithValue(result.data);
        } catch(error) {
            return thunkAPI.rejectWithValue("error");
        }
    }
);

export const __sendComment = createAsyncThunk(
    "sendComment",
    async ({postId, contents}, thunkAPI) => {
        const result = await api.post(`/chitchat/${postId}/comments`, {contents})
        .catch((error) => {
            console.log(error);
            return thunkAPI.rejectWithValue(error);
            });
        return thunkAPI.fulfillWithValue(result.data);
    }
);

const initialState = {
    comments: [],
    posts: [],
    isLoading: false,
    isError: false,
};

export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: {
        [__getComments.pending]: (state) => {
            state.isLoading = true;
            state.isError = false;
        },
        [__getComments.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.isError = false;
            const comments = payload;
            const postId = comments.length > 0 ? comments[0].postId : null;
            if (postId !== null) {
                const postIndex = state.posts.findIndex((post) => post.postId === postId);
                if (postIndex !== -1) {
                    state.posts[postIndex].commentList = comments;
                }
            }
            state.comments = comments;
        },
        [__getComments.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload;
        },

        [__sendComment.pending]: (state) => {
            state.isLoading = true;
            state.isError = false;
        },
        [__sendComment.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.isError = false;
            const postId = payload.postId;
            const comment = {
                commentId: payload.commentId,
                contents: payload.contents,
            };
            const postIndex = state.posts.findIndex((post) => post.postId === postId);
            if (postIndex !== -1) {
                state.posts[postIndex].commentList.push(comment);
              }
        },
        [__sendComment.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload;
        },
    }
})

export default commentsSlice.reducer