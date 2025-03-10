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
    ShopAllProducts,
    ShopCreateProduct,
    ShopDashboardPage,
    ShopHomePage,

} from "./Routes/ShopRoutes.js";
import ShopProtectedRoute from "./ProtectedRoutes/ShopProtectedRoute.jsx";

function App() {
    useEffect(() => {
        Store.dispatch(loadUser());
        Store.dispatch(loadShop());
        // Store.dispatch(getAllProducts());
        // Store.dispatch(getAllEvents());

    }, []);

  return (
    <>
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/sign-up" element={<SignupPage />} />
                <Route path="/activation/:activation_token" element={<ActivationPage />} />
                <Route path="/shop/activation/:activation_token" element={<SellerActivationPage />} />
                <Route path="/best-selling" element={<BestSellingPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/product/:name" element={<ProductDetailsPage />} />
                <Route path="/checkout" element={
                    <ProtectedRoute>
                        <CheckoutPage />
                    </ProtectedRoute>
                } />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/order/success" element={<OrderSuccessPage />} />
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                } />

                {/* shop Routes */}
                <Route path="/shop-create" element={<ShopCreatePage />} />
                <Route path="/shop-login" element={<ShopLoginPage />} />
                <Route path="/shop/:id" element={
                    <ShopProtectedRoute>
                        <ShopHomePage />
                    </ShopProtectedRoute>
                } />

                <Route path="/dashboard" element={
                    <ShopProtectedRoute>
                        <ShopDashboardPage />
                    </ShopProtectedRoute>
                } />

                <Route path="/dashboard-create-product" element={
                    <ShopProtectedRoute>
                        <ShopCreateProduct />
                    </ShopProtectedRoute>
                } />

                <Route path="/dashboard-products" element={
                    <ShopProtectedRoute>
                        <ShopAllProducts/>
                    </ShopProtectedRoute>
                } />


            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
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
    </>
  );
}

export default App;