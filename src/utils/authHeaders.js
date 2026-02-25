import { auth } from "./firebase";

export const getAuthHeaders = async () => {
    const user = auth.currentUser;

    if (!user) {
        throw new Error("Usuario no autenticado.");
    }

    const token = await user.getIdToken();

    return {
        "Authorization": `Bearer ${token}`,
    };
};


