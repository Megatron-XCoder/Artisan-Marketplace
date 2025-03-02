import {Navigate} from "react-router";
import {useEffect, useState} from "react";

const ProtectedRoute = ({ isAuthenticated, children }) => {
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            setRedirect(true);
        }
    }, [isAuthenticated]);

    return redirect ? <Navigate to="/login" replace /> : children;
};


export default ProtectedRoute;