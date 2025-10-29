import apiService from './apiService';
import type {
  Cronograma,
  CronogramaRequest,
  CronogramaUpdateRequest
} from '../interfaces/cronograma';

/**
 * Servicio para gestionar el cronograma del usuario
 */

// Crear nuevo evento en cronograma
export const crearCronograma = async (
  data: CronogramaRequest
): Promise<Cronograma> => {
  try {
    const response = await apiService.post<any>('/cronograma', data);
    
    if (!response) {
      throw new Error('No se recibió respuesta del servidor');
    }
    
    // Intentar diferentes formatos de respuesta
    if (response.data?.data) {
      return response.data.data;
    }
    
    if (response.data && 'titulo' in response.data) {
      return response.data;
    }
    
    if ('titulo' in response && 'descripcion' in response) {
      return response as unknown as Cronograma;
    }
    
    throw new Error('No se recibió el cronograma creado en el formato esperado');
  } catch (error) {
    console.error('❌ Error al crear cronograma:', error);
    throw error;
  }
};

// Obtener todos los cronogramas del usuario por su ID
export const obtenerCronogramasUsuario = async (usuarioId: number): Promise<Cronograma[]> => {
  try {
    // Agregar el usuario_id como parámetro en la URL
    const response = await apiService.get<any>(`/cronograma?usuario_id=${usuarioId}`);

    if (!response) {
      return [];
    }

    // Verificar si response ya es un array
    if (Array.isArray(response)) {
      return response;
    }

    // Si tiene una propiedad data dentro (formato envuelto), extraerla
    if (response.data && Array.isArray(response.data)) {
      return response.data;
    }

    // Convertir objeto con índices numéricos a array
    const cronogramasArray = Object.keys(response)
      .filter(key => !isNaN(Number(key)))
      .map(key => (response as any)[key]);
    
    return cronogramasArray;
  } catch (error) {
    console.error('❌ Error al obtener cronogramas:', error);
    throw error;
  }
};

// Obtener cronograma por ID
export const obtenerCronogramaPorId = async (id: number): Promise<Cronograma> => {
  try {
    const response = await apiService.get<Cronograma>(`/cronograma/${id}`);
    
    if (response.data) {
      return response.data;
    }
    
    if ('titulo' in response && 'descripcion' in response) {
      return response as unknown as Cronograma;
    }
    
    throw new Error('No se recibió el cronograma');
  } catch (error) {
    console.error('❌ Error al obtener cronograma:', error);
    throw error;
  }
};

// Actualizar cronograma existente
export const actualizarCronograma = async (
  id: number,
  data: CronogramaUpdateRequest
): Promise<Cronograma> => {
  try {
    const response = await apiService.put<any>(`/cronograma/${id}`, data);
    
    if (!response) {
      throw new Error('No se recibió respuesta del servidor');
    }
    
    // Intentar diferentes formatos de respuesta
    if (response.data?.data) {
      return response.data.data;
    }
    
    if (response.data && 'titulo' in response.data) {
      return response.data;
    }
    
    if ('titulo' in response && 'descripcion' in response) {
      return response as unknown as Cronograma;
    }
    
    throw new Error('No se recibió el cronograma actualizado en el formato esperado');
  } catch (error) {
    console.error('❌ Error al actualizar cronograma:', error);
    throw error;
  }
};

// Eliminar cronograma
export const eliminarCronograma = async (id: number): Promise<void> => {
  try {
    await apiService.delete(`/cronograma/${id}`);
  } catch (error) {
    console.error('❌ Error al eliminar cronograma:', error);
    throw error;
  }
};

export default {
  crearCronograma,
  obtenerCronogramasUsuario,
  obtenerCronogramaPorId,
  actualizarCronograma,
  eliminarCronograma
};
