import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  // loading: false,
  // user: null,
  // error: null,
};

export const shopReducer = createReducer(initialState, (builder) => {
  builder
      .addCase("LoadShopRequest", (state) => {
        state.isLoading = true;
      })
      .addCase("LoadShopSuccess", (state, action) => {
        state.isShop = true;
        state.isLoading = false;
        state.shop = action.payload;
      })
      .addCase("LoadShopFail", (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isShop = false;
      })
      .addCase("clearErrors", (state) => {
        state.error = null;
      });
});


  // LoadSellerRequest: (state) => {
  //   state.isLoading = true;
  // },
  // LoadSellerSuccess: (state, action) => {
  //   state.isSeller = true;
  //   state.isLoading = false;
  //   state.seller = action.payload;
  // },
  // LoadSellerFail: (state, action) => {
  //   state.isLoading = false;
  //   state.error = action.payload;
  //   state.isSeller = false;


//   // get all sellers ---admin
//   getAllSellersRequest: (state) => {
//     state.isLoading = true;
//   },
//   getAllSellersSuccess: (state, action) => {
//     state.isLoading = false;
//     state.sellers = action.payload;
//   },
//   getAllSellerFailed: (state, action) => {
//     state.isLoading = false;
//     state.error = action.payload;
//   },
//   clearErrors: (state) => {
//     state.error = null;
//   },
// });
