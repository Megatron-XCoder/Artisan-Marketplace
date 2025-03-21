import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { server } from "../../server";

const Payment = () => {
    const [orderData, setOrderData] = useState([]);
    const [open, setOpen] = useState(false);
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        const orderData = JSON.parse(localStorage.getItem("latestOrder"));
        setOrderData(orderData);
    }, []);

    const createOrder = (data, actions) => {
        return actions.order
            .create({
                purchase_units: [
                    {
                        description: "Sunflower",
                        amount: {
                            currency_code: "USD",
                            value: orderData?.totalPrice,
                        },
                    },
                ],
                application_context: {
                    shipping_preference: "NO_SHIPPING",
                },
            })
            .then((orderID) => orderID);
    };

    const order = {
        cart: orderData?.cart,
        shippingAddress: orderData?.shippingAddress,
        user: user && user,
        totalPrice: orderData?.totalPrice,
    };

    const onApprove = async (data, actions) => {
        return actions.order.capture().then(function (details) {
            const { payer } = details;
            paypalPaymentHandler(payer);
        });
    };

    const paypalPaymentHandler = async (paymentInfo) => {
        const config = { headers: { "Content-Type": "application/json" } };

        order.paymentInfo = {
            id: paymentInfo.payer_id,
            status: "succeeded",
            type: "Paypal",
        };

        await axios.post(`${server}/order/create-order`, order, config)
            .then(() => {
                handlePaymentSuccess();
            });
    };

    const paymentData = { amount: Math.round(orderData?.totalPrice * 100) };

    const paymentHandler = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { "Content-Type": "application/json" } };
            const { data } = await axios.post(`${server}/payment/process`, paymentData, config);

            const result = await stripe.confirmCardPayment(data.client_secret, {
                payment_method: { card: elements.getElement(CardNumberElement) },
            });

            if (result.error) {
                toast.error(result.error.message);
            } else if (result.paymentIntent.status === "succeeded") {
                order.paymentInfo = {
                    id: result.paymentIntent.id,
                    status: result.paymentIntent.status,
                    type: "Credit Card",
                };

                await axios.post(`${server}/order/create-order`, order, config)
                    .then(() => handlePaymentSuccess());
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const cashOnDeliveryHandler = async (e) => {
        e.preventDefault();
        const config = { headers: { "Content-Type": "application/json" } };

        order.paymentInfo = { type: "Cash On Delivery" };

        await axios.post(`${server}/order/create-order`, order, config)
            .then(() => handlePaymentSuccess());
    };

    const handlePaymentSuccess = () => {
        setOpen(false);
        navigate("/order/success");
        toast.success("Order successful!");
        localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("latestOrder", JSON.stringify([]));
        window.location.reload();
    };

    return (
        <section className="bg-gray-100 py-8 antialiased min-h-screen">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <div className="mt-6 sm:mt-0 lg:flex lg:items-start lg:gap-8">
                    <PaymentInfo
                        user={user}
                        open={open}
                        setOpen={setOpen}
                        onApprove={onApprove}
                        createOrder={createOrder}
                        paymentHandler={paymentHandler}
                        cashOnDeliveryHandler={cashOnDeliveryHandler}
                        orderData={orderData}
                    />
                    <div className={"mt-10 lg:mt-0 lg:w-2/6"}>
                        <CartData orderData={orderData} />
                    </div>
                </div>
            </div>
        </section>
    );
};

const PaymentInfo = ({ orderData, paymentHandler, user, createOrder, open, setOpen, cashOnDeliveryHandler, onApprove }) => {
    const [select, setSelect] = useState(1);

    return (
        <div className="min-w-0 flex-1 space-y-8">
            <div className="w-full bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Methods</h2>

                {/* Credit Card Section */}
                <div className="mb-6">
                    <div className="flex items-center gap-4 pb-4 cursor-pointer" onClick={() => setSelect(1)}>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            select === 1 ? 'border-blue-600 bg-blue-100' : 'border-gray-300'}`}>
                            {select === 1 && <div className="w-3 h-3 bg-blue-600 rounded-full"></div>}
                        </div>
                        <h3 className="text-lg font-medium text-gray-700">Credit/Debit Card</h3>
                    </div>

                    {select === 1 && (
                        <form onSubmit={paymentHandler} className="space-y-4 border-t border-gray-300 pt-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Card Number</label>
                                    <CardNumberElement
                                        className="w-full rounded-lg border-gray-200 bg-gray-50 p-3 text-sm focus:border-blue-500 focus:ring-blue-500"
                                        options={{
                                            style: {
                                                base: { fontSize: '16px', color: '#374151' },
                                                invalid: { color: '#ef4444' }
                                            }
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Expiry Date</label>
                                    <CardExpiryElement
                                        className="w-full rounded-lg border-gray-200 bg-gray-50 p-3 text-sm focus:border-blue-500 focus:ring-blue-500"
                                        options={{ style: { base: { fontSize: '16px', color: '#374151' } } }}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">CVC</label>
                                    <CardCvcElement
                                        className="w-full rounded-lg border-gray-200 bg-gray-50 p-3 text-sm focus:border-blue-500 focus:ring-blue-500"
                                        options={{ style: { base: { fontSize: '16px', color: '#374151' } } }}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Name on Card</label>
                                    <input
                                        value={user?.name || ""}
                                        readOnly
                                        className="w-full rounded-lg bg-gray-100 p-3 text-sm font-medium text-black cursor-not-allowed"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-br from-purple-600 to-blue-500 text-white py-3 rounded-lg hover:opacity-90 transition-opacity font-medium">
                                Pay $ {orderData?.totalPrice}
                            </button>
                        </form>
                    )}
                </div>

                {/* PayPal Section */}
                <div className="mb-6">
                    <div className="flex items-center gap-4 pb-4 cursor-pointer" onClick={() => setSelect(2)}>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            select === 2 ? 'border-blue-600 bg-blue-100' : 'border-gray-300'}`}>
                            {select === 2 && <div className="w-3 h-3 bg-blue-600 rounded-full"></div>}
                        </div>
                        <h3 className="text-lg font-medium text-gray-700">PayPal</h3>
                    </div>

                    {select === 2 && (
                        <div className="border-t border-gray-300 pt-4 space-y-4">
                            <button
                                onClick={() => setOpen(true)}
                                className="w-full bg-gradient-to-tr from-purple-600 to-blue-500 text-white py-3 rounded-lg hover:opacity-90 transition-opacity font-medium">
                                Pay $ {orderData?.totalPrice} with PayPal
                            </button>

                            {open && (
                                <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
                                    <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
                                        <RxCross1
                                            size={24}
                                            className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-700"
                                            onClick={() => setOpen(false)}
                                        />
                                        <PayPalScriptProvider options={{ "client-id": "your-paypal-client-id" }}>
                                            <PayPalButtons
                                                style={{ layout: "vertical" }}
                                                onApprove={onApprove}
                                                createOrder={createOrder}
                                            />
                                        </PayPalScriptProvider>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Cash on Delivery Section */}
                <div className="mb-6">
                    <div className="flex items-center gap-4 pb-4 cursor-pointer" onClick={() => setSelect(4)}>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            select === 4 ? 'border-blue-600 bg-blue-100' : 'border-gray-300'}`}>
                            {select === 4 && <div className="w-3 h-3 bg-blue-600 rounded-full"></div>}
                        </div>
                        <h3 className="text-lg font-medium text-gray-700">Cash on Delivery</h3>
                    </div>

                    {select === 4 && (
                        <div className="border-t border-gray-300 pt-4">
                            <button
                                onClick={cashOnDeliveryHandler}
                                className="w-full bg-gradient-to-tr from-purple-600 to-blue-500 text-white py-3 rounded-lg hover:opacity-90 transition-opacity font-medium">
                                Confirm Order
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const CartData = ({ orderData }) => (
    <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>
        <div className="space-y-3">
            <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({orderData?.cart?.length} items):</span>
                <span className="font-medium">${orderData?.subTotalPrice}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-600">Shipping:</span>
                <span className="font-medium">${orderData?.shipping}</span>
            </div>
            {orderData?.discountPrice > 0 && (
                <div className="flex justify-between text-red-600">
                    <span className={"bg-red-100 px-2 rounded-sm"}>Coupon-Code Discount:</span>
                    <span>-${orderData?.discountPrice.toFixed(2)}</span>
                </div>
            )}
        </div>
        <div className="border-t mt-4 pt-4">
            <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-800">Total</span>
                <span className="text-xl font-bold text-gray-800">${orderData?.totalPrice}</span>
            </div>
        </div>
    </div>
);

export default Payment;