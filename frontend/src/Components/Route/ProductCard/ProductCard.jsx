import {useState} from "react";
import {
    AiFillHeart,
    AiFillStar,
    AiOutlineEye,
    AiOutlineHeart,
    AiOutlineShoppingCart,
    AiOutlineStar,
} from "react-icons/ai";
import {Link} from "react-router-dom";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import {backend_url} from "../../../server.jsx";
// import { useDispatch, useSelector } from "react-redux";
// import { addToWishlist, removeFromWishlist } from "../../../redux/actions/wishlist";
// import { addTocart } from "../../../redux/actions/Cart";
// import Ratings from "../../Products/Ratings";
// import { toast } from "react-toastify";

const ProductCard = ({data}) => {
    // const { wishlist } = useSelector((state) => state.wishlist);
    // const { Cart } = useSelector((state) => state.Cart);
    const [click, setClick] = useState(false);
    const [open, setOpen] = useState(false);
    // const dispatch = useDispatch();

    const hasDiscount = data.discountPrice > 0;

    // Calculate discount percentage
    const discountPercentage = hasDiscount
        ? Math.round(((data.originalPrice - data.discountPrice) / data.originalPrice) * 100)
        : 0;

    // useEffect(() => {
    //   if (wishlist?.find((i) => i._id === data._id)) setClick(true);
    // }, [wishlist]);

    // const handleWishlist = () => {
    //   setClick(!click);
    //   click
    //     ? dispatch(removeFromWishlist(data))
    //     : dispatch(addToWishlist(data));
    // };

    // const addToCartHandler = () => {
    //   if (data.stock < 1) return toast.error("Product stock limited!");
    //   if (Cart?.find((i) => i._id === data._id)) return toast.error("Item already in Cart!");
    //   dispatch(addTocart({ ...data, qty: 1 }));
    //   toast.success("Item added to Cart!");
    // };

    return (
        <div
            className={`w-full max-w-sm sm:max-w-[340px] md:max-w-[360px] bg-white rounded-lg shadow-md p-4 relative cursor-pointer ${
                !open ? 'hover:shadow-2xl hover:scale-105 transition-all duration-300' : ''
            } flex flex-col`}>
            {/* Discount Badge */}
            {hasDiscount && (
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
                    {discountPercentage}% OFF
                </div>
            )}

            {/* Icons */}
            <div className="absolute right-6 top-6 flex flex-col gap-2 ">
                {click ? (
                    <AiFillHeart
                        size={22}
                        className="cursor-pointer hover:scale-110 transition-transform"
                        onClick={() => setClick(!click)}
                        color="red"
                        title="Remove from wishlist"
                    />
                ) : (
                    <AiOutlineHeart
                        size={22}
                        className="cursor-pointer hover:scale-110 transition-transform"
                        onClick={() => setClick(!click)}
                        color="white"  // Changed from white to gray-600
                        title="Add to wishlist"
                    />
                )}
                <AiOutlineEye
                    size={22}
                    className="cursor-pointer hover:scale-110 transition-transform"
                    onClick={() => setOpen(!open)}
                    color="white"
                    title="Quick view"
                />
            </div>

            {/* Product Image */}
            <Link to={`/product/${data._id}`} className="flex justify-center">
                <img
                    src={`${backend_url}uploads/${data?.images?.[0]}`}
                    alt={data.name}
                    className="w-full h-[200px] object-cover rounded-lg hover:shadow-lg"
                />
            </Link>

            {/* Shop Name */}
            <div className="mt-3 text-sm text-start text-gray-500">
                <span className="font-medium text-teal-600">{data.shop?.name}</span>
            </div>

            {/* Product Details */}
            <div className="flex flex-col gap-2 flex-grow text-center">
                <Link to={`/product/${data._id}`}>
                    <h4 className="font-semibold text-start text-gray-900 text-[1rem]">
                        {data.name.length > 35 ? `${data.name.slice(0, 35)}...` : data.name}
                    </h4>
                </Link>

                {/* Static Rating */}
                <div className="flex gap-1 text-sm text-amber-500">
                    {[...Array(4)].map((_, i) => (
                        <AiFillStar key={i} size={16}/>
                    ))}
                    <AiOutlineStar size={16}/>
                </div>

                {/* Pricing */}
                <div className="flex justify-between items-center gap-2 text-lg">
                    <div className="flex items-center gap-1">
                        <h5 className="font-bold text-xl text-gray-900">
                            ${hasDiscount ? data.discountPrice : data.originalPrice}
                        </h5>
                        {hasDiscount && (
                            <h3 className="text-sm text-red-400 line-through">
                                ${data.originalPrice}
                            </h3>
                        )}
                    </div>
                    <span className="text-sm text-red-600 font-medium">
            {data.sold_out} sold
          </span>
                </div>
            </div>

            {/* Add to Cart Button */}
            <button
                className="mt-4 w-full bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br text-white py-2 rounded-md flex items-center justify-center gap-2 transition-colors"
                // onClick={addToCartHandler}
                // disabled={data.stock < 1}
            >
                <AiOutlineShoppingCart size={18}/>
                <span className="font-medium">
          {/* {data.stock > 0 ? "Add to Cart" : "Out of Stock"} */}
                    Add to cart
        </span>
            </button>

            {open && <ProductDetailsCard data={data} setOpen={setOpen}/>}
        </div>
    );
};

export default ProductCard;