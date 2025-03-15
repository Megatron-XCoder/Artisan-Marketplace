import {configureStore} from "@reduxjs/toolkit";
import {userReducer} from "./Reducers/user";
import {shopReducer} from "./Reducers/shop.js";
import {productReducer} from "./Reducers/product";
import { eventReducer } from "./Reducers/event";
// import { cartReducer } from "./Reducers/Cart";
// import { wishlistReducer } from "./Reducers/wishlist";
// import { orderReducer } from "./Reducers/order";


const Store = configureStore({
    reducer: {
        user: userReducer,
        shop: shopReducer,
        products: productReducer,
        events: eventReducer,
        // Cart: cartReducer,
        // wishlist: wishlistReducer,
        // order: orderReducer,
    },
});

export default Store;
