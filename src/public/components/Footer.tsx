/**
 * Footer component for the CIVA Bus Management System.
 * Displays company information, contact details, and copyright notice.
 * Uses responsive design with Tailwind CSS classes.
 * 
 * @returns TSX element representing the application footer
 */
export const Footer = () => (
  <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="h-8 px-4 bg-[#512E8A] text-white rounded-md font-bold text-lg flex items-center">
                CIVA
              </div>
              <span className="text-lg font-semibold text-gray-900">Sistema de Gestión de Buses</span>
            </div>
            <p className="text-gray-600 text-base lg:text-lg max-w-lg">
              Prueba de Evaluación Técnica para CIVA Transportation. Desarrollado por Ethan Aliaga.
            </p>
            
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Contactame
            </h3>
            <div className="space-y-4">
              <div className="flex items-center text-gray-600 text-base">
                <svg className="h-5 w-5 mr-3 text-[#512E8A] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+51 980 805 285</span>
              </div>
              
              <div className="flex items-center text-gray-600 text-base">
                <svg className="h-5 w-5 mr-3 text-[#512E8A] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>ethan.aliaga@gmail.com</span>
              </div>
              
              <div className="flex items-start text-gray-600 text-base">
                <svg className="h-5 w-5 mr-3 mt-0.5 text-[#512E8A] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Lima, Peru</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 py-6 lg:py-8">
        <div className="flex flex-col justify-between items-center space-y-4 lg:space-y-0">
          <div className="flex flex-col items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <p className="text-gray-500 text-base">
              &copy; {new Date().getFullYear()} CIVA Transporte y Turismo Lima. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
);