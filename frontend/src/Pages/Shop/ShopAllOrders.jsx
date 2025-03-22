import DashboardHeader from "../../Components/Shop/Layout/DashboardHeader.jsx";
import DashboardSideBar from "../../Components/Shop/Layout/DashboardSideBar.jsx";
import AllOrders from "../../Components/Shop/AllOrders.jsx";

const ShopAllOrders = () => {
    return (
        <>
            <div>
                <DashboardHeader/>
                <div>
                    <DashboardSideBar active={2}/>
                </div>
                <div className="flex items-center justify-between w-full">
                    <div className="w-full justify-center flex mb-4 sm:mb-8">
                        <AllOrders/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShopAllOrders;
