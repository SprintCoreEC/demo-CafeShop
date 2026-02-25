import { FaUserCircle, FaTwitter, FaGithub, FaBell } from "react-icons/fa";
import { motion } from "framer-motion";
import { useAdminSettings } from "../../contexts/AdminSettingsContext";

const MenuSettings = () => {
  const {
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
  } = useAdminSettings();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 md:p-6 w-full h-screen overflow-y-auto bg-bg2"
    >
      <div className="flex justify-between items-center mb-6 pl-10 md:ml-0">
        <h1 className="text-2xl md:text-3xl font-semibold text-title">
          Configuración del Perfil
        </h1>
      </div>

      <div className="bg-white rounded-xl max-h-[88vh] overflow-hidden overflow-y-auto shadow-lg p-6">
        {/* Sección de Perfil */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
          <div className="relative group">
            {adminData.profileImage ? (
              <img
                src={selectedImage || adminData.profileImage}
                alt="Imagen de perfil"
                className="w-20 h-20 rounded-full object-cover cursor-pointer border-2 border-lines"
                onClick={() => document.getElementById("fileInput").click()}
              />
            ) : (
              <FaUserCircle
                className="w-20 h-20 text-icons cursor-pointer"
                onClick={() => document.getElementById("fileInput").click()}
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                Cambiar foto
              </span>
            </div>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              accept="image/png, image/jpeg"
              onChange={handleImageChange}
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-title">
              {adminData.name}
            </h2>
            <p className="text-sm text-content">Administrador</p>
            <p className="text-sm text-content mt-1">{adminData.email}</p>
          </div>
        </div>

        <form className="space-y-6">
          {/* Información Básica */}
          <div className="border-b border-lines pb-6">
            <h3 className="text-lg font-semibold text-title mb-4">
              Información Básica
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-subtitle mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  value={adminData.name}
                  onChange={(e) =>
                    setAdminData({ ...adminData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-lines rounded-lg focus:outline-none focus:ring-2 focus:ring-icons-on"
                  placeholder="Tu nombre completo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-subtitle mb-2">
                  Biografía
                </label>
                <textarea
                  rows={3}
                  value={adminData.bio}
                  onChange={(e) =>
                    setAdminData({ ...adminData, bio: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-lines rounded-lg focus:outline-none focus:ring-2 focus:ring-icons-on"
                  placeholder="Cuéntanos sobre ti"
                  maxLength={160}
                />
                <p className="mt-1 text-xs text-content">
                  {adminData.bio?.length || 0}/160 caracteres
                </p>
              </div>
            </div>
          </div>

          {/* Cambio de Contraseña */}
          <div className="border-b border-lines pb-6">
            <h3 className="text-lg font-semibold text-title mb-4">Seguridad</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-subtitle mb-2">
                  Contraseña actual
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-lines rounded-lg focus:outline-none focus:ring-2 focus:ring-icons-on"
                  placeholder="Ingresa tu contraseña actual"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-subtitle mb-2">
                    Nueva contraseña
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-lines rounded-lg focus:outline-none focus:ring-2 focus:ring-icons-on"
                    placeholder="Crea una nueva contraseña"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-subtitle mb-2">
                    Confirmar nueva contraseña
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-lines rounded-lg focus:outline-none focus:ring-2 focus:ring-icons-on"
                    placeholder="Confirma tu nueva contraseña"
                  />
                </div>
              </div>
              <p className="text-xs text-content">
                Deja estos campos vacíos si no deseas cambiar la contraseña.
              </p>
            </div>
          </div>

          {/* Redes Sociales */}
          <div className="border-b border-lines pb-6">
            <h3 className="text-lg font-semibold text-title mb-4">
              Redes Sociales
            </h3>

            <div className="space-y-4">
              <div>
                <label className="flex items-center text-sm font-medium text-subtitle mb-2">
                  <FaTwitter className="mr-2 text-blue-400" />
                  Twitter
                </label>
                <input
                  type="url"
                  value={adminData.socialLinks.twitter}
                  onChange={(e) =>
                    setAdminData({
                      ...adminData,
                      socialLinks: {
                        ...adminData.socialLinks,
                        twitter: e.target.value,
                      },
                    })
                  }
                  className="w-full px-4 py-2 border border-lines rounded-lg focus:outline-none focus:ring-2 focus:ring-icons-on"
                  placeholder="https://twitter.com/tu_usuario"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-subtitle mb-2">
                  <FaGithub className="mr-2 text-gray-700" />
                  GitHub
                </label>
                <input
                  type="url"
                  value={adminData.socialLinks.github}
                  onChange={(e) =>
                    setAdminData({
                      ...adminData,
                      socialLinks: {
                        ...adminData.socialLinks,
                        github: e.target.value,
                      },
                    })
                  }
                  className="w-full px-4 py-2 border border-lines rounded-lg focus:outline-none focus:ring-2 focus:ring-icons-on"
                  placeholder="https://github.com/tu_usuario"
                />
              </div>
            </div>
          </div>

          {/* Notificaciones */}
          <div className="pb-6">
            <h3 className="text-lg font-semibold text-title mb-4">
              Preferencias
            </h3>

            <div className="flex items-center">
              <FaBell className="mr-3 text-icons" />
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={adminData.receiveNotifications}
                    onChange={handleCheckboxChange}
                  />
                  <div
                    className={`block w-10 h-6 rounded-full ${
                      adminData.receiveNotifications
                        ? "bg-button"
                        : "bg-gray-300"
                    }`}
                  ></div>
                  <div
                    className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                      adminData.receiveNotifications
                        ? "transform translate-x-4"
                        : ""
                    }`}
                  ></div>
                </div>
                <div className="ml-3 text-sm font-medium text-content">
                  Recibir notificaciones por correo
                </div>
              </label>
            </div>
          </div>

          {/* Botón de Guardar */}
          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              onClick={handleSubmit}
              className="px-6 py-3 bg-button text-white rounded-lg font-medium hover:bg-button-on transition-colors shadow-md"
            >
              Guardar cambios
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default MenuSettings;
