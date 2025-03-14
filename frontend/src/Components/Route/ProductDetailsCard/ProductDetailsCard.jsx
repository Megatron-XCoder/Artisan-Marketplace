import { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
// import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {backend_url} from "../../../server.jsx";
// import { addTocart } from "../../../redux/actions/cart";
// import {
//   addToWishlist,
//   removeFromWishlist,
// } from "../../../redux/actions/wishlist";

const ProductDetailsCard = ({ setOpen, data }) => {
  // const { cart } = useSelector((state) => state.cart);
  // const { wishlist } = useSelector((state) => state.wishlist);
  // const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(false);

  const handleMessageSubmit = () => {};

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };
  //
  // const addToCartHandler = (id) => {
  //   const isItemExists = cart && cart.find((i) => i._id === id);
  //   if (isItemExists) {
  //     toast.error("Item already in cart!");
  //   } else {
  //     if (data.stock < count) {
  //       toast.error("Product stock limited!");
  //     } else {
  //       const cartData = { ...data, qty: count };
  //       dispatch(addTocart(cartData));
  //       toast.success("Item added to cart successfully!");
  //     }
  //   }
  // };
  //
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

  return (
      <div className="bg-[#fff]">
        {data ? (
            <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
              <div
                  className="w-[90%] 800px:w-[70%] h-[90vh] 800px:h-[85vh] overflow-y-scroll bg-gray-50  rounded-md shadow-sm relative p-2 md:p-6">
                <RxCross1
                    size={30}
                    className="absolute right-3 top-3 z-50 cursor-pointer"
                    onClick={() => setOpen(false)}
                />

                {/* Container without flex at desktop */}
                <section className="py-8 md:py-16 antialiased">
                  <div className="max-w-screen-xl p-4 mx-auto 2xl:p-0">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                      <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
                        <Link to={`/product/${data._id}`}>
                          <img
                              src={`${backend_url}uploads/${data?.images?.[0]}`}
                              alt="Product Image"
                              className="w-full hidden dark:block rounded-lg"
                          />
                        </Link>
                        <div className="mt-6 p-4 bg-gray-100 rounded-lg w-full">
                          <Link to={`/shop/preview/${data.shop._id}`}>
                            <div className="flex items-center mb-4">
                              <img
                                  src={`${backend_url}${data.shop.avatar}`}
                                  alt=""
                                  className="w-12 h-12 object-cover rounded-full mr-3"
                              />
                              <div>
                                <h3 className="text-lg font-semibold">{data.shop.name}</h3>
                                <h5 className=" text-[15px]">(4) Ratings</h5>
                              </div>
                            </div>
                          </Link>
                          <p className=" text-red-600 text-sm font-medium">
                            50 sold in last 24 hours
                          </p>
                          <button
                              className="w-full bg-blue-600 text-white py-2 mt-4 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
                              onClick={handleMessageSubmit}
                          >
                            <AiOutlineMessage className="mr-2" /> Send Message
                          </button>
                        </div>
                      </div>





                      <div className="mt-6 sm:mt-8 lg:mt-0">
                        <div className="w-full flex flex-col">
                          {/* Product Name */}
                          <h1 className="text-3xl font-bold mb-4">{data.name}</h1>

                          {/* Description */}
                          <p className="text-gray-600 mb-4">{data.description}</p>

                          {/* Pricing Section */}
                          <div className="flex items-center mb-6">
                            <span className="text-2xl font-bold text-black">
                              ${data.discountPrice}
                            </span>
                              {data.originalPrice && (
                                  <span className="ml-3 text-red-500 line-through">
                                    ${data.originalPrice}
                                  </span>
                              )}
                          </div>

                          {/* Increment & Favorite Section */}
                          <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center border border-gray-200 mr-6 md:mr-0 rounded-lg">
                              <button
                                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200"
                                  onClick={decrementCount}
                              >
                                -
                              </button>
                              <span className="px-6 py-2">{count}</span>
                              <button
                                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200"
                                  onClick={incrementCount}
                              >
                                +
                              </button>
                            </div>
                            <button
                                className="flex items-center text-gray-600 hover:text-red-600"
                                onClick={() => setClick(!click)}
                            >
                              {click ? (
                                  <AiFillHeart size={28} className="text-red-600" />
                              ) : (
                                  <AiOutlineHeart size={28} />
                              )}
                              <span className="md:ml-2 text-md">Add to Favorites</span>
                            </button>
                          </div>

                          {/* Add to Cart Button */}
                          <button className="w-full bg-teal-600 text-white py-3 rounded-lg flex items-center justify-center hover:bg-teal-700 transition-colors">
                            <AiOutlineShoppingCart className="mr-2" /> Add to Cart
                          </button>
                        </div>


                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
        ) : null}
      </div>
  );
  ;

};

export default ProductDetailsCard;
