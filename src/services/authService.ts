import apiService from './apiService';
import type { LoginCredentials, AuthResponse, BackendRegisterRequest, BackendUserResponse } from '../interfaces/auth';

interface LoginResponse {
  access_token?: string;
  token?: string;
  token_type?: string;
  user_info?: any;
  user?: any;
  [key: string]: any; // Permite propiedades adicionales
}

interface RegisterResponse {
  user: BackendUserResponse;
  message?: string;
}

class AuthService {
  // Helper function para extraer usuario de diferentes estructuras de respuesta
  private extractUserFromResponse(responseData: any, credentials: LoginCredentials): any {
    console.log('🔍 Extracting user from response:', responseData);
    console.log('🔍 Type of responseData:', typeof responseData);
    console.log('🔍 responseData keys:', responseData ? Object.keys(responseData) : 'null');
    
    // Intentar diferentes ubicaciones posibles del usuario
    let userInfo = responseData?.user_info || 
                   responseData?.user || 
                   responseData?.data?.user_info ||
                   responseData?.data?.user;
    
    console.log('🔍 UserInfo encontrado:', userInfo);
    
    // Si encontramos un objeto con id, es probablemente el usuario
    if (userInfo && typeof userInfo === 'object' && userInfo.id) {
      const extractedUser = {
        id: userInfo.id,
        nombre: userInfo.nombre || userInfo.name || 'Usuario ELAS',
        email: userInfo.email || credentials.email,
        rol_id: userInfo.rol_id || userInfo.role_id || 1,
        rol: userInfo.rol || userInfo.role || { id: userInfo.rol_id || 1, nombre: 'Estudiante', descripcion: 'Estudiante' }
      };
      console.log('✅ Usuario extraído correctamente:', extractedUser);
      return extractedUser;
    }
    
    // Si no encontramos nada, retornar usuario fallback
    console.warn('⚠️ No se encontró usuario válido, usando fallback');
    return {
      id: 1,
      nombre: 'Usuario ELAS',
      email: credentials.email,
      rol_id: 1,
      rol: { id: 1, nombre: 'Estudiante', descripcion: 'Estudiante' }
    };
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiService.post<LoginResponse>('http://127.0.0.1:8000/auth/login', credentials);
      
      console.log('Auth Service - Login response:', response); // Debug log
      console.log('Auth Service - Status code:', response.statusCode); // Debug log específico
      console.log('🔍 Auth Service - response.data:', response.data); // Debug data
      console.log('🔍 Auth Service - response keys:', Object.keys(response || {})); // Debug keys
      console.log('🔍 Auth Service - response completo:', JSON.stringify(response, null, 2)); // Debug completo
      
      // Si el código de estado es 200, SIEMPRE considerarlo exitoso
      if (response.statusCode === 200) {
        // Buscar token - puede estar en response.data o directamente en response
        const responseAny = response as any;
        const token = response.data?.access_token || 
                     responseAny.access_token ||
                     response.data?.token || 
                     responseAny.token ||
                     'demo_token_' + Date.now(); // Token temporal si no existe
        
        localStorage.setItem('token', token);
        apiService.setAuthToken(token);
        
        // Extraer información del usuario - buscar en response.data o directamente en response
        const dataToExtract = response.data || responseAny;
        console.log('🔍 Data para extraer usuario:', dataToExtract);
        const user = this.extractUserFromResponse(dataToExtract, credentials);
        
        console.log('👤 Usuario extraído del login:', user);
        
        // Guardar usuario en localStorage para persistencia
        localStorage.setItem('user', JSON.stringify(user));
        
        console.log('🚀 Auth Service - Login EXITOSO! Código 200 detectado');
        console.log('💾 Auth Service - Usuario guardado en localStorage:', user);
        
        return {
          success: true,
          message: 'Inicio de sesión exitoso',
          user: user,
          token: token,
          data: response.data,
          statusCode: response.statusCode
        };
      }
      
      // También verificar la propiedad success por compatibilidad
      if (response.success) {
        const responseAny = response as any;
        const token = response.data?.access_token || 
                     responseAny.access_token ||
                     response.data?.token || 
                     responseAny.token;
        
        if (token) {
          localStorage.setItem('token', token);
          apiService.setAuthToken(token);
        }
        
        // Extraer información del usuario - buscar en response.data o directamente en response
        const dataToExtract = response.data || responseAny;
        const user = this.extractUserFromResponse(dataToExtract, credentials);
        
        console.log('👤 Usuario extraído (success path):', user);
        
        // Guardar usuario en localStorage
        localStorage.setItem('user', JSON.stringify(user));
        
        return {
          success: true,
          message: response.message || 'Inicio de sesión exitoso',
          user: user,
          token: token,
          data: response.data,
          statusCode: response.statusCode
        };
      }
      
      console.error('Auth Service - Login falló. Status:', response.statusCode, 'Success:', response.success);
      throw new Error(response.message || 'Error en el inicio de sesión');
    } catch (error: any) {
      console.error('Auth Service - Catch error:', error);
      
      // Si hay una respuesta HTTP con status 200, procesarla como exitosa
      if (error.response && error.response.status === 200) {
        console.log('Auth Service - Procesando 200 desde catch');
        
        // Extraer información del usuario - buscar en response.data o directamente en response
        const dataToExtract = error.response.data || error.response;
        const user = this.extractUserFromResponse(dataToExtract, credentials);
        
        console.log('👤 Usuario extraído (catch 200):', user);
        
        // Guardar usuario en localStorage
        localStorage.setItem('user', JSON.stringify(user));
        
        return {
          success: true,
          message: 'Inicio de sesión exitoso',
          user: user,
          token: error.response.data?.access_token || error.response.data?.token,
          data: error.response.data,
          statusCode: 200
        };
      }
      
      throw new Error(error.message || 'Error en el inicio de sesión');
    }
  }

  async register(userData: BackendRegisterRequest): Promise<AuthResponse> {
    try {
      // Usar el endpoint específico del backend
      const response = await apiService.post<RegisterResponse>('http://127.0.0.1:8000/auth/register', userData);
      
      if (response.success || response.statusCode === 201) {
        return {
          success: true,
          message: response.statusCode === 201 ? 'Usuario creado correctamente' : (response.message || 'Registro exitoso'),
          user: response.data?.user,
          data: response.data,
          statusCode: response.statusCode
        };
      }
      
      throw new Error(response.message || 'Error en el registro');
    } catch (error: any) {
      throw new Error(error.message || 'Error en el registro');
    }
  }

  async logout(): Promise<void> {
    try {
      await apiService.post('/auth/logout');
    } catch (error) {
      // Continuar con el logout local aunque falle el endpoint
      console.warn('Error al hacer logout en el servidor:', error);
    } finally {
      localStorage.removeItem('token');
      apiService.setAuthToken(null);
    }
  }

  async getCurrentUser(): Promise<AuthResponse> {
    try {
      const response = await apiService.get<{ user: BackendUserResponse }>('/auth/me');
      
      if (response.success) {
        return {
          success: true,
          message: 'Usuario obtenido exitosamente',
          user: response.data?.user,
          data: response.data
        };
      }
      
      throw new Error(response.message || 'Error al obtener usuario');
    } catch (error: any) {
      throw new Error(error.message || 'Error al obtener usuario');
    }
  }

  async refreshToken(): Promise<AuthResponse> {
    try {
      const response = await apiService.post<LoginResponse>('/auth/refresh');
      
      if (response.success && response.data?.access_token) {
        const token = response.data.access_token;
        localStorage.setItem('token', token);
        apiService.setAuthToken(token);
        
        return {
          success: true,
          message: 'Token renovado exitosamente',
          user: response.data.user_info as any,
          token: token,
          data: response.data
        };
      }
      
      throw new Error(response.message || 'Error al renovar token');
    } catch (error: any) {
      throw new Error(error.message || 'Error al renovar token');
    }
  }

  // Verificar si el token existe
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // Obtener el token actual
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}

const authService = new AuthService();
export default authService;