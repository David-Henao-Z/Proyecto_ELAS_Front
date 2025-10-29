import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { obtenerEstadisticasGeneralesAsync, clearError } from '../slices/estadisticasSlice';
import { Button } from '../components/atoms';

const EstadisticasPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { estadisticas, isLoading, error } = useAppSelector((state) => state.estadisticas);

  useEffect(() => {
    cargarEstadisticas();
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const cargarEstadisticas = () => {
    dispatch(obtenerEstadisticasGeneralesAsync());
  };

  const StatCard: React.FC<{ title: string; value: number; icon: string; color: string }> = ({ 
    title, 
    value, 
    icon, 
    color 
  }) => (
    <div className="bg-white rounded-xl shadow-md p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-questrial text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-caprasimo text-elas-navy">{value}</p>
        </div>
        <div className="text-4xl opacity-20">{icon}</div>
      </div>
    </div>
  );

  // Datos para las gráficas
  const chartData = estadisticas ? [
    { label: 'Usuarios', value: estadisticas.total_usuarios, icon: '👥', color: '#4A90E2' },
    { label: 'Tareas', value: estadisticas.total_tareas, icon: '📝', color: '#9B59B6' },
    { label: 'Cronograma', value: estadisticas.total_eventos_cronograma, icon: '📅', color: '#E74C3C' },
    { label: 'Tutorías', value: estadisticas.total_tutorias, icon: '👨‍🏫', color: '#F39C12' },
    { label: 'Est. Ánimo', value: estadisticas.total_registros_estado_animo, icon: '💝', color: '#1ABC9C' },
  ] : [];

  const maxValue = Math.max(...chartData.map(d => d.value), 1);

  const BarChart: React.FC = () => (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-caprasimo text-elas-navy mb-6">Gráfica de Barras</h3>
      <div className="space-y-4">
        {chartData.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 w-40">
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm font-questrial text-gray-700">{item.label}</span>
              </div>
              <span className="text-sm font-caprasimo text-elas-navy w-12 text-right">{item.value}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-6 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                style={{
                  width: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: item.color,
                  minWidth: item.value > 0 ? '2.5rem' : '0'
                }}
              >
                <span className="text-xs font-questrial text-white font-medium">
                  {item.value > 0 && item.value}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const DonutChart: React.FC = () => {
    const total = chartData.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = 0;

    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-caprasimo text-elas-navy mb-6">Distribución</h3>
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* SVG Donut Chart */}
          <div className="relative w-64 h-64">
            <svg viewBox="0 0 200 200" className="transform -rotate-90">
              {chartData.map((item, index) => {
                const percentage = total > 0 ? (item.value / total) * 100 : 0;
                const angle = (percentage / 100) * 360;
                const startAngle = currentAngle;
                currentAngle += angle;

                // Calcular el path del arco
                const radius = 80;
                const innerRadius = 50;
                const startRad = (startAngle * Math.PI) / 180;
                const endRad = (currentAngle * Math.PI) / 180;

                const x1 = 100 + radius * Math.cos(startRad);
                const y1 = 100 + radius * Math.sin(startRad);
                const x2 = 100 + radius * Math.cos(endRad);
                const y2 = 100 + radius * Math.sin(endRad);
                const x3 = 100 + innerRadius * Math.cos(endRad);
                const y3 = 100 + innerRadius * Math.sin(endRad);
                const x4 = 100 + innerRadius * Math.cos(startRad);
                const y4 = 100 + innerRadius * Math.sin(startRad);

                const largeArc = angle > 180 ? 1 : 0;
                const path = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4} Z`;

                return (
                  <path
                    key={index}
                    d={path}
                    fill={item.color}
                    className="transition-all duration-300 hover:opacity-80"
                  />
                );
              })}
            </svg>
            {/* Centro con total */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-caprasimo text-elas-navy">{total}</span>
              <span className="text-xs font-questrial text-gray-600">Total</span>
            </div>
          </div>

          {/* Leyenda */}
          <div className="flex-1 space-y-3">
            {chartData.map((item, index) => {
              const percentage = total > 0 ? ((item.value / total) * 100).toFixed(1) : '0.0';
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm font-questrial text-gray-700">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-questrial text-gray-500">{percentage}%</span>
                    <span className="text-sm font-caprasimo text-elas-navy w-8 text-right">{item.value}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-elas-light via-white to-elas-light p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-caprasimo text-elas-navy mb-2 flex items-center gap-2">
                📊 Estadísticas Generales
              </h1>
              <p className="text-elas-navy/70 font-questrial">
                Resumen de la actividad en la plataforma ELAS
              </p>
            </div>
            <Button
              onClick={cargarEstadisticas}
              disabled={isLoading}
              className="bg-elas-blue hover:bg-elas-blue/90 text-elas-navy font-questrial"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-elas-navy border-t-transparent"></div>
                  Actualizando...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  🔄 Actualizar
                </div>
              )}
            </Button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg font-questrial">
            {error}
          </div>
        )}

        {/* Loading State */}
        {isLoading && !estadisticas && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-elas-blue mx-auto mb-4"></div>
              <p className="text-gray-500 font-questrial">Cargando estadísticas...</p>
            </div>
          </div>
        )}

        {/* Statistics Grid */}
        {estadisticas && !isLoading && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <StatCard
                title="Total de Usuarios"
                value={estadisticas.total_usuarios}
                icon="👥"
                color="#4A90E2"
              />
              <StatCard
                title="Total de Tareas"
                value={estadisticas.total_tareas}
                icon="📝"
                color="#9B59B6"
              />
              <StatCard
                title="Eventos en Cronograma"
                value={estadisticas.total_eventos_cronograma}
                icon="📅"
                color="#E74C3C"
              />
              <StatCard
                title="Total de Tutorías"
                value={estadisticas.total_tutorias}
                icon="👨‍🏫"
                color="#F39C12"
              />
              <StatCard
                title="Registros de Estado de Ánimo"
                value={estadisticas.total_registros_estado_animo}
                icon="💝"
                color="#1ABC9C"
              />
            </div>

            {/* Gráficas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <BarChart />
              <DonutChart />
            </div>
          </>
        )}

        {/* Empty State */}
        {!estadisticas && !isLoading && !error && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📊</div>
            <p className="text-gray-500 font-questrial">
              No hay estadísticas disponibles
            </p>
          </div>
        )}

        {/* Additional Info */}
        {estadisticas && (
          <div className="mt-8 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-caprasimo text-elas-navy mb-4">Información</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-questrial text-sm text-gray-600">
              <div>
                <p className="mb-2">
                  <span className="font-medium">Última actualización:</span>{' '}
                  {new Date().toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">
                  Estas estadísticas son exclusivas para Administradores y Profesores
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EstadisticasPage;
