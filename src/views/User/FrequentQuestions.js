import React from "react";
import {
  FaCoffee,
  FaQuestionCircle,
  FaEnvelope,
  FaChevronDown,
} from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import Footer from "../../components/WebParts/Footer";
import image from "../../images/questions2.jpg";

const FrequentQuestions = () => {
  const [openQuestion, setOpenQuestion] = React.useState(null);

  const faqCategories = [
    {
      title: "Información General",
      id: "cat1", // Añadido ID para categoría
      questions: [
        {
          question: "¿Cuáles son los horarios de la tienda?",
          id: "cat1-q1", // Añadido ID único para pregunta
          answer: (
            <>
              <p className="py-2">Nuestro horario es:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Lunes a Viernes: 7:00 AM - 8:00 PM</li>
                <li>Sábados: 8:00 AM - 9:00 PM</li>
                <li>Domingos: 9:00 AM - 6:00 PM</li>
              </ul>
              <p className="py-2">
                En feriados, el horario puede variar. Te recomendamos revisar
                nuestras redes sociales para información actualizada.
              </p>
            </>
          ),
        },
        {
          question: "¿Dónde están ubicados?",
          id: "cat1-q2",
          answer:
            "Estamos ubicados en Calle Principal 123, Ciudad, CP 12345. Contamos con estacionamiento gratuito para nuestros clientes y estamos a solo dos cuadras de la estación central del metro.",
        },
        {
          question: "¿Tienen WiFi gratis?",
          id: "cat1-q3",
          answer:
            "Sí, ofrecemos WiFi gratuito para todos nuestros clientes. La contraseña está en tu recibo o puedes solicitarla a cualquier miembro de nuestro equipo.",
        },
      ],
    },
    {
      title: "Productos y Catálogo",
      id: "cat2",
      questions: [
        {
          question: "¿Qué tipo de productos ofrecen?",
          id: "cat2-q1",
          answer: (
            <>
              <p className="mb-2">
                Ofrecemos una amplia variedad de productos, incluyendo:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Artículos destacados y novedades</li>
                <li>Productos por categorías y colecciones</li>
                <li>Opciones por temporada y ediciones especiales</li>
                <li>Accesorios y complementos</li>
              </ul>
              <p className="mt-2">
                La disponibilidad puede variar según la temporada y el stock.
              </p>
            </>
          ),
        },
        {
          question:
            "¿Tienen opciones para personas con restricciones o preferencias?",
          id: "cat2-q2",
          answer:
            "Sí, contamos con opciones pensadas para diferentes necesidades y preferencias. En cada producto podrás ver su descripción y características. Si necesitas ayuda, nuestro equipo estará encantado de orientarte.",
        },
        {
          question: "¿Venden productos para compra en línea y retiro?",
          id: "cat2-q3",
          answer:
            "Sí, puedes comprar en línea y elegir entrega a domicilio o retiro (si está disponible). Durante el proceso de compra verás las opciones disponibles según tu ubicación.",
        },
      ],
    },
    {
      title: "Servicios",
      id: "cat3",
      questions: [
        {
          question: "¿Es posible reservar o agendar una atención?",
          id: "cat3-q1",
          answer:
            "Sí, podemos coordinar reservas o atención para grupos o necesidades específicas, dependiendo de la disponibilidad. Puedes contactarnos por teléfono o mediante nuestro sitio web. Para solicitudes especiales, recomendamos hacerlo con al menos 48 horas de anticipación.",
        },
        {
          question: "¿Ofrecen servicios para empresas o eventos?",
          id: "cat3-q2",
          answer:
            "Sí, ofrecemos opciones para empresas y eventos como compras al por mayor, paquetes especiales y atención personalizada. Contáctanos para más información y una cotización a medida.",
        },
        {
          question: "¿Realizan talleres o demostraciones?",
          id: "cat3-q3",
          answer:
            "Sí, organizamos talleres y demostraciones de forma periódica. Consulta nuestro calendario en redes sociales o suscríbete a nuestro boletín para recibir novedades.",
        },
      ],
    },
    {
      title: "Políticas",
      id: "cat4",
      questions: [
        {
          question: "¿Qué métodos de pago aceptan?",
          id: "cat4-q1",
          answer:
            "Aceptamos efectivo, las principales tarjetas de crédito y débito, y pagos móviles como Apple Pay y Google Pay (según disponibilidad).",
        },
        {
          question: "¿Tienen programa de fidelización?",
          id: "cat4-q2",
          answer:
            "Sí, contamos con un programa de fidelización que te permite acumular beneficios con cada compra. Además, los miembros reciben ofertas especiales y acceso anticipado a novedades. Puedes registrarte al finalizar tu compra o desde nuestra app/sitio.",
        },
        {
          question: "¿Puedo traer mi propio empaque o bolsa reutilizable?",
          id: "cat4-q3",
          answer:
            "¡Claro! Promovemos el uso de opciones reutilizables para reducir residuos. En algunos casos, podríamos ofrecer beneficios o descuentos por traer tu propia bolsa o empaque, según las condiciones vigentes.",
        },
      ],
    },
  ];

  const toggleQuestion = (id) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section con imagen */}
      <section className="relative w-full h-[60vh] md:h-[70vh]">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
        <img
          src={image}
          alt="Imagen de preguntas frecuentes"
          className="w-full h-full object-cover"
        />
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-blank mb-4 drop-shadow-lg"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Preguntas Frecuentes
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-blank max-w-2xl"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Respuestas a las dudas más comunes sobre nuestra tienda
          </motion.p>
        </motion.div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 px-4 md:px-8 max-w-4xl mx-auto w-full">
        <div className="grid gap-8">
          {faqCategories.map((category, catIndex) => (
            <motion.div
              key={category.id} // Usamos el ID de categoría como key
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-6 text-subtitle border-b border-lines pb-2">
                {category.title}
              </h2>
              <div className="space-y-4">
                {category.questions.map((item) => (
                  <motion.div
                    key={item.id} // Usamos el ID de pregunta como key
                    whileHover={{ y: -2 }}
                    className="group"
                  >
                    <div
                      className="overflow-hidden rounded-lg shadow-sm group-hover:shadow-md transition-all duration-300 cursor-pointer"
                      onClick={() => toggleQuestion(item.id)} // Pasamos el ID único
                    >
                      <div className="flex justify-between items-center p-4 bg-blank">
                        <span className="font-medium text-content group-hover:text-subtitle transition-colors">
                          {item.question}
                        </span>
                        <motion.div
                          animate={{
                            rotate: openQuestion === item.id ? 180 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <FaChevronDown className="w-5 h-5 text-icons" />
                        </motion.div>
                      </div>

                      <AnimatePresence>
                        {openQuestion === item.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="bg-blank overflow-hidden"
                          >
                            <div className="px-4 pb-4 text-content">
                              {item.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </div>
              {catIndex < faqCategories.length - 1 && (
                <hr className="my-8 border-t border-lines" />
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      {/* <motion.section
        className="py-36 px-4 md:px-8 border-t border-lines"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-box border border-lines shadow-lg rounded-xl overflow-hidden">
            <div className="p-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-subtitle">
                ¿No encontraste lo que buscabas?
              </h2>
              <p className="mb-8 text-content max-w-2xl mx-auto">
                Si tienes alguna pregunta que no ha sido respondida aquí, no
                dudes en contactarnos directamente.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center bg-blank justify-center px-6 py-3 border border-subtitle text-subtitle rounded-full hover:bg-subtitle hover:text-blank transition-all duration-300"
                >
                  <FaEnvelope className="mr-2" />
                  Envíanos un Email
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center px-6 py-3 bg-subtitle text-blank rounded-full hover:bg-subtitle-on transition-all duration-300"
                >
                  <FaCoffee className="mr-2" />
                  Visítanos
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.section> */}

      {/* Footer */}
      <Footer className="bg-footerbg text-blank py-12 px-4" />
    </div>
  );
};

export default FrequentQuestions;
