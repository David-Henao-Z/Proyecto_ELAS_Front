export interface EstadisticasGenerales {
  total_usuarios: number;
  total_tareas: number;
  total_eventos_cronograma: number;
  total_tutorias: number;
  total_registros_estado_animo: number;
}

export interface EstadisticasState {
  estadisticas: EstadisticasGenerales | null;
  isLoading: boolean;
  error: string | null;
}

export interface EstadisticasResponse {
  success: boolean;
  message?: string;
  data?: EstadisticasGenerales;
  statusCode?: number;
}
