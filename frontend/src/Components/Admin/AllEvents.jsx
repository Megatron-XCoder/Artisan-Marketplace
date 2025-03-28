import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineArrowRight, AiOutlineInbox, AiOutlineEye } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import Loader from "../Layout/Loader";

const AllEvents = () => {
    const [events, setEvents] = useState([]);
    const [open, setOpen] = useState(false);
    const [eventId, setEventId] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get(`${server}/event/admin-all-events`, { withCredentials: true })
            .then((res) => {
                setEvents(res.data.events);
            })
            .catch((error) => {
                toast.error(error.response?.data?.message || "Error fetching events");
            });
    }, []);

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`${server}/event/delete-shop-event/${id}`, { withCredentials: true });
            toast.success("Event deleted successfully!");
            setEvents(events.filter(event => event._id !== id));
        } catch (error) {
            toast.error(error.response?.data?.message || "Error deleting event");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="w-full p-4 md:p-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    All Events
                </h1>
                <Link
                    to="/admin/dashboard"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-2"
                >
                    Back to Dashboard
                    <AiOutlineArrowRight className="text-sm transform transition-transform group-hover:translate-x-1" />
                </Link>
            </div>

            <div className="bg-white h-[72vh] md:h-[70vh] rounded-2xl shadow-sm border border-gray-100 overflow-y-scroll">
                <div className="w-full my-8 md:px-8 pt-1">
                    {/* Desktop Header */}
                    <div className="hidden sm:grid grid-cols-7 gap-4 bg-gray-50 p-5 border-b font-medium text-gray-500 text-sm rounded-t-xl shadow-sm">
                        <div className="min-w-[150px]">Event ID</div>
                        <div className="min-w-[120px]">Name</div>
                        <div className="min-w-[100px]">Price</div>
                        <div className="min-w-[80px]">Stock</div>
                        <div className="min-w-[120px]">Shop</div>
                        <div className="min-w-[120px] text-right">Preview</div>
                        <div className="min-w-[50px] text-right">Actions</div>
                    </div>

                    {/* Events List */}
                    <div className="">
                        {events?.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="inline-block p-6 bg-gray-50 rounded-2xl mb-4">
                                    <AiOutlineInbox className="text-4xl text-gray-400" />
                                </div>
                                <h5 className="text-gray-500 font-medium">No events found</h5>
                            </div>
                        ) : (
                            events?.map((event) => (
                                <div
                                    key={event?._id}
                                    className="flex flex-col md:items-center justify-center sm:grid sm:grid-cols-7 mt-3 mx-5 md:mx-0 gap-3 md:gap-5 p-5 sm:p-5 text-sm group hover:shadow-md transition-all rounded-xl bg-white shadow-sm border border-gray-100"
                                >
                                    {/* Mobile Header */}
                                    <div className="sm:hidden flex justify-between items-start mb-3">
                                        <h3 className="font-semibold text-gray-900 text-base truncate pr-4">
                                            {event?.name}
                                        </h3>
                                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                            ${event?.discountPrice}
                                        </span>
                                    </div>

                                    {/* Event ID */}
                                    <div className="sm:min-w-[150px] text-gray-500">
                                        <span className="sm:hidden mr-2 text-gray-600 font-medium">Event ID:</span>
                                        <span className="font-mono text-gray-400 text-xs sm:text-sm">{event?._id}</span>
                                    </div>

                                    {/* Name */}
                                    <div className="sm:min-w-[120px] text-gray-900">
                                        <span className="sm:hidden mr-2 text-gray-600 font-medium">Name:</span>
                                        {event?.name}
                                    </div>

                                    {/* Price */}
                                    <div className="sm:min-w-[100px] text-gray-500">
                                        <span className="sm:hidden mr-2 text-gray-600 font-medium">Price:</span>
                                        <span className="text-gray-600 font-sans">INR₹ {event?.discountPrice}</span>
                                    </div>

                                    {/* Stock */}
                                    <div className="sm:min-w-[80px] text-gray-500">
                                        <span className="sm:hidden mr-2 text-gray-600 font-medium">Stock:</span>
                                        {event?.stock}
                                    </div>

                                    {/* Shop */}
                                    <div className="sm:min-w-[120px] text-gray-500">
                                        <span className="sm:hidden mr-2 text-gray-600 font-medium">Shop:</span>
                                        {event?.shop?.name}
                                    </div>

                                    {/* Preview */}
                                    <div className="sm:min-w-[120px] text-gray-500 text-right">
                                        <Link to={`/product/${event._id}?isEvent=true`}>
                                            <button className="p-2 text-gray-500 hover:text-blue-500 transition-colors">
                                                <AiOutlineEye className="rounded-sm text-gray-500" size={30} />
                                            </button>
                                        </Link>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => {
                                                setEventId(event._id);
                                                setOpen(true);
                                            }}
                                            className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                                        >
                                            <AiOutlineDelete className="bg-red-800 p-1 rounded-sm text-white" size={30} />
                                        </button>
                                    </div>

                                    {/* Mobile Additional Info */}
                                    <div className="sm:hidden grid grid-cols-3 gap-y-1 mt-4 pt-4 border-t border-gray-100">
                                        <div className="text-gray-500 font-medium col-span-1">Stock:</div>
                                        <div className="text-right text-gray-600 col-span-2">{event?.stock}</div>
                                        <div className="text-gray-500 font-medium col-span-1">Sold Out:</div>
                                        <div className="text-right text-gray-600 col-span-2">{event?.sold_out}</div>
                                        <div className="text-gray-500 font-medium col-span-1">Shop:</div>
                                        <div className="text-right text-gray-600 col-span-2">{event?.shop?.name}</div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {open && (
                <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
                    <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded-xl shadow-lg p-6">
                        <div className="w-full flex justify-end cursor-pointer">
                            <RxCross1
                                size={25}
                                onClick={() => setOpen(false)}
                                className="text-gray-500 hover:text-gray-700 transition-colors"
                            />
                        </div>
                        <h3 className="text-xl md:text-2xl text-center py-5 font-semibold text-gray-800">
                            Are you sure you want to delete this event?
                        </h3>
                        <div className="w-full flex items-center justify-center gap-4">
                            <button
                                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                onClick={() => {
                                    handleDelete(eventId);
                                }}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllEvents;