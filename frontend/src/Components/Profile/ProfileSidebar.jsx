import {RxCross1} from "react-icons/rx";
import {IoMenu} from "react-icons/io5";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {server} from "../../server";
import {toast} from "react-toastify";

const ProfileSidebar = ({setActive, active}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();


    const logoutHandler = () => {
        axios
            .get(`${server}/user/logout`, {withCredentials: true})
            .then((res) => {
                toast.success("Log Out successful!", {
                    position: "top-right",
                    autoClose: 5000,
                });
                // clearLocalStorage();
                navigate(`/login`);
                window.location.reload(true);
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
    };


    return (
        <div className="">

            <button
                className="text-white"
                onClick={() => setIsMobileMenuOpen(true)}
            >
                <IoMenu color={"purple"} size={30}/>
            </button>

            {isMobileMenuOpen && (
                <aside id="separator-sidebar"
                       className="fixed top-15 sm:top-30 left-0  w-80 h-[93%] sm:h-[87%] transition-transform -translate-x-full sm:translate-x-0"
                       aria-label="Sidebar">
                    <div className="h-full px-3 py-4 overflow-y-auto bg-gray-100 shadow-lg rounded-lg">
                        <div className="flex justify-end items-center mb-6">

                            <RxCross1
                                size={24}
                                className="text-gray-700 cursor-pointer"
                                onClick={() => setIsMobileMenuOpen(false)}
                            />
                        </div>
                        <ul className="space-y-3 ml-6 font-medium">
                            <li>
                                <div
                                    className="flex items-center p-2 text-gray-500 rounded-lg  hover:bg-gray-800 hover:text-white  group"
                                    onClick={() => {
                                        setActive(1);
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    <svg
                                        className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="purple"
                                        viewBox="0 0 20 18">
                                        <path
                                            d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                                    </svg>
                                    <span className={`flex-1 ms-3 whitespace-nowrap ${
                                        active === 1 ? "text-pink-400 font-semibold drop-shadow-sm" : ""
                                    }`}>Profile</span>
                                </div>
                            </li>
                            <li>
                                <div
                                    className="flex items-center p-2 text-gray-500 rounded-lg  hover:bg-gray-800 hover:text-white  group"
                                    onClick={() => {
                                        setActive(2);
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    <svg
                                        className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="purple"
                                        viewBox="0 0 18 20">
                                        <path
                                            d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
                                    </svg>
                                    <span className={`flex-1 ms-3 whitespace-nowrap ${
                                        active === 2 ? "text-pink-400 font-semibold drop-shadow-sm" : ""
                                    }`}>Orders</span>
                                </div>
                            </li>
                            <li>
                                <div
                                    className="flex items-center p-2 text-gray-500 rounded-lg  hover:bg-gray-800 hover:text-white  group"
                                    onClick={() => {
                                        setActive(3);
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    <svg
                                        className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="purple"
                                        viewBox="0 0 17 20">
                                        <path
                                            d="M7.958 19.393a7.7 7.7 0 0 1-6.715-3.439c-2.868-4.832 0-9.376.944-10.654l.091-.122a3.286 3.286 0 0 0 .765-3.288A1 1 0 0 1 4.6.8c.133.1.313.212.525.347A10.451 10.451 0 0 1 10.6 9.3c.5-1.06.772-2.213.8-3.385a1 1 0 0 1 1.592-.758c1.636 1.205 4.638 6.081 2.019 10.441a8.177 8.177 0 0 1-7.053 3.795Z"/>
                                    </svg>
                                    <span className={`flex-1 ms-3 whitespace-nowrap ${
                                        active === 3 ? "text-pink-400 font-semibold drop-shadow-sm" : ""
                                    }`}>Refund</span>
                                </div>
                            </li>
                            <li>
                                <div
                                    className="flex items-center p-2 text-gray-500 rounded-lg  hover:bg-gray-800 hover:text-white  group"
                                    onClick={() => {
                                        setActive(4) || navigate("/inbox")
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    <svg
                                        className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="purple"
                                        viewBox="0 0 20 20">
                                        <path
                                            d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
                                    </svg>
                                    <span className={`flex-1 ms-3 whitespace-nowrap ${
                                        active === 4 ? "text-pink-400 font-semibold drop-shadow-sm" : ""
                                    }`}>Inbox</span>
                                </div>
                            </li>
                            <li>
                                <div
                                    className="flex items-center p-2 text-gray-500 rounded-lg  hover:bg-gray-800 hover:text-white  group"
                                    onClick={() => {
                                        setActive(5);
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    <svg
                                        className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="purple"
                                        viewBox="0 0 20 18">
                                        <path d="M18 0H6a2 2 0 0 0-2 2h14v12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Z"/>
                                        <path
                                            d="M14 4H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2ZM2 16v-6h12v6H2Z"/>
                                    </svg>
                                    <span className={`flex-1 ms-3 whitespace-nowrap ${
                                        active === 5 ? "text-pink-400 font-semibold drop-shadow-sm" : ""
                                    }`}>Track Orders</span>
                                </div>
                            </li>
                            <li>
                                <div
                                    className="flex items-center p-2 text-gray-500 rounded-lg  hover:bg-gray-800 hover:text-white  group"
                                    onClick={() => {
                                        setActive(6);
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    <svg
                                        className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="purple"
                                        viewBox="0 0 20 20">
                                        <path
                                            d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
                                        <path
                                            d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z"/>
                                        <path
                                            d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z"/>
                                    </svg>
                                    <span className={`flex-1 ms-3 whitespace-nowrap ${
                                        active === 6 ? "text-pink-400 font-semibold drop-shadow-sm" : ""
                                    }`}>Payment Methods</span>
                                </div>
                            </li>
                            <li>
                                <div
                                    className="flex items-center p-2 text-gray-500 rounded-lg  hover:bg-gray-800 hover:text-white  group"
                                    onClick={() => {
                                        setActive(7);
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    <svg
                                        className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="purple"
                                        viewBox="0 0 16 20">
                                        <path
                                            d="M16 14V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 0 0 0-2h-1v-2a2 2 0 0 0 2-2ZM4 2h2v12H4V2Zm8 16H3a1 1 0 0 1 0-2h9v2Z"/>
                                    </svg>
                                    <span className={`flex-1 ms-3 whitespace-nowrap ${
                                        active === 7 ? "text-pink-400 font-semibold drop-shadow-sm" : ""
                                    }`}>Address</span>
                                </div>
                            </li>
                            <li>
                                <div
                                    className="flex items-center p-2 text-gray-500 rounded-lg  hover:bg-gray-800 hover:text-white  group"
                                    onClick={() => {
                                        setActive(8) || logoutHandler();
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    <svg
                                        className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                        viewBox="0 0 18 16">
                                        <path stroke="purple" strokeLinecap="round" strokeLinejoin="round"
                                              strokeWidth="2"
                                              d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
                                    </svg>
                                    <span className={`flex-1 ms-3 whitespace-nowrap ${
                                        active === 9 ? "text-pink-400 font-semibold drop-shadow-sm" : ""
                                    }`}>Logout</span>
                                </div>
                            </li>

                        </ul>
                    </div>
                </aside>
            )}

            {/* Mobile Sidebar */}
            <aside
                className={`lg:hidden fixed top-20 left-0 md:left-6 w-72 h-[75%] z-50 rounded-lg  bg-gray-100 transition-transform duration-300 sm:hidden ${
                    isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="h-full px-3 py-4 ml-6 overflow-y-auto">
                    <div className="flex justify-end mb-6">
                        <RxCross1
                            size={24}
                            className="text-gray-700 cursor-pointer"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                    </div>
                    {/* ... your existing sidebar menu items ... */}
                    <ul className="space-y-2 font-medium">
                        <li>
                            <div
                                className="flex items-center p-2 text-gray-400 rounded-lg  hover:bg-gray-800 hover:text-white  group"
                                onClick={() => {
                                    setActive(1);
                                    setIsMobileMenuOpen(false);
                                }}
                            >
                                <svg
                                    className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="purple"
                                    viewBox="0 0 20 18">
                                    <path
                                        d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                                </svg>
                                <span className={`flex-1 ms-3 whitespace-nowrap ${
                                    active === 1 ? "text-pink-400 font-semibold drop-shadow-sm" : ""
                                }`}>Profile</span>
                            </div>
                        </li>
                        <li>
                            <div
                                className="flex items-center p-2 text-gray-400 rounded-lg  hover:bg-gray-800 hover:text-white  group"
                                onClick={() => {
                                    setActive(2);
                                    setIsMobileMenuOpen(false);
                                }}
                            >
                                <svg
                                    className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="purple"
                                    viewBox="0 0 18 20">
                                    <path
                                        d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
                                </svg>
                                <span className={`flex-1 ms-3 whitespace-nowrap ${
                                    active === 2 ? "text-pink-400 font-semibold drop-shadow-sm" : ""
                                }`}>Orders</span>
                            </div>
                        </li>
                        <li>
                            <div
                                className="flex items-center p-2 text-gray-400 rounded-lg  hover:bg-gray-800 hover:text-white  group"
                                onClick={() => {
                                    setActive(3);
                                    setIsMobileMenuOpen(false);
                                }}
                            >
                                <svg
                                    className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="purple"
                                    viewBox="0 0 17 20">
                                    <path
                                        d="M7.958 19.393a7.7 7.7 0 0 1-6.715-3.439c-2.868-4.832 0-9.376.944-10.654l.091-.122a3.286 3.286 0 0 0 .765-3.288A1 1 0 0 1 4.6.8c.133.1.313.212.525.347A10.451 10.451 0 0 1 10.6 9.3c.5-1.06.772-2.213.8-3.385a1 1 0 0 1 1.592-.758c1.636 1.205 4.638 6.081 2.019 10.441a8.177 8.177 0 0 1-7.053 3.795Z"/>
                                </svg>
                                <span className={`flex-1 ms-3 whitespace-nowrap ${
                                    active === 3 ? "text-pink-400 font-semibold drop-shadow-sm" : ""
                                }`}>Refund</span>
                            </div>
                        </li>
                        <li>
                            <div
                                className="flex items-center p-2 text-gray-400 rounded-lg  hover:bg-gray-800 hover:text-white  group"
                                onClick={() => {
                                    setActive(4) || navigate("/inbox")
                                    setIsMobileMenuOpen(false);
                                }}
                            >
                                <svg
                                    className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="purple"
                                    viewBox="0 0 20 20">
                                    <path
                                        d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
                                </svg>
                                <span className={`flex-1 ms-3 whitespace-nowrap ${
                                    active === 4 ? "text-pink-400 font-semibold drop-shadow-sm" : ""
                                }`}>Inbox</span>
                            </div>
                        </li>
                        <li>
                            <div
                                className="flex items-center p-2 text-gray-400 rounded-lg  hover:bg-gray-800 hover:text-white  group"
                                onClick={() => {
                                    setActive(5);
                                    setIsMobileMenuOpen(false);
                                }}
                            >
                                <svg
                                    className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="purple"
                                    viewBox="0 0 20 18">
                                    <path d="M18 0H6a2 2 0 0 0-2 2h14v12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Z"/>
                                    <path
                                        d="M14 4H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2ZM2 16v-6h12v6H2Z"/>
                                </svg>
                                <span className={`flex-1 ms-3 whitespace-nowrap ${
                                    active === 5 ? "text-pink-400 font-semibold drop-shadow-sm" : ""
                                }`}>Track Orders</span>
                            </div>
                        </li>
                        <li>
                            <div
                                className="flex items-center p-2 text-gray-400 rounded-lg  hover:bg-gray-800 hover:text-white  group"
                                onClick={() => {
                                    setActive(6);
                                    setIsMobileMenuOpen(false);
                                }}
                            >
                                <svg
                                    className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="purple"
                                    viewBox="0 0 20 20">
                                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
                                    <path
                                        d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z"/>
                                    <path
                                        d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z"/>
                                </svg>
                                <span className={`flex-1 ms-3 whitespace-nowrap ${
                                    active === 6 ? "text-pink-400 font-semibold drop-shadow-sm" : ""
                                }`}>Payment Methods</span>
                            </div>
                        </li>
                        <li>
                            <div
                                className="flex items-center p-2 text-gray-400 rounded-lg  hover:bg-gray-800 hover:text-white  group"
                                onClick={() => {
                                    setActive(7);
                                    setIsMobileMenuOpen(false);
                                }}
                            >
                                <svg
                                    className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="purple"
                                    viewBox="0 0 16 20">
                                    <path
                                        d="M16 14V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 0 0 0-2h-1v-2a2 2 0 0 0 2-2ZM4 2h2v12H4V2Zm8 16H3a1 1 0 0 1 0-2h9v2Z"/>
                                </svg>
                                <span className={`flex-1 ms-3 whitespace-nowrap ${
                                    active === 7 ? "text-pink-400 font-semibold drop-shadow-sm" : ""
                                }`}>Address</span>
                            </div>
                        </li>
                        <li>
                            <div
                                className="flex items-center p-2 text-gray-400 rounded-lg  hover:bg-gray-800 hover:text-white  group"
                                onClick={() => {
                                    setActive(8) || logoutHandler();
                                    setIsMobileMenuOpen(false);
                                }}
                            >
                                <svg
                                    className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 18 16">
                                    <path stroke="purple" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
                                </svg>
                                <span className={`flex-1 ms-3 whitespace-nowrap ${
                                    active === 9 ? "text-pink-400 font-semibold drop-shadow-sm" : ""
                                }`}>Logout</span>
                            </div>
                        </li>

                    </ul>
                </div>
            </aside>

            {/* Content Overlay for Mobile */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-40  bg-gray-300/50  sm:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

        </div>
    );
};

export default ProfileSidebar;
