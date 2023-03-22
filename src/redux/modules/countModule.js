import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axios/api";

export const __getPostCount = createAsyncThunk(
    "getPostCount",
    async (payload, thunkAPI) => {
        try {
            const result = await api.get("/chitchat/posts/total");
            return thunkAPI.fulfillWithValue(result.data);
        } catch(error) {
            return thunkAPI.rejectWithValue("error");
        }
    }
);

const initialState = {
    count: [],
};

export const countSlice = createSlice({
    name: 'count',
    initialState,
    reducers: {},
    extraReducers: {
        //__getPostCount(전체 게시글 수 받아오기)
        [__getPostCount.pending]: (state, action) => {
            state.isLoading = true;
            state.isError = false;
        },
        [__getPostCount.fulfilled]: (state, {payload}) => {
            state.isLoading = false;
            state.isError = false;
            state.count = payload;
        },
        [__getPostCount.rejected]: (state, {payload}) => {
            state.isLoading = false;
            state.isError = true;
            state.error = payload;
        },
    }
})

export default countSlice.reducer