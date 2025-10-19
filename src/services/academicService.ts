import apiService from './apiService';
import type { Estadistica, CronogramaItem, Estado } from '../interfaces';

class AcademicService {
  async getEstadisticas(): Promise<Estadistica[]> {
    const response = await apiService.get<Estadistica[]>('/estadisticas.php');
    return response.success ? response.data || [] : [];
  }

  async getCronograma(): Promise<CronogramaItem[]> {
    const response = await apiService.get<CronogramaItem[]>('/cronograma.php');
    return response.success ? response.data || [] : [];
  }

  async getEstadoAcademico(): Promise<Estado | null> {
    const response = await apiService.get<Estado>('/estado.php');
    return response.success ? response.data || null : null;
  }

  async updateCronogramaItem(id: number, updates: Partial<CronogramaItem>): Promise<boolean> {
    const response = await apiService.put(`/cronograma.php?id=${id}`, updates);
    return response.success;
  }

  async createCronogramaItem(item: Omit<CronogramaItem, 'id'>): Promise<boolean> {
    const response = await apiService.post('/cronograma.php', item);
    return response.success;
  }

  async deleteCronogramaItem(id: number): Promise<boolean> {
    const response = await apiService.delete(`/cronograma.php?id=${id}`);
    return response.success;
  }
}

export default new AcademicService();