import { IoStarOutline } from "react-icons/io5";

import { LiaShippingFastSolid } from "react-icons/lia";
import { CiCreditCard1 } from "react-icons/ci";
import { FaRegCreditCard } from "react-icons/fa6";
import { LiaCertificateSolid } from "react-icons/lia";
import { TbShieldCheck } from "react-icons/tb";
import { BiHomeHeart } from "react-icons/bi";
import { GiSteamBlast } from "react-icons/gi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import logo from "../../assets/logoCafe.webp";
import perfil from "../../assets/perfil.jpeg";
import img3 from "../../images/slider.jpg";
import img2 from "../../images/slider1.jpg";
import img1 from "../../images/slider2.jpg";
import sectionbg from "../../images/coffe.jpg";
import xample from "../../assets/example.png";
import zapato from "../../assets/Cafe.jpg";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import FeatureCard from "../../components/Shopping/Cart/FeatureCard";
import ReviewSection from "../../components/Sections/ReviewSection";
import Footer from "../../components/WebParts/Footer";
import { Fade, Slide, Zoom } from "react-reveal";
import ActionButton from "../../components/General/ActionButton";
import { useEffect } from "react";
import TrustedBrandsSection from "../../components/Sections/TrustedBrandsSection";

export default function Landing() {
  const { ref: pedidosRef, inView: pedidosInView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const { ref: productosRef, inView: productosInView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const { ref: clientesRef, inView: clientesInView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const images = [img1, img2, img3];

  const features = [
    {
      icon: LiaShippingFastSolid,
      title: "Envíos a todo el Ecuador",
      description:
        "Lleva tus productos favoritos a cualquier rincón del país de forma rápida y segura.",
    },
    {
      icon: FaRegCreditCard,
      title: "Elige tu forma de pago",
      description:
        "Aceptamos una variedad de métodos de pago para tu comodidad y tranquilidad.",
    },
    {
      icon: LiaCertificateSolid,
      title: "Artículos de calidad",
      description:
        "Ofrecemos productos de importación que aseguran un 100% calidad y durabilidad.",
    },
    {
      icon: TbShieldCheck,
      title: "Confiables y seguros",
      description:
        "Protegemos tus compras y datos personales con protocolos de seguridad de última generación.",
    },
    {
      icon: BiHomeHeart,
      title: "Compra desde tu hogar",
      description:
        "Realiza tus compras de forma fácil y rápida desde la comodidad de tu hogar.",
    },
    {
      icon: GiSteamBlast,
      title: "Nuevos productos",
      description:
        "Nuestro catálogo se renueva constantemente para ofrecerte lo último en tendencias.",
    },
  ];

  const reviews = [
    {
      name: "Juan Pérez",
      avatar: perfil,
      comment:
        "Es el mejor producto que pude haber encontrado y al mejor precio.",
      rating: 4,
    },
    {
      name: "Ana García",
      avatar: perfil,
      comment:
        "El envío fue rápido y eficiente, el producto llegó en buen estado. Totalmente recomendado!",
      rating: 3,
    },
    {
      name: "Carlos Gómez",
      avatar: perfil,
      comment:
        "Excelente servicio, sobre todo su calidad. Muy feliz por la compra!",
      rating: 5,
    },
    {
      name: "María Rodríguez",
      avatar: perfil,
      comment:
        "Esta tienda es genial, siempre encuentro una gran variedad de productos.",
      rating: 4,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <div className="relative h-screen overflow-hidden">
          {/* Carrusel */}
          <div className="absolute inset-0 z-0">
            <Carousel
              infiniteLoop={true}
              autoPlay={true}
              interval={8000}
              showThumbs={false}
              showStatus={false}
              showArrows={false}
              stopOnHover={false}
              transitionTime={2000}
              showIndicators={false}
              swipeable={false}
              animationHandler="fade"
            >
              {images.map((image, index) => (
                <div key={index}>
                  <div
                    className="w-full h-screen bg-cover bg-center"
                    style={{ backgroundImage: `url(${image})` }}
                  />
                </div>
              ))}
            </Carousel>
          </div>

          {/* Bienvenida */}
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <Fade bottom>
              <div className="text-center px-4 w-full">
                <div className="container mx-auto px-4 md:px-6 text-center">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6 text-white drop-shadow-lg">
                    Compra los mejores productos<br /> en un solo lugar
                  </h2>
                  <p className="mb-8 text-lg md:text-xl font-semibold max-w-2xl mx-auto text-white drop-shadow-md">
                    Exprola nuestra colección completa y encuentra los mejores
                    productos y ofertas en el mercado con la certificación del 100%
                    en la mejor calidad del mercado.
                  </p>
                  <ActionButton variant="down" href={"/"}>Ir a la Tienda</ActionButton>
                </div>
              </div>
            </Fade>
          </div>
          {/* Degradado negro */}
          <div className="absolute bottom-0 left-0 right-0 h-[50%] bg-gradient-to-t from-black/70 to-transparent"></div>
          {/* Desliza hacia abajo */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center">
            <div className="text-white text-sm mb-1 opacity-80 animate-bounce cursor-default">
              desliza hacia abajo
            </div>
            <div className="animate-bounce">
              <svg
                className="w-6 h-6 text-white opacity-80"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Sección de características */}
        <section className="w-full py-20 md:py-24">
          <div className="container mx-auto p-4 sm:px-8 md:px-12 lg:px-16">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-center text-title mb-12">
              Por qué escogernos?
            </h2>
            <p className="text-center text-content font-semibold mb-16 px-20 md:px-32 lg:px-64">
              La mejor experiencia en solo nuestra tienda. Descubre todos nuestros <br/>
              servicios pensados en el confort, seguridad y velocidad para ti..
            </p>
            <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-6xl">
              {features.map((feature, index) => (
                <Zoom>
                  <FeatureCard
                    key={index}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                  />
                </Zoom>
              ))}
            </div>
          </div>
        </section>
        {/* Sección de estadísticas */}
        <section
          className="w-full py-12 md:py-24 lg:py-32 relative min-h-[500px]"
          style={{
            backgroundImage: `url(${sectionbg})`,
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Capa de superposición oscura para mejor legibilidad */}
          <div className="absolute inset-0 bg-black/30"></div>

          {/* Contenido */}
          <div className="container mx-auto px-4 md:px-6 relative z-10 h-full">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-white">
            Crecemos cada día un poco más gracias a ti
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div ref={pedidosRef} className="text-white">
                <h3 className="text-4xl font-bold text-white">
                  {pedidosInView && (
                    <CountUp start={0} end={5000} duration={3} separator="," />
                  )}
                </h3>
                <p className="mt-2">Ordednes entregadas</p>
              </div>

              <div ref={productosRef} className="text-white">
                <h3 className="text-4xl font-bold text-white">
                  {productosInView && (
                    <CountUp start={0} end={1200} duration={3} separator="," />
                  )}
                </h3>
                <p className="mt-2">Productos disponibles</p>
              </div>

              <div ref={clientesRef} className="text-white">
                <h3 className="text-4xl font-bold text-white">
                  {clientesInView && (
                    <CountUp start={0} end={300} duration={3} separator="," />
                  )}
                </h3>
                <p className="mt-2">Clientes satisfechos</p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full pt-16 md:pt-24 md:px-[12%] bg-bg">
          <ReviewSection reviews={reviews} />
        </section>

        <section className="w-full bg-bg">
        <TrustedBrandsSection />
        </section>

        {/* <section className="w-full py-12 md:py-18 lg:py-24 mb-16 bg-bg">
          <BrandsSection brands={brands} />
        </section> */}

        <section className="w-full bg-bg">
          <Footer />
        </section>
      </main>
    </div>
  );
}
