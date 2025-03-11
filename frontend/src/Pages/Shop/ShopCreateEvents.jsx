import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import CreateEvent from "../../components/Shop/CreateEvent.jsx";
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar';

const ShopCreateEvents = () => {
    return (
        <div>
            <DashboardHeader />
            <div>
                <DashboardSideBar active={6} />
            </div>
            <div className="flex items-center justify-between w-full">
                <div className="w-full justify-center flex mb-4 sm:mb-8">
                    <CreateEvent />
                </div>
            </div>
        </div>
    )
}

export default ShopCreateEvents