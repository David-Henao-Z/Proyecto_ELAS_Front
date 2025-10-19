import apiService from './apiService';
import type { Tutoria, CreateTutoriaData, InscripcionTutoria, SearchFilter } from '../interfaces';

class TutoriaService {
  async getTutorias(filters?: SearchFilter): Promise<Tutoria[]> {
    const response = await apiService.get<Tutoria[]>('/tutorias.php', filters);
    return response.success ? response.data || [] : [];
  }

  async getTutoriaById(id: number): Promise<Tutoria | null> {
    const response = await apiService.get<Tutoria>(`/tutorias.php?id=${id}`);
    return response.success ? response.data || null : null;
  }

  async createTutoria(tutoriaData: CreateTutoriaData): Promise<boolean> {
    const response = await apiService.post('/tutorias.php', tutoriaData);
    return response.success;
  }

  async updateTutoria(id: number, tutoriaData: Partial<CreateTutoriaData>): Promise<boolean> {
    const response = await apiService.put(`/tutorias.php?id=${id}`, tutoriaData);
    return response.success;
  }

  async deleteTutoria(id: number): Promise<boolean> {
    const response = await apiService.delete(`/tutorias.php?id=${id}`);
    return response.success;
  }

  async inscribirseTutoria(tutoriaId: number): Promise<boolean> {
    const response = await apiService.post('/tutorias.php', { 
      action: 'inscribirse', 
      tutoria_id: tutoriaId 
    });
    return response.success;
  }

  async getMisTutorias(): Promise<Tutoria[]> {
    const response = await apiService.get<Tutoria[]>('/tutorias.php?mis_tutorias=1');
    return response.success ? response.data || [] : [];
  }

  async getInscripciones(): Promise<InscripcionTutoria[]> {
    const response = await apiService.get<InscripcionTutoria[]>('/tutorias.php?inscripciones=1');
    return response.success ? response.data || [] : [];
  }
}

export default new TutoriaService();