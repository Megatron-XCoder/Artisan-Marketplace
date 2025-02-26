import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Reducers/user";
// import { sellerReducer } from "./Reducers/seller";
// import { productReducer } from "./Reducers/product";
// import { eventReducer } from "./Reducers/event";
// import { cartReducer } from "./Reducers/cart";
// import { wishlistReducer } from "./Reducers/wishlist";
// import { orderReducer } from "./Reducers/order";


const Store = configureStore({
  reducer: {
    user: userReducer,
    // seller: sellerReducer,
    // products: productReducer,
    // events: eventReducer,
    // cart: cartReducer,
    // wishlist: wishlistReducer,
    // order: orderReducer,
  },
});

export default Store;
