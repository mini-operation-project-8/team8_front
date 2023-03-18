import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axios/api";

export const __getPosts = createAsyncThunk(
    "getPosts",
    async (payload, thunkAPI) => {
        try {
            const result = await api.get('/chitchat/posts');
            console.log(result);
            return thunkAPI.fulfillWithValue(result.data);
        } catch(error) {
            return thunkAPI.rejectWithValue("error");
        }
    }
);

export const __sendPost = createAsyncThunk(
    "sendPost",
    async (payload, thunkAPI) => {
        try {
            console.log(payload);
            const result = await api.post('/chitchat/posts', payload);
            return thunkAPI.fulfillWithValue(result.data);
        } catch(error) {
            return thunkAPI.rejectWithValue("error");
        }
    }
);

const initialState = {
    posts: [],
};

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: {
        [__getPosts.pending]: (state) => {
            state.isLoading = true;
            state.isError = false;
        },
        [__getPosts.fulfilled]: (state, {payload}) => {
            state.isLoading = false;
            state.isError = false;
            state.posts = payload;
        },
        [__getPosts.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload;
        },

        [__sendPost.pending]: (state) => {
            state.isLoading = true;
            state.isError = false;
        },
        [__sendPost.fulfilled]: (state, {payload}) => {
            state.isLoading = false;
            state.isError = false;
            state.posts = [...state.post, payload];
        },
        [__sendPost.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload;
        },
    }
})

export default postsSlice.reducer