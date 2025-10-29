import apiService from './apiService';
import type { 
  EstadoAnimo, 
  EstadoAnimoRequest, 
  EstadoAnimoUpdateRequest,
  EstadoAnimoResponse,
  EstadoAnimoListResponse
} from '../interfaces/estadoAnimo';

class EstadoAnimoService {
  private baseUrl = 'http://127.0.0.1:8000/estados-animo';

  async crearEstadoAnimo(data: EstadoAnimoRequest): Promise<EstadoAnimoResponse> {
    try {
      const requestBody = {
        estado: data.estado,
        comentario: data.comentario,
        fecha: data.fecha || new Date().toISOString().split('T')[0],
        usuario_id: data.usuario_id
      };
      
      const response = await apiService.post<EstadoAnimo>(this.baseUrl, requestBody);
      
      if (response.success || response.statusCode === 201 || response.statusCode === 200) {
        return {
          success: true,
          message: 'Estado de ánimo guardado exitosamente',
          data: response.data
        };
      }
      
      throw new Error(response.message || 'Error al crear estado de ánimo');
    } catch (error: any) {
      console.error('❌ Error creando estado de ánimo:', error);
      throw new Error(error.message || 'Error al crear estado de ánimo');
    }
  }

  async obtenerEstadoAnimo(id: number): Promise<EstadoAnimoResponse> {
    try {
      const response = await apiService.get<EstadoAnimo>(`${this.baseUrl}/${id}`);
      
      if (response.success || response.statusCode === 200) {
        return {
          success: true,
          message: 'Estado de ánimo obtenido exitosamente',
          data: response.data
        };
      }
      
      throw new Error(response.message || 'Error al obtener estado de ánimo');
    } catch (error: any) {
      console.error('❌ Error obteniendo estado de ánimo:', error);
      throw new Error(error.message || 'Error al obtener estado de ánimo');
    }
  }

  async obtenerEstadosAnimoUsuario(usuarioId?: number): Promise<EstadoAnimoListResponse> {
    try {
      console.log('📋 Service.GetAll - Obteniendo estados de ánimo del usuario:', usuarioId);
      
      // Si se necesita filtrar por usuario, agregar query parameter
      const url = usuarioId ? `${this.baseUrl}?usuario_id=${usuarioId}` : this.baseUrl;
      
      const response = await apiService.get<EstadoAnimo[]>(url);
      
      if (response.success || response.statusCode === 200) {
        // El data podría estar en response.data o directamente en response (como en auth)
        const responseAny = response as any;
        let estados = response.data || responseAny;
        
        
        // Si estados es un objeto que contiene la propiedad data, extraerla
        if (estados && typeof estados === 'object' && !Array.isArray(estados) && estados.data) {
          console.log('⚠️ Service.GetAll - Estados está en un objeto anidado, extrayendo...');
          estados = estados.data;
        }
        
        // Convertir objeto con índices numéricos a array
        if (estados && typeof estados === 'object' && !Array.isArray(estados)) {
          console.log('⚠️ Service.GetAll - Estados es un objeto, convirtiendo a array...');
          // Filtrar solo las propiedades numéricas (excluir statusCode, success, etc)
          const arrayEstados = Object.keys(estados)
            .filter(key => !isNaN(Number(key))) // Solo keys numéricas
            .map(key => estados[key]); // Extraer los valores
          
          console.log('🔄 Service.GetAll - Array convertido:', arrayEstados);
          estados = arrayEstados;
        }
        
        
        const result = {
          success: true,
          message: 'Estados de ánimo obtenidos exitosamente',
          data: Array.isArray(estados) ? estados : []
        };
        
        console.log('📤 Service.GetAll - Retornando:', result);
        return result;
      }
      
      throw new Error(response.message || 'Error al obtener estados de ánimo');
    } catch (error: any) {
      console.error('❌ Service.GetAll - Error:', error);
      throw new Error(error.message || 'Error al obtener estados de ánimo');
    }
  }

  async actualizarEstadoAnimo(id: number, data: EstadoAnimoUpdateRequest): Promise<EstadoAnimoResponse> {
    try {
      const response = await apiService.put<EstadoAnimo>(`${this.baseUrl}/${id}`, data);
      
      if (response.success || response.statusCode === 200) {
        const responseAny = response as any;
        let estadoActualizado: EstadoAnimo | undefined;
        
        // Intentar diferentes formatos de respuesta
        if (responseAny.data?.data && typeof responseAny.data.data === 'object' && 'estado' in responseAny.data.data) {
          estadoActualizado = responseAny.data.data;
        } else if (response.data && typeof response.data === 'object' && 'estado' in response.data) {
          estadoActualizado = response.data;
        } else if ('estado' in responseAny && 'comentario' in responseAny) {
          estadoActualizado = responseAny;
        } else {
          estadoActualizado = {
            id,
            ...data,
            fecha: new Date().toISOString().split('T')[0],
            usuario_id: 0
          } as EstadoAnimo;
        }
        
        return {
          success: true,
          message: 'Estado de ánimo actualizado exitosamente',
          data: estadoActualizado
        };
      }
      
      throw new Error(response.message || 'Error al actualizar estado de ánimo');
    } catch (error: any) {
      console.error('❌ Error actualizando estado de ánimo:', error);
      throw new Error(error.message || 'Error al actualizar estado de ánimo');
    }
  }

  async eliminarEstadoAnimo(id: number): Promise<EstadoAnimoResponse> {
    try {
      const response = await apiService.delete<string>(`${this.baseUrl}/${id}`);
      
      if (response.success || response.statusCode === 200) {
        return {
          success: true,
          message: 'Estado de ánimo eliminado exitosamente'
        };
      }
      
      throw new Error(response.message || 'Error al eliminar estado de ánimo');
    } catch (error: any) {
      console.error('❌ Error eliminando estado de ánimo:', error);
      throw new Error(error.message || 'Error al eliminar estado de ánimo');
    }
  }
}

const estadoAnimoService = new EstadoAnimoService();
export default estadoAnimoService;