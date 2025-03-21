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
    ShopLoginPage

} from './Routes/Routes';
import ProtectedRoute from "./ProtectedRoutes/ProtectedRoute.jsx";
import {ToastContainer} from "react-toastify";
import {useEffect} from "react";
import {loadShop, loadUser} from "./redux/Actions/user.js";
import Store from "./redux/store.js";
import {
    ShopAllCoupons,
    ShopAllEvents,
    ShopAllProducts,
    ShopCreateEvents,
    ShopCreateProduct,
    ShopDashboardPage,
    ShopHomePage,
    ShopPreviewPage,

} from "./Routes/ShopRoutes.js";
import ShopProtectedRoute from "./ProtectedRoutes/ShopProtectedRoute.jsx";
import {getAllProducts} from "./redux/Actions/product.js";
import {getAllEvents} from "./redux/Actions/event.js";

function App() {
    useEffect(() => {
        Store.dispatch(loadUser());
        Store.dispatch(loadShop());
        Store.dispatch(getAllProducts());
        Store.dispatch(getAllEvents());

    }, []);

    return (<>
        <Router>
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
                <Route path="/payment" element={<ProtectedRoute>
                    <PaymentPage/>
                </ProtectedRoute>}/>
                <Route path="/order/success" element={<OrderSuccessPage/>}/>
                <Route path="/profile" element={<ProtectedRoute>
                    <ProfilePage/>
                </ProtectedRoute>}/>

                <Route path="/shop/preview/:id" element={<ShopPreviewPage/>}/>

                {/* shop Routes */}
                <Route path="/shop-create" element={<ShopCreatePage/>}/>
                <Route path="/shop-login" element={<ShopLoginPage/>}/>
                <Route path="/shop/:id" element={<ShopProtectedRoute>
                    <ShopHomePage/>
                </ShopProtectedRoute>}/>

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
                    path="/dashboard-create-event"
                    element={<ShopProtectedRoute>
                        <ShopCreateEvents/>
                    </ShopProtectedRoute>}
                />

                <Route path="/dashboard-events"
                       element={<ShopProtectedRoute>
                           <ShopAllEvents/>
                       </ShopProtectedRoute>}/>

                <Route path="/dashboard-coupons"
                       element={<ShopProtectedRoute>
                           <ShopAllCoupons/>
                       </ShopProtectedRoute>}/>


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