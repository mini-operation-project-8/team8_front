import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axios/api";
import { cookies } from "../../shared/cookie";

export const __getPosts = createAsyncThunk(
    "getPosts",
    async (payload, thunkAPI) => {
        try {
            // 서버 통신용 코드
            // const result = await api.get('/chitchat/posts');

            // 로컬 통신용 코드
            const result = await api.get('/posts');
            return thunkAPI.fulfillWithValue(result.data);
        } catch(error) {
            return thunkAPI.rejectWithValue("error");
        }
    }
);

export const __sendPost = createAsyncThunk(
    "sendPost",
    async (payload, thunkAPI) => {
        const token = cookies.get("token");
        console.log(token);
        try {
            // 서버 통신용 코드
            // const result = await api_token.post('/chitchat/posts', payload);

            // 로컬 통신용 코드
            const result = await api.post('/posts', payload);

            // 기존 서버 통신용 api코드
            // const result = await api.post('/chitchat/posts', payload, {
            //     headers: {
            //         Authorization: token,
            //     },
            // });
            return thunkAPI.fulfillWithValue(result.data);
        } catch(error) {
            return thunkAPI.rejectWithValue("error");
        }
    }
);

export const __deletePost = createAsyncThunk(
    "deletePost",
    async (payload, thunkAPI) => {
        const token = cookies.get("token");
        console.log(token);
        try {
            // 서버 통신용 코드
            // const result = await api.post('/chitchat/posts', payload);

            // 로컬 통신용 코드
            const result = await api.post('/posts', payload);
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
        //__getPosts
        [__getPosts.pending]: (state) => {
            state.isLoading = true;
            state.isError = false;
        },
        [__getPosts.fulfilled]: (state, {payload}) => {
            state.isLoading = false;
            state.isError = false;
            state.posts = payload;
        },
        [__getPosts.rejected]: (state, {payload}) => {
            state.isLoading = false;
            state.isError = true;
            state.error = payload;
        },

        //__sendPost
        [__sendPost.pending]: (state) => {
            state.isLoading = true;
            state.isError = false;
        },
        [__sendPost.fulfilled]: (state, {payload}) => {
            state.isLoading = false;
            state.isError = false;
            state.posts = [...state.post, payload];
        },
        [__sendPost.rejected]: (state, {payload}) => {
            state.isLoading = false;
            state.isError = true;
            state.error = payload;
        },

        //deletePost
        [__deletePost.pending]: (state) => {
            state.isLoading = true;
            state.isError = false;
        },
        [__deletePost.fulfilled]: (state, {payload}) => {
            state.isLoading = false;
            state.isError = false;
            state.posts = state.posts.filter((item) => item.id !== payload);
        },
        [__deletePost.rejected]: (state, {payload}) => {
            state.isLoading = false;
            state.isError = true;
            state.error = payload;
        },

    }
})

export default postsSlice.reducer