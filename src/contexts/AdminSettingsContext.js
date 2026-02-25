import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAdminProfile, updateAdminProfileImage, updateAdminProfile, updateReceiveNotifications } from '../services/adminService';
import { auth } from '../utils/firebase'; // Importa tu instancia de auth
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth"; // Importa la función directamente de Firebase
import { toast } from 'react-toastify';

const AdminSettingsContext = createContext();

export const useAdminSettings = () => {
    return useContext(AdminSettingsContext);
};

export const AdminSettingsProvider = ({ children }) => {
    const [adminData, setAdminData] = useState({
        name: '',
        email: '',
        bio: '',
        profileImage: '',
        socialLinks: { twitter: '', github: '' },
        receiveNotifications: false,
    });

    const [selectedImage, setSelectedImage] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [originalData, setOriginalData] = useState(null);
    const [currentPassword, setCurrentPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const user = auth.currentUser;

                if (!user) {
                    toast.error('No autorizado: Inicia sesión nuevamente.');
                    return;
                }

                const profileData = await getAdminProfile();
                setAdminData((prev) => ({
                    ...prev,
                    ...profileData,
                    socialLinks: {
                        twitter: profileData.socialLinks?.twitter || '',
                        github: profileData.socialLinks?.github || '',
                    },
                }));

                setOriginalData({
                    name: profileData.name,
                    bio: profileData.bio,
                    twitter: profileData.socialLinks?.twitter || '',
                    github: profileData.socialLinks?.github || '',
                });
            } catch (error) {
                console.error('❌ Error al obtener el perfil:', error);
                toast.error('Ocurrió un error al cargar el perfil.');
            }
        };

        fetchAdminData();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            setSelectedImage(URL.createObjectURL(file));
            handleImageUpload(file);
        } else {
            toast.error('Por favor selecciona un archivo JPG o PNG válido.');
        }
    };

    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append('profileImage', file);

        try {
            const response = await updateAdminProfileImage(formData);
            setAdminData((prevState) => ({
                ...prevState,
                profileImage: response.profileImage,
            }));
            toast.success('Imagen de perfil actualizada.');
        } catch (error) {
            console.error('Error en handleImageUpload:', error);
            toast.error('Error al actualizar la imagen de perfil.');
        }
    };

    const handleCheckboxChange = async () => {
        const newReceiveNotifications = !adminData.receiveNotifications;

        try {
            await updateReceiveNotifications(newReceiveNotifications);

            setAdminData((prevData) => ({
                ...prevData,
                receiveNotifications: newReceiveNotifications,
            }));

            toast.success(
                `Notificaciones ${newReceiveNotifications ? 'activadas' : 'desactivadas'} correctamente.`
            );
        } catch (error) {
            toast.error('Error al actualizar las notificaciones.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updatedData = {
                name: adminData.name,
                bio: adminData.bio,
                twitter: adminData.socialLinks.twitter,
                github: adminData.socialLinks.github,
            };

            let passwordUpdated = false;

            if (currentPassword || newPassword || confirmPassword) {
                if (!currentPassword || !newPassword || !confirmPassword) {
                    toast.warn('Debes completar todos los campos de contraseña para cambiarla.');
                    return;
                }

                if (newPassword !== confirmPassword) {
                    toast.error('Las nuevas contraseñas no coinciden.');
                    return;
                }

                const user = auth.currentUser;
                if (user && user.email) {
                    try {
                        const credential = EmailAuthProvider.credential(user.email, currentPassword);
                        await reauthenticateWithCredential(user, credential);
                        await updatePassword(user, newPassword);
                        toast.success('Contraseña actualizada correctamente.');
                        passwordUpdated = true;
                        setNewPassword('');
                        setCurrentPassword('');
                        setConfirmPassword('');
                    } catch (err) {
                        console.error('Error al cambiar contraseña:', err);
                        toast.error('Contraseña actual incorrecta.');
                        return;
                    }
                } else {
                    toast.error('Usuario no autenticado.');
                    return;
                }
            }

            const dataChanged =
                originalData &&
                (originalData.name !== updatedData.name ||
                    originalData.bio !== updatedData.bio ||
                    originalData.twitter !== updatedData.twitter ||
                    originalData.github !== updatedData.github);

            if (dataChanged) {
                await updateAdminProfile(updatedData);
                toast.success('Perfil actualizado exitosamente.');
                setOriginalData(updatedData);
            } else if (!dataChanged && !passwordUpdated) {
                toast.info('No se detectaron cambios en el perfil.');
            }
        } catch (error) {
            console.error('Error al actualizar perfil:', error);
            toast.error('Error al actualizar el perfil.');
        }
    };

    return (
        <AdminSettingsContext.Provider
            value={{
                adminData,
                selectedImage,
                setSelectedImage,
                newPassword,
                setNewPassword,
                currentPassword,
                setCurrentPassword,
                confirmPassword,
                setConfirmPassword,
                handleImageChange,
                handleImageUpload,
                handleCheckboxChange,
                handleSubmit,
                setAdminData,
            }}
        >
            {children}
        </AdminSettingsContext.Provider>
    );
};
