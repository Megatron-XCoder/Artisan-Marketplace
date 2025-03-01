import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

} from './Routes/Routes';
import {ToastContainer} from "react-toastify";
import {useEffect} from "react";
import {loadUser} from "./redux/Actions/user.js";
import Store from "./redux/store.js";

function App() {
    useEffect(() => {
        Store.dispatch(loadUser());
        // Store.dispatch(loadSeller());
        // Store.dispatch(getAllProducts());
        // Store.dispatch(getAllEvents());
    }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/activation/:activation_token" element={<ActivationPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:name" element={<ProductDetailsPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/order/success" element={<OrderSuccessPage />} />
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
  );
}

export default App;