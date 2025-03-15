import {Link} from "react-router-dom";
import {useState, useEffect, useRef} from "react";
import {AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart} from "react-icons/ai";
import {RxCross1} from "react-icons/rx";
import {IoIosArrowDown, IoIosArrowForward} from "react-icons/io";
import {IoMenu} from "react-icons/io5";
import DropDown from "./DropDown.jsx";
import Navbar from "./Navbar.jsx";
import {useSelector} from "react-redux";
import {backend_url} from "../../server.jsx";
import Cart from "../Cart/Cart.jsx";
import {categoriesData} from "../../Static/Data.jsx";
import Wishlist from "../Wishlist/Wishlist.jsx";

const Header = ({activeHeading}) => {
    const {isAuthenticated, user} = useSelector((state) => state.user);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchData, setSearchData] = useState(null);
    const [active, setActive] = useState(false);
    const [openCart, setOpenCart] = useState(false);
    const [openWishlist, setOpenWishList] = useState(false);
    const [dropDown, setDropDown] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const {allProducts} = useSelector((state) => state.products);

    const searchRef = useRef(null);

    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        const filteredProducts =
            allProducts &&
            allProducts.filter((product) =>
                product.name.toLowerCase().includes(term.toLowerCase())
            );
        setSearchData(filteredProducts);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchData(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    window.addEventListener("scroll", () => {
        if (window.scrollY > 70) {
            setActive(true);
        } else {
            setActive(false);
        }
    });

    console.log(user);

    return (
        <>
            <div className="w-full mx-auto">
                {/* Top Section */}
                <div
                    className="flex flex-col md:flex-row items-center justify-between h-auto md:h-[60px] px-4 md:px-10 gap-4">
                    {/* Logo */}
                    <div
                        className="hidden md:block text-xl text- md:text-2xl font-bold w-full md:w-auto text-center md:text-left">
                        <Link to="/">
                            <span
                                className={"bg-gradient-to-br from-purple-600 to-blue-500 inline-block text-transparent bg-clip-text"}>Artisan MarketPlace</span>
                        </Link>
                    </div>

                    {/* Search Box */}
                    <div className="hidden md:block w-full md:w-[50%] relative" ref={searchRef}>
                        <input
                            type="text"
                            placeholder="Search Product..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="h-[40px] w-full px-4 border-purple-500 bg-gray-100 border-2 rounded-md outline-none"
                        />
                        <AiOutlineSearch
                            size={20}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                        />
                        {/* Search Results */}
                        {searchData?.length > 0 && (
                            <div
                                className="absolute w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg z-10">
                                {searchData.map((i) => (
                                    <Link
                                        to={`/product/${i._id}`}
                                        key={i.id}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <div
                                            className="flex items-center p-2 hover:bg-gray-100 hover:font-semibold hover:drop-shadow-lg cursor-pointer">
                                            <img
                                                src={`${backend_url}uploads/${i?.images?.[0]}`}
                                                alt={i.name}
                                                className="w-[44px] rounded-lg h-[44px] mr-3"
                                            />
                                            <h1 className="text-sm">{i.name}</h1>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Become a Seller Button - Mobile Hidden */}
                    <div
                        className="hidden md:flex bg-gradient-to-r from-purple-500 to-pink-500 h-[40px] items-center justify-center px-4 rounded-md cursor-pointer">
                        <Link to="/shop-create">
                            <h1 className="text-white flex items-center text-sm">
                                Become a Seller <IoIosArrowForward className="ml-1"/>
                            </h1>
                        </Link>
                    </div>
                </div>

                {/* Bottom Navigation Section */}
                <div className={`${active ? "fixed top-0 left-0 z-10 shadow-sm" : ""} 
  transition-all duration-300 w-full bg-white lg:bg-gradient-to-br from-purple-600 to-blue-500 h-[60px] px-3 md:px-10`}>
                    <div className="flex items-center  justify-between h-full">
                        {/* Mobile Header Section */}
                        <div className="md:hidden flex items-center justify-between w-full">
                            <button
                                className="text-white"
                                onClick={() => setIsMobileMenuOpen(true)}
                            >
                                <IoMenu color={"purple"} size={30}/>
                            </button>

                            <div
                                className="text-lg ml-3 sm:ml-0 lg:text-xl font-bold bg-gradient-to-br from-purple-600 to-blue-500 inline-block text-transparent bg-clip-text">
                                <Link to="/">Artisan MarketPlace</Link>
                            </div>

                            <div className="flex items-center gap-x-3 sm:gap-x-2">
                                <div
                                    className="relative"
                                    onClick={() => setOpenWishList(true)}
                                >
                                    <AiOutlineHeart size={24} className="text-gray-700"/>
                                    <span
                                        className="absolute -top-1 -right-1 bg-[#3bc177] w-4 h-4 text-white text-xs rounded-full flex items-center justify-center">
                          0
                        </span>
                                </div>
                                <div
                                    className="relative"
                                    onClick={() => setOpenCart(true)}>
                                    <AiOutlineShoppingCart size={24} className="text-gray-700"/>
                                    <span
                                        className="absolute -top-1 -right-1 bg-[#3bc177] w-4 h-4 text-white text-xs rounded-full flex items-center justify-center">
                            1
                          </span>
                                </div>
                                <div className="flex items-center gap-x-4">
                                    {isAuthenticated ? (
                                        <Link to="/profile" className="text-gray-900">
                                            <img
                                                src={`${backend_url}${user.avatar}`}
                                                alt={"User's img"}
                                                className={"w-8 h-8 rounded-full"}
                                            />
                                        </Link>
                                    ) : (
                                        <Link to="/login" className="text-white">
                                            <button type={"button"}
                                                    className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-1.5 py-1.5 lg:px-2.5 lg:px2.5 text-center">
                                                Login/Signup
                                            </button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Desktop Navigation Elements */}
                        <div className="hidden md:flex items-center gap-x-7 w-full">
                            {/* Categories */}
                            <div className="relative h-[50px] flex items-center">
                                <IoMenu
                                    color={"purple"}
                                    size={30}
                                    className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-90 hover:opacity-100 transition-opacity"
                                />
                                <button
                                    className="h-full px-6 mr-1 md:px-12 bg-white text-xl font-semibold select-none rounded-md flex items-center
               border border-gray-200 hover:border-purple-300 transition-all duration-200
               shadow-sm hover:shadow-md focus:ring-2 focus:ring-purple-200 focus:outline-none
               text-gray-700 hover:text-purple-700 group"
                                    onClick={() => setDropDown(!dropDown)}
                                >
                                    All Categories
                                    <IoIosArrowDown
                                        size={20}
                                        className="ml-2 text-purple-600 group-hover:text-purple-800 transition-colors"
                                    />
                                </button>
                                {dropDown && (
                                    <div className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-100 rounded-md shadow-xl z-50
                    animate-fade-in-up origin-top">
                                        <DropDown categoriesData={categoriesData} setDropDown={setDropDown}/>
                                    </div>
                                )}
                            </div>

                            {/* Navbar Items - Desktop */}
                            <div className="flex items-center justify-center flex-grow">
                                <Navbar active={activeHeading}/>
                            </div>

                            {/* Icons aligned to the right */}
                            <div className="flex items-center gap-x-4 md:gap-x-6">
                                <div
                                    className="relative cursor-pointer"
                                    onClick={() => setOpenWishList(true)}
                                >
                                    <AiOutlineHeart size={30} color="white"/>
                                    <span
                                        className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-white text-xs text-center">0</span>
                                </div>
                                <div
                                    className="relative cursor-pointer"
                                    onClick={() => setOpenCart(true)}
                                >
                                    <AiOutlineShoppingCart size={30} color="white"/>
                                    <span
                                        className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-white text-xs text-center">0</span>
                                </div>
                                <div className="relative cursor-pointer">
                                    {isAuthenticated ? (
                                        <Link to="/profile" className="text-white">
                                            <img
                                                src={`${backend_url}${user.avatar}`}
                                                alt={"User's img"}
                                                className={"w-10 h-10 rounded-full"}
                                            />
                                        </Link>
                                    ) : (
                                        <Link to="/login" className="text-white">
                                            <button type={"button"}
                                                    className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center me-2 mb-2">
                                                Login/Signup
                                            </button>
                                        </Link>
                                    )}
                                </div>
                            </div>

                            {/* Cart popup */}
                            {openCart ? <Cart setOpenCart={setOpenCart}/> : null}

                            {/* wishList popup */}
                            {openWishlist ? (
                                <Wishlist setOpenWishList={setOpenWishList}/>
                            ) : null}

                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden fixed inset-0 z-20 ">
                        <div className="bg-white w-3/4 h-full p-4 flex flex-col">
                            {/* Mobile Menu Header */}
                            <div className="flex justify-end items-center mb-6">

                                <RxCross1
                                    size={24}
                                    className="text-gray-700 cursor-pointer"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                />
                            </div>

                            {/* Mobile Search */}
                            <div className="mb-6 relative" ref={searchRef}>
                                <input
                                    type="text"
                                    placeholder="Search Product..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="h-[40px] w-full px-4 border-purple-500 border-2 rounded-md outline-none"
                                />
                                <AiOutlineSearch
                                    size={20}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                                />
                                {searchData?.length > 0 && (
                                    <div
                                        className="absolute w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg z-10">
                                        {searchData.map((i) => (
                                            <Link
                                                to={`/product/${i._id}`}
                                                key={i.id}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                <div
                                                    className="flex items-center p-2 hover:bg-gray-100 hover:font-semibold hover:drop-shadow-lg cursor-pointer">
                                                    <img
                                                        src={`${backend_url}uploads/${i?.images?.[0]}`}
                                                        alt={i.name}
                                                        className="w-[42px] h-[42px] rounded-md mr-3"
                                                    />
                                                    <h1 className="text-sm">{i.name}</h1>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Mobile Navigation Links */}
                            <div className="flex flex-col space-y-4 flex-grow">
                                <Link to="/" className="text-gray-700 hover:text-blue-600"
                                      onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                                <Link to="/best-selling" className="text-gray-700 hover:text-blue-600"
                                      onClick={() => setIsMobileMenuOpen(false)}>Best Selling</Link>
                                <Link to="/products" className="text-gray-700 hover:text-blue-600"
                                      onClick={() => setIsMobileMenuOpen(false)}>Products</Link>
                                <Link to="/events" className="text-gray-700 hover:text-blue-600"
                                      onClick={() => setIsMobileMenuOpen(false)}>Events</Link>
                                <Link to="/faq" className="text-gray-700 hover:text-blue-600"
                                      onClick={() => setIsMobileMenuOpen(false)}>FAQ</Link>
                            </div>

                            {/* Mobile Auth Links */}
                            <div className="border-t pt-4">
                                <div
                                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-[40px] flex items-center justify-center px-4 rounded-md mb-4">
                                    <Link to="/shop-create" className="w-full text-center"
                                          onClick={() => setIsMobileMenuOpen(false)}>
                        <span className="text-white flex items-center justify-center text-sm">
                          Become a Seller <IoIosArrowForward className="ml-1"/>
                        </span>
                                    </Link>
                                </div>

                                <div className="flex items-center justify-center space-x-2">
                                    <Link to="/login" className="text-gray-700 hover:text-blue-600"
                                          onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                                    <span className="text-gray-700">/</span>
                                    <Link to="/sign-up" className="text-gray-700 hover:text-blue-600"
                                          onClick={() => setIsMobileMenuOpen(false)}>Sign up</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Header;