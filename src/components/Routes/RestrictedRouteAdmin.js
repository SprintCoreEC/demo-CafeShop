import { Navigate, Outlet } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../utils/firebase';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';

const RestrictedRouteAdmin = () => {
    const [user, loading] = useAuthState(auth);
    const [isAdmin, setIsAdmin] = useState(false);
    const [checkingRole, setCheckingRole] = useState(true);

    useEffect(() => {
        const checkAdminRole = async () => {
            if (user) {
                try {
                    const adminDoc = await getDoc(doc(db, 'admins', user.uid));
                    setIsAdmin(adminDoc.exists() && adminDoc.data().role === 'admin');
                } catch (err) {
                    console.error("Error verificando el rol:", err);
                }
            }
            setCheckingRole(false);
        };

        if (!loading) {
            checkAdminRole();
        }
    }, [user, loading]);

    // ⏳ Mostrar loading solo mientras se verifica todo
    if (loading || checkingRole) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-icons"></div>
            </div>
        );
    }

    // Si ya es admin, redirige
    if (user && isAdmin) {
        return <Navigate to="/admin-new" replace />;
    }

    // 🆗 Usuario no autenticado o no admin: puede ver login
    return <Outlet />;
};

export default RestrictedRouteAdmin;
