import DashboardHeader from '../../Components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../Components/Shop/Layout/DashboardSideBar'
import DashboardMessages from "../../Components/Shop/DashboardMessages.jsx";

const ShopInboxPage = () => {
    return (
        <div>
            <DashboardHeader active={8}/>

            <div className="flex items-center justify-between w-full">
                <div className="w-full justify-center flex ">
                    <DashboardMessages />
                </div>
            </div>
        </div>
    )
}

export default ShopInboxPage