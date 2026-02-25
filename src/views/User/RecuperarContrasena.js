import React, { useState } from 'react';
import { FiMail, FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import bgimagen from "../../assets/bglogin.jpg";

function RecuperarContrasena() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email) {
      toast.error('Por favor, ingresa tu correo electrónico.');
      setIsLoading(false);
      return;
    }

    if (!isValidEmail(email)) {
      toast.error('Por favor, ingresa un correo electrónico válido.');
      setIsLoading(false);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Se envió un enlace de recuperación a tu correo.');
      setEmail('');
    } catch (error) {
      console.error("Error al enviar correo de recuperación:", error);
      if (error.code === "auth/user-not-found") {
        toast.error("No se encontró un usuario con ese correo.");
      } else {
        toast.error("Ocurrió un error al enviar el correo de recuperación.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-bg">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${bgimagen})`,
        }}
      ></div>
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
      
      <div className="w-full max-w-md bg-box rounded-lg shadow-lg p-8 relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-button hover:text-button-on mb-4 transition duration-300"
        >
          <FiArrowLeft className="mr-2" />
          <span>Volver</span>
        </button>

        <h2 className="text-2xl font-bold text-center mb-4 text-title">
          Recuperar contraseña
        </h2>
        <p className="text-center text-content mb-6">
          Ingresa tu correo electrónico para recibir un enlace de recuperación
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <FiMail className="absolute left-3 top-3 text-icons" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full pl-10 py-2 border border-lines rounded-lg focus:outline-none focus:ring-2 focus:ring-icons-on"
              placeholder="Correo electrónico"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-button text-white font-semibold rounded-lg shadow-md border-2 border-button hover:bg-white hover:text-button transition duration-300 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
              </>
            ) : (
              'Enviar enlace de recuperación'
            )}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default RecuperarContrasena;