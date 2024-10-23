import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCurrentUserAsync, logout } from '../../services/auth';
import { User } from "../../../types";

export interface UserState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    loading: true,
    error: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCurrentUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCurrentUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getCurrentUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "An error occurred";
            });
        builder.addCase(logoutAsync.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        builder.addCase(logoutAsync.fulfilled, (state) => {
            state.loading = false;
            state.user = null;
        })
        builder.addCase(logoutAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "An error occured"
        })
    },
});

// Action creators are generated for each case reducer function
export const { } = userSlice.actions;
export const selectUserData = (state: { user: UserState }) => state.user;



export const getCurrentUser = createAsyncThunk("user/getCurrentUser", async () => {
    const response = await getCurrentUserAsync();
    return response.data;
});


export const logoutAsync = createAsyncThunk("user/logout", async () => {
    const response = await logout();
    return response.data;
})

export default userSlice.reducer;
