import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ShopProtectedRoute = ({ children }) => {
  const { isLoading, isShop } = useSelector((state) => state.shop);
  if (isLoading === false) {
    if (!isShop) {
      toast.info(`Please login to Continue`,{
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return <Navigate to={`/`} replace />;
    }
    return children;
  }
};

export default ShopProtectedRoute;
