import React from 'react';

const EstadisticasPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Estadísticas</h1>
          <p className="mt-2 text-lg text-gray-600">
            Visualiza tu progreso académico y estadísticas de la plataforma
          </p>
        </div>
        
        {/* Placeholder content */}
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Página en Construcción
          </h2>
          <p className="text-gray-600">
            Esta página mostrará gráficos y estadísticas sobre tu rendimiento académico.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EstadisticasPage;