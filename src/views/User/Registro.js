import React, { useState } from 'react';
import { FiUser, FiMail, FiLock, FiPhone, FiUpload, FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerUser } from '../../services/authService';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import bgimagen from "../../assets/bglogin.jpg";

function Registro() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !lastName) {
      toast.error("El nombre y el apellido son obligatorios");
      return;
    }

    if (!email || !validateEmail(email)) {
      toast.error("Ingrese un correo electrónico válido");
      return;
    }

    if (password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (!phone) {
      toast.error("Por favor ingrese un número telefónico");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      toast.success("Usuario creado correctamente");

      const formData = new FormData();
      formData.append("name", nombre);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      await registerUser(formData);

      toast.success("Registro completo. Redirigiendo...");
      navigate("/profile");
    } catch (error) {
      console.error("Error al registrar:", error);
      toast.error(error.message || "Error durante el registro.");
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
          Crear una cuenta
        </h2>
        <p className="text-center text-content mb-6">
          Ingresa tus datos para registrarte
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <FiUser className="absolute left-3 top-3 text-icons" />
              <input
                id="nombre"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full pl-10 py-2 border border-lines rounded-lg focus:outline-none focus:ring-2 focus:ring-icons-on"
                placeholder="Nombre"
              />
            </div>
            <div className="relative flex-1">
              <FiUser className="absolute left-3 top-3 text-icons" />
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full pl-10 py-2 border border-lines rounded-lg focus:outline-none focus:ring-2 focus:ring-icons-on"
                placeholder="Apellido"
              />
            </div>
          </div>
          
          <div className="relative">
            <FiMail className="absolute left-3 top-3 text-icons" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 py-2 border border-lines rounded-lg focus:outline-none focus:ring-2 focus:ring-icons-on"
              placeholder="Correo electrónico"
            />
          </div>
          
          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-icons" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 py-2 border border-lines rounded-lg focus:outline-none focus:ring-2 focus:ring-icons-on"
              placeholder="Contraseña"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-icons hover:text-icons-on focus:outline-none"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          
          <div className="relative">
            <FiPhone className="absolute left-3 top-3 text-icons" />
            <input
              id="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full pl-10 py-2 border border-lines rounded-lg focus:outline-none focus:ring-2 focus:ring-icons-on"
              placeholder="Teléfono"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-content mb-2" htmlFor="profileImage">
              Imagen de perfil
            </label>
            <div className="flex items-center space-x-4">
              <div className="h-20 w-20 rounded-full bg-lines flex items-center justify-center overflow-hidden">
                {profileImage ? (
                  <img
                    src={URL.createObjectURL(profileImage)}
                    alt="Imagen de perfil"
                    className="object-cover h-full w-full"
                  />
                ) : (
                  <FiUser className="text-icons-off text-3xl" />
                )}
              </div>
              <label className="flex-1 flex items-center justify-center cursor-pointer bg-button-off border border-lines rounded-lg px-4 py-2 hover:bg-lines transition duration-300">
                <FiUpload className="mr-3 text-icons" />
                <span className="text-content">Subir imagen</span>
                <input
                  id="profileImage"
                  type="file"
                  onChange={handleImageChange}
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full py-2 bg-button text-white font-semibold rounded-lg shadow-md border-2 border-button hover:bg-white hover:text-button transition duration-300"
          >
            Registrarse
          </button>
        </form>
        
        <div className="text-center mt-4">
          <p className="text-sm text-content">
            ¿Ya tienes una cuenta?{' '}
            <Link
              to="/login"
              className="text-button font-semibold hover:text-button-on transition duration-300"
            >
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Registro;