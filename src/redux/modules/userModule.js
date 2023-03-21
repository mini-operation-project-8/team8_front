import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../axios/api";

export const __signupUser = createAsyncThunk(
    "signupUsers",
    async (payload, thunkAPI) => {
        try {
            await api.post("/chitchat/auth/signup", payload);
            return thunkAPI.fulfillWithValue(payload);
        } catch(error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const initialState = {
    users: [],
    error: null,
    isLogin: false,
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: {
        //signupUser
        [__signupUser.pending]: (state) => {
            state.isLogin = true;
        },
        [__signupUser.fulfilled]: (state, action) => {
            state.isLogin = [...state.users, action.payload]
            state.users = action.payload;
        },
        [__signupUser.rejected]: (state, action) => {
            state.isLogin = false;
            state.error = action.payload;
        },
        //loginUser
        // [__loginUser.fulfilled]: (state, action) => {
        //     state.isLogin = true;
        // },
        // [__loginUser.rejected]: (state, action) => {
        //     state.isLogin = false;
        // },
    }
})

export default usersSlice.reducer