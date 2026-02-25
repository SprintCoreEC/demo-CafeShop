import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-bg2 py-12 border-t border-blank text-subtitle w-full h-full pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Mi Tienda Demo</h3>
            <p className="text-sm ">
              Tu descripción para describir la calidad de tu tienda con los
              mejores precios y promociones.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook">
                <FaFacebookF className="h-5 w-5 hover:text-blue-500 transition" />
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram className="h-5 w-5 hover:text-pink-500 transition" />
              </a>
              <a href="#" aria-label="Twitter">
                <FaTwitter className="h-5 w-5 hover:text-blue-400 transition" />
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Links Rápidos</h3>
            <ul className="space-y-2  font-semibold ">
              <li>
                <a
                  href="/home"
                  className="group relative inline-block text-smtransition-all duration-300 pb-1"
                >
                  <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-footerbg transition-all duration-500 group-hover:w-full"></span>
                  <span className="relative z-10 group-hover:text-footerbg">
                    Inicio
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="group relative inline-block text-sm transition-all duration-300 pb-1"
                >
                  <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-footerbg transition-all duration-500 group-hover:w-full"></span>
                  <span className="relative z-10 group-hover:text-footerbg">
                    Tienda
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="group relative inline-block text-sm transition-all duration-300 pb-1"
                >
                  <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-footerbg transition-all duration-500 group-hover:w-full"></span>
                  <span className="relative z-10 group-hover:text-footerbg">
                    Sobre Nosotros
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="/questions"
                  className="group relative inline-block text-sm transition-all duration-300 pb-1"
                >
                  <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-footerbg transition-all duration-500 group-hover:w-full"></span>
                  <span className="relative z-10 group-hover:text-footerbg">
                    Preguntas Frecuentes
                  </span>
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contáctanos</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm">
                <FaPhone className="h-4 w-4" />
                <span>+593 95 921 8750</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <FaEnvelope className="h-4 w-4" />
                <span>demo@sprintcore.ec</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <FaMapMarkerAlt className="h-4 w-4 mt-0.5" />
                <span>Ambato, Ecuador</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Subscríbete</h3>
            <p className="text-sm">Recibe nuestras últimas ofertas y noticias.</p>
            <div className="w-full max-w-sm space-y-2">
              <form className="flex space-x-2">
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Ingresa tu email"
                  type="email"
                />
                <button className="inline-flex hover:text-blank text-footerbg items-center justify-center rounded-md text-sm font-medium hover:bg-footerbg bg-blank h-10 px-4 py-2 transition-color duration-300">
                  Registrarse
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-blank">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} SprintCore. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 md:justify-end">
              <a
                href="/"
                className="text-sm hover:text-footerbg transition"
              >
                Términos y Condiciones
              </a>
              <a
                href="/"
                className="text-sm hover:text-footerbg transition"
              >
                Política de Privacidad
              </a>
              <a
                href="/"
                className="text-sm hover:text-footerbg transition"
              >
                Información de Envíos
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
