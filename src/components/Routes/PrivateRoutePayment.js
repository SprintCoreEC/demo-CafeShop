import { Navigate, Outlet } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";

const PrivateRoutePayment = () => {
    const [user, loading] = useAuthState(auth);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-icons"></div>
            </div>
        );
    }

    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutePayment;
