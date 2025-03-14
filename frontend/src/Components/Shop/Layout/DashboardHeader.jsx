import {AiFillGift} from "react-icons/ai";
import {MdLocalOffer} from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { backend_url } from "../../../server.jsx";
import {RiShoppingBag4Fill} from "react-icons/ri";
import {BsBoxSeamFill} from "react-icons/bs";
import {TbMessageChatbotFilled} from "react-icons/tb";

const DashboardHeader = () => {
  const { shop } = useSelector((state) => state.shop);
  return (
      <div className="w-full h-[63px] md:h-[70px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4 md:px-8">
        <Link to="/"
                className=" w-[33%]"
        >
        <span className="text-md md:text-2xl font-bold bg-gradient-to-br from-purple-600 to-blue-500 text-transparent bg-clip-text">
          Artisan MarketPlace
        </span>
        </Link>
        <div className="flex items-center justify-end space-x-2 md:space-x-5">
          <Link to="/dashboard-coupons">
            <AiFillGift className="text-gray-400 hover:text-purple-700 transition-colors" size={28} />
          </Link>
          <Link to="/dashboard-events">
            <MdLocalOffer className="text-gray-400 hover:text-purple-700 transition-colors" size={28} />
          </Link>
          <Link to="/dashboard-products">
            <RiShoppingBag4Fill className="text-gray-400 hover:text-purple-700 transition-colors" size={28} />
          </Link>
          <Link to="/dashboard-orders">
            <BsBoxSeamFill className="text-gray-400 hover:text-purple-700 transition-colors" size={25} />
          </Link>
          <Link to="/dashboard-messages">
            <TbMessageChatbotFilled className="text-gray-400 hover:text-purple-700 transition-colors" size={30} />
          </Link>
          <Link to={`/shop/${shop._id}`}
                className={`block`}
          >
            <img
                src={`${backend_url}${shop.avatar}`}
                alt="Shop Avatar"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border border-gray-300 hover:border-gray-500 transition-all"
            />
          </Link>
        </div>
      </div>
  );
};

export default DashboardHeader;