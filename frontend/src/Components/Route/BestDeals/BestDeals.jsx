import { useEffect, useState } from "react";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../../Layout/Loader"; // Import the Loader component

const BestDeals = () => {
    const { allProducts, isLoading } = useSelector((state) => state.products); // Assuming isLoading is available
    const [data, setData] = useState([]);

    useEffect(() => {
        if (allProducts) {
            const sortedData = [...allProducts].sort((a, b) => b.sold_out - a.sold_out);
            const firstFive = sortedData.slice(0, 5); // Gets items at indices 5-9 (6th to 10th items)
            setData(firstFive);
        }
    }, [allProducts]);

    return (
        <div>
            <div className={`${styles.section}`}>
                <div className={`${styles.heading} flex justify-between items-end`}>
                    <h1>Best Deals</h1>
                    <div className="flex items-center">
                        <Link
                            to={"/best-selling"}
                            className="ms-1 text-[16px] font-semibold mr-1 text-gray-600 hover:text-teal-500 md:ms-2"
                        >
                            View more
                        </Link>
                        <svg className={"h-7 w-7"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path
                                fill={"teal"}
                                d="m18.707 12.707-3 3a1 1 0 0 1-1.414-1.414L15.586 13H6a1 1 0 0 1 0-2h9.586l-1.293-1.293a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1 0 1.414z"
                                data-name="Right"
                            />
                        </svg>
                    </div>
                </div>
                {isLoading ? ( // Show loader if data is loading
                    <Loader />
                ) : (
                    <div className="grid gap-[10px] sm:gap-[15px] md:gap-[20px] md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mb-12 border-0 px-2 sm:px-0">
                        {data.map((i, index) => (
                            <ProductCard data={i} key={index} isShop={true} />
                        ))
                        }
                    </div>
                )}
            </div>
        </div>
    );
};

export default BestDeals;