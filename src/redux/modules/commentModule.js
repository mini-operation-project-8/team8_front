import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axios/api";

export const __getComments = createAsyncThunk(
    "getComments",
    async ({postId}, thunkAPI) => {
        try {
            const result = await api.get(`/chitchat/${postId}/comments`);
            // console.log(result.data);
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

export const __deleteComment = createAsyncThunk(
    "deleteComment",
    async ({postId, commentId}, thunkAPI) => {
        console.log(commentId);
        try {
            const result = await api.delete(`/chitchat/${postId}/comments/${commentId}`);
            return thunkAPI.fulfillWithValue(result.data);
        } catch(error) {
            return thunkAPI.rejectWithValue("error");
        }
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
            state.comments = payload;
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
        // deleteComment
        [__deleteComment.pending]: (state) => {
            state.isLoading = true;
            state.isError = false;
        },
        [__deleteComment.fulfilled]: (state, {payload}) => {
            state.isLoading = false;
            state.isError = false;
            state.comments = state.comments.filter((item) => item.commentId !== payload);
        },
        [__deleteComment.rejected]: (state, {payload}) => {
            state.isLoading = false;
            state.isError = true;
            state.error = payload;
        },
    }
})

export default commentsSlice.reducer