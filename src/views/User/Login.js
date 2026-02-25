import React, { useState } from "react";
import { FiUser, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase";
import bgimagen from "../../assets/bglogin.jpg";
import logo from "../../assets/logoCafe.webp"; // Asegúrate de tener un logo adecuado

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      toast.error("Por favor complete todos los campos.");
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      toast.success("Inicio de sesión exitoso!");
      console.log("Usuario autenticado:", user);

      navigate("/profile");
    } catch (error) {
      console.error("Error iniciando sesión:", error);
      let message = "Error iniciando sesión.";

      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        message = "Correo o contraseña incorrectos.";
      } else if (error.code === "auth/too-many-requests") {
        message = "Demasiados intentos fallidos. Intenta más tarde.";
      }

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-bg">
      {/* Fondo con imagen y overlay */}
      <div
        className="fixed inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${bgimagen})` }}
      ></div>
      <div className="fixed inset-0 bg-black bg-opacity-60 z-0"></div>

      {/* Contenido principal */}
      <div className="w-full max-w-md bg-box rounded-xl shadow-xl p-8 relative z-10 mx-4">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="h-16" />
        </div>

        {/* Títulos */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-title mb-2">Bienvenido</h1>
          <p className="text-content">Ingresa tus credenciales para continuar</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Campo Email */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiUser className="h-5 w-5 text-icons" />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-box border border-lines rounded-lg focus:outline-none focus:ring-2 focus:ring-icons-on focus:border-transparent transition-all"
              placeholder="Correo electrónico"
              disabled={isLoading}
            />
          </div>

          {/* Campo Contraseña */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiLock className="h-5 w-5 text-icons" />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-box border border-lines rounded-lg focus:outline-none focus:ring-2 focus:ring-icons-on focus:border-transparent transition-all"
              placeholder="Contraseña"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-icons hover:text-icons-on transition-colors"
            >
              {showPassword ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
            </button>
          </div>

          {/* Recordar y olvidar contraseña */}
          <div className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="form-checkbox h-4 w-4 text-button rounded border-lines focus:ring-icons-on"
              />
              <span className="ml-2 text-sm text-content">Recordar sesión</span>
            </label>
            <Link
              to="/recuperar-contrasena"
              className="text-sm text-button hover:text-button-on transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          {/* Botón de envío */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 bg-button text-white font-medium rounded-lg shadow-md hover:bg-button-on transition-colors duration-300 flex items-center justify-center ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Iniciando sesión...
              </>
            ) : (
              <>
                Iniciar sesión
                <FiArrowRight className="ml-2" />
              </>
            )}
          </button>
        </form>

        {/* Registro */}
        <div className="mt-6 text-center">
          <p className="text-sm text-content">
            ¿No tienes una cuenta?{" "}
            <Link
              to="/registro"
              className="text-button font-medium hover:text-button-on transition-colors"
            >
              Regístrate ahora
            </Link>
          </p>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Login;