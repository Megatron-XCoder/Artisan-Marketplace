import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineInbox, AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import { server } from "../../server";
import Loader from "../Layout/Loader";
import axios from "axios";
import { toast } from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {getAllProducts} from "../../redux/Actions/product.js";

const AllProducts = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const { allProducts, isLoading: productsLoading } = useSelector((state) => state.products);


    const handleDelete = async (id) => {
        try {
            await axios.delete(`${server}/product/delete-shop-product/${id}`, { withCredentials: true });
            toast.success("Product deleted successfully");
            setData(data.filter(item => item._id !== id));
            dispatch(getAllProducts());
        } catch (error) {
            toast.error(error.response?.data?.message || "Error deleting product");
        }
    };

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    if (productsLoading) {
        return <Loader />;
    }

    return (
        <div className="w-full p-4 md:p-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    All Products
                </h1>
                <Link
                    to="/admin/dashboard"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-2"
                >
                    Back to Dashboard
                    <AiOutlineArrowRight className="text-sm transform transition-transform group-hover:translate-x-1" />
                </Link>
            </div>

            <div className="bg-white md:h-[74vh] rounded-2xl py-4 md:overflow-y-scroll shadow-sm border border-gray-100">
                <div className="w-full mb-4 md:px-8 pt-1">
                    {/* Desktop Header */}
                    <div className="hidden sm:grid grid-cols-7 gap-8 bg-gray-50 p-5 border-b font-medium text-gray-500 text-sm rounded-t-xl shadow-sm">
                        <div className="min-w-[150px]">Product ID</div>
                        <div className="min-w-[180px]">Name</div>
                        <div className="min-w-[100px]">Price</div>
                        <div className="min-w-[80px]">Stock</div>
                        <div className="min-w-[100px]">Sold</div>
                        <div className="min-w-[80px]">Preview</div>
                        <div className="min-w-[80px]">Actions</div>
                    </div>

                    {/* Products List */}
                    <div className="">
                        {allProducts?.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="inline-block p-6 bg-gray-50 rounded-2xl mb-4">
                                    <AiOutlineInbox className="text-4xl text-gray-400" />
                                </div>
                                <h5 className="text-gray-500 font-medium">No products found</h5>
                            </div>
                        ) : (
                            allProducts?.map((product) => (
                                <div
                                    key={product?._id}
                                    className="flex flex-col md:items-center sm:grid sm:grid-cols-7 mt-3 mx-5 md:mx-0 gap-3 md:gap-8 p-5 sm:p-5 text-sm group hover:shadow-md transition-all rounded-xl bg-white shadow-sm border border-gray-100"
                                >
                                    {/* Mobile Header */}
                                    <div className="sm:hidden flex justify-between items-start mb-3">
                                        <h3 className="font-semibold text-gray-900 text-base truncate pr-4">
                                            {product?.name}
                                        </h3>
                                    </div>

                                    {/* Product ID */}
                                    <div className="sm:min-w-[150px] text-gray-500">
                                        <span className="sm:hidden mr-2 text-gray-600 font-medium">Product ID:</span>
                                        <span className="font-mono text-gray-400 text-xs sm:text-sm">{product?._id}</span>
                                    </div>

                                    {/* Name */}
                                    <div className="sm:min-w-[180px] text-gray-900">
                                        <span className="sm:hidden mr-2 text-gray-600 font-medium">Name:</span>
                                        {product?.name}
                                    </div>

                                    {/* Price */}
                                    <div className="sm:min-w-[100px] text-gray-500 font-sans">
                                        <span className="sm:hidden mr-2 text-gray-600 font-medium">Price:</span>
                                        INR₹ {product?.discountPrice}
                                    </div>

                                    {/* Stock */}
                                    <div className="sm:min-w-[80px] text-gray-500">
                                        <span className="sm:hidden mr-2 text-gray-600 font-medium">Stock:</span>
                                        {product?.stock}
                                    </div>

                                    {/* Sold */}
                                    <div className="sm:min-w-[100px] text-gray-500">
                                        <span className="sm:hidden mr-2 text-gray-600 font-medium">Sold:</span>
                                        {product?.sold_out || 0}
                                    </div>

                                    {/* Preview */}
                                    <div className="flex justify-start">
                                        <Link
                                            to={`/product/${product._id}`}
                                            className="p-2 text-gray-500 hover:text-blue-500 transition-colors"
                                        >
                                            <AiOutlineEye size={25} />
                                        </Link>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex justify-start">
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                                        >
                                            <AiOutlineDelete className={"bg-red-800 p-1 rounded-sm text-white"} size={30} />
                                        </button>
                                    </div>

                                    {/* Mobile Additional Info */}
                                    <div className="sm:hidden grid grid-cols-2 gap-y-1 mt-4 pt-4 border-t border-gray-100">
                                        <div className="text-gray-500 font-medium">Price:</div>
                                        <div className="text-right text-gray-600">US$ {product?.discountPrice}</div>
                                        <div className="text-gray-500 font-medium">Stock:</div>
                                        <div className="text-right text-gray-600">{product?.stock}</div>
                                        <div className="text-gray-500 font-medium">Sold:</div>
                                        <div className="text-right text-gray-600">{product?.sold_out || 0}</div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllProducts;