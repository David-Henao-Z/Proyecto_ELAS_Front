import apiService from './apiService';
import type { EstadisticasGenerales, EstadisticasResponse } from '../interfaces/estadisticas';

class EstadisticasService {
  private baseUrl = 'http://127.0.0.1:8000/estadisticas';

  async obtenerEstadisticasGenerales(): Promise<EstadisticasResponse> {
    try {
      const response = await apiService.get<EstadisticasGenerales>(`${this.baseUrl}/generales`);
      
      if (response.success || response.statusCode === 200) {
        return {
          success: true,
          message: 'Estadísticas obtenidas exitosamente',
          data: response.data || response as any
        };
      }
      
      throw new Error(response.message || 'Error al obtener estadísticas');
    } catch (error: any) {
      console.error('❌ Error obteniendo estadísticas:', error);
      throw new Error(error.message || 'Error al obtener estadísticas');
    }
  }
}

const estadisticasService = new EstadisticasService();
export default estadisticasService;
