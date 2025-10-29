import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/rootReducers';
import {
  crearCronogramaAsync,
  obtenerCronogramasAsync,
  actualizarCronogramaAsync,
  eliminarCronogramaAsync,
  setSelectedDate,
  setSelectedMonth,
  setCurrentCronograma,
  clearError,
} from '../slices/cronogramaSlice';
import type { AppDispatch } from '../store/store';
import type { Cronograma, CronogramaRequest } from '../interfaces/cronograma';
import Button from '../components/atoms/Button';

const CronogramaPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cronogramas, currentCronograma, selectedDate, selectedMonth, isLoading, error } = useSelector(
    (state: RootState) => state.cronograma
  );
  const { user } = useSelector((state: RootState) => state.auth);

  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [horaInicio, setHoraInicio] = useState('09:00');
  const [horaFin, setHoraFin] = useState('10:00');
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Cargar cronogramas al montar componente
  useEffect(() => {
    if (user && user.id) {
      dispatch(obtenerCronogramasAsync(user.id));
    }
  }, [dispatch, user]);

  // Limpiar error después de 5 segundos
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  // Limpiar mensaje de éxito después de 5 segundos
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, dispatch]);

  // Funciones para calendario
  const getDaysInMonth = (yearMonth: string): number => {
    const [year, month] = yearMonth.split('-').map(Number);
    return new Date(year, month, 0).getDate();
  };

  const getFirstDayOfMonth = (yearMonth: string): number => {
    const [year, month] = yearMonth.split('-').map(Number);
    return new Date(year, month - 1, 1).getDay();
  };

  const handlePreviousMonth = () => {
    const [year, month] = selectedMonth.split('-').map(Number);
    const newDate = new Date(year, month - 2, 1);
    const newMonth = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, '0')}`;
    dispatch(setSelectedMonth(newMonth));
  };

  const handleNextMonth = () => {
    const [year, month] = selectedMonth.split('-').map(Number);
    const newDate = new Date(year, month, 1);
    const newMonth = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, '0')}`;
    dispatch(setSelectedMonth(newMonth));
  };

  const handleDayClick = (day: number) => {
    const [year, month] = selectedMonth.split('-').map(Number);
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    dispatch(setSelectedDate(dateStr));
    setShowForm(false);
    setEditMode(false);
    resetForm();
  };

  // Obtener eventos del día seleccionado
  const getEventsForSelectedDate = (): Cronograma[] => {
    if (!selectedDate) return [];
    return cronogramas.filter((c) => {
      const eventDate = c.fecha_inicio.split('T')[0];
      return eventDate === selectedDate;
    });
  };

  // Verificar si un día tiene eventos
  const hasEvents = (day: number): boolean => {
    const [year, month] = selectedMonth.split('-').map(Number);
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return cronogramas.some((c) => c.fecha_inicio.split('T')[0] === dateStr);
  };

  // Contar eventos de un día específico
  const getEventCount = (day: number): number => {
    const [year, month] = selectedMonth.split('-').map(Number);
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return cronogramas.filter((c) => c.fecha_inicio.split('T')[0] === dateStr).length;
  };

  // Resetear formulario
  const resetForm = () => {
    setTitulo('');
    setDescripcion('');
    setHoraInicio('09:00');
    setHoraFin('10:00');
    setEditMode(false);
    dispatch(setCurrentCronograma(null));
  };

  // Manejar creación/actualización
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !selectedDate) return;

    const fechaInicio = `${selectedDate}T${horaInicio}:00`;
    const fechaFin = `${selectedDate}T${horaFin}:00`;

    if (editMode && currentCronograma) {
      // Actualizar
      await dispatch(
        actualizarCronogramaAsync({
          id: currentCronograma.id!,
          data: { titulo, descripcion, fecha_inicio: fechaInicio, fecha_fin: fechaFin },
        })
      );
      setSuccessMessage('Evento actualizado exitosamente');
    } else {
      // Crear
      const data: CronogramaRequest = {
        titulo,
        descripcion,
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
        usuario_id: user.id,
      };
      await dispatch(crearCronogramaAsync(data));
      setSuccessMessage('Evento creado exitosamente');
    }

    resetForm();
    setShowForm(false);
    if (user?.id) {
      dispatch(obtenerCronogramasAsync(user.id));
    }
  };

  // Manejar edición
  const handleEdit = (cronograma: Cronograma) => {
    setTitulo(cronograma.titulo);
    setDescripcion(cronograma.descripcion);
    const inicio = new Date(cronograma.fecha_inicio);
    const fin = new Date(cronograma.fecha_fin);
    setHoraInicio(`${String(inicio.getHours()).padStart(2, '0')}:${String(inicio.getMinutes()).padStart(2, '0')}`);
    setHoraFin(`${String(fin.getHours()).padStart(2, '0')}:${String(fin.getMinutes()).padStart(2, '0')}`);
    dispatch(setCurrentCronograma(cronograma));
    setEditMode(true);
    setShowForm(true);
  };

  // Manejar eliminación
  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este evento?')) {
      await dispatch(eliminarCronogramaAsync(id));
      setSuccessMessage('Evento eliminado exitosamente');
      if (user?.id) {
        dispatch(obtenerCronogramasAsync(user.id));
      }
    }
  };

  // Renderizar calendario
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedMonth);
    const firstDay = getFirstDayOfMonth(selectedMonth);
    const days: (number | null)[] = [];

    // Agregar días vacíos al inicio
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Agregar días del mes
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    const [year, month] = selectedMonth.split('-').map(Number);
    const monthName = new Date(year, month - 1, 1).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });

    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Header del calendario */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handlePreviousMonth}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Mes anterior"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-xl font-semibold text-elas-dark capitalize">{monthName}</h2>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Mes siguiente"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Días de la semana */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
            <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Días del mes */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} className="aspect-square" />;
            }

            const [year, month] = selectedMonth.split('-').map(Number);
            const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isSelected = selectedDate === dateStr;
            const hasEvent = hasEvents(day);
            const eventCount = getEventCount(day);

            return (
              <button
                key={day}
                onClick={() => handleDayClick(day)}
                className={`
                  aspect-square rounded-lg p-2 text-sm font-medium transition-all relative
                  ${isSelected ? 'bg-elas-blue text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}
                  ${hasEvent ? 'ring-2 ring-elas-accent' : ''}
                `}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <span>{day}</span>
                  {hasEvent && !isSelected && (
                    <div className="flex items-center gap-1 mt-1">
                      <div className="w-1.5 h-1.5 bg-elas-accent rounded-full" />
                      {eventCount > 1 && (
                        <span className="text-xs text-elas-accent font-semibold">{eventCount}</span>
                      )}
                    </div>
                  )}
                  {hasEvent && isSelected && eventCount > 1 && (
                    <span className="absolute top-1 right-1 text-xs bg-white text-elas-blue rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {eventCount}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-elas-dark flex items-center gap-2">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Cronograma
            {isLoading && (
              <svg className="animate-spin h-5 w-5 text-elas-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
          </h1>
          <div className="flex items-center gap-4 mt-2">
            <p className="text-gray-600">Organiza tus actividades y eventos</p>
            {cronogramas.length > 0 && (
              <span className="px-3 py-1 bg-elas-accent/10 text-elas-accent rounded-full text-sm font-semibold">
                {cronogramas.length} {cronogramas.length === 1 ? 'evento' : 'eventos'} guardados
              </span>
            )}
          </div>
        </div>

        {/* Mensajes */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <span className="text-green-500">✓</span>
            {successMessage}
          </div>
        )}

        {/* Layout principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendario */}
          <div className="lg:col-span-2">{renderCalendar()}</div>

          {/* Panel lateral */}
          <div className="space-y-6">
            {/* Lista de eventos del día - Mostrar PRIMERO */}
            {selectedDate && !showForm && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-elas-dark">
                    Eventos del {new Date(selectedDate + 'T12:00:00').toLocaleDateString('es-ES', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </h3>
                  <button
                    onClick={() => {
                      console.log('🔄 Recargando cronogramas...');
                      if (user?.id) {
                        dispatch(obtenerCronogramasAsync(user.id));
                        setSuccessMessage('Eventos actualizados');
                      }
                    }}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    title="Recargar eventos"
                    disabled={isLoading}
                  >
                    <svg 
                      className={`w-5 h-5 text-elas-blue ${isLoading ? 'animate-spin' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                </div>

                {getEventsForSelectedDate().length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-4">No hay eventos para este día</p>
                ) : (
                  <div className="space-y-3">
                    {getEventsForSelectedDate().map((cronograma) => {
                      const inicio = new Date(cronograma.fecha_inicio);
                      const fin = new Date(cronograma.fecha_fin);
                      return (
                        <div key={cronograma.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-elas-dark">{cronograma.titulo}</h4>
                            <div className="flex gap-1">
                              <button
                                onClick={() => handleEdit(cronograma)}
                                className="p-1 hover:bg-gray-100 rounded text-blue-600"
                                title="Editar"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDelete(cronograma.id!)}
                                className="p-1 hover:bg-gray-100 rounded text-red-600"
                                title="Eliminar"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{cronograma.descripcion}</p>
                          <p className="text-xs text-gray-500">
                            {`${String(inicio.getHours()).padStart(2, '0')}:${String(inicio.getMinutes()).padStart(2, '0')}`}
                            {' - '}
                            {`${String(fin.getHours()).padStart(2, '0')}:${String(fin.getMinutes()).padStart(2, '0')}`}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Botón nuevo evento - Mostrar DESPUÉS de la lista */}
            {selectedDate && !showForm && (
              <div>
                <Button
                  onClick={() => {
                    setShowForm(true);
                    resetForm();
                  }}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Nuevo Evento
                </Button>
              </div>
            )}

            {/* Formulario */}
            {showForm && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-elas-dark">
                    {editMode ? 'Editar Evento' : 'Nuevo Evento'}
                  </h3>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      resetForm();
                    }}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                    <input
                      type="text"
                      value={titulo}
                      onChange={(e) => setTitulo(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-elas-blue focus:border-transparent"
                      placeholder="Ej: Reunión de equipo"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                    <textarea
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-elas-blue focus:border-transparent"
                      placeholder="Detalles del evento..."
                      rows={3}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Hora inicio</label>
                      <input
                        type="time"
                        value={horaInicio}
                        onChange={(e) => setHoraInicio(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-elas-blue focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Hora fin</label>
                      <input
                        type="time"
                        value={horaFin}
                        onChange={(e) => setHoraFin(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-elas-blue focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1 flex items-center justify-center gap-2" disabled={isLoading}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                      </svg>
                      {editMode ? 'Actualizar' : 'Guardar'}
                    </Button>
                    {editMode && (
                      <Button
                        type="button"
                        onClick={() => {
                          setShowForm(false);
                          resetForm();
                        }}
                        className="bg-gray-500 hover:bg-gray-600"
                      >
                        Cancelar
                      </Button>
                    )}
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CronogramaPage;