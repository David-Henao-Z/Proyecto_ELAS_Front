import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { Button } from '../components/atoms';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 6; // Total de grupos de 3 slides

  // Redirigir al dashboard si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: "url('/images/Fondo.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay para mejorar legibilidad */}
      <div className="absolute inset-0 bg-elas-navy/10"></div>
      
      {/* Navigation */}
      <nav className="relative z-10 bg-white/90 backdrop-blur-md border-b border-elas-blue/30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  src="/images/logo.png"
                  alt="ELAS Logo"
                  className="h-12 w-auto"
                />
              </div>
              <div className="ml-4">
                <h1 className="text-xl font-bold text-elas-navy font-heading">ELAS</h1>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/" className="text-elas-navy hover:text-elas-blue px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Inicio
                </Link>
                <Link to="/nosotras" className="text-elas-navy/70 hover:text-elas-navy px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Nosotras
                </Link>
                {isAuthenticated ? (
                  <>
                    <Link to="/tutorias" className="text-elas-navy/70 hover:text-elas-navy px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      Tutorías
                    </Link>
                    <Link to="/cronograma" className="text-elas-navy/70 hover:text-elas-navy px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      Cronograma
                    </Link>
                    <Link to="/estadisticas" className="text-elas-navy/70 hover:text-elas-navy px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      Estadísticas
                    </Link>
                    <Link to="/estado" className="text-elas-navy/70 hover:text-elas-navy px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      Estado
                    </Link>
                    <span className="text-elas-navy px-3 py-2 text-sm font-medium">
                      Hola, {user?.nombre}
                    </span>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <Button variant="outline" className="text-elas-navy border-elas-navy hover:bg-elas-navy hover:text-white transition-colors">
                        Iniciar Sesión
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button className="bg-elas-blue text-elas-navy hover:bg-elas-blue/90 transition-colors">
                        Registrarse
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 overflow-hidden">
        <div className="max-w-10xl mx-auto sm:px-6 lg:px-8 pt-5 pb-16 text-center lg:pt-20">
          <div className="mx-auto max-w-10xl flex items-center justify-center bg-white border-2 rounded-3xl p-5">
            {/* Imagen Izquierda */}
            <div className=" lg:block flex-shrink-0">
              <img
                src="/images/ImgBlancoIzq.png"
                alt="Ilustración izquierda"
                className="w-64 h-auto"
              />
            </div>
            
            {/* Contenido Central */}
            <div className="flex-1 max-w-6xl">
              <h1 className="text-4xl font-bold tracking-tight text-elas-navy sm:text-5xl lg:text-6xl drop-shadow-lg mb-8 font-body">
                Brindamos el respaldo que necesitas para optimizar tu tiempo y fortalecer tu bienestar emocional.
              </h1>
              
              <div className="mt-10 flex items-center justify-center gap-x-6">
                {!isAuthenticated ? (
                  <>
                    <Link to="/register">
                      <Button size="lg" className="bg-elas-blue text-elas-navy hover:bg-elas-blue/90 font-semibold px-8 py-3 shadow-lg">
                        Regístrate
                      </Button>
                    </Link>
                    <Link to="/nosotras">
                      <Button variant="outline" size="lg" className="text-elas-navy border-elas-navy hover:bg-elas-navy hover:text-white px-8 py-3 shadow-lg">
                        Conoce más
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/tutorias">
                      <Button size="lg" className="bg-elas-blue text-elas-navy hover:bg-elas-blue/90 font-semibold px-8 py-3 shadow-lg">
                        Ver Tutorías
                      </Button>
                    </Link>
                    <Link to="/cronograma">
                      <Button variant="outline" size="lg" className="text-elas-navy border-elas-navy hover:bg-elas-navy hover:text-white px-8 py-3 shadow-lg">
                        Mi Cronograma
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
            
            {/* Imagen Derecha */}
            <div className="hidden lg:block flex-shrink-0">
              <img
                src="/images/ImgblancoDer.png"
                alt="Ilustración derecha"
                className="w-64 h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Carousel */}
      <div className="relative z-10 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <p className="text-xl leading-8 text-elas-navy/90 bg-white/80 backdrop-blur-sm rounded-lg p-4 font-semibold font-body">
              Contenido sobre la salud mental.
            </p>
          </div>

          {/* Carousel */}
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * (100 / 3)}%)` }}
            >
              {/* Slide 1 */}
              <div className="w-1/3 flex-shrink-0 px-4">
                <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-elas-blue/30 p-6 h-full">
                  <div className="mb-4">
                    <img 
                      src="/images/el cuidado de su salud mental.jpg" 
                      alt="El cuidado de la salud mental" 
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <a 
                    href="https://www.nimh.nih.gov/health/topics/espanol/el-cuidado-de-su-salud-mental/el-cuidado-de-su-salud-mental"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-elas-navy hover:text-elas-blue font-semibold transition-colors"
                  >
                    El cuidado de su salud mental
                  </a>
                </div>
              </div>

              {/* Slide 2 */}
              <div className="w-1/3 flex-shrink-0 px-4">
                <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-elas-blue/30 p-6 h-full">
                  <div className="mb-4">
                    <img 
                      src="/images/7 estrategias para aprovechar al máximo tu tiempo.jpg" 
                      alt="7 estrategias para aprovechar al máximo tu tiempo" 
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <a 
                    href="https://lesroches.edu/es/blog/7-estrategias-para-aprovechar-al-maximo-tu-tiempo/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-elas-navy hover:text-elas-blue font-semibold transition-colors"
                  >
                    7 estrategias para aprovechar al máximo tu tiempo
                  </a>
                </div>
              </div>

              {/* Slide 3 */}
              <div className="w-1/3 flex-shrink-0 px-4">
                <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-elas-blue/30 p-6 h-full">
                  <div className="mb-4">
                    <img 
                      src="/images/18 consejos, estrategias y soluciones rápidas de gestión del tiempo para lograr trabajos excelentes.jpg" 
                      alt="18 consejos, estrategias y soluciones rápidas de gestión del tiempo" 
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <a 
                    href="https://asana.com/es/resources/time-management-tips"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-elas-navy hover:text-elas-blue font-semibold transition-colors"
                  >
                    18 consejos, estrategias y soluciones rápidas de gestión del tiempo para lograr trabajos excelentes
                  </a>
                </div>
              </div>

              {/* Slide 4 */}
              <div className="w-1/3 flex-shrink-0 px-4">
                <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-elas-blue/30 p-6 h-full">
                  <div className="mb-4">
                    <img 
                      src="/images/Claves para cuidar tu salud mental en el día a día guía práctica de autocuidado.jpg" 
                      alt="Claves para cuidar tu salud mental en el día a día" 
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <a 
                    href="https://www.unicef.org/mexico/c%C3%B3mo-cuidar-tu-salud-mental"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-elas-navy hover:text-elas-blue font-semibold transition-colors"
                  >
                    Claves para cuidar tu salud mental en el día a día: guía práctica de autocuidado
                  </a>
                </div>
              </div>

              {/* Slide 5 */}
              <div className="w-1/3 flex-shrink-0 px-4">
                <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-elas-blue/30 p-6 h-full">
                  <div className="mb-4">
                    <img 
                      src="/images/Consejos prácticos para organizar tu tiempo con inteligencia y enfoque.jpg" 
                      alt="Consejos prácticos para organizar tu tiempo con inteligencia y enfoque" 
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <a 
                    href="https://www.indeed.com/orientacion-profesional/desarrollo-profesional/como-organizo-tiempo-tips-sabiduria"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-elas-navy hover:text-elas-blue font-semibold transition-colors"
                  >
                    Consejos prácticos para organizar tu tiempo con inteligencia y enfoque
                  </a>
                </div>
              </div>

              {/* Slide 6 */}
              <div className="w-1/3 flex-shrink-0 px-4">
                <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-elas-blue/30 p-6 h-full">
                  <div className="mb-4">
                    <img 
                      src="/images/Cómo cuidar tu salud mental.jpg" 
                      alt="Cómo cuidar tu salud mental" 
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <a 
                    href="https://www.unicef.org/mexico/c%C3%B3mo-cuidar-tu-salud-mental"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-elas-navy hover:text-elas-blue font-semibold transition-colors"
                  >
                    Cómo cuidar tu salud mental
                  </a>
                </div>
              </div>

              {/* Slide 7 */}
              <div className="w-1/3 flex-shrink-0 px-4">
                <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-elas-blue/30 p-6 h-full">
                  <div className="mb-4">
                    <img 
                      src="/images/Recomendaciones para la práctica de actividad física saludable.jpg" 
                      alt="Recomendaciones para la práctica de actividad física saludable" 
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <a 
                    href="https://www.comunidad.madrid/servicios/salud/recomendaciones-practica-actividad-fisica-saludable"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-elas-navy hover:text-elas-blue font-semibold transition-colors"
                  >
                    Recomendaciones para la práctica de actividad física saludable
                  </a>
                </div>
              </div>

              {/* Slide 8 */}
              <div className="w-1/3 flex-shrink-0 px-4">
                <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-elas-blue/30 p-6 h-full">
                  <div className="mb-4">
                    <img 
                      src="/images/Las 26 técnicas de gestión del tiempo más efectivas.jpg" 
                      alt="Las 26 técnicas de gestión del tiempo más efectivas" 
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <a 
                    href="https://clockify.me/es/tecnicas-de-gestion-del-tiempo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-elas-navy hover:text-elas-blue font-semibold transition-colors"
                  >
                    Las 26 técnicas de gestión del tiempo más efectivas
                  </a>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-elas-blue/80 hover:bg-elas-blue text-elas-navy p-3 rounded-full shadow-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-elas-blue/80 hover:bg-elas-blue text-elas-navy p-3 rounded-full shadow-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dots indicator */}
            <div className="flex justify-center space-x-2 mt-8">
              {[...Array(6)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentSlide === index ? 'bg-elas-blue' : 'bg-elas-navy/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {!isAuthenticated && (
        <div className="relative z-10 bg-white/90 backdrop-blur-sm border border-elas-blue/30 shadow-lg mx-4 rounded-lg">
          <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-elas-navy sm:text-3xl font-heading">
                ¿Lista para comenzar tu crecimiento académico?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-elas-navy/90 font-body">
                Únete a nuestra comunidad y accede a todas las herramientas que necesitas para alcanzar tus metas académicas.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link to="/register">
                  <Button size="lg" className="bg-elas-blue text-elas-navy hover:bg-elas-blue/90 font-semibold px-8 py-3 shadow-lg">
                    Crear Cuenta Gratis
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;