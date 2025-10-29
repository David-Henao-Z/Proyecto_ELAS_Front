// Interfaces para el sistema de cronograma

// Interfaz para el usuario (referencia)
interface Usuario {
  nombre: string;
  email: string;
  rol_id: number;
  id: number;
  rol: {
    nombre: string;
    descripcion: string;
    id: number;
  };
}

// Interfaz principal de Cronograma
export interface Cronograma {
  id?: number;
  titulo: string;
  descripcion: string;
  fecha_inicio: string; // ISO string
  fecha_fin: string; // ISO string
  usuario_id: number;
  usuario?: Usuario;
}

// Request para crear cronograma
export interface CronogramaRequest {
  titulo: string;
  descripcion: string;
  fecha_inicio: string;
  fecha_fin: string;
  usuario_id: number;
}

// Request para actualizar cronograma
export interface CronogramaUpdateRequest {
  titulo?: string;
  descripcion?: string;
  fecha_inicio?: string;
  fecha_fin?: string;
}

// Response del service
export interface CronogramaResponse {
  success: boolean;
  message: string;
  data?: Cronograma;
}

// Response para lista de cronogramas
export interface CronogramaListResponse {
  success: boolean;
  message: string;
  data: Cronograma[];
}

// Estado de Redux
export interface CronogramaState {
  cronogramas: Cronograma[];
  currentCronograma: Cronograma | null;
  selectedDate: string; // YYYY-MM-DD
  selectedMonth: string; // YYYY-MM
  isLoading: boolean;
  error: string | null;
}

// Helper para formatear fechas
export const formatDateToISO = (date: Date): string => {
  return date.toISOString();
};

export const formatDateToDisplay = (isoString: string): string => {
  return new Date(isoString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatTimeToDisplay = (isoString: string): string => {
  return new Date(isoString).toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  });
};
