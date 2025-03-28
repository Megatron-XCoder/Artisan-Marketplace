import { useEffect, useState } from "react";
import {BsArrowLeft, BsFillBagFill} from "react-icons/bs";
import jsPDF from 'jspdf';
import { autoTable } from 'jspdf-autotable';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfUser } from "../../redux/Actions/order";
import { server } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "../../Styles/Styles.jsx";
import {AiFillStar, AiOutlineMessage, AiOutlineStar} from "react-icons/ai";
import {RxCross1} from "react-icons/rx";

const UserOrderDetails = () => {
    const { orders } = useSelector((state) => state.order);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [status, setStatus] = useState("");
    const [openReview, setOpenReview] = useState(false);
    const [comment, setComment] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
    const [rating, setRating] = useState(1);
    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        dispatch(getAllOrdersOfUser(user._id));
    }, [dispatch, user._id]);

    const handleMessageSubmit = () => navigate("/inbox?conversation=12356789");

    // Update the generateInvoice function
    const generateInvoice = () => {
        const doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
        });

        // Add logo
        const logoUrl = "https://cdn.shopify.com/s/files/1/0412/5117/6615/files/The_Artisan_Marketplace_-_Logo_1caa2512-2a37-417f-948e-bb571f16e582.jpg";
        doc.addImage(logoUrl, "JPEG", 20, 15, 53, 18);

        // Company Info
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text("The Artisan Marketplace", 200, 20, { align: "right" });
        doc.text("#D-2, Deepak Spinners Ltd. Baddi,", 200, 25, { align: "right" });
        doc.text("Himachal Pradesh, India", 200, 30, { align: "right" });
        doc.text("Email: support@artisanmarket.com", 200, 35, { align: "right" });

        // Invoice Title
        doc.setFontSize(20);
        doc.setFont("helvetica", "bold");
        doc.text("INVOICE", 105, 50, { align: "center" });

        // Status Badge
        doc.setFillColor(200, 200, 200);
        doc.roundedRect(84, 55, 45, 8, 2, 2, "F");
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text(`STATUS:  ${data?.status.toUpperCase()}`, 87, 60);

        // Billing Sections
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.text("Bill To:", 20, 75);
        doc.setFont("helvetica", "normal");
        doc.text(data?.shippingAddress?.address1, 20, 80);
        doc.text(`${data?.shippingAddress?.city}, ${data?.shippingAddress?.country}`, 20, 85);
        doc.text(`Phone: ${data?.user?.phoneNumber}`, 20, 90);

        // Invoice Details Table
        const invoiceData = [
            ["Invoice #", data?._id.slice(-8)],
            ["Invoice Date", new Date(data?.createdAt).toLocaleDateString()],
            ["Payment Method", data?.paymentInfo?.type || "Cash On Delivery"],
            ["Amount Due", `US$ ${(data?.totalPrice)}`],
        ];

        autoTable(doc,{
            startY: 100,
            margin: { left: 18 },
            body: invoiceData,
            theme: "plain",
            styles: { fontSize: 10, cellPadding: 2 },
            columnStyles: { 0: { fontStyle: "bold", cellWidth: 50 } }
        });

        // Items Table
        const items = data?.cart?.map(item => [
            item.name,
            item.qty,
            `US$ ${(item.discountPrice).toFixed(2)}`,
            `US$ ${(item.qty * item.discountPrice).toFixed(2)}`
        ]);

        autoTable(doc,{
            startY: 140,
            margin: { left: 23 },
            head: [['Item Description', 'Qty', 'Unit Price', 'Total']],
            body: items,
            theme: "striped",
            headStyles: {
                fillColor: [41, 128, 185],
                textColor: 255,
                fontSize: 10,
                fontStyle: "bold"
            },
            styles: { fontSize: 10, cellPadding: 2 },
            columnStyles: {
                0: { cellWidth: 80 },
                1: { cellWidth: 20, halign: "center" },
                2: { cellWidth: 30, halign: "right" },
                3: { cellWidth: 30, halign: "right" }
            }
        });

        // Totals Section
        const finalY = doc.lastAutoTable.finalY + 10;
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.text("Subtotal:", 140, finalY, { align: "right" });
        doc.text(`US$ ${(data?.cart[0]?.discountPrice)}`, 170, finalY, { align: "right" });

        doc.text("Shipping:", 140, finalY + 5, { align: "right" });
        doc.text(`US$ ${(data?.totalPrice - data?.cart[0]?.discountPrice).toFixed(2)}`, 170, finalY + 5, { align: "right" });

        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("Grand Total:", 140, finalY + 12, { align: "right" });
        doc.text(`US$ ${(data?.totalPrice)}`, 170, finalY + 12, { align: "right" });

        // Footer
        doc.setFontSize(8);
        doc.setFont("helvetica", "italic");
        doc.text("Thank you for your business!", 105, 280, { align: "center" });
        doc.text("© 2024 The Artisan Marketplace. All rights reserved.", 105, 285, { align: "center" });

        // Save Invoice
        doc.save(`invoice-${data?._id}.pdf`);
    };

    const reviewHandler = async () => {
        await axios.put(
            `${server}/product/create-new-review`,
            {
                user: data.user,
                rating,
                comment,
                productId: selectedItem?._id,
                orderId: id,
            },
            { withCredentials: true }
        ).then((res) => {
            toast.success(res.data.message);
            // Refresh orders after successful review
            dispatch(getAllOrdersOfUser(user._id));
            setComment("");
            setRating(1);
            setOpenReview(false);
        }).catch((error) => {
            toast.error(error.response.data.message);
        });
    };

    const refundHandler = async () => {
        await axios.put(`${server}/order/order-refund/${id}`,{
            status: "Processing refund"
        }).then((res) => {
            toast.success(res.data.message);
            dispatch(getAllOrdersOfUser(user._id));
        }).catch((error) => {
            toast.error(error.response.data.message);
        })
    };

    const data = orders && orders.find((item) => item._id === id);

    useEffect(() => {
        if (data?.status) {
            setStatus(data.status);
        }
    }, [data]);  // Add this useEffect hook


    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/*/!* Review Popup *!/*/}
            {openReview && (
                <div className="fixed inset-0 bg-black/50 bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl w-full max-w-2xl p-6 space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-900">Write a Review</h2>
                            <RxCross1
                                className="text-gray-500 hover:text-gray-700 cursor-pointer h-6 w-6"
                                onClick={() => setOpenReview(false)}
                            />
                        </div>

                        {selectedItem && (
                            <div className="flex items-center md:p-4 hover:bg-gray-50 rounded-lg transition-colors gap-4 sm:gap-6">
                                <Link to={`/product/${selectedItem._id}`} className="flex-shrink-0">
                                    <img
                                        src={`${server}/uploads/${selectedItem.images[0]}`}
                                        alt={selectedItem.name}
                                        className="w-20 h-20 object-cover rounded-md border border-gray-200"
                                    />
                                </Link>

                                <div className="ml-0 sm:ml-4 flex-1">
                                    <Link to={`/product/${selectedItem._id}`}>
                                        <h3 className="font-medium text-gray-900 hover:underline">
                                            {selectedItem.name}
                                        </h3>
                                    </Link>
                                    <p className="text-gray-500 text-sm mt-1">
                                        {selectedItem.qty} x US${selectedItem.discountPrice}
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Rating <span className="text-red-500">*</span>
                                </label>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <button
                                            key={i}
                                            onClick={() => setRating(i)}
                                            className="text-2xl text-amber-400 hover:text-amber-500 transition-colors"
                                        >
                                            {i <= rating ? <AiFillStar /> : <AiOutlineStar />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Comment (optional)
                                </label>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Share your experience with this product..."
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                    rows="4"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setOpenReview(false)}
                                className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={reviewHandler}
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                            >
                                Submit Review
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Header Section */}
            <div className="flex flex-wrap items-center justify-between mb-4 sm:gap-6">
                {/* Left Section */}
                <div className="flex flex-wrap items-center space-x-4">
                    <Link to="/profile" className="flex items-center text-gray-600 hover:text-gray-800">
                        <BsArrowLeft className="w-5 h-5 mr-2" />
                        <span className="text-sm font-medium">Back to Orders</span>
                    </Link>
                    <div className="flex items-center px-4 py-2 rounded-lg">
                        <BsFillBagFill className="w-6 h-6 text-blue-600" />
                        <h1 className="ml-2 text-2xl sm:text-3xl font-bold bg-gradient-to-b from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Order Details
                        </h1>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex flex-wrap items-center justify-center sm:justify-end w-full sm:w-auto text-sm text-gray-500">
                    <span>Order ID: #{data?._id?.slice(0, 8)}</span>
                    <span className="mx-2 sm:inline">•</span>
                    <span>Placed on: {data?.createdAt?.slice(0, 10)}</span>
                </div>
            </div>


            {/* Order Items Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <div className="flex justify-between items-center w-full sm:w-auto">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Products ({data?.cart?.length})</h2>
                    <div
                        className={`${styles.button} bg-[#6443d1] mt-4 md:mr-3 !rounded-lg !h-10 !w-38`}
                        onClick={handleMessageSubmit}
                    >
            <span className="text-white flex items-center">
                Send Message <AiOutlineMessage className="ml-1"/>
            </span>
                    </div>
                </div>
                <div className="space-y-4">
                    {data?.cart?.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-wrap items-center md:p-4 hover:bg-gray-50 rounded-lg transition-colors gap-4 sm:gap-6"
                        >
                            {/* Product Image */}
                            <Link to={`/product/${item._id}`} className="flex-shrink-0">
                                <img
                                    src={`${server}/uploads/${item.images[0]}`}
                                    alt={item.name}
                                    className="w-20 h-20 object-cover rounded-md border border-gray-200"
                                />
                            </Link>

                            {/* Product Info */}
                            <div className="ml-0 sm:ml-4 flex-1 w-full sm:w-auto">
                                <Link to={`/product/${item._id}`}>
                                    <h3 className="font-medium text-gray-900 hover:underline">{item.name}</h3>
                                </Link>
                                <p className="font-sans text-gray-500 text-sm mt-1">{item.qty} x INR₹ {item.discountPrice}</p>
                            </div>

                            {/* Price and Review Button */}
                            <div className="ml-auto flex flex-col items-end">
                                {/* Review Button Conditions */}
                                {data?.status === "Delivered" && !item.isReviewed && (
                                    <button
                                        onClick={() => {
                                            setOpenReview(true);
                                            setSelectedItem(item);  // Set the specific item being reviewed
                                        }}
                                        className={`${styles.button} !w-36 text-white rounded-lg transition-colors gap-x-2 mt-2`}
                                    >
                                        Write Review
                                        <AiFillStar className="w-5 h-5" />
                                    </button>
                                )}

                                <div>
                                    <p className="font-medium font-sans text-gray-900">INR₹ {(item.qty * item.discountPrice)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="border-t pt-4 mt-4">
                    <div className="flex justify-end">
                        <div className="text-right">
                            <p className="text-gray-600">Subtotal:</p>
                            <p className="text-2xl font-sans font-bold text-gray-900">INR₹ {data?.totalPrice}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Shipping & Payment Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping Information</h2>
                    <div className="space-y-2 text-gray-600">
                        <p>{data?.shippingAddress.address1}</p>
                        <p> {data?.shippingAddress.address2}, {data?.shippingAddress.city}, {data?.shippingAddress.country}</p>
                        <p>Contact: {data?.user?.phoneNumber}</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h2>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Status:</span>
                            <span className={`px-2 py-1 rounded-full text-sm ${
                                data?.paymentInfo?.status === 'Succeeded'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-yellow-100 text-yellow-700'
                            }`}>
                                {data?.paymentInfo?.status || 'Not Paid'}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Method:</span>
                            <span className="text-gray-900">{data?.paymentInfo?.type || 'N/A'}</span>
                        </div>
                    </div>
                    <div className="flex justify-end gap-x-4 md:gap-x-4">
                        <button
                            onClick={generateInvoice}
                            className={`${styles.button} text-white rounded-lg transition-colors`}
                        >
                            Download Invoice
                        </button>
                        {
                            data?.status === "Delivered" && (
                                <button
                                    onClick={refundHandler}
                                    className={`${styles.button} !w-30 text-white rounded-lg transition-colors`}
                                >
                                    Give a refund
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserOrderDetails;
