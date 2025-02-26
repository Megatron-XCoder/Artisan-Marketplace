import {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";
import {productData} from "../../../Static/data.jsx";
import {Link} from "react-router-dom";

const FeaturedProduct = () => {
  // const {allProducts} = useSelector((state) => state.products);
    const [data, setData] = useState([]);

    useEffect(() => {
        const d = productData && productData.sort((a, b) => b.total_sell - a.total_sell);
        const productsSixToTen = d && d.slice(5, 10);
        setData(productsSixToTen);
    }, []);
   
  return (
    <div>
      <div className={`${styles.section} mt-8`}>
        <div className={`${styles.heading} flex justify-between items-end`}>
          <h1>Featured Products</h1>
            <div className="flex items-center">
                <Link to={"/best-selling"}
                      className="ms-1 text-[16px] font-semibold mr-1 text-gray-600 hover:text-teal-500 md:ms-2">
                    View more
                </Link>
                <svg className={"h-7 w-7"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill={"teal"} d="m18.707 12.707-3 3a1 1 0 0 1-1.414-1.414L15.586 13H6a1 1 0 0 1 0-2h9.586l-1.293-1.293a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1 0 1.414z" data-name="Right"/>
                </svg>
            </div>
        </div>
          <div className="grid gap-[10px] sm:gap-[15px] md:gap-[20px] md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mb-12 border-0 px-2 sm:px-0">
              {data &&
                  data.map((i, index) => (
                      <ProductCard
                          data={i}
                          key={index}
                          className="w-full"
                      />
                  ))}
          </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;
