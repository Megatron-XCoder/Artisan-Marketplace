import DashboardHeader from '../../Components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../Components/Shop/Layout/DashboardSideBar'
import ShopSettings from "../../components/Shop/ShopSettings.jsx";

const ShopSettingsPage = () => {
    return (
        <div>
            <DashboardHeader />
            <div>
                <DashboardSideBar active={11} />
            </div>
            <div className="flex items-center justify-between w-full">
                <div className="w-full justify-center flex px-3 mb-4 sm:mb-8">
                    <ShopSettings />
                </div>
            </div>
        </div>
    )
}

export default ShopSettingsPage