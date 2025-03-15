import DashboardHeader from '../../Components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../Components/Shop/Layout/DashboardSideBar'
import CreateProduct from "../../Components/Shop/CreateProduct.jsx";

const ShopCreateProduct = () => {
    return (
        <div>
            <DashboardHeader />
            <div>
                <DashboardSideBar active={4} />
            </div>
            <div className="flex items-center justify-between w-full">
                <div className="w-full justify-center flex mb-4 sm:mb-8">
                    <CreateProduct />
                </div>
            </div>
        </div>
    )
}

export default ShopCreateProduct