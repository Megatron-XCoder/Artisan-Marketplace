import DashboardHeader from "../../Components/Shop/Layout/DashboardHeader.jsx";
import DashboardSideBar from "../../Components/Shop/Layout/DashboardSideBar.jsx";
import AllProducts from "../../Components/Shop/AllProducts.jsx";

const ShopAllProducts = () => {
    return (
        <>
            <div>
                <DashboardHeader/>
                <div>
                    <DashboardSideBar active={3}/>
                </div>
                <div className="flex items-center justify-between w-full">
                    <div className="w-full justify-center flex mb-4 sm:mb-8">
                        <AllProducts/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShopAllProducts;
