import {Link} from "react-router-dom";

const Checkout = () => {
    return (
        <>
            <section className=" min-h-screen bg-gray-100 antialiased 0 mt-10 md:py-8">
                <form action="#" className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="mt-6 sm:mt-0 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                        <div className="min-w-0 flex-1 space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold text-gray-900 ">Delivery
                                    Details</h2>

                                <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="your_name"
                                               className="mb-2 block text-sm font-medium text-gray-900 ">
                                            Full Name
                                        </label>
                                        <input type="text" id="your_name"
                                               className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 y-600 0  r:text-gray-400 er-primary-500 -primary-500"
                                               placeholder="Bonnie Green" required/>
                                    </div>

                                    <div>
                                        <label htmlFor="your_email"
                                               className="mb-2 block text-sm font-medium text-gray-900 ">
                                            Email Address
                                        </label>
                                        <input type="email" id="your_email"
                                               className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 y-600 0  r:text-gray-400 er-primary-500 -primary-500"
                                               placeholder="name@flowbite.com" required/>
                                    </div>

                                    <div>
                                        <div className="mb-2 flex items-center gap-2">
                                            <label htmlFor="select-country-input-3"
                                                   className="block text-sm font-medium text-gray-900 "> Country </label>
                                        </div>
                                        <input type="text" id="your_name"
                                               className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 y-600 0  r:text-gray-400 er-primary-500 -primary-500"
                                               placeholder="India" required/>
                                    </div>

                                    <div>
                                        <div className="mb-2 flex items-center gap-2">
                                            <label htmlFor="select-city-input-3"
                                                   className="block text-sm font-medium text-gray-900 "> City </label>
                                        </div>
                                        <input type="text" id="your_name"
                                               className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 y-600 0  r:text-gray-400 er-primary-500 -primary-500"
                                               placeholder="Bonnie Green" required/>
                                    </div>

                                    <div>
                                        <label htmlFor="phone-input-3"
                                               className="mb-2 block text-sm font-medium text-gray-900 ">
                                            Phone Number
                                        </label>
                                        <input type="text" id="your_name"
                                               className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 y-600 0  r:text-gray-400 er-primary-500 -primary-500"
                                               placeholder="Bonnie Green" required/>
                                    </div>

                                    <div>
                                        <label htmlFor="email"
                                               className="mb-2 block text-sm font-medium text-gray-900 "> Zip
                                            Code </label>
                                        <input type="email" id="email"
                                               className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 y-600 0  r:text-gray-400 er-primary-500 -primary-500"
                                               placeholder="name@flowbite.com" required/>
                                    </div>

                                    <div>
                                        <label htmlFor="company_name"
                                               className="mb-2 block text-sm font-medium text-gray-900 ">
                                            Address 1
                                        </label>
                                        <input type="text" id="company_name"
                                               className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 y-600 0  r:text-gray-400 er-primary-500 -primary-500"
                                               placeholder="123 Main Street, Anytown, USA, 12345" required/>
                                    </div>

                                    <div>
                                        <label htmlFor="vat_number"
                                               className="mb-2 block text-sm font-medium text-gray-900 ">
                                            Address 2
                                        </label>
                                        <input type="text" id="vat_number"
                                               className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 y-600 0  r:text-gray-400 er-primary-500 -primary-500"
                                               placeholder="123 Main Street, Anytown, USA, 12345" required/>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <br/>

                        <div className="bg-white rounded-lg shadow-lg p-6 w-full sm:w-96">
                            <div className="mt-5 w-full space-y-6 sm:mt-6  lg:max-w-xs xl:max-w-md">
                                <div className="flow-root">
                                    <div className="-my-3 ">
                                        <dl className="flex items-center justify-between gap-4 py-1">
                                            <dt className="text-base font-normal text-gray-500 400">Subtotal</dt>
                                            <dd className="text-base font-medium text-gray-900 ">$8,094.00</dd>
                                        </dl>

                                        <dl className="flex items-center justify-between gap-4 py-3">
                                            <dt className="text-base font-normal text-gray-500 400">Shipping</dt>
                                            <dd className="text-base font-medium text-gray-900">0</dd>
                                        </dl>

                                        <dl className="flex items-center border-b  justify-between gap-4 pb-4">
                                            <dt className="text-base font-normal text-gray-500 400">Discount</dt>
                                            <dd className="text-base font-medium text-gray-900 ">$99</dd>
                                        </dl>

                                        <dl className="flex items-center justify-between gap-4 py-3">
                                            <dt className="text-base font-bold text-gray-900 ">Total</dt>
                                            <dd className="text-base font-bold text-gray-900 ">$8,392.00</dd>
                                        </dl>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div>
                                        <label htmlFor="voucher"
                                               className="mb-2 block text-sm font-medium text-gray-900 ">

                                        </label>
                                        <div className="flex max-w-md items-center gap-4">
                                            <input type="text" id="voucher"
                                                   className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 y-600 0  r:text-gray-400 er-primary-500 -primary-500"
                                                   placeholder="Enter a gift card, voucher or coupon code" required/>
                                            <button type="button"
                                                    className="flex items-center justify-center rounded-lg bg-gradient-to-tr from-purple-600 to-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 -600 rimary-700 -primary-800">Apply
                                            </button>
                                        </div>
                                    </div>
                                    <button type="submit"
                                            className="flex w-full items-center justify-center rounded-lg bg-gradient-to-tr from-purple-600 to-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 -600 rimary-700 -primary-800">
                                        Proceed to Payment
                                    </button>

                                    <p className="text-sm font-normal text-gray-500 400">One or more items in
                                        your cart require an account.
                                        <Link to={"/login"} title=""
                                              className="font-medium text-primary-700 no-underline hover:underline ry-500">Sign
                                            in or create an account now.</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Checkout;
