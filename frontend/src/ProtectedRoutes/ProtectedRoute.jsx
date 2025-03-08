import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../Components/Layout/Loader.jsx";

const ProtectedRoute = ({ children }) => {
    const { loading, isAuthenticated } = useSelector((state) => state.user);
    if (loading === true) {
        return (
            <Loader/>
        )} else {
        if (!isAuthenticated) {
            toast.info(`Please login to Continue`,{
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return <Navigate to="/login" replace />;
        }
        return children;
    }
};

export default ProtectedRoute;
