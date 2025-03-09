import {createReducer} from "@reduxjs/toolkit";

const initialState = {
    isLoading: true,
    success: false,   // Add success property
    error: null       // Add error property
};

export const productReducer = createReducer(initialState, (builder) => {
    builder
        .addCase("productCreateRequest", (state) => {
            state.isLoading = true;
        })
        .addCase("productCreateSuccess", (state, action) => {
            state.isLoading = false;
            state.product = action.payload;
            state.success = true;
        })
        .addCase("productCreateFail", (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
        })
        .addCase("clearErrors", (state) => {
            state.error = null;
        });

//
//   // get all products of shop
//   getAllProductsShopRequest: (state) => {
//     state.isLoading = true;
//   },
//   getAllProductsShopSuccess: (state, action) => {
//     state.isLoading = false;
//     state.products = action.payload;
//   },
//   getAllProductsShopFailed: (state, action) => {
//     state.isLoading = false;
//     state.error = action.payload;
//   },
//
//   // delete product of a shop
//   deleteProductRequest: (state) => {
//     state.isLoading = true;
//   },
//   deleteProductSuccess: (state, action) => {
//     state.isLoading = false;
//     state.message = action.payload;
//   },
//   deleteProductFailed: (state, action) => {
//     state.isLoading = false;
//     state.error = action.payload;
//   },
//
//   // get all products
//   getAllProductsRequest: (state) => {
//     state.isLoading = true;
//   },
//   getAllProductsSuccess: (state, action) => {
//     state.isLoading = false;
//     state.allProducts = action.payload;
//   },
//   getAllProductsFailed: (state, action) => {
//     state.isLoading = false;
//     state.error = action.payload;
//   },
//
//   clearErrors: (state) => {
//     state.error = null;
//   },
});
