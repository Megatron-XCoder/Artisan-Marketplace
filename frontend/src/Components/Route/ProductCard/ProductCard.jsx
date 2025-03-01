import { useState } from "react";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
// import {
//   addToWishlist,
//   removeFromWishlist,
// } from "../../../redux/actions/wishlist";
// import { addTocart } from "../../../redux/actions/cart";
// import Ratings from "../../Products/Ratings";

const ProductCard = ({ data }) => {
  // const { wishlist } = useSelector((state) => state.wishlist);
  // const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  // const dispatch = useDispatch();


  const d = data.name;
  const product_name = d.replace(/\s+/g, "-");


  // useEffect(() => {
  //   if (wishlist && wishlist.find((i) => i._id === data._id)) {
  //     setClick(true);
  //   } else {
  //     setClick(false);
  //   }
  // }, [wishlist]);
  //
  // const removeFromWishlistHandler = (data) => {
  //   setClick(!click);
  //   dispatch(removeFromWishlist(data));
  // };
  //
  // const addToWishlistHandler = (data) => {
  //   setClick(!click);
  //   dispatch(addToWishlist(data));
  // };
  //
  // const addToCartHandler = (id) => {
  //   const isItemExists = cart && cart.find((i) => i._id === id);
  //   if (isItemExists) {
  //     toast.error("Item already in cart!");
  //   } else {
  //     if (data.stock < 1) {
  //       toast.error("Product stock limited!");
  //     } else {
  //       const cartData = { ...data, qty: 1 };
  //       dispatch(addTocart(cartData));
  //       toast.success("Item added to cart successfully!");
  //     }
  //   }
  // };

  return (
      <div className={`w-full max-w-sm sm:max-w-[340px] md:max-w-[360px] bg-white rounded-lg shadow-md p-4 relative cursor-pointer ${
          !open ? 'hover:shadow-2xl hover:scale-105 transition-all duration-300' : ''
      } flex flex-col`}>
          {/* Icons */}
        <div className="absolute right-6 top-6 flex flex-col gap-2 ">
          {click ? (
              <AiFillHeart
                  size={22}
                  className="cursor-pointer hover:scale-110 transition-transform"
                  onClick={() => setClick(!click)}
                  color={click ? "red" : "white"}
                  title="Remove from wishlist"
              />
          ) : (
              <AiOutlineHeart
                  size={22}
                  className="cursor-pointer hover:scale-110 transition-transform"
                  onClick={() => setClick(!click)}
                  color={click ? "red" : "white"}
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
        <Link to={`/product/${product_name}`} className="flex justify-center">
          <img
              src={data.image_Url[0].url}
              alt="product img"
              className="w-full h-[200px] object-cover rounded-lg hover:shadow-lg"
          />
        </Link>

        {/* Shop Name */}
        <div className="mt-3 text-sm text-start text-gray-500">
          <span className="font-medium text-teal-600">{data.shop.name}</span>
        </div>

        {/* Product Details */}
        <div className=" flex flex-col gap-2 flex-grow text-center">

          {/* Product Name */}
          <Link to={`/product/${product_name}`}>
            <h4 className="font-semibold text-start text-gray-900 text-[1rem]">
              {product_name.replace(/[-]+/g, " ").trim().length > 35
                  ? product_name.replace(/[-]+/g, " ").trim().slice(0, 35) + "..."
                  : product_name.replace(/[-]+/g, " ").trim()}

            </h4>
          </Link>

          {/* Rating */}
          <div className="flex gap-1 text-sm text-amber-500">
              <AiFillStar className={" cursor-pointer"} size={16} />
              <AiFillStar className={"cursor-pointer"} size={16} />
              <AiFillStar className={"cursor-pointer"} size={16} />
              <AiFillStar className={"cursor-pointer"} size={16} />
              <AiOutlineStar className={"cursor-pointer"} size={16} />
          </div>


          {/* Price Section */}
          <div className="flex justify-between items-center gap-2 text-lg">
            <div className={`flex items-center gap-1`}>
              <h5 className="font-bold text-xl text-md text-gray-900">
                ${data.price === 0 ? data.price : data.discount_price}
              </h5>
              <h3 className={"text-sm text-red-400 line-through"}>
                {data.price ? "$" + data.price : null}
              </h3>
            </div>
            <div>
              <span className="text-sm text-red-600 font-medium">
              {data.total_sell} sold
            </span>
            </div>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
            className="mt-4 w-full bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br hover:bg-blue-700 text-white py-2 rounded-md flex items-center justify-center gap-2 transition-colors"
            // onClick={() => addToCartHandler(data._id)}
        >
          <AiOutlineShoppingCart size={18} />
          <span className="font-medium">Add to cart</span>
        </button>

         {/*Quick View Modal (if needed) */}
          {open ? (<ProductDetailsCard data={data} setOpen={setOpen} />) : null}
      </div>
  );
};

export default ProductCard;
