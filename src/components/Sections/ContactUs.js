import React from "react";
import {
  FaPhone,
  FaEnvelope,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaArrowRight,
} from "react-icons/fa";
import { motion } from "framer-motion";
import ActionButton from "../General/ActionButton";

const ContactUs = () => {
  const contactMethods = [
    {
      icon: <FaPhone className="h-10 w-10 text-icons hover:text-icons-on" />,
      title: "Phone",
      content: "+593 95 921 8750",
      animation: { y: 0, opacity: 1 },
    },
    {
      icon: <FaEnvelope className="h-10 w-10 text-icons hover:text-icons-on" />,
      title: "Email",
      content: "soporte@sprintcore.ec",
      animation: { y: 0, opacity: 1 },
    },
    {
      icon: (
        <div className="flex gap-4 text-icons">
          <FaInstagram className="h-10 w-10 hover:text-icons-on transition-colors" />
          <FaFacebookF className="h-10 w-10 hover:text-icons-on transition-colors" />
          <FaTwitter className="h-10 w-10 hover:text-icons-on transition-colors" />
        </div>
      ),
      title: "Social Network",
      content: "@Sprintcore",
      animation: { y: 0, opacity: 1 },
    },
  ];

  return (
    <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
      <motion.h2
        className="text-3xl font-bold mb-12 text-center text-title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Contáctanos
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-32 mb-12">
        {contactMethods.map((method, index) => (
          <motion.div
            key={index}
            className="text-center bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <div className="flex justify-center mb-4">{method.icon}</div>
            <h3 className="text-xl font-bold mb-2 text-subtitle">
              {method.title}
            </h3>
            <p className="text-content">{method.content}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        viewport={{ once: true }}
      >
        <ActionButton
          variant="right"
          className="cursor-pointer text-center items-center"
        >
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center">
              Seguir comprando
            </div>
            <FaArrowRight className="group-hover:translate-x-1 transition-transform ml-2" />
          </div>
        </ActionButton>
      </motion.div>
    </section>
  );
};

export default ContactUs;
