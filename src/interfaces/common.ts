// Interfaz para respuestas de API
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  statusCode?: number;
}

// Interfaces generales
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

// Estados de carga
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// Filtros comunes
export interface DateFilter {
  fechaInicio?: string;
  fechaFin?: string;
}

export interface SearchFilter {
  busqueda?: string;
  materia?: string;
  modalidad?: string;
}