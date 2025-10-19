import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/atoms';

const NosotrasPage: React.FC = () => {
  return (
    <div 
      className="min-h-screen"
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
            <Link to="/" className="flex items-center">
              <img
                src="/images/logo.png"
                alt="ELAS Logo"
                className="h-12 w-auto"
              />
              <div className="ml-4">
                <h1 className="text-xl font-bold text-elas-navy">ELAS</h1>
              </div>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="outline" className="text-elas-navy border-elas-navy hover:bg-elas-navy hover:text-white transition-colors">
                  Volver al Inicio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-elas-blue/30 p-8">
          <h1 className="text-4xl font-bold mb-8 text-center text-elas-navy">Sobre Nosotras</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-elas-navy">Nuestra Misión</h2>
              <p className="text-lg leading-relaxed text-elas-navy/80">
                En ELAS, creemos en el poder transformador de la educación y el apoyo mutuo entre mujeres. 
                Nuestra misión es crear un espacio seguro y empoderador donde las estudiantes puedan acceder 
                a recursos académicos de calidad, encontrar mentoras y construir una red de apoyo sólida 
                que las acompañe en su crecimiento personal y profesional.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-elas-navy">¿Por qué ELAS?</h2>
              <p className="text-lg leading-relaxed mb-4 text-elas-navy/80">
                Sabemos que las mujeres enfrentan desafíos únicos en el ámbito académico y profesional. 
                Por eso, hemos diseñado una plataforma que no solo ofrece tutorías académicas, sino que 
                también fomenta la sororidad, el liderazgo femenino y el desarrollo integral de cada estudiante.
              </p>
              <ul className="list-disc list-inside space-y-2 text-elas-navy/70">
                <li>Tutorías impartidas por mujeres expertas en diferentes áreas</li>
                <li>Enfoque en el empoderamiento y la confianza académica</li>
                <li>Comunidad inclusiva y diversa</li>
                <li>Herramientas de seguimiento académico personalizadas</li>
                <li>Espacios de networking y mentoría</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-elas-navy">Nuestros Valores</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-elas-blue/20 border border-elas-blue/30 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-2 text-elas-navy">Sororidad</h3>
                  <p className="text-elas-navy/80">Creemos en el poder del apoyo mutuo entre mujeres y en la importancia de construir redes de colaboración.</p>
                </div>
                <div className="bg-elas-blue/20 border border-elas-blue/30 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-2 text-elas-navy">Excelencia</h3>
                  <p className="text-elas-navy/80">Nos comprometemos a ofrecer recursos académicos de la más alta calidad para garantizar el éxito de nuestras estudiantes.</p>
                </div>
                <div className="bg-elas-blue/20 border border-elas-blue/30 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-2 text-elas-navy">Inclusión</h3>
                  <p className="text-elas-navy/80">Celebramos la diversidad y creamos espacios donde todas las mujeres se sientan bienvenidas y valoradas.</p>
                </div>
                <div className="bg-elas-blue/20 border border-elas-blue/30 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-2 text-elas-navy">Empowerment</h3>
                  <p className="text-elas-navy/80">Fomentamos la confianza, el liderazgo y la autonomía de cada estudiante en su camino académico.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-elas-navy">Nuestro Impacto</h2>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="bg-elas-blue/30 border border-elas-blue/50 rounded-lg p-6">
                  <div className="text-3xl font-bold text-elas-navy">500+</div>
                  <div className="text-sm mt-2 text-elas-navy/70">Estudiantes Empoderadas</div>
                </div>
                <div className="bg-elas-blue/30 border border-elas-blue/50 rounded-lg p-6">
                  <div className="text-3xl font-bold text-elas-navy">50+</div>
                  <div className="text-sm mt-2 text-elas-navy/70">Tutoras Especializadas</div>
                </div>
                <div className="bg-elas-blue/30 border border-elas-blue/50 rounded-lg p-6">
                  <div className="text-3xl font-bold text-elas-navy">1000+</div>
                  <div className="text-sm mt-2 text-elas-navy/70">Sesiones de Tutoría</div>
                </div>
              </div>
            </section>

            <section className="text-center">
              <h2 className="text-2xl font-semibold mb-4 text-elas-navy">¿Lista para unirte?</h2>
              <p className="text-lg mb-6 text-elas-navy/80">
                Forma parte de una comunidad que cree en tu potencial y te acompaña en cada paso de tu crecimiento académico.
              </p>
              <Link to="/register">
                <Button size="lg" className="bg-elas-blue text-elas-navy hover:bg-elas-blue/90 font-semibold px-8 py-3 shadow-lg transition-colors">
                  Únete a ELAS
                </Button>
              </Link>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-white bg-elas-navy/80 backdrop-blur-sm rounded-lg p-3 shadow-lg">
            © 2024 ELAS. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NosotrasPage;