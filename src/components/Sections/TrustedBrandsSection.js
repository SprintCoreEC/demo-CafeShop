import React from "react";
import { motion } from "framer-motion";
import ActionButton from "../General/ActionButton";

const TrustedBrandsSection = () => {
  const brands = [
    {
      name: "Starbucks",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/800px-Starbucks_Corporation_Logo_2011.svg.png",
    },
    {
      name: "Nespresso",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Nespresso_logo_%28monogram_%2B_wordmark%29.svg",
    },
    {
      name: "Minerva",
      logo: "https://cafeminerva.com.ec/wp-content/uploads/2022/11/logoproximamente.png",
    },
    {
      name: "Sweet and Coffe",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/9f/SweetCoffee.jpg",
    },
    {
      name: "Nescafe",
      logo: "https://logowik.com/content/uploads/images/508_nescafe.jpg",
    }
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-t from-bg2 to-box">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-title mb-4">
            Marcas que confían en nosotros
          </h2>
          <p className="text-lg text-content max-w-2xl mx-auto">
            Empresas líderes que utilizan nuestros productos para ofrecer la mejor experiencia
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {brands.map((brand, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`bg-white p-6 rounded-xl shadow-xs grayscale hover:grayscale-0 transition-all duration-300 flex items-center justify-center ${brand.color} bg-opacity-10 hover:bg-opacity-20`}
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-10 md:h-14 object-contain transition-all duration-500 hover:-translate-y-1"
                title={brand.name}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <ActionButton variant="expand" href={"/"}>Conviértete en un socio</ActionButton>

        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBrandsSection;