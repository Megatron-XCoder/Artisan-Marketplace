import {AiOutlineArrowRight, AiOutlineCamera, AiOutlineDelete, AiOutlinePlusCircle} from "react-icons/ai";
import {backend_url} from "../../server.jsx";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {useState} from "react";
import {HiHome, HiOfficeBuilding} from "react-icons/hi";


const handleSubmit = async (e) => {
    e.preventDefault();
};


const ProfileContent = ({active}) => {
    const {user} = useSelector((state) => state.user);
    const [name, setName] = useState(user && user?.name);
    const [email, setEmail] = useState(user && user?.email);
    const [phoneNumber, setPhoneNumber] = useState(user && user?.phoneNumber);
    const [zipCode, setZipCode] = useState();
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");


    return (
        <>
            <div className="w-full">
                {/* profile */}
                {active === 1 && (
                    <div className="flex flex-col items-center w-full p-4 sm:p-6 bg-gray-50 rounded-lg shadow-lg">
                        {/* Profile Image Section */}
                        <div className="relative flex justify-center mb-6">
                            <img
                                src={`${backend_url}${user?.avatar}`}
                                className="w-24 h-24 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
                                alt="User Avatar"
                            />
                            <label
                                htmlFor="image"
                                className="absolute bottom-0 right-0 sm:bottom-2 sm:right-2 w-8 h-8 sm:w-10 sm:h-10 bg-indigo-500 text-white flex items-center justify-center rounded-full cursor-pointer shadow-md hover:bg-indigo-600 transition"
                            >
                                <AiOutlineCamera className="w-4 h-4 sm:w-5 sm:h-5"/>
                            </label>
                            <input type="file" id="image" className="hidden"/>
                        </div>

                        {/* Form Section */}
                        <form
                            onSubmit={handleSubmit}
                            className="w-full max-w-2xl mt-4 sm:mt-6 space-y-4 sm:space-y-6"
                        >
                            {/* Responsive Grid Containers */}
                            <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
                                {/* Name & Email */}
                                <div className="space-y-2">
                                    <label className="block text-sm sm:text-base text-gray-700 font-medium">Full
                                        Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm sm:text-base text-gray-700 font-medium">Email
                                        Address</label>
                                    <input
                                        type="email"
                                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Phone & Zip Code */}
                            <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="block text-sm sm:text-base text-gray-700 font-medium">Phone
                                        Number</label>
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400"
                                        required
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm sm:text-base text-gray-700 font-medium">Zip
                                        Code</label>
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400"
                                        required
                                        value={zipCode}
                                        onChange={(e) => setZipCode(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Address Fields */}
                            <div className="grid grid-cols-1 gap-4 sm:gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm sm:text-base text-gray-700 font-medium">Address
                                        1</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400"
                                        required
                                        value={address1}
                                        onChange={(e) => setAddress1(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm sm:text-base text-gray-700 font-medium">Address
                                        2</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400"
                                        required
                                        value={address2}
                                        onChange={(e) => setAddress2(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-center pt-4">
                                <button
                                    type="submit"
                                    className="w-full sm:w-52 h-12 bg-indigo-500 text-white text-sm sm:text-base font-medium rounded-lg shadow-md cursor-pointer hover:bg-indigo-600 transition"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* order page */}
                {active === 2 && (
                    <div>
                        <AllOrders/>
                    </div>
                )}

                {/* refund page */}
                {active === 3 && (
                    <div>
                        <AllRefundOrders/>
                    </div>
                )}

                {/* Track order page */}
                {active === 5 && (
                    <div>
                        <TrackOrders/>
                    </div>
                )}

                {/* Track order page */}
                {active === 6 && (
                    <div>
                        <PaymentMethod/>
                    </div>
                )}

                {/* Address page */}
                {active === 7 && (
                    <div>
                        <Address/>
                    </div>
                )}
            </div>
        </>
    );
}


const AllOrders = () => {
    const orders = [
        // ... your orders data
        {
            _id: "184265416511ddd263",
            orderItems: [
                {
                    name: "Nike Air Max 270",
                }
            ],
            totalPrice: 200,
            orderStatus: "Delivered",
        }, {
            _id: "1842654165www11263",
            orderItems: [
                {
                    name: "Nike Air Max 270",
                }
            ],
            totalPrice: 200,
            orderStatus: "Delivered",
        }, {
            _id: "184265416511263",
            orderItems: [
                {
                    name: "Nike Air Max 270",
                }
            ],
            totalPrice: 200,
            orderStatus: "Delivered",
        },
    ];

    return (
        <div className="w-full sm:mx-8 pt-1 sm:mt-4">
            {/* Desktop Header */}
            <div
                className="hidden sm:grid sm:grid-cols-5 gap-4 bg-gradient-to-r from-gray-50 to-gray-100 p-4 border-b font-medium text-sm text-gray-600 rounded-t-xl">
                <div className="min-w-[120px]">Order ID</div>
                <div className="min-w-[90px]">Status</div>
                <div className="min-w-[60px]">Items</div>
                <div className="min-w-[90px]">Total</div>
                <div className="min-w-[50px]">Receipt</div>
            </div>

            {/* Orders List */}
            <div className="space-y-4 sm:space-y-0">
                {orders.map((order) => (
                    <div
                        key={order._id}
                        className="flex flex-col sm:grid sm:grid-cols-5 gap-4 p-6 sm:p-4 text-sm group hover:bg-gray-50 transition-all rounded-2xl sm:rounded-none bg-white shadow-xl sm:shadow-none border border-gray-100 sm:border-none mb-4 sm:mb-0"
                    >
                        {/* Mobile Header */}
                        <div className="sm:hidden flex justify-between items-start mb-2">
                            <h3 className="font-bold text-gray-900 text-lg truncate pr-4">
                                Order #{order._id.slice(-6)}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs ${
                                order.orderStatus === "Delivered"
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-yellow-100 text-yellow-700'
                            }`}>
                                {order.orderStatus}
                            </span>
                        </div>

                        {/* Order ID */}
                        <div className="sm:min-w-[120px] text-gray-500 text-sm">
                            <span className="sm:hidden mr-2 text-gray-600">Order ID:</span>
                            <span className="font-mono text-xs sm:text-sm">{order._id}</span>
                        </div>

                        {/* Status */}
                        <div className="sm:min-w-[90px]">
                            <span className="sm:hidden mr-2 text-gray-600">Status:</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                order.orderStatus === "Delivered"
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-yellow-100 text-yellow-700'
                            }`}>
                                {order.orderStatus}
                            </span>
                        </div>

                        {/* Items (hidden on mobile) */}
                        <div className="sm:min-w-[60px] hidden sm:block">
                            {order.orderItems.length}
                        </div>

                        {/* Total */}
                        <div className="sm:min-w-[90px] text-green-600 font-semibold">
                            <span className="sm:hidden mr-2 text-gray-600">Total:</span>
                            US$ {order.totalPrice}
                        </div>

                        {/* Download Receipt */}
                        <div className="sm:min-w-[50px] flex justify-end sm:justify-start">
                            <Link
                                to={`/order/${order._id}`}
                                className="inline-flex items-center text-blue-500 hover:text-blue-600 transition-colors"
                            >
                                <span className="sm:hidden mr-2">Download</span>
                                <AiOutlineArrowRight className="text-lg"/>
                            </Link>
                        </div>

                        {/* Mobile Items Display */}
                        <div className="sm:hidden grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-gray-100">
                            <div className="text-gray-600">Items:</div>
                            <div className="text-right">
                                {order.orderItems.length} items
                            </div>
                            <div className="text-gray-600">Products:</div>
                            <div className="text-right truncate">
                                {order.orderItems.map(item => item.name).join(', ')}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const AllRefundOrders = () => {
    const orders = [
        // ... your orders data
        {
            _id: "184265416511ddd263",
            orderItems: [
                {
                    name: "Nike Air Max 270",
                }
            ],
            totalPrice: 200,
            orderStatus: "Delivered",
        }, {
            _id: "1842654165www11263",
            orderItems: [
                {
                    name: "Nike Air Max 270",
                }
            ],
            totalPrice: 200,
            orderStatus: "Delivered",
        }, {
            _id: "184265416511263",
            orderItems: [
                {
                    name: "Nike Air Max 270",
                }
            ],
            totalPrice: 200,
            orderStatus: "Delivered",
        },
    ];

    return (
        <div className="w-full sm:mx-8 pt-1 sm:mt-4">
            {/* Desktop Header */}
            <div
                className="hidden sm:grid sm:grid-cols-5 gap-4 bg-gradient-to-r from-gray-50 to-gray-100 p-4 border-b font-medium text-sm text-gray-600 rounded-t-xl">
                <div className="min-w-[120px]">Order ID</div>
                <div className="min-w-[90px]">Status</div>
                <div className="min-w-[60px]">Items</div>
                <div className="min-w-[90px]">Total</div>
                <div className="min-w-[50px]">Receipt</div>
            </div>

            {/* Orders List */}
            <div className="space-y-4 sm:space-y-0">
                {orders.map((order) => (
                    <div
                        key={order._id}
                        className="flex flex-col sm:grid sm:grid-cols-5 gap-4 p-6 sm:p-4 text-sm group hover:bg-gray-50 transition-all rounded-2xl sm:rounded-none bg-white shadow-xl sm:shadow-none border border-gray-100 sm:border-none mb-4 sm:mb-0"
                    >
                        {/* Mobile Header */}
                        <div className="sm:hidden flex justify-between items-start mb-2">
                            <h3 className="font-bold text-gray-900 text-lg truncate pr-4">
                                Order #{order._id.slice(-6)}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs ${
                                order.orderStatus === "Delivered"
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-yellow-100 text-yellow-700'
                            }`}>
                                {order.orderStatus}
                            </span>
                        </div>

                        {/* Order ID */}
                        <div className="sm:min-w-[120px] text-gray-500 text-sm">
                            <span className="sm:hidden mr-2 text-gray-600">Order ID:</span>
                            <span className="font-mono text-xs sm:text-sm">{order._id}</span>
                        </div>

                        {/* Status */}
                        <div className="sm:min-w-[90px]">
                            <span className="sm:hidden mr-2 text-gray-600">Status:</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                order.orderStatus === "Delivered"
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-yellow-100 text-yellow-700'
                            }`}>
                                {order.orderStatus}
                            </span>
                        </div>

                        {/* Items (hidden on mobile) */}
                        <div className="sm:min-w-[60px] hidden sm:block">
                            {order.orderItems.length}
                        </div>

                        {/* Total */}
                        <div className="sm:min-w-[90px] text-green-600 font-semibold">
                            <span className="sm:hidden mr-2 text-gray-600">Total:</span>
                            US$ {order.totalPrice}
                        </div>

                        {/* Download Receipt */}
                        <div className="sm:min-w-[50px] flex justify-end sm:justify-start">
                            <Link
                                to={`/order/${order._id}`}
                                className="inline-flex items-center text-blue-500 hover:text-blue-600 transition-colors"
                            >
                                <span className="sm:hidden mr-2">Download</span>
                                <AiOutlineArrowRight className="text-lg"/>
                            </Link>
                        </div>

                        {/* Mobile Items Display */}
                        <div className="sm:hidden grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-gray-100">
                            <div className="text-gray-600">Items:</div>
                            <div className="text-right">
                                {order.orderItems.length} items
                            </div>
                            <div className="text-gray-600">Products:</div>
                            <div className="text-right truncate">
                                {order.orderItems.map(item => item.name).join(', ')}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const TrackOrders = () => {
    const orders = [
        // ... your orders data
        {
            _id: "184265416511ddd263",
            orderItems: [
                {
                    name: "Nike Air Max 270",
                }
            ],
            totalPrice: 200,
            orderStatus: "Delivered",
        }, {
            _id: "1842654165www11263",
            orderItems: [
                {
                    name: "Nike Air Max 270",
                }
            ],
            totalPrice: 200,
            orderStatus: "Delivered",
        }, {
            _id: "184265416511263",
            orderItems: [
                {
                    name: "Nike Air Max 270",
                }
            ],
            totalPrice: 200,
            orderStatus: "Delivered",
        },
    ];

    return (
        <div className="w-full sm:mx-8 pt-1 sm:mt-4">
            {/* Desktop Header */}
            <div
                className="hidden sm:grid sm:grid-cols-5 gap-4 bg-gradient-to-r from-gray-50 to-gray-100 p-4 border-b font-medium text-sm text-gray-600 rounded-t-xl">
                <div className="min-w-[120px]">Order ID</div>
                <div className="min-w-[90px]">Status</div>
                <div className="min-w-[60px]">Items</div>
                <div className="min-w-[90px]">Total</div>
                <div className="min-w-[50px]">Receipt</div>
            </div>

            {/* Orders List */}
            <div className="space-y-4 sm:space-y-0">
                {orders.map((order) => (
                    <div
                        key={order._id}
                        className="flex flex-col sm:grid sm:grid-cols-5 gap-4 p-6 sm:p-4 text-sm group hover:bg-gray-50 transition-all rounded-2xl sm:rounded-none bg-white shadow-xl sm:shadow-none border border-gray-100 sm:border-none mb-4 sm:mb-0"
                    >
                        {/* Mobile Header */}
                        <div className="sm:hidden flex justify-between items-start mb-2">
                            <h3 className="font-bold text-gray-900 text-lg truncate pr-4">
                                Order #{order._id.slice(-6)}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs ${
                                order.orderStatus === "Delivered"
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-yellow-100 text-yellow-700'
                            }`}>
                                {order.orderStatus}
                            </span>
                        </div>

                        {/* Order ID */}
                        <div className="sm:min-w-[120px] text-gray-500 text-sm">
                            <span className="sm:hidden mr-2 text-gray-600">Order ID:</span>
                            <span className="font-mono text-xs sm:text-sm">{order._id}</span>
                        </div>

                        {/* Status */}
                        <div className="sm:min-w-[90px]">
                            <span className="sm:hidden mr-2 text-gray-600">Status:</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                order.orderStatus === "Delivered"
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-yellow-100 text-yellow-700'
                            }`}>
                                {order.orderStatus}
                            </span>
                        </div>

                        {/* Items (hidden on mobile) */}
                        <div className="sm:min-w-[60px] hidden sm:block">
                            {order.orderItems.length}
                        </div>

                        {/* Total */}
                        <div className="sm:min-w-[90px] text-green-600 font-semibold">
                            <span className="sm:hidden mr-2 text-gray-600">Total:</span>
                            US$ {order.totalPrice}
                        </div>

                        {/* Download Receipt */}
                        <div className="sm:min-w-[50px] flex justify-end sm:justify-start">
                            <Link
                                to={`/order/${order._id}`}
                                className="inline-flex items-center text-blue-500 hover:text-blue-600 transition-colors"
                            >
                                <span className="sm:hidden mr-2">Download</span>
                                <AiOutlineArrowRight className="text-lg"/>
                            </Link>
                        </div>

                        {/* Mobile Items Display */}
                        <div className="sm:hidden grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-gray-100">
                            <div className="text-gray-600">Items:</div>
                            <div className="text-right">
                                {order.orderItems.length} items
                            </div>
                            <div className="text-gray-600">Products:</div>
                            <div className="text-right truncate">
                                {order.orderItems.map(item => item.name).join(', ')}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// const PaymentMethod = () => {
//     return (
//         <div className={"w-full px-5"}>
//             <div className={"flex w-full items-center justify-between"}>
//                 <h1 className={"text-[25px] font-[600] text-[#000000ba]"}>Payment Method</h1>
//                 <div className={"flex items-center justify-between"}>
//                     <div className={"flex items-center"}>
//                         <input type="radio" name="payment" id="paypal" className={"mr-2"}/>
//                         <label htmlFor="paypal" className={"text-sm"}>Paypal</label>
//                     </div>
//                     <div className={"flex items-center"}>
//                         <input type="radio" name="payment" id="stripe" className={"mr-2"}/>
//                         <label htmlFor="stripe" className={"text-sm"}>Stripe</label>
//                     </div>
//                     <div className={"flex items-center"}>
//                         <input type="radio" name="payment" id="cash" className={"mr-2"}/>
//                         <label htmlFor="cash" className={"text-sm"}>Cash</label>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

const PaymentMethod = () => {
    return (
        <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex w-full items-center justify-between pb-6 border-b border-gray-100">
                <h1 className="text-2xl font-bold text-gray-900">
                    Payment Methods
                    <span className="block text-sm font-normal text-gray-500 mt-1">
                        Manage your saved payment options
                    </span>
                </h1>
                <button
                    className="flex items-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <AiOutlinePlusCircle className="mr-2 text-lg"/>
                    Add New Card
                </button>
            </div>

            <br/>

            {/* Payment Card */}
            <div
                className="w-full bg-gradient-to-br from-blue-600 to-purple-600 h-48 rounded-2xl flex flex-col justify-between p-6 shadow-xl text-white mb-6 ">
                {/* Card Background Pattern */}
                <div className=" inset-0 opacity-20 bg-white/20"></div>

                {/* Card Content */}
                <div className="flex justify-between items-start">
                    <img
                        src="https://logos-world.net/wp-content/uploads/2020/05/Visa-Logo.png"
                        alt="Visa"
                        className="w-16"
                    />
                    <AiOutlineDelete
                        size={24}
                        className="cursor-pointer hover:text-red-200 transition-colors"
                    />
                </div>

                <div>
                    <div className="text-xl tracking-widest mb-4 font-mono">
                        ●●●● ●●●● ●●●● 1234
                    </div>

                    <div className="flex justify-between items-center">
                        <div>
                            <div className="text-xs text-white/80">Card Holder</div>
                            <div className="font-semibold tracking-wide">SANJEEV KUMAR DAS</div>
                        </div>
                        <div>
                            <div className="text-xs text-white/80">Expires</div>
                            <div className="font-semibold tracking-wide">12/25</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Payment Methods */}
            <div
                className="w-full bg-white h-32 rounded-2xl flex items-center p-6 shadow-md hover:shadow-lg transition-shadow duration-300 group mb-6">
                <div className="flex items-center w-full">
                    <div className="bg-gray-100 p-4 rounded-xl mr-6">
                        <img
                            src="https://logos-world.net/wp-content/uploads/2020/04/PayPal-Logo.png"
                            alt="PayPal"
                            className="w-20"
                        />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800">PayPal Account</h3>
                        <p className="text-gray-500 text-sm">user@example.com</p>
                    </div>
                    <AiOutlineDelete
                        size={24}
                        className="text-gray-400 hover:text-red-500 cursor-pointer ml-4 transition-colors"
                    />
                </div>
            </div>
        </div>
    );
};


const Address = () => {
    return (
        <div className="w-full px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="flex w-full items-center justify-between pb-6 border-b border-gray-100">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        My Addresses
                        <span className="block text-sm font-normal text-gray-500 mt-1">
                            Manage your saved addresses
                        </span>
                    </h1>
                </div>
                <button
                    className="flex items-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    // onClick={() => setOpen(true)}
                >
                    <AiOutlinePlusCircle className="mr-2 text-lg"/>
                    Add New Address
                </button>
            </div>

            {/* Address Card */}
            <div
                className="w-full bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 group mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start">
                    {/* Address Type */}
                    <div className="flex items-center mb-4 sm:mb-0">
                        <div className="bg-blue-50 p-3 rounded-lg mr-4">
                            <HiHome className="text-blue-600 text-xl"/>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">Default Address</h3>
                            <p className="text-sm text-gray-500">Primary address</p>
                        </div>
                    </div>

                    {/* Address Details */}
                    <div className="flex-1 sm:px-8">
                        <div className="text-gray-700">
                            <p>1234 Shark Street</p>
                            <p>Chandigarh, Chandigarh</p>
                            <p>160047</p>
                        </div>
                        <div className="mt-2 text-gray-600">
                            <p>(123) 456-7890</p>
                        </div>
                    </div>

                    {/* Delete Button */}
                    <div className="mt-4 sm:mt-0">
                        <button className="text-gray-400 hover:text-red-500 transition-colors">
                            <AiOutlineDelete className="text-xl"/>
                        </button>
                    </div>
                </div>
            </div>

            {/* Additional Address Example */}
            <div
                className="w-full bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 group mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start">
                    {/* Address Type */}
                    <div className="flex items-center mb-4 sm:mb-0">
                        <div className="bg-purple-50 p-3 rounded-lg mr-4">
                            <HiOfficeBuilding className="text-purple-600 text-xl"/>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">Office Address</h3>
                            <p className="text-sm text-gray-500">Work address</p>
                        </div>
                    </div>

                    {/* Address Details */}
                    <div className="flex-1 sm:px-8">
                        <div className="text-gray-700">
                            <p>5678 Business Road</p>
                            <p>Chandigarh, Chandigarh</p>
                            <p>160048</p>
                        </div>
                        <div className="mt-2 text-gray-600">
                            <p>(123) 987-6543</p>
                        </div>
                    </div>

                    {/* Delete Button */}
                    <div className="mt-4 sm:mt-0">
                        <button className="text-gray-400 hover:text-red-500 transition-colors">
                            <AiOutlineDelete className="text-xl"/>
                        </button>
                    </div>
                </div>
            </div>

            {/* Empty State */}
            {/* {user && user.addresses.length === 0 && (
                <div className="text-center py-12">
                    <div className="inline-block p-6 bg-gray-50 rounded-2xl mb-4">
                        <HiLocationMarker className="text-4xl text-gray-400" />
                    </div>
                    <h5 className="text-gray-500 font-medium">
                        No saved addresses found
                    </h5>
                </div>
            )} */}
        </div>
    );
};

export default ProfileContent;