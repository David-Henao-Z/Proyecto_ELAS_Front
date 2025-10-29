// Interfaces para el sistema de Estados de Ánimo

export interface EstadoAnimo {
  id?: number;
  estado: string;
  comentario: string;
  fecha: string;
  usuario_id: number;
  usuario?: {
    nombre: string;
    email: string;
    rol_id: number;
    id: number;
    rol: {
      nombre: string;
      descripcion: string;
      id: number;
    };
  };
}

export interface EstadoAnimoRequest {
  estado: string;
  comentario: string;
  fecha?: string;
  usuario_id?: number;
}

export interface EstadoAnimoUpdateRequest {
  estado: string;
  comentario: string;
}

export interface EstadoAnimoResponse {
  success: boolean;
  message: string;
  data?: EstadoAnimo;
}

export interface EstadoAnimoListResponse {
  success: boolean;
  message: string;
  data?: EstadoAnimo[];
}

export interface EstadoAnimoState {
  estadosAnimo: EstadoAnimo[];
  historialEstados: EstadoAnimo[];
  currentEstado: EstadoAnimo | null;
  isLoading: boolean;
  isLoadingHistorial: boolean;
  error: string | null;
}

// Opciones de emociones predefinidas
export interface EmocionOption {
  value: string;
  label: string;
  emoji: string;
  color: string;
}

export const EMOCIONES: EmocionOption[] = [
  { value: 'feliz', label: 'Feliz', emoji: '😊', color: 'text-yellow-500' },
  { value: 'triste', label: 'Triste', emoji: '😢', color: 'text-blue-500' },
  { value: 'enojado', label: 'Enojado', emoji: '😠', color: 'text-red-500' },
  { value: 'aburrido', label: 'Aburrido', emoji: '😐', color: 'text-gray-500' },
  { value: 'ansioso', label: 'Ansioso', emoji: '😰', color: 'text-purple-500' },
  { value: 'emocionado', label: 'Emocionado', emoji: '🤩', color: 'text-orange-500' },
  { value: 'relajado', label: 'Relajado', emoji: '😌', color: 'text-green-500' },
  { value: 'confundido', label: 'Confundido', emoji: '😕', color: 'text-indigo-500' }
];