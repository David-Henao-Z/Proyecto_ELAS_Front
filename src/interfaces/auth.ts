// Interfaces para el sistema de autenticación

// Interfaz para el rol
export interface Rol {
  id: number;
  nombre: string;
  descripcion: string;
}

// Interfaz para el usuario según respuesta del backend
export interface User {
  id: number;
  nombre: string;
  email: string;
  rol_id: number;
  rol: Rol;
  apellido?: string;
  password?: string;
  fecha_registro?: string;
  telefono?: string;
  carrera?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// Interfaz para el registro según el backend
export interface RegisterData {
  nombre: string;
  email: string;
  rol_id: number;
  password: string;
  apellido?: string;
  telefono?: string;
  carrera?: string;
}

// Interfaz para la petición de registro al backend
export interface BackendRegisterRequest {
  nombre: string;
  email: string;
  rol_id: number;
  password: string;
}

// Interfaz para la respuesta del usuario del backend
export interface BackendUserResponse {
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

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
  data?: any;
  statusCode?: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}