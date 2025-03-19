import {createReducer} from "@reduxjs/toolkit";

const initialState = {
    loading: true,
    addressLoading: true,
    isAuthenticated: false,
    user: null,
    error: null,
    successMessage: null,
};

export const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase("LoadUserRequest", (state) => {
            state.loading = true;
        })
        .addCase("LoadUserSuccess", (state, action) => {
            state.isAuthenticated = true;
            state.loading = false;
            state.user = action.payload;
        })
        .addCase("LoadUserFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        })

        // update user information
        .addCase("updateUserInfoRequest", (state) => {
            state.loading = true;
        })
        .addCase("updateUserInfoSuccess", (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.successMessage = action.payload.successMessage;
        })
        .addCase("updateUserInfoFailed", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // update user address
        .addCase("updateUserAddressRequest", (state) => {
            state.loading = true;
        })
        .addCase("updateUserAddressSuccess", (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.successMessage = action.payload.successMessage;
        })
        .addCase("updateUserAddressFailed", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // delete user address
        .addCase("deleteUserAddressRequest", (state) => {
            state.loading = true;
        })
        .addCase("deleteUserAddressSuccess", (state, action) => {
            state.loading = false;
            state.successMessage = action.payload.successMessage;
            state.user = action.payload.user;
        })
        .addCase("deleteUserAddressFailed", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })


        .addCase("clearMessages", (state) => {
            state.successMessage = null;
        })
        .addCase("clearErrors", (state) => {
            state.error = null;
        });
});


//
// // get all users --- admin
// getAllUsersRequest: (state) => {
//   state.usersLoading = true;
// },
// getAllUsersSuccess: (state,action) => {
//   state.usersLoading = false;
//   state.users = action.payload;
// },
// getAllUsersFailed: (state,action) => {
//   state.usersLoading = false;
//   state.error = action.payload;
// },

