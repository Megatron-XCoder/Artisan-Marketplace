import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
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
import ProtectedRoute from "./ProtectedRoute.jsx";
import {ToastContainer} from "react-toastify";
import {useEffect} from "react";
import {loadShop, loadUser} from "./redux/Actions/user.js";
import Store from "./redux/store.js";
import {useSelector} from "react-redux";
import {ShopDashboardPage} from "./Routes/ShopRoutes.js";
import ShopProtectedRoute from "./ShopProtectedRoute.jsx";

function App() {
    const { loading, isAuthenticated } = useSelector((state) => state.user);
    const { isLoading, isShop } = useSelector((state) => state.shop);

    useEffect(() => {
        Store.dispatch(loadUser());
        Store.dispatch(loadShop());
        // Store.dispatch(getAllProducts());
        // Store.dispatch(getAllEvents());

    }, []);

  return (
    <>
        { loading || isLoading ? null : (
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
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <CheckoutPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/payment" element={<PaymentPage />} />
                    <Route path="/order/success" element={<OrderSuccessPage />} />
                    <Route path="/profile" element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <ProfilePage />
                        </ProtectedRoute>
                    } />

                    {/* shop Routes */}
                    <Route path="/shop-create" element={<ShopCreatePage />} />
                    <Route path="/shop-login" element={<ShopLoginPage />} />
                    <Route path="/shop/:id" element={
                        <ShopProtectedRoute
                            isShop={isShop}
                        >
                            <ShopDashboardPage />
                        </ShopProtectedRoute>
                    } />

                </Routes>
                <ToastContainer
                    position="bottom-center"
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
        )}
    </>
  );
}

export default App;