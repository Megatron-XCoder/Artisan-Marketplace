import DashboardHeader from "../../Components/Shop/Layout/DashboardHeader.jsx";
import DashboardSideBar from "../../Components/Shop/Layout/DashboardSideBar.jsx";
import AllCoupons from "../../components/Shop/AllCoupons.jsx";

const ShopAllCoupons = () => {
    return (
        <>
            <div>
                <DashboardHeader />
                <div>
                    <DashboardSideBar active={9} />
                </div>
                <div className="flex items-center justify-between w-full">
                    <div className="w-full justify-center flex mb-4 sm:mb-8">
                        <AllCoupons />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShopAllCoupons;
