import {AiFillGift} from "react-icons/ai";
import {MdLocalOffer} from "react-icons/md";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {backend_url} from "../../../server.jsx";
import {RiShoppingBag4Fill} from "react-icons/ri";
import {BsBoxSeamFill} from "react-icons/bs";
import {TbMessageChatbotFilled} from "react-icons/tb";
import DashboardSideBar from "./DashboardSideBar.jsx";

const DashboardHeader = ({active}) => {
    const {shop} = useSelector((state) => state.shop);
    return (
        <header className="w-full h-[70px] bg-white border-b border-gray-100 sticky top-0 left-0 z-30 flex items-center justify-between px-3 sm:px-6">
            {/* Left section with sidebar and logo */}
            <div className="flex items-center">
                <DashboardSideBar active={active} />

                <Link to="/" className="flex items-center ml-1.5 sm:ml-4">
                    <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
                        <div className="flex flex-col sm:flex-row sm:items-baseline leading-tight">
                            <span>Artisan</span>
                            <span className="sm:ml-1">Marketplace</span>
                        </div>
                    </span>
                </Link>
            </div>
            <div className="flex items-center justify-end space-x-2 md:space-x-5">
                <Link to="/dashboard-coupons">
                    <AiFillGift className="text-gray-400 hover:text-purple-700 transition-colors" size={25}/>
                </Link>
                <Link to="/dashboard-events">
                    <MdLocalOffer className="text-gray-400 hover:text-purple-700 transition-colors" size={25}/>
                </Link>
                <Link to="/dashboard-products">
                    <RiShoppingBag4Fill className="text-gray-400 hover:text-purple-700 transition-colors" size={25}/>
                </Link>
                <Link to="/dashboard-orders">
                    <BsBoxSeamFill className="text-gray-400 hover:text-purple-700 transition-colors" size={24}/>
                </Link>
                <Link to="/dashboard-messages">
                    <TbMessageChatbotFilled className="text-gray-400 hover:text-purple-700 transition-colors"
                                            size={28}/>
                </Link>
                <div className="sm:pl-4 sm:border-l border-gray-200">
                    <Link to={`/shop/${shop._id}`} className="flex items-center sm:space-x-3">
                        <img
                            src={`${backend_url}${shop?.avatar}`}
                            alt="Admin Avatar"
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-white shadow-sm hover:border-purple-100 transition-all"
                        />
                        <span className={"hidden sm:block text-gray-500 text-lg font-medium"}>{shop.name}</span>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;