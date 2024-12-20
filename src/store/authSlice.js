import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        }
    }
});

// Export the actions
export const { login, logout } = authSlice.actions;

// Selector function to access auth state
export const selectAuth = (state) => state.auth;

// Export the reducer
export default authSlice.reducer;