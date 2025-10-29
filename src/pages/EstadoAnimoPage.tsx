import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { 
  crearEstadoAnimoAsync, 
  obtenerEstadosAnimoUsuarioAsync,
  actualizarEstadoAnimoAsync,
  eliminarEstadoAnimoAsync,
  clearError 
} from '../slices/estadoAnimoSlice';
import { EMOCIONES, type EmocionOption } from '../interfaces/estadoAnimo';
import { Button, AlertDialog } from '../components/atoms';

const EstadoAnimoPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { historialEstados, isLoading, isLoadingHistorial, error } = useAppSelector((state) => state.estadoAnimo);
  const { user } = useAppSelector((state) => state.auth);

  const [selectedEmocion, setSelectedEmocion] = useState<EmocionOption>(EMOCIONES[0]);
  const [comentario, setComentario] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const cargarHistorial = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    
    dispatch(obtenerEstadosAnimoUsuarioAsync(user?.id || 1));
  };

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!comentario.trim()) {
      return;
    }
    const data = {
      estado: selectedEmocion.value,
      comentario: comentario.trim(),
      fecha: new Date().toISOString().split('T')[0],
      usuario_id: user?.id || 1
    };
    
    console.log('� Enviando estado de ánimo:', data);

    try {
      if (editingId) {
        console.log('🔄 Component - Iniciando actualización, ID:', editingId);
        const result = await dispatch(actualizarEstadoAnimoAsync({
          id: editingId,
          data: {
            estado: selectedEmocion.value,
            comentario: comentario.trim()
          }
        })).unwrap();
        console.log('✅ Component - Actualización exitosa:', result);
        setEditingId(null);
      } else {
         console.log('📝 Datos a enviar:', data);
        await dispatch(crearEstadoAnimoAsync(data)).unwrap();
      }
      
      // Limpiar formulario y mostrar mensaje de éxito
      setComentario('');
      setSelectedEmocion(EMOCIONES[0]);
      dispatch(clearError()); // Limpiar errores previos
      setShowSuccess(true);
      
      // Ocultar mensaje de éxito después de 5 segundos
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
      
      // Recargar el historial
      if (user?.id) {
        dispatch(obtenerEstadosAnimoUsuarioAsync(user.id));
      }
    } catch (error) {
      console.error('❌ Component - Error al guardar estado de ánimo:', error);
      setShowSuccess(false); // Asegurar que no se muestre el mensaje de éxito si hay error
    }
  };

  const handleEdit = (estado: any) => {
    const emocion = EMOCIONES.find(e => e.value === estado.estado) || EMOCIONES[0];
    setSelectedEmocion(emocion);
    setComentario(estado.comentario);
    setEditingId(estado.id);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (deleteId) {
      try {
        await dispatch(eliminarEstadoAnimoAsync(deleteId)).unwrap();
        setShowDeleteDialog(false);
        setDeleteId(null);
      } catch (error) {
        console.error('Error al eliminar estado de ánimo:', error);
      }
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Mostrar notificación temporal de copiado
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 bg-elas-navy text-white px-4 py-2 rounded-lg shadow-lg z-50 font-questrial';
      toast.textContent = '¡Comentario copiado!';
      document.body.appendChild(toast);
      
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setComentario('');
    setSelectedEmocion(EMOCIONES[0]);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-elas-light via-white to-elas-light p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-caprasimo text-elas-navy mb-2">
            ¿Cómo te sientes hoy?
          </h1>
          <p className="text-elas-navy/70 font-questrial">
            Registra y reflexiona sobre tu estado emocional
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-elas-blue/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Selector de Emoción */}
            <div>
              <label className="block text-sm font-medium font-questrial text-elas-navy mb-3">
                Selecciona tu estado de ánimo:
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {EMOCIONES.map((emocion) => (
                  <button
                    key={emocion.value}
                    type="button"
                    onClick={() => setSelectedEmocion(emocion)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      selectedEmocion.value === emocion.value
                        ? 'border-elas-blue bg-elas-blue/10 scale-105'
                        : 'border-gray-200 hover:border-elas-blue/50 hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-1">{emocion.emoji}</div>
                      <div className={`text-sm font-questrial ${
                        selectedEmocion.value === emocion.value ? 'text-elas-navy font-medium' : 'text-gray-600'
                      }`}>
                        {emocion.label}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Emoji Grande y Estado Actual */}
            <div className="text-center py-4">
              <div className="text-6xl mb-2">{selectedEmocion.emoji}</div>
              <div className={`text-xl font-caprasimo ${selectedEmocion.color}`}>
                Me siento {selectedEmocion.label}
              </div>
            </div>

            {/* Área de Comentario */}
            <div>
              <label htmlFor="comentario" className="block text-sm font-medium font-questrial text-elas-navy mb-2">
                Cuéntanos más sobre cómo te sientes:
              </label>
              <textarea
                id="comentario"
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                placeholder="Describe qué te hace sentir así, qué pasó en tu día, tus pensamientos..."
                className="w-full h-32 p-4 border border-elas-navy/30 rounded-lg font-questrial text-sm focus:border-elas-blue focus:ring-2 focus:ring-elas-blue/20 outline-none resize-none"
                required
              />
              <div className="text-xs text-gray-500 mt-1 font-questrial">
                {comentario.length}/500 caracteres
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                type="submit"
                disabled={isLoading || !comentario.trim()}
                className="flex-1 bg-elas-blue hover:bg-elas-blue/90 text-elas-navy font-questrial font-medium"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-elas-navy border-t-transparent mr-2"></div>
                    Guardando...
                  </div>
                ) : editingId ? 'Actualizar Estado' : 'Guardar Estado'}
              </Button>
              
              {editingId && (
                <Button
                  type="button"
                  onClick={cancelEdit}
                  variant="secondary"
                  className="sm:w-auto font-questrial"
                >
                  Cancelar
                </Button>
              )}
            </div>

            {/* Success Message */}
            {showSuccess && !error && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm font-questrial flex items-center justify-between">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Estado de ánimo guardado exitosamente</span>
                </div>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="text-green-700 hover:text-green-900"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm font-questrial">
                {error}
              </div>
            )}
          </form>
        </div>

        {/* Historial de Estados */}
        <div className="bg-white rounded-xl shadow-lg border border-elas-blue/20">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-caprasimo text-elas-navy">Tu Historial Emocional</h2>
                <p className="text-sm text-elas-navy/70 font-questrial mt-1">
                  Revisa cómo han sido tus estados de ánimo anteriores
                </p>
              </div>
              <Button
                onClick={cargarHistorial}
                disabled={isLoadingHistorial}
                className="bg-elas-blue hover:bg-elas-blue/90 text-white px-4 py-2 rounded-lg font-questrial text-sm"
              >
                {isLoadingHistorial ? '⏳' : '🔄'} Cargar
              </Button>
            </div>
          </div>
          
          <div className="p-6">
            {isLoadingHistorial ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-elas-blue mx-auto"></div>
                <p className="text-gray-500 font-questrial mt-2">Cargando historial...</p>
              </div>
            ) : historialEstados.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">📝</div>
                <p className="text-gray-500 font-questrial">
                  Aún no has registrado ningún estado de ánimo.
                </p>
                <p className="text-sm text-gray-400 font-questrial mt-1">
                  ¡Comparte cómo te sientes hoy!
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {historialEstados.map((estado) => {
                  const emocion = EMOCIONES.find(e => e.value === estado.estado) || EMOCIONES[0];
                  return (
                    <div key={estado.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <div className="text-2xl">{emocion.emoji}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className={`font-caprasimo ${emocion.color}`}>
                                {emocion.label}
                              </span>
                              <span className="text-xs text-gray-500 font-questrial">
                                {formatDate(estado.fecha)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700 font-questrial leading-relaxed break-words">
                              {estado.comentario}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-1 ml-4">
                          <button
                            onClick={() => copyToClipboard(estado.comentario)}
                            className="p-2 text-gray-400 hover:text-elas-blue transition-colors rounded-md hover:bg-white"
                            title="Copiar comentario"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleEdit(estado)}
                            className="p-2 text-gray-400 hover:text-elas-blue transition-colors rounded-md hover:bg-white"
                            title="Editar"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(estado.id!)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-md hover:bg-white"
                            title="Eliminar"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Dialog de Confirmación de Eliminación */}
        <AlertDialog
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
          title="¿Eliminar estado de ánimo?"
          description="Esta acción no se puede deshacer. ¿Estás segura de que quieres eliminar este registro?"
          actionLabel="Eliminar"
          onAction={confirmDelete}
          variant="destructive"
        />
      </div>
    </div>
  );
};

export default EstadoAnimoPage;