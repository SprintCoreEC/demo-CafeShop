import React from "react";
import {
  FaCoffee,
  FaClock,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa";
import { motion } from "framer-motion";
import cafeimg from "../../assets/cafefondo.webp";
import person from "../../assets/person.jpg";
import ubication from "../../assets/ubicacion.jpeg";
import logo from "../../assets/logoCafe.webp";
import Footer from "../../components/WebParts/Footer";
import FeedbackSection from "../../components/Sections/FeedbackSection";
import ContactUs from "../../components/Sections/ContactUs";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Carlos Rodríguez",
      role: "Fundador",
      image: person,
      delay: 0.1,
    },
    {
      name: "María Rodríguez",
      role: "Vendedora",
      image: person,
      delay: 0.2,
    },
    {
      name: "Javier Morales",
      role: "Desarrollador",
      image: person,
      delay: 0.3,
    },
  ];

  const scheduleItems = [
    { days: "Lunes - Viernes", hours: "7:00 AM - 8:00 PM" },
    { days: "Sábado", hours: "8:00 AM - 9:00 PM" },
    { days: "Domingo", hours: "9:00 AM - 6:00 PM" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[70vh]">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <img
          src={cafeimg}
          alt="Tienda"
          className="w-full h-full object-cover"
        />
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Nuestra Tienda
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-white max-w-2xl"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Calidad y confianza desde 2024
          </motion.p>
        </motion.div>
      </section>

      {/* Quienes somos */}
      <section className="w-full py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-title text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            ¿Quiénes somos?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6 text-lg text-content"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p>
                Nuestra tienda nace de la pasión por ofrecer una experiencia de
                compra simple, confiable y de alta calidad. Fundada en 2024,
                rápidamente se ha convertido en un lugar ideal para quienes
                buscan buenos productos, atención cercana y una experiencia
                agradable.
              </p>
              <p>
                Nos enorgullece ofrecer una selección cuidadosamente curada de
                productos, junto con accesorios y complementos para el día a día.
                Nuestro compromiso es brindar a nuestros clientes una experiencia
                excelente, donde la calidad y el buen servicio se encuentren.
              </p>
            </motion.div>
            <motion.div
              className="relative h-80 md:h-96 overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <img
                alt="Logo"
                className="w-full h-full object-cover transition-transform duration-500"
                src={logo}
              />
            </motion.div>
          </div>
        </div>
      </section>

      <hr className="max-w-6xl mx-auto w-full border-t border-lines" />

      {/* Equipo */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl font-bold mb-12 text-center text-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Nuestro equipo
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: member.delay }}
              viewport={{ once: true }}
            >
              <div className="relative h-64 w-64 mx-auto mb-6 rounded-full overflow-hidden border-4 border-bg2 shadow-lg">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="text-2xl font-bold text-subtitle mb-2">
                {member.name}
              </h3>
              <p className="text-content font-medium">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <hr className="max-w-6xl mx-auto w-full border-t border-lines" />

      {/* Location and Hours */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl font-bold mb-12 text-center text-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Ubicación y horarios
          </motion.h2>
          <div className="flex flex-col md:flex-row gap-8 items-stretch">
            {/* Sección de información */}
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="bg-white p-8 rounded-xl shadow-lg h-full">
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 flex items-center text-subtitle">
                    <FaMapMarkerAlt className="mr-3 h-6 w-6 text-icons" />
                    Dirección
                  </h3>
                  <p className="text-content pl-9">
                    123 Calle Principal, Ciudad, País
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center text-subtitle">
                    <FaClock className="mr-3 h-6 w-6 text-icons" />
                    Horarios
                  </h3>
                  <ul className="space-y-3 text-content">
                    {scheduleItems.map((item, index) => (
                      <li key={index} className="flex justify-between pl-9">
                        <span className="font-medium">{item.days}</span>
                        <span>{item.hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Sección del mapa */}
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="relative h-full min-h-[300px] rounded-xl overflow-hidden shadow-lg border border-lines">
                <iframe
                  title="Ubicación de la tienda"
                  className="w-full h-full"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.21557405404!2d-73.9878449240171!3d40.74844047138972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1711047890123"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <hr className="max-w-6xl mx-auto w-full border-t border-lines" />

      {/* Contact */}
      <ContactUs />
      <hr className="max-w-6xl mx-auto w-full border-t border-lines" />

      {/* Feedback */}
      <FeedbackSection />

      {/* Footer */}
      <Footer className="bg-footerbg text-white py-12 px-4" />
    </div>
  );
};

export default AboutUs;
