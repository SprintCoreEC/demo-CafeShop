import { Navigate, Outlet } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../utils/firebase';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';

const PrivateRouteAdmin = () => {
    const [user, loading] = useAuthState(auth);
    const [isAdmin, setIsAdmin] = useState(false);
    const [checkingRole, setCheckingRole] = useState(true);

    useEffect(() => {
        const checkAdminRole = async () => {
            if (user) {
                const adminDoc = await getDoc(doc(db, 'admins', user.uid));
                if (adminDoc.exists() && adminDoc.data().role === 'admin') {
                    setIsAdmin(true);
                }
            }
            setCheckingRole(false);
        };

        checkAdminRole();
    }, [user]);

    if (loading || checkingRole) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-icons"></div>
            </div>
        );
    }

    // 🚫 No autenticado
    if (!user) return <Navigate to="/admin-login" replace />;

    // 🚫 Autenticado pero no es admin
    if (!isAdmin) return <Navigate to="/admin-login" replace />;

    // Autenticado y es admin
    return <Outlet />;
};

export default PrivateRouteAdmin;
