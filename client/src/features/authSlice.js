import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        userLogin: (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        userLogout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});

export const { userLogin, userLogout } = authSlice.actions;
export default authSlice.reducer;