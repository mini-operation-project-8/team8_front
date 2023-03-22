import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axios/api";

// export const __getComments = createAsyncThunk(
//     "getComments",
//     async (payload, thunkAPI) => {
//         try {
//             const result = await axios.get('http://localhost:4000/comments');
//             console.log(result);
//             return thunkAPI.fulfillWithValue(result.data);
//         } catch(error) {
//             return thunkAPI.rejectWithValue("error");
//         }
//     }
// );

export const __sendComment = createAsyncThunk(
    "sendComment",
    async ({postId, contents}, thunkAPI) => {
        try {
            const result = await api.post(`/chitchat/${postId}/comments`, {contents});
            return thunkAPI.fulfillWithValue(result.data);
        } catch(error) {
            return thunkAPI.rejectWithValue("error");
        }
    }
);


const initialState = {
    comments: [],
};

export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: {
        // [__getComments.pending]: (state) => {
        //     state.isLoading = true;
        //     state.isError = false;
        // },
        // [__getComments.fulfilled]: (state, {payload}) => {
        //     state.isLoading = false;
        //     state.isError = false;
        //     state.comments = payload;
        // },
        // [__getComments.rejected]: (state, action) => {
        //     state.isLoading = false;
        //     state.isError = true;
        //     state.error = action.payload;
        // },

        [__sendComment.pending]: (state) => {
            state.isLoading = true;
            state.isError = false;
        },
        [__sendComment.fulfilled]: (state, {payload}) => {
            state.isLoading = false;
            state.isError = false;
            state.comments = [...state.comments, payload];
        },
        [__sendComment.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload;
        },
    }
})

export default commentsSlice.reducer