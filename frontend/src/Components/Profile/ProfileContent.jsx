import {AiOutlineArrowRight, AiOutlineCamera, AiOutlineDelete, AiOutlinePlusCircle} from "react-icons/ai";
import {backend_url} from "../../server.jsx";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {Country, State} from "country-state-city";
import {HiHome, HiLocationMarker, HiOfficeBuilding} from "react-icons/hi";
import axios from "axios";
import { server } from "../../server";
import { IoMdLock } from "react-icons/io";
import {FiCheckCircle, FiAlertCircle, FiEyeOff, FiEye} from "react-icons/fi";
import {toast} from "react-toastify";
import {deleteUserAddress, updateUserAddress, updateUserInformation} from "../../redux/Actions/user.js";
import {RxCross1} from "react-icons/rx";


const ProfileContent = ({active}) => {
    const {user, successMessage} = useSelector((state) => state.user);
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUserInformation(name, email, phoneNumber, password));
    };

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch({type: "clearMessages"});
            window.location.reload();
        }
    }, [successMessage, dispatch]);

    return (
        <>
            <div className="w-full">
                {/* profile */}
                {active === 1 && (
                    <div className="flex flex-col items-center w-full p-8 sm:p-10 bg-gray-50 rounded-lg shadow-lg">
                        {/* Profile Image Section */}
                        <div className="relative flex justify-center">
                            <img
                                src={`${backend_url}${user?.avatar}`}
                                className="w-36 h-36 sm:w-48 sm:h-48 mt-6 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
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
                            className="w-full max-w-2xl mb-4 mt-8 sm:mt-6 space-y-4 sm:space-y-6"
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
                                        placeholder={"Phone Number"}
                                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-indigo-400"
                                        required
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label
                                        className="block text-sm sm:text-base text-gray-700 font-medium">Password</label>
                                    <input
                                        type="password"
                                        placeholder={"Enter password to update"}
                                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-indigo-400"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
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
                        <ChangePassword/>
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

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validatePassword = () => {
        if (newPassword !== confirmPassword) {
            setPasswordError("Passwords do not match");
            return false;
        }
        if (newPassword.length < 8) {
            setPasswordError("Password must be at least 8 characters");
            return false;
        }
        setPasswordError("");
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validatePassword()) return;

        setIsSubmitting(true);
        try {
            const res = await axios.put(
                `${server}/user/update-user-password`,
                { oldPassword, newPassword, confirmPassword },
                { withCredentials: true }
            );

            toast.success("Password updated successfully", {
                icon: <FiCheckCircle className="text-green-500 text-xl" />
            });
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            toast.error(error.response?.data?.message || "Password update failed", {
                icon: <FiAlertCircle className="text-red-500 text-xl" />
            });
        }
        setIsSubmitting(false);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 lg:p-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 flex gap-2">
                    <IoMdLock className="text-purple-600" />
                    Change Password
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Current Password
                            </label>
                            <div className="relative flex items-center">
                                <input
                                    type={showOldPassword ? "text" : "password"}
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all pr-10"
                                    placeholder="Enter current password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowOldPassword(!showOldPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-600"
                                >
                                    {showOldPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* New Password Field */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                New Password
                            </label>
                            <div className="relative flex items-center">
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all pr-10"
                                    placeholder="At least 8 characters"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-600"
                                >
                                    {showNewPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm New Password Field */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm New Password
                            </label>
                            <div className="relative flex items-center">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    onBlur={validatePassword}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all pr-10"
                                    placeholder="Re-enter new password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-600"
                                >
                                    {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                                </button>
                            </div>
                        </div>

                        {passwordError && (
                            <div className="text-red-600 text-sm flex items-center gap-2">
                                <FiAlertCircle />
                                {passwordError}
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        ) : (
                            <>
                                <IoMdLock className="text-lg" />
                                Update Password
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-6 text-sm text-gray-500">
                    <p className="flex items-center gap-2">
                        <FiAlertCircle className="text-gray-400" />
                        Password must be at least 8 characters
                    </p>
                </div>
            </div>
        </div>
    );
};

const Address = () => {
    const {user} = useSelector((state) => state.user);
    const [open, setOpen] = useState(false);
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [addressType, setAddressType] = useState("");
    const dispatch = useDispatch();

    const addressTypeData = [
        {name: `Default`},
        {name: `Home`},
        {name: `Office`},
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!addressType || !country || !city || !address1) {
            toast.error(`Please fill all fields marked with *`);
            return;
        }
        dispatch(updateUserAddress(country, city, address1, address2, zipCode, addressType));
        setOpen(false);
        // Reset form fields
        [setCountry, setCity, setAddress1, setAddress2, setZipCode, setAddressType].forEach(fn => fn(""));
    };

    const handleDelete = (item) => {
        dispatch(deleteUserAddress(item._id));
    };

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8">
            {/* Modal */}
            {open && (
                <div className="fixed w-full h-screen bg-black/40 top-0 left-0 flex items-center justify-center z-50">
                    <div
                        className="w-[90%] md:w-[35%] h-[88vh] bg-white rounded-2xl shadow-xl relative overflow-y-scroll">
                        <div className="w-full flex p-3 justify-end">
                            <RxCross1
                                size={30}
                                className="cursor-pointer mt-2 mr-2 hover:text-red-500 transition-colors"
                                onClick={() => setOpen(false)}
                            />
                        </div>
                        <h1 className="text-center text-2xl font-bold text-gray-900 mb-6">
                            Add New Address
                        </h1>
                        <form onSubmit={handleSubmit} className="px-6">
                            {/* Country Field */}
                            <div className="w-full pb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Country <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Choose your Country</option>
                                    {Country &&
                                        Country.getAllCountries().map((item) => (
                                            <option key={item.isoCode} value={item.isoCode}>
                                                {item.name}
                                            </option>
                                        ))}
                                </select>
                            </div>

                            {/* City Field */}
                            <div className="w-full pb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    State <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="w-full p-2 border placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Select State</option>
                                    {State &&
                                        State.getStatesOfCountry(country).map((item) => (
                                            <option key={item.isoCode} value={item.name}>
                                                {item.name}
                                            </option>
                                        ))}
                                </select>
                            </div>

                            {/* Address 1 Field */}
                            <div className="w-full pb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Address Line 1 <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={address1}
                                    onChange={(e) => setAddress1(e.target.value)}
                                    placeholder="Street address or P.O. Box"
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {/* Address 2 Field */}
                            <div className="w-full pb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Address Line 2
                                </label>
                                <input
                                    type="text"
                                    value={address2}
                                    onChange={(e) => setAddress2(e.target.value)}
                                    placeholder="Apt, suite, unit, building, floor, etc."
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {/* Zip Code Field */}
                            <div className="w-full pb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    ZIP/Postal Code
                                </label>
                                <input
                                    type="number"
                                    value={zipCode}
                                    onChange={(e) => setZipCode(e.target.value)}
                                    placeholder="Enter postal code"
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {/* Address Type Field */}
                            <div className="w-full pb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Address Type <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={addressType}
                                    onChange={(e) => setAddressType(e.target.value)}
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Select Address Type</option>
                                    {addressTypeData.map((item) => (
                                        <option key={item.name} value={item.name}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full mt-6 mb-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-medium hover:opacity-90 transition-opacity"
                            >
                                Save Address
                            </button>
                        </form>
                    </div>
                </div>
            )}

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
                    onClick={() => setOpen(true)}
                >
                    <AiOutlinePlusCircle className="mr-2 text-lg"/>
                    Add New Address
                </button>
            </div>

            <div className="lg:grid md:grid-cols-2 md:gap-x-20">
                {user?.addresses?.map((address, index) => (
                    <div key={index}
                         className="w-full bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 group mb-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start">
                            <div className="flex items-center mb-4 sm:mb-0">
                                <div className={`${
                                    address.addressType === "Home" ? "bg-blue-50"
                                        : address.addressType === "Office" ? "bg-purple-50"
                                            : "bg-teal-50"
                                } p-3 rounded-lg mr-4`}>
                                    {address.addressType === "Home" ? (
                                        <HiHome className="text-blue-600 text-xl"/>
                                    ) : address.addressType === "Office" ? (
                                        <HiOfficeBuilding className="text-purple-600 text-xl"/>
                                    ) : (
                                        <HiLocationMarker className="text-teal-600 text-xl"/>
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {address.addressType} Address
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {address.addressType === "Default" ? "Primary address" : `${address.addressType} address`}
                                    </p>
                                </div>
                            </div>

                            <div className="flex-1 sm:px-8">
                                <div className="text-gray-700">
                                    <p>{address.address1}</p>
                                    <p>{address.address2}</p>
                                    <p>{address.city}, {address.country}</p>
                                    <p>{address.zipCode}</p>
                                </div>
                                <div className="mt-2 text-gray-600">
                                    <p>{user?.phoneNumber}</p>
                                </div>
                            </div>

                            <div className="mt-4 sm:mt-0">
                                <button
                                    onClick={() => handleDelete(address)}
                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    <AiOutlineDelete className="text-xl"/>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {user?.addresses?.length === 0 && (
                <div className="text-center py-12">
                    <div className="inline-block p-6 rounded-2xl">
                        <img
                            src="https://img.freepik.com/free-vector/current-location-concept-illustration_114360-4406.jpg"
                            alt="Empty Cart"
                            className="w-72 h-72 mix-blend-multiply"
                        />
                    </div>
                    <h5 className="text-gray-500 text-lg md:text-2xl font-medium">
                        No saved addresses found
                    </h5>
                </div>
            )}
        </div>
    );
};

export default ProfileContent;