import {footerCompanyLinks} from "../../Static/Data.jsx";
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-gray-800">
            {/*// <!-- Newsletter Section -->*/}
            <div
                className="p-4 md:p-6 lg:p-8 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <div className="mx-auto max-w-screen-xl">
                    <div
                        className="flex flex-col md:flex-row items-center text-center lg:text-start justify-between gap-2 md:gap-4">
                        {/* Left Content */}
                        <div className="md:w-1/2 text-left">
                            <h2 className="mb-4 text-3xl text-center lg:text-start md:text-3xl font-bold text-gray-900 dark:text-white">
                                Stay Ahead in the Artisan Marketplace
                            </h2>
                            <p className="mb-6 text-[16px] text-center lg:text-start text-gray-600 dark:text-gray-300 leading-relaxed">
                                Be the first to know about new artisans, exclusive products,
                                special deals, and members-only events. Our newsletter delivers
                                curated updates straight to your inbox.
                            </p>
                        </div>

                        {/* Right Form */}
                        <div className="md:w-1/2 w-full">
                            <form className="w-full max-w-lg ml-auto">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="flex-1 px-6 py-3.5 text-gray-900 dark:text-white placeholder-gray-500 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 dark:hover:border-purple-500"
                                    />
                                    <button
                                        type="submit"
                                        className="px-8 py-3.5 text-white font-semibold bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                                    >
                                        Subscribe
                                    </button>
                                </div>
                                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                                    We respect your privacy. Unsubscribe anytime.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/*// <!-- Main Footer Content -->*/}
            <div className="p-4 md:p-8 lg:p-10">
                <div className="mx-auto max-w-screen-xl text-center">
                    <a href="#"
                       className="flex justify-center items-center text-4xl font-semibold text-gray-900 dark:text-white mb-6">
                        Artisan Marketplace
                    </a>

                    <p className="my-6 text-gray-500 dark:text-gray-400">Discover the Beauty of Handmade, the Essence of
                        Ethical Shopping, and the Joy of Owning Unique
                        Creations – Only at Artisan Marketplace!</p>

                    <ul className="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
                        {footerCompanyLinks.map((link, index) => (
                            <li className="mr-4 md:mr-6" key={index}>
                                <Link
                                    className="text-white hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                                    to={link.link}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2025-2026 <a href="/" className="hover:underline">Artisan Marketplace™</a>. All Rights Reserved.
      </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
