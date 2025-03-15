import {Link, useNavigate} from "react-router-dom";
import {brandingData, categoriesData} from "../../../Static/Data.jsx";
import styles from "../../../Styles/Styles.jsx";

const Categories = () => {
    const navigate = useNavigate();

    return (
        <>
            {/* Branding Section */}
            <div className={`${styles.section} hidden sm:block`}>
                <div
                    className="branding my-12 flex flex-wrap justify-between w-full shadow-sm bg-white p-5 rounded-md gap-4">
                    {brandingData &&
                        brandingData.map((i, index) => (
                            <div className="flex items-start flex-grow min-w-[200px] max-w-[300px]" key={index}>
                                <div className="text-2xl text-blue-600">{i.icon}</div>
                                <div className="px-3">
                                    <h3 className="font-bold text-sm md:text-base text-gray-800">{i.title}</h3>
                                    <p className="text-xs md:text-sm text-gray-600 mt-1">{i.Description}</p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            {/* Categories Section */}

            <div className={`${styles.section} bg-white p-6 rounded-lg mb-12`} id="categories">

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-700 mb-2">
                        Don&#39;t miss out on exclusive deals.
                    </h2>
                    <p className="text-gray-400 text-lg mb-4">
                        Don&#39;t Miss Out - Limited Stock at Rock-Bottom Prices!
                    </p>
                    <Link to={"/products"}>
                        <button
                            className={`bg-gradient-to-tl from-purple-700 via-purple-500 text-[18px] to-blue-700 hover:bg-gradient-to-br hover:shadow-xl text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors`}>
                            Shop now
                        </button>
                    </Link>
                </div>
                <div className="grid grid-cols-2  gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {categoriesData &&
                        categoriesData.map((i) => {
                            const handleSubmit = (i) => {
                                navigate(`/products?category=${i.title}`);
                            };
                            return (
                                <div
                                    className="w-full h-[120px] hover:shadow-xl  hover:scale-105 sm:h-[140px] flex flex-col sm:flex-row items-center justify-between cursor-pointer overflow-hidden bg-gray-50 hover:bg-gray-100 transition-all duration-300 rounded-lg border border-gray-200 relative"
                                    key={i.id}
                                    onClick={() => handleSubmit(i)}
                                >
                                    {/* Image covering the box */}
                                    <div className="absolute inset-0">
                                        <img
                                            src={i.image_Url}
                                            className="w-full h-full object-cover"
                                            alt={i.title}
                                        />
                                    </div>

                                    {/* Title positioned over image */}
                                    <h5 className="absolute bottom-0 w-full text-center text-white text-[16px] font-semibold p-2 bg-black/30">
                                        {i.title}
                                    </h5>
                                </div>
                            );
                        })}
                </div>


            </div>
        </>
    );
};

export default Categories;