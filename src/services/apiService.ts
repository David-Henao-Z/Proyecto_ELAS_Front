import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import type { ApiResponse } from '../interfaces';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptor para agregar token a las peticiones
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Interceptor para manejar respuestas y errores
    this.api.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => {
        return response;
      },
      (error) => {
        console.log('🚨 API Error Details:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers
        });
        
        // Solo redirigir al login si es realmente un error de autenticación
        if (error.response?.status === 401) {
          console.log('🔒 401 Unauthorized detected');
          console.log('🔑 Current token:', localStorage.getItem('token') ? 'EXISTS' : 'NOT_FOUND');
          console.log('👤 Current user:', localStorage.getItem('user') ? 'EXISTS' : 'NOT_FOUND');
          
          // Verificar si es el endpoint de estados de ánimo
          if (error.config?.url?.includes('estados-animo')) {
            console.log('❗ Error en endpoint de estados de ánimo - verificar backend');
            // No redirigir inmediatamente para este endpoint
            return Promise.reject(error);
          }
          
          console.log('🚪 Redirecting to login');
          // Token expirado o no válido
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Método para establecer el token de autenticación
  setAuthToken(token: string | null): void {
    if (token) {
      this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.api.defaults.headers.common['Authorization'];
    }
  }

  // Métodos HTTP genéricos
  async get<T>(url: string, params?: any): Promise<ApiResponse<T>> {
    try {
      console.log('🌐 ApiService.GET - URL:', url);
      console.log('🌐 ApiService.GET - Params:', params);
      
      const response = await this.api.get<ApiResponse<T>>(url, { params });
      
      console.log('📥 ApiService.GET - Response completa:', response);
      console.log('📥 ApiService.GET - Response.data:', response.data);
      console.log('📥 ApiService.GET - Response.status:', response.status);
      
      // Agregar el código de estado a la respuesta como en POST
      const result = {
        ...response.data,
        statusCode: response.status
      };
      
      console.log('📤 ApiService.GET - Retornando:', result);
      return result;
    } catch (error: any) {
      console.error('❌ ApiService.GET - Error:', error);
      return this.handleError(error);
    }
  }

  async post<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.post<ApiResponse<T>>(url, data);
      // Agregar el código de estado a la respuesta
      return {
        ...response.data,
        statusCode: response.status
      };
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async put<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.put<ApiResponse<T>>(url, data);
      return response.data;
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async delete<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.delete<ApiResponse<T>>(url);
      return response.data;
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  private handleError(error: any): ApiResponse {
    console.log('API Error:', error); // Debug log
    console.log('API Error Status:', error.response?.status); // Debug específico
    
    // Si la respuesta tiene status 200, no es realmente un error
    if (error.response && error.response.status === 200) {
      return {
        success: true,
        message: 'Operación exitosa',
        data: error.response.data,
        statusCode: 200
      };
    }
    
    if (error.response?.data) {
      return {
        ...error.response.data,
        statusCode: error.response.status
      };
    }
    
    return {
      success: false,
      message: error.message || 'Error de conexión',
      error: error.message,
      statusCode: error.response?.status || 500,
    };
  }

  // Método para subir archivos
  async uploadFile<T>(url: string, file: File, additionalData?: any): Promise<ApiResponse<T>> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      if (additionalData) {
        Object.keys(additionalData).forEach(key => {
          formData.append(key, additionalData[key]);
        });
      }

      const response = await this.api.post<ApiResponse<T>>(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    } catch (error: any) {
      return this.handleError(error);
    }
  }
}

export default new ApiService();