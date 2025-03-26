import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {
    ActivationPage,
    LoginPage,
    SignupPage,
    HomePage,
    FAQPage,
    ProductsPage,
    BestSellingPage,
    EventsPage,
    CheckoutPage,
    PaymentPage,
    OrderSuccessPage,
    ProductDetailsPage,
    ProfilePage,
    ShopCreatePage,
    SellerActivationPage,
    ShopLoginPage,
    OrderDetailsPage,
    TrackOrderPage,
    UserInbox

} from './Routes/Routes';
import ProtectedRoute from "./ProtectedRoutes/ProtectedRoute.jsx";
import {ToastContainer} from "react-toastify";
import {useEffect, useState} from "react";
import {loadShop, loadUser} from "./redux/Actions/user.js";
import Store from "./redux/store.js";
import {
    ShopAllCoupons,
    ShopAllEvents,
    ShopAllOrders,
    ShopAllProducts,
    ShopAllRefunds,
    ShopCreateEvents,
    ShopCreateProduct,
    ShopDashboardPage,
    ShopHomePage,
    ShopOrderDetails,
    ShopPreviewPage,
    ShopSettingsPage,
    ShopWithDrawMoneyPage,
    ShopInboxPage

} from "./Routes/ShopRoutes.js";
import ShopProtectedRoute from "./ProtectedRoutes/ShopProtectedRoute.jsx";
import {getAllProducts} from "./redux/Actions/product.js";
import {getAllEvents} from "./redux/Actions/event.js";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import {server} from "./server.jsx";
import axios from "axios";

function App() {
    const [stripeApikey, setStripeApikey] = useState("");

    async function getStripeApikey() {
        const {data} = await axios.get(`${server}/payment/stripeApikey`);
        setStripeApikey(data.stripeApikey);
    }

    useEffect(() => {
        Store.dispatch(loadUser());
        Store.dispatch(loadShop());
        Store.dispatch(getAllProducts());
        Store.dispatch(getAllEvents());
        getStripeApikey();
    }, []);

    return (<>
        <Router>
            {stripeApikey && (<Elements stripe={loadStripe(stripeApikey)}>
                    <Routes>
                        <Route path="/payment" element={<ProtectedRoute>
                            <PaymentPage/>
                        </ProtectedRoute>}/>
                    </Routes>
                </Elements>)}
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/sign-up" element={<SignupPage/>}/>
                <Route path="/activation/:activation_token" element={<ActivationPage/>}/>
                <Route path="/shop/activation/:activation_token" element={<SellerActivationPage/>}/>
                <Route path="/best-selling" element={<BestSellingPage/>}/>
                <Route path="/events" element={<EventsPage/>}/>
                <Route path="/faq" element={<FAQPage/>}/>
                <Route path="/products" element={<ProductsPage/>}/>
                <Route path="/product/:id" element={<ProductDetailsPage/>}/>
                <Route path="/checkout" element={<ProtectedRoute>
                    <CheckoutPage/>
                </ProtectedRoute>}/>
                <Route path="/order/success" element={<OrderSuccessPage/>}/>
                <Route
                    path="/profile"
                    element={<ProtectedRoute>
                        <ProfilePage/>
                    </ProtectedRoute>}/>

                <Route
                    path="/inbox"
                    element={
                        <ProtectedRoute>
                            <UserInbox />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/user/order/:id"
                    element={<ProtectedRoute>
                        <OrderDetailsPage/>
                    </ProtectedRoute>}
                />

                <Route
                    path="/user/track/order/:id"
                    element={
                        <ProtectedRoute>
                            <TrackOrderPage />
                        </ProtectedRoute>
                    }
                />

                <Route path="/shop/preview/:id" element={<ShopPreviewPage/>}/>

                {/* shop Routes */}
                <Route path="/shop-create" element={<ShopCreatePage/>}/>
                <Route path="/shop-login" element={<ShopLoginPage/>}/>
                <Route path="/shop/:id" element={<ShopProtectedRoute>
                    <ShopHomePage/>
                </ShopProtectedRoute>}/>

                <Route
                    path="/settings"
                    element={
                        <ShopProtectedRoute>
                            <ShopSettingsPage />
                        </ShopProtectedRoute>
                    }
                />

                <Route path="/dashboard"
                       element={<ShopProtectedRoute>
                           <ShopDashboardPage/>
                       </ShopProtectedRoute>}/>

                <Route path="/dashboard-create-product"
                       element={<ShopProtectedRoute>
                           <ShopCreateProduct/>
                       </ShopProtectedRoute>}/>

                <Route
                    path="/dashboard-products"
                    element={<ShopProtectedRoute>
                        <ShopAllProducts/>
                    </ShopProtectedRoute>}
                />

                <Route
                    path="/dashboard-orders"
                    element={<ShopProtectedRoute>
                        <ShopAllOrders/>
                    </ShopProtectedRoute>}
                />

                <Route
                    path="/order/:id"
                    element={<ShopProtectedRoute>
                        <ShopOrderDetails/>
                    </ShopProtectedRoute>}/>

                <Route
                    path="/dashboard-create-event"
                    element={<ShopProtectedRoute>
                        <ShopCreateEvents/>
                    </ShopProtectedRoute>}
                />

                <Route
                    path="/dashboard-refunds"
                    element={
                        <ShopProtectedRoute>
                            <ShopAllRefunds />
                        </ShopProtectedRoute>
                    }
                />

                <Route path="/dashboard-events"
                       element={<ShopProtectedRoute>
                           <ShopAllEvents/>
                       </ShopProtectedRoute>}/>

                <Route path="/dashboard-coupons"
                       element={<ShopProtectedRoute>
                           <ShopAllCoupons/>
                       </ShopProtectedRoute>}/>

                <Route
                    path="/dashboard-withdraw-money"
                    element={
                        <ShopProtectedRoute>
                            <ShopWithDrawMoneyPage />
                        </ShopProtectedRoute>
                    }
                />

                <Route
                    path="/dashboard-messages"
                    element={
                        <ShopProtectedRoute>
                            <ShopInboxPage />
                        </ShopProtectedRoute>
                    }
                />

            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </Router>
    </>);
}

export default App;