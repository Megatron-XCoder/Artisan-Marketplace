import DashboardHeader from "../../Components/Shop/Layout/DashboardHeader.jsx";
import DashboardSideBar from "../../Components/Shop/Layout/DashboardSideBar.jsx";

const ShopDashboardPage = () => {
    return (
        <>
            <DashboardHeader/>
            <div className="flex items-start justify-between w-full">
                <div className="w-[80px] 800px:w-[330px]">
                    <DashboardSideBar active={1}/>
                </div>
            </div>
        </>
    )
}

export default ShopDashboardPage;
