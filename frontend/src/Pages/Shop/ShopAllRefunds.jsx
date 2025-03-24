import DashboardHeader from "../../Components/Shop/Layout/DashboardHeader.jsx";
import DashboardSideBar from "../../Components/Shop/Layout/DashboardSideBar.jsx";
import AllRefunds from "../../Components/Shop/AllRefunds.jsx";

const ShopAllRefunds = () => {
    return (
        <>
            <div>
                <DashboardHeader/>
                <div>
                    <DashboardSideBar active={10}/>
                </div>
                <div className="flex items-center justify-between w-full">
                    <div className="w-full justify-center flex mb-4 sm:mb-8">
                        <AllRefunds/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShopAllRefunds;
