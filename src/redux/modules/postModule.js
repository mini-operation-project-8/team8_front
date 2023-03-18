import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import api from "../../axios/api";

export const __getPosts = createAsyncThunk(
    "getPosts",
    async (payload, thunkAPI) => {
        try {
            const result = await axios.get('http://localhost:4000/posts');
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
    }
})

export default postsSlice.reducer