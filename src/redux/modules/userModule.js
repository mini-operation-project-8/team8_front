import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import api from "../../axios/api";

export const __signupUser = createAsyncThunk(
    "signupUsers",
    async (payload, thunkAPI) => {
        // try {
        //     const result = await axios.get('/chitchat/signup');
        //     console.log(result)
        //     return thunkAPI.fulfillWithValue(result.data);
        // } catch(error) {
        //     return thunkAPI.rejectWithValue("error");
        // }
    }
);

export const __loginUser = createAsyncThunk(
    "loginUser",
    async (payload, thunkAPI) => {
        // try {
        //     const result = await axios.get('/chitchat/login');
        //     console.log(result)
        //     return thunkAPI.fulfillWithValue(result.data);
        // } catch(error) {
        //     return thunkAPI.rejectWithValue("error");
        // }
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
            state.isLoading = true;
        },
        [__signupUser.fulfilled]: (state, {payload}) => {
            state.isLoading = false;
            state.users = payload;
        },
        [__signupUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        
        //loginUser
        [__loginUser.pending]: (state) => {
            state.isLoading = true;
        },
        [__loginUser.fulfilled]: (state, {payload}) => {
            state.isLoading = false;
            state.users = payload;
        },
        [__loginUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})

export const {} = usersSlice.actions
export default usersSlice.reducer