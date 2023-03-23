import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axios/api";

export const __getPosts = createAsyncThunk(
    "getPosts",
    async (payload, thunkAPI) => {
        try {
            const result = await api.get(`/chitchat/posts?sortBy=id&isAsc=true&size=10&page=${payload}`);
            return thunkAPI.fulfillWithValue(result.data);
        } catch(error) {
            return thunkAPI.rejectWithValue("error");
        }
    }
);

export const __getPost = createAsyncThunk(
    "getPost",
    async (payload, thunkAPI) => {
        try {
            const result = await api.get(`/chitchat/posts/${payload}`);
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
            const result = await api.post('/chitchat/posts', payload);
            return thunkAPI.fulfillWithValue(result.data);
        } catch(error) {
            return thunkAPI.rejectWithValue("error");
        }
    }
);

export const __deletePost = createAsyncThunk(
    "deletePost",
    async (payload, thunkAPI) => {
        try {
            const result = await api.delete(`/chitchat/posts/${payload}`);
            alert("삭제되었습니다!")
            return thunkAPI.fulfillWithValue(result.data);
        } catch(error) {
            alert("작성자만 삭제할 수 있습니다");
            return thunkAPI.rejectWithValue("error");
        }
    }
);

export const __fixPost = createAsyncThunk(
    "fixPost",
    async ({postId, modifiedPost}, thunkAPI) => {
        try {
            const result = await api.patch(`/chitchat/posts/${postId}`, modifiedPost);
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
        //__getPosts(전체 게시글 조회)
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

        //__getPost(선택 게시글 조회)
        [__getPost.pending]: (state) => {
            state.isLoading = true;
            state.isError = false;
        },
        [__getPost.fulfilled]: (state, {payload}) => {
            state.isLoading = false;
            state.isError = false;
            state.posts = payload;
        },
        [__getPost.rejected]: (state, {payload}) => {
            state.isLoading = false;
            state.isError = true;
            state.error = payload;
        },

        //__sendPost(새로운 게시글 작성)
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
            state.posts = state.posts.filter((item) => item.postId !== payload);
        },
        [__deletePost.rejected]: (state, {payload}) => {
            state.isLoading = false;
            state.isError = true;
            state.error = payload;
        },

        //__fixPost
        [__fixPost.pending]: (state) => {
            state.isLoading = true;
            state.isError = false;
        },
        [__fixPost.fulfilled]: (state, {payload}) => {
            state.isLoading = false;
            state.isError = false;
            state.posts = payload
       },
        [__fixPost.rejected]: (state, {payload}) => {
            state.isLoading = false;
            state.isError = true;
            state.error = payload;
        },

    }
})

export default postsSlice.reducer