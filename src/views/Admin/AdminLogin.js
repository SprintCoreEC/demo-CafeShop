import React, { useState } from 'react';
import { FiUser, FiLock, FiEye, FiEyeOff, FiInfo, FiShield, FiArrowLeft } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth, db } from "../../utils/firebase";
import { doc, getDoc } from 'firebase/firestore';
import CustomCheckbox from '../../components/General/CustomCheckbox ';

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!email || !password) {
      toast.error('Por favor, completa todos los campos.');
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const adminDocRef = doc(db, "admins", user.uid);
      const adminDoc = await getDoc(adminDocRef);

      if (!adminDoc.exists() || adminDoc.data().role !== "admin") {
        toast.error("Acceso denegado. Este usuario no es administrador.");
        setIsLoading(false);
        return;
      }

      toast.success("Inicio de sesión exitoso!");
      navigate("/admin-new");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      let message = "Error al iniciar sesión.";
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        message = "Correo o contraseña incorrectos.";
      } else if (error.code === "auth/too-many-requests") {
        message = "Demasiados intentos fallidos. Intenta más tarde.";
      }
      toast.error(message);
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      toast.warning("Por favor, ingresa tu correo electrónico para recuperar la contraseña.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("📧 Se envió un enlace de recuperación a tu correo.");
    } catch (error) {
      console.error("Error al enviar correo de recuperación:", error);
      toast.error("Hubo un problema al intentar enviar el correo de recuperación.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-blank rounded-xl shadow-xl overflow-hidden"
      >
        {/* Header con gradiente */}
        <div className="bg-gradient-to-r from-subtitle to-title p-6 text-center">
          <motion.div 
            className="flex items-center justify-center text-blank"
          >
            <FiShield className="text-3xl mr-3" />
            <h1 className="text-2xl font-bold">Panel de Administración</h1>
          </motion.div>
          <p className="text-sm text-amber-100 mt-2">
            Acceso restringido solo para personal autorizado
          </p>
        </div>

        {/* Alerta informativa */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-start bg-amber-50 text-amber-800 border-l-4 border-amber-600 p-4 mx-6 mt-6 rounded-lg"
        >
          <FiInfo className="text-xl mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h2 className="font-semibold">Acceso Seguro</h2>
            <p className="text-sm">
              Todas las actividades son registradas y monitoreadas por seguridad.
            </p>
          </div>
        </motion.div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <FiUser className="absolute left-3 top-4 text-subtitle" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 py-3 border border-lines rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Correo electrónico"
              autoComplete="username"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="relative"
          >
            <FiLock className="absolute left-3 top-4 text-subtitle" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 py-3 border border-lines rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Contraseña"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-4 text-subtitle hover:text-amber-700 focus:outline-none"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-between"
          >
            <CustomCheckbox
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              label="Recuérdame"
            />
            <button
              type="button"
              onClick={handlePasswordReset}
              className="text-sm text-button hover:text-button-on transition duration-300"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 bg-button-off text-subtitle border border-border font-semibold rounded-lg shadow-md hover:bg-button-on hover:text-blank transition duration-300 flex items-center justify-center ${isLoading ? 'opacity-70' : ''}`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blank" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Procesando...
                </>
              ) : 'Login'}
            </button>
          </motion.div>
        </form>

        {/* Footer del card */}
        <div className="bg-gray-50 px-6 py-4 border-t border-lines text-center">
          <Link 
            to="/" 
            className="inline-flex items-center text-subtitle hover:text-button transition duration-300"
          >
            <FiArrowLeft className="mr-2" />
            Volver al sitio principal
          </Link>
        </div>
      </motion.div>

      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default AdminLogin;