import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import styles from "../../Styles/Styles";
import ProductCard from "../Route/ProductCard/ProductCard";

const SuggestedProduct = ({data}) => {
    const {allProducts} = useSelector((state) => state.products);
    const [products, setProducts] = useState(null);

    useEffect(() => {
        const d =
            allProducts && allProducts.filter((i) => i.category === data.category);
        setProducts(d);
    }, []);

    return (
        <div>
            {data ? (
                <div className={`p-4 ${styles.section}`}>
                    <h2
                        className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}
                    >
                        Related Product
                    </h2>
                    <div
                        className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
                        {
                            products && products.map((i, index) => (
                                <ProductCard data={i} key={index}/>
                            ))
                        }
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default SuggestedProduct;
