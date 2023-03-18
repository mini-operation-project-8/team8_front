import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const __signupUser = createAsyncThunk(
    "signupUsers",
    async (payload, thunkAPI) => {
        try {
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/register`, payload);
            // await axios.post(`${process.env.REACT_APP_SERVER_URL}/chitchat/signup`, payload);
            return thunkAPI.fulfillWithValue(payload);
        } catch(error) {
            return thunkAPI.rejectWithValue("error");
        }
    }
);

export const __loginUser = createAsyncThunk(
    "loginUser",
    async (payload, thunkAPI) => {
        try {
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, payload);
            // const result = await axios.post(`${process.env.REACT_APP_SERVER_URL}/chitchat/login`, payload);
            return thunkAPI.fulfillWithValue(payload);
        } catch(error) {
            return thunkAPI.rejectWithValue("error");
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
        [__loginUser.pending]: (state) => {
            state.isLogin = true;
        },
        [__loginUser.fulfilled]: (state, action) => {
            state.isLogin = false;
            state.users = action.payload;
        },
        [__loginUser.rejected]: (state, action) => {
            state.isLogin = false;
            state.error = action.payload;
        },
    }
})

export default usersSlice.reducer