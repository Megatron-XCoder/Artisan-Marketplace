import {useState} from "react";
import {Link} from "react-router-dom";
import {RxCross1} from "react-icons/rx";
import {IoMenu} from "react-icons/io5";
import {AiFillSetting} from "react-icons/ai";
import {MdDashboard, MdLocalOffer} from "react-icons/md";
import {RiShoppingBag4Fill} from "react-icons/ri";
import {BsBoxSeamFill, BsFillPeopleFill} from "react-icons/bs";
import {FaMoneyBillAlt} from "react-icons/fa";
import {GiShop} from "react-icons/gi";

const AdminSideBar = ({active}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(false);

    return (<div className="relative">
        {/* Menu Button for Mobile & Desktop */}
        <button
            className="block text-gray-700 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
            {isMenuOpen ? <RxCross1 size={30} className="text-purple-600"/> :
                <IoMenu size={30} className="text-purple-600"/>}
        </button>

        <button
            className="hidden md:block p-2 m-2 text-gray-700"
            onClick={() => setIsDesktopSidebarOpen(!isDesktopSidebarOpen)}
        >
            {isDesktopSidebarOpen ? <RxCross1 size={30} className="text-purple-600"/> :
                <IoMenu size={30} className="text-purple-600"/>}
        </button>

        {/* Sidebar for Mobile */}
        {isMenuOpen && (<div className="fixed inset-0 z-500 bg-black/50" onClick={() => setIsMenuOpen(false)}>
            <div className="absolute top-0 left-0 md:left-6 w-72 h-full z-50 rounded-lg bg-white shadow-lg"
                 onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-end items-center p-4">
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="text-purple-500 hover:shadow-lg"
                    >
                        <RxCross1 size={24}/>
                    </button>
                </div>
                <div className="p-4 overflow-y-auto h-[calc(100vh-4rem)]">
                    <ul className="space-y-2 font-medium">
                        {[{id: 1, icon: <MdDashboard size={24}/>, text: "Dashboard", to: "/admin/dashboard"}, {
                            id: 2, icon: <BsBoxSeamFill size={24}/>, text: "All Orders", to: "/admin-orders"
                        }, {
                            id: 3, icon: <GiShop size={24}/>, text: "All Sellers", to: "/admin-sellers"
                        }, {
                            id: 4, icon: <BsFillPeopleFill size={24}/>, text: "All Users", to: "/admin-users"
                        }, {
                            id: 5, icon: <MdLocalOffer size={24}/>, text: "All Events", to: "/admin-events"
                        }, {
                            id: 6, icon: <BsBoxSeamFill size={24}/>, text: "All Products", to: "/admin-products"
                        }, {
                            id: 7,
                            icon: <FaMoneyBillAlt size={24}/>,
                            text: "Withdraw Requests",
                            to: "/admin-withdraw-request"
                        }, {
                            id: 8, icon: <AiFillSetting size={24}/>, text: "Settings", to: "/profile"
                        },].map((item) => (<li key={item.id}>
                            <Link
                                to={item.to}
                                className="flex items-center p-3 text-gray-500 rounded-lg hover:bg-purple-100 hover:text-white group transition-colors"
                            >
                                            <span
                                                className="text-purple-500 group-hover:text-purple-700">{item.icon}</span>
                                <span
                                    className={`ml-3 ${active === item.id ? "text-purple-700 font-bold drop-shadow-md group-hover:text-white" : ""}`}>
                    {item.text}
                  </span>
                            </Link>
                        </li>))}
                    </ul>
                </div>
            </div>
        </div>)}

        {/* Sidebar for Desktop */}
        {isDesktopSidebarOpen && (<div
            className="hidden fixed top-0 left-0  w-80 h-full md:block bg-white shadow-lg rounded-lg p-4 overflow-y-auto"
            onClick={() => setIsDesktopSidebarOpen(false)}
        >
            <div className="flex justify-end items-center p-4">
                <button
                    onClick={() => setIsDesktopSidebarOpen(false)}
                    className="text-purple-500 hover:drop-shadow-sm"
                >
                    <RxCross1 size={24}/>
                </button>
            </div>
            <ul className="space-y-2 font-medium">
                {
                    [
                        {id: 1, icon: <MdDashboard size={24}/>, text: "Dashboard", to: "/admin/dashboard"},
                        {id: 2, icon: <BsBoxSeamFill size={24}/>, text: "All Orders", to: "/admin-orders"},
                        {id: 3, icon: <GiShop size={24}/>, text: "All Sellers", to: "/admin-sellers"}, {
                    id: 4, icon: <BsFillPeopleFill size={24}/>, text: "All Users", to: "/admin-users"
                }, {id: 5, icon: <MdLocalOffer size={24}/>, text: "All Events", to: "/admin-events"}, {
                    id: 6, icon: <RiShoppingBag4Fill size={24}/>, text: "All Products", to: "/admin-products"
                }, {
                    id: 7, icon: <FaMoneyBillAlt size={24}/>, text: "Withdraw Request", to: "/admin-withdraw-request"
                }, {
                    id: 8, icon: <AiFillSetting size={24}/>, text: "Settings", to: "/profile"
                },].map((item) => (<li key={item.id}>
                    <Link
                        to={item.to}
                        className="flex items-center p-3 text-gray-500 rounded-lg hover:bg-purple-100 hover:text-white group transition-colors"
                    >
                        <span className="text-purple-500 group-hover:text-purple-700">{item.icon}</span>
                        <span
                            className={`ml-3 ${active === item.id ? "text-purple-700 font-bold drop-shadow-md group-hover:text-white" : ""}`}>
                    {item.text}
                  </span>
                    </Link>
                </li>))}
            </ul>
        </div>)}
    </div>);
};

export default AdminSideBar;
