import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {
    AiFillHeart,
    AiFillStar,
    AiOutlineHeart,
    AiOutlineMessage,
    AiOutlineShoppingCart,
    AiOutlineStar
} from "react-icons/ai";
import styles from "../../Styles/Styles.jsx";
import {backend_url, server} from "../../server.jsx";
import {toast} from "react-toastify";
import {addToCart} from "../../redux/Actions/cart.js";
import {useDispatch, useSelector} from "react-redux";
import {addToWishlist, removeFromWishlist} from "../../redux/Actions/wishlist.js";
import axios from "axios";

const ProductDetails = ({data}) => {
    const [count, setCount] = useState(1);
    const [click, setClick] = useState(false);
    const [select, setSelect] = useState(0);
    const {cart} = useSelector((state) => state.cart);
    const {shop} = useSelector((state) => state.shop);
    const { user, isAuthenticated } = useSelector((state) => state.user);
    const {products} = useSelector((state) => state.products);
    const {wishlist} = useSelector((state) => state.wishlist);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const decrementCount = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    const incrementCount = () => {
        if (count < data.stock) {
            setCount(count + 1);
        } else {
            toast.error("Cannot exceed available stock!");
        }
    };

    const addToCartHandler = () => {
        if (data.stock < 1) {
            toast.error("Product stock limited!");
            return;
        }
        if (cart?.find((i) => i._id === data._id)) {
            toast.error("Item already in Cart! Please check your cart. ");
            return;
        }
        dispatch(addToCart({...data, qty: count})); // Use `count` instead of hardcoded `qty: 1`
        toast.success("Item added to Cart!");
    };

    useEffect(() => {
        window.scroll(0, 0);

        if (wishlist && wishlist.find((i) => i._id === data._id)) {
            setClick(true);
        } else {
            setClick(false);
        }
    }, [wishlist, data._id]); // Added data._id to dependency array

    const handleWishlist = () => {
        if (click) {
            dispatch(removeFromWishlist(data)); // Pass ID instead of full object
            toast.success("Item removed from Wishlist!");
        } else {
            dispatch(addToWishlist(data));
            toast.success("Item added to Wishlist!");
        }
        setClick(!click);
    };


    const totalReviewsLength =
        products &&
        products.reduce((acc, product) => acc + product.reviews.length, 0);

    const totalRatings =
        products &&
        products.reduce(
            (acc, product) =>
                acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
            0
        );

    const avg = totalRatings / totalReviewsLength || 0;

    const averageRating = avg.toFixed(2);

    const handleMessageSubmit = async () => {
        if (isAuthenticated) {
            const groupTitle = data._id + user._id;
            const userId = user._id;
            const shopId = data?.shop._id;
            await axios
                .post(`${server}/conversation/create-new-conversation`, {
                    groupTitle,
                    userId,
                    shopId,
                })
                .then((res) => {
                    navigate(`/inbox?${res.data.conversation._id}`);
                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                });
        } else {
            toast.error("Please login to create a conversation");
        }
    };
    return (
        <section className="py-8 bg-white md:py-16 antialiased">
            {data ? (
                <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                        {/* Image Gallery */}
                        <div className="shrink-0 max-w-sm lg:max-w-lg mx-auto">
                            <div className="bg-gray-50 p-4 rounded-xl">
                                {data.images && data.images.length > 0 && (
                                    <img
                                        src={`${backend_url}uploads/${data.images[select]}`}
                                        alt="Main product display"
                                        className="w-full h-[300px] sm:h-[400px] object-cover rounded-lg"
                                    />
                                )}
                            </div>
                            <div className="flex gap-3 mt-4">
                                {data.images &&
                                    data.images.map((img, index) => (
                                        <div
                                            key={index}
                                            className={`border-2 rounded-lg p-1 cursor-pointer ${
                                                select === index ? "border-pink-500" : "border-gray-200"
                                            }`}
                                            onClick={() => setSelect(index)}
                                        >
                                            <img
                                                src={`${backend_url}uploads/${img}`}
                                                alt={`Product thumbnail ${index + 1}`}
                                                className="h-24 w-24 object-contain rounded-md"
                                            />
                                        </div>
                                    ))}

                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="w-full 800px:w-[50%] pt-5">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.name}</h1>
                            <p className="text-gray-600 mb-4">{data.description}</p>
                            {/* Price Section */}
                            <div className="flex items-baseline mb-6">
                                <h4 className="text-3xl font-sans font-bold text-gray-900">
                                    ₹{data.discountPrice}
                                </h4>
                                {data.originalPrice && (
                                    <h3 className="ml-3 text-xl font-sans text-red-400 line-through">
                                        {data.originalPrice ? "₹" + data.originalPrice : null}
                                    </h3>
                                )}
                            </div>

                            {/* Quantity Selector */}
                            <div className="flex items-center gap-4 my-8">
                                <span className="text-gray-700 font-medium">Quantity:</span>
                                <div className="flex items-center border rounded-lg">
                                    <button
                                        className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                                        onClick={decrementCount}
                                    >
                                        -
                                    </button>
                                    <span className="px-4 py-2 w-12 text-center">{count}</span>
                                    <button
                                        className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                                        onClick={incrementCount}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                                <button
                                    className="flex items-center justify-center w-full py-2.5 px-5 mb-4 sm:mb-0 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100"
                                    onClick={handleWishlist} // Use single handler
                                >
                                    {click ? (
                                        <AiFillHeart
                                            size={20}
                                            className="cursor-pointer mr-2 hover:scale-110 transition-transform"
                                            color="red"
                                            title="Remove from wishlist"
                                        />
                                    ) : (
                                        <AiOutlineHeart
                                            size={20}
                                            className="cursor-pointer mr-2 hover:scale-110 transition-transform"
                                            color="gray"
                                            title="Add to wishlist"
                                        />
                                    )}
                                    {click ? "Remove from favorites" : "Add to favorites"}
                                </button>

                                <button
                                    onClick={addToCartHandler} // Add click handler
                                    disabled={data.stock < 1} // Disable button if out of stock
                                    className="w-full flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-4 focus:ring-primary-300"
                                >
                                    <AiOutlineShoppingCart className="w-5 h-5 mr-2"/>
                                    Add to cart
                                </button>
                            </div>

                            {/* Seller Info */}
                            <div className="flex bg-gray-100 justify-between items-center mt-8 px-2 rounded-lg">
                                <div className={"flex items-center sm:gap-3"}>
                                    <Link to={`/shop/preview/${data?.shop._id}`}>
                                        <img
                                            src={`${backend_url}${data?.shop.avatar}`}
                                            alt=""
                                            className="w-[50px] h-[50px] object-cover rounded-full ml-2 mr-2"
                                        />
                                    </Link>
                                    <div className="pr-0 sm:pr-8 ">
                                        <Link to={`/shop/preview/${data?.shop._id}`}>
                                            <h3 className={`${styles.shop_name} font-medium`}>
                                                {data.shop.name}
                                            </h3>
                                        </Link>
                                        <h5 className="pb-3 text-[15px]">
                                            ({averageRating}) Ratings
                                        </h5>
                                    </div>
                                </div>
                                <div
                                    className={`${styles.button} bg-[#6443d1] mt-4 md:mr-3 !rounded-lg !h-10 !w-38`}
                                    onClick={handleMessageSubmit}
                                >
                                        <span className="text-white flex items-center">
                                          Send Message <AiOutlineMessage className="ml-1"/>
                                        </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ProductDetailsInfo
                        data={data} products={products}
                        totalReviewsLength={totalReviewsLength}
                        averageRating={averageRating}
                    />
                </div>
            ) : null}
        </section>
    );
};

const ProductDetailsInfo = ({data, products, averageRating, totalReviewsLength}) => {
    const [active, setActive] = useState(1);

    return (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden mt-8">
            <div className="w-full flex justify-between border-b border-gray-200">
                {[1, 2, 3].map((tab) => (
                    <div key={tab} className="relative flex-1 text-center">
                        <button
                            className={`w-full py-6 text-lg font-medium transition-colors ${
                                active === tab
                                    ? "text-pink-600 bg-pink-50/50"
                                    : "text-gray-600 hover:bg-gray-50"
                            }`}
                            onClick={() => setActive(tab)}
                        >
                            {['Product Details', 'Product Reviews', 'Seller Info'][tab - 1]}
                            {active === tab && (
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-pink-500"/>
                            )}
                        </button>
                    </div>
                ))}
            </div>

            {/* Content Sections */}
            <div className="p-4 bg-gray-50/50">
                {active === 1 && (
                    <article className="prose prose-lg max-w-none text-gray-600">
                        <div className="space-y-4 leading-relaxed whitespace-pre-line">
                            {data.description}
                            <br/>
                            <br/>
                            {data.description}
                        </div>
                    </article>
                )}

                {active === 2 && (
                    <div className="w-full h-[35vh] flex flex-col items-center py-4 overflow-y-scroll">
                        {data && data.reviews.map((item) => (
                            <div key={item._id} className="w-full bg-white rounded-lg p-4 shadow-sm mb-3">
                                <div className="flex items-start gap-3">
                                    <img
                                        src={`${backend_url}${item?.user?.avatar}`}
                                        alt={item.user.name}
                                        className="w-10 h-10 rounded-full object-cover border-2 border-gray-100"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-baseline gap-3 mb-1">
                                            <h3 className="text-gray-900 font-medium">{item.user.name}</h3>
                                            <span className="text-xs text-gray-500">
                                                {new Date(item.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="flex items-center">
                                                {[...Array(5)].map((_, i) => (
                                                    <AiFillStar
                                                        key={i}
                                                        className={`w-5 h-5 ${
                                                            i < item.rating
                                                                ? 'text-yellow-400'
                                                                : 'text-gray-300'
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-sm font-medium text-gray-700">
                                {item.rating.toFixed(1)}
                            </span>
                                        </div>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {item.comment}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {data && data.reviews.length === 0 && (
                            <div className="w-full text-center py-8">
                                <div className="max-w-md mx-auto text-gray-500">
                                    <AiOutlineStar className="w-12 h-12 mx-auto text-gray-300 mb-3"/>
                                    <p className="font-medium">
                                        No reviews yet. Be the first to share your experience!
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {active === 3 && (<div className="w-full block sm:flex justify-around ">
                    <div className="w-full 800px:w-[50%]">
                        <Link to={`/shop/preview/${data?.shop._id}`}>
                            <div className="flex items-center">
                                <img
                                    src={`${backend_url}${data?.shop.avatar}`}
                                    className="w-[50px] h-[50px] object-cover rounded-full"
                                    alt=""
                                />
                                <div className="pl-3">
                                    <h3 className={`${styles.shop_name}`}>
                                        {data.shop.name}
                                    </h3>
                                    <h5 className="pb-2 text-[15px]">
                                        ({averageRating}) Ratings
                                    </h5>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 sm:flex flex-col items-end">
                        <div className="text-left">
                            <h5 className="font-[600]">
                                Joined on:{" "}
                                <span className="font-[500]">
                                    {data?.createdAt?.slice(0, 10)}
                                </span>
                            </h5>
                            <h5 className="font-[600] pt-3">
                                Total Products:{" "}
                                <span className="font-[500]">
                                    {products && products.length}
                                </span>
                            </h5>
                            <h5 className="font-[600] pt-3">
                                Total Reviews:{" "}
                                {totalReviewsLength}
                            </h5>
                            <Link to={`/shop/preview/${data.shop._id}`}>
                                <div
                                    className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
                                >
                                    <h4 className="text-white">Visit Shop</h4>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>)}
            </div>
        </div>
    );
};

export default ProductDetails;