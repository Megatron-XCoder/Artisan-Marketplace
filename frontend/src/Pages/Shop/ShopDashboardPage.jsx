import DashboardHeader from "../../Components/Shop/Layout/DashboardHeader.jsx";
import DashboardSideBar from "../../Components/Shop/Layout/DashboardSideBar.jsx";
import DashboardHero from "../../Components/Shop/DashboardHero.jsx";

const ShopDashboardPage = () => {
    return (
        <div>
            <DashboardHeader />
            <div>
                <DashboardSideBar active={1} />
            </div>
            <div className="flex items-center justify-between w-full">
                <div className="w-full justify-center flex mb-4">
                    <DashboardHero />
                </div>
            </div>
        </div>
    )
}

export default ShopDashboardPage;
