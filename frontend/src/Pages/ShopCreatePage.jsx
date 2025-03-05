import ShopCreate from "../components/Shop/ShopCreate.jsx";
import Header from "../Components/Layout/Header.jsx";
import Footer from "../Components/Layout/Footer.jsx";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect} from "react";


const ShopCreatePage = () => {
    const navigate = useNavigate();
    const { isShop, shop } = useSelector((state) => state.shop);

    useEffect(() => {
        if (isShop === true) {
            navigate(`/shop/${shop._id}`);
        }
    });

    return (
        <>
            <div>
                <Header />
                <ShopCreate />
                <Footer />
            </div>
        </>
    )
}

export default ShopCreatePage;
