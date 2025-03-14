import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import ProductDetails from "../components/Products/ProductDetails";
import SuggestedProduct from "../components/Products/SuggestedProduct.jsx";
import { useSelector } from "react-redux";
import Loader from "../Components/Layout/Loader.jsx";

const ProductDetailsPage = () => {
    const { allProducts = [], products } = useSelector((state) => state.products) || {};
    const { id } = useParams();
    const [productData, setProductData] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (allProducts?.length > 0) {
            const foundProduct = allProducts.find((product) => product._id === id);
            setProductData(foundProduct || null);
        }
    }, [allProducts, id]);

    return (
        <div>
            <Header />
            {productData ? <ProductDetails data={productData} products={products} /> : <Loader/>}
            {productData && <SuggestedProduct data={productData} />}
            <Footer />
        </div>
    );
};

export default ProductDetailsPage;
