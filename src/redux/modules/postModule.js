import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import api from "../../axios/api";

export const __getPosts = createAsyncThunk(
    "getPosts",
    async (payload, thunkAPI) => {
        try {
            const result = await axios.get('/chitchat/posts');
            return thunkAPI.fulfillWithValue(result.data);
        } catch(error) {
            return thunkAPI.rejectWithValue("error");
        }
    }
);

const initialState = {};

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
            state.Posts = payload;
        },
        [__getPosts.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload;
        },
    }
})

export const {} = postsSlice.actions
export default postsSlice.reducer