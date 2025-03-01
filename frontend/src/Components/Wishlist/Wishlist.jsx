import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { RxCross1 } from "react-icons/rx";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Wishlist = ({ setOpenWishList }) => {
  const cartData = [
    { name: "Product 1", description: "Product 1 Description", price: 100 },
    { name: "Product 2", description: "Product 2 Description", price: 200 },
    { name: "Product 3", description: "Product 3 Description", price: 300 },
    { name: "Product 3", description: "Product 3 Description", price: 300 },
    { name: "Product 3", description: "Product 3 Description", price: 300 },
    { name: "Product 3", description: "Product 3 Description", price: 300 },
    { name: "Product 3", description: "Product 3 Description", price: 300 },
  ];

  const totalPrice = cartData.reduce((acc, item) => acc + item.price, 0);

  return (
      <Dialog open={true} onClose={() => setOpenWishList(false)} className="relative z-10">
        <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-200/30 transition-opacity duration-all ease-in-out"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 right-0 max-h flex max-w-full pl-10">
              <DialogPanel
                  transition
                  className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out"
              >
                <div className="flex h-full flex-col rounded-xl overflow-y-scroll bg-gray-50 shadow-xl">
                  <div className="border-b border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <DialogTitle className="text-lg font-medium text-gray-900">
                        Wishlist [ {cartData.length} Items ]
                      </DialogTitle>
                      <button
                          type="button"
                          onClick={() => setOpenWishList(false)}
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <RxCross1 className="h-6 w-6" />
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flow-root ">
                      <ul className="-my-6 ">
                        {cartData.map((item, index) => (
                            <li key={index} className="flex rounded-lg bg-gray-100 border-b border-gray-200 items-center hover:scale-105 my-3 p-2">
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                                <img
                                    src="https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt={item.description}
                                    className="h-full w-full  object-cover"
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col justify-between">
                                <div>
                                  <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                                  <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                                  <p className="mt-2 text-lg font-semibold text-gray-900">${item.price}</p>
                                </div>

                                <div className="flex items-center justify-between">
                                  <button className="text-indigo-600 cursor-pointer text-sm hover:text-indigo-500 ">
                                    Add to Cart
                                  </button>
                                  <button className="text-red-600 text-sm cursor-pointer hover:text-red-500 ">
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <button
                          className="flex w-full cursor-pointer items-center justify-center rounded-md bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                      >
                        Add All to Cart (${totalPrice})
                      </button>
                    <div className="mt-3 text-center text-sm text-gray-500">
                      <Link to={"/products"}>
                        <button
                            onClick={() => setOpenWishList(false)}
                            className="font-medium text-pink-600 hover:text-purple-500"
                        >
                          Continue Shopping
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
  );
};

// eslint-disable-next-line react/prop-types
const CartSingle = ({ data }) => {
  const [quantity, setQuantity] = useState(1);


  return (
      <li className="flex py-6">
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          <img
              src="https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt={data.description}
              className="h-full w-full object-cover"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <h3>{data.name}</h3>
              <p className="ml-4">${data.price}</p>
            </div>
            <p className="mt-1 text-sm text-gray-500">{data.description}</p>
          </div>

          <div className="flex flex-1 items-end justify-between text-sm">
            <div className="flex items-center gap-2">
              <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="rounded-md bg-gray-200 p-1.5 hover:bg-gray-200"
              >
                <HiOutlineMinus className="h-4 w-4" />
              </button>
              <span className="text-gray-900 text-lg">{quantity}</span>
              <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="rounded-md bg-gray-200 p-1.5 hover:bg-gray-200"
              >
                <HiPlus className="h-4 w-4" />
              </button>
            </div>

            <button className="font-medium text-indigo-600 hover:text-indigo-500">
              Remove
            </button>
          </div>
        </div>
      </li>
  );
};

export default Wishlist;