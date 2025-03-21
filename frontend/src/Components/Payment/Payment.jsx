import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const Payment = () => {
    const [orderData, setOrderData] = useState([]);


    useEffect(() => {
        const orderData = JSON.parse(localStorage.getItem("latestOrder"));
        setOrderData(orderData);
    }, []);

    return (
        <section className="bg-gray-100 antialiased min-h-screen">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <div className="mt-6 sm:mt-0 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                    <div className="min-w-0 flex-1 space-y-8">
                        <PaymentInfo/>
                    </div>

                    <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
                        <CartData orderData={orderData} />
                    </div>
                </div>
            </div>
        </section>
    );
};

const PaymentInfo = () => {
    const [select, setSelect] = useState(1);

    return (
        <div className="w-full bg-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Payment Methods</h2>

            {/* Credit Card */}
            <div className="mb-6">
                <div className="flex items-center gap-4 pb-4 cursor-pointer" onClick={() => setSelect(1)}>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
            ${select === 1 ? 'border-blue-600 bg-blue-100' : 'border-gray-300'}`}>
                        {select === 1 && <div className="w-3 h-3 bg-blue-600 rounded-full"></div>}
                    </div>
                    <h3 className="text-lg font-normal text-gray-700">Credit/Debit Card</h3>
                </div>

                {select === 1 && (
                    <div className="space-y-4 border-t pt-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">Card Number</label>
                                <input
                                    placeholder="4242 4242 4242 4242"
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">Expiry Date</label>
                                <input
                                    placeholder="MM/YY"
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">CVC</label>
                                <input
                                    placeholder="123"
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">Name on Card</label>
                                <input
                                    placeholder="John Doe"
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                                />
                            </div>
                        </div>
                        <button
                            className="w-full bg-gradient-to-br from-purple-600 to-blue-500 text-white py-3 rounded-lg hover:opacity-90 transition-opacity font-medium">
                            Pay $256.00
                        </button>
                    </div>
                )}
            </div>

            {/* PayPal */}
            <div className="mb-6">
                <div className="flex items-center gap-4 pb-4 cursor-pointer" onClick={() => setSelect(2)}>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
            ${select === 2 ? 'border-blue-600 bg-blue-100' : 'border-gray-300'}`}>
                        {select === 2 && <div className="w-3 h-3 bg-blue-600 rounded-full"></div>}
                    </div>
                    <h3 className="text-lg font-normal text-gray-700">PayPal</h3>
                </div>

                {select === 2 && (
                    <div className="border-t pt-4 space-y-4">
                        <button
                            className="w-full bg-gradient-to-tr from-purple-600 to-blue-500 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                            Continue with PayPal
                        </button>
                    </div>
                )}
            </div>

            {/* Razorpay */}
            <div className="mb-6">
                <div className="flex items-center gap-4 pb-4 cursor-pointer" onClick={() => setSelect(3)}>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
            ${select === 3 ? 'border-blue-600 bg-blue-100' : 'border-gray-300'}`}>
                        {select === 3 && <div className="w-3 h-3 bg-blue-600 rounded-full"></div>}
                    </div>
                    <h3 className="text-lg font-normal text-gray-700">Razorpay</h3>
                </div>

                {select === 3 && (
                    <div className="border-t pt-4 space-y-4">
                        <button
                            className="w-full bg-gradient-to-tr from-purple-600 to-blue-500 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                            Pay with Razorpay
                        </button>
                    </div>
                )}
            </div>

            {/* Cash on Delivery */}
            <div className="mb-6">
                <div className="flex items-center gap-4 pb-4 cursor-pointer" onClick={() => setSelect(4)}>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
            ${select === 4 ? 'border-blue-600 bg-blue-100' : 'border-gray-300'}`}>
                        {select === 4 && <div className="w-3 h-3 bg-blue-600 rounded-full"></div>}
                    </div>
                    <h3 className="text-lg font-normal text-gray-700">Cash on Delivery</h3>
                </div>

                {select === 4 && (
                    <div className="border-t pt-4">
                        <button
                            className="w-full bg-gradient-to-tr from-purple-600 to-blue-500 text-white py-3 rounded-lg hover:opacity-90 transition-opacity font-medium">
                            Confirm Order
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const CartData = ({orderData}) => {
    return (
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
                <div className="flex justify-between">
                    <span className="text-red-600 bg-red-100 px-2">Coupon-Code Discount:</span>
                    <span className="text-red-600 font-medium">-${orderData?.discountPrice}</span>
                </div>
            </div>

            <div className="border-t mt-4 pt-4">
                <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-800">Total</span>
                    <span className="text-xl font-bold text-gray-800">${orderData?.totalPrice}</span>
                </div>
            </div>

            <div className="mt-3 space-y-3">
                <p className="text-sm font-normal text-gray-500">
                    Need help? <Link to="/contact" className="text-blue-600 hover:underline">Contact support</Link>
                </p>
            </div>
        </div>
    );
};

export default Payment;