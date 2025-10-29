import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User, LoginCredentials, RegisterData, AuthResponse, BackendRegisterRequest } from '../interfaces/auth';
import authService from '../services/authService';

// Estado inicial limpio - solo token persiste en localStorage
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Async thunks que conectan con el service
export const loginAsync = createAsyncThunk<
  { user: User; token: string },
  LoginCredentials,
  { rejectValue: string }
>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      console.log('🚀 LoginAsync - Iniciando login con:', credentials);
      const response = await authService.login(credentials);
      
      if (response.success && response.user && response.token) {
        console.log('✅ LoginAsync - Login exitoso:', response.user);
        return {
          user: response.user,
          token: response.token
        };
      }
      
      return rejectWithValue(response.message || 'Error en el inicio de sesión');
    } catch (error: any) {
      console.error('❌ LoginAsync - Error:', error);
      return rejectWithValue(error.message || 'Error en el inicio de sesión');
    }
  }
);

export const registerAsync = createAsyncThunk<
  AuthResponse,
  RegisterData,
  { rejectValue: string }
>(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const backendData: BackendRegisterRequest = {
        nombre: userData.nombre,
        email: userData.email,
        rol_id: userData.rol_id || 1,
        password: userData.password,
      };
      
      const response = await authService.register(backendData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error en el registro');
    }
  }
);

export const logoutAsync = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al cerrar sesión');
    }
  }
);

// Thunk para inicializar el estado desde localStorage si existe
export const initializeAuthAsync = createAsyncThunk<
  { user: User; token: string } | null,
  void,
  { rejectValue: string }
>(
  'auth/initialize',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      
      if (token && userStr) {
        const user = JSON.parse(userStr);
        console.log('🔄 InitializeAuth - Usuario encontrado en localStorage:', user);
        return { user, token };
      }
      
      console.log('🔄 InitializeAuth - No hay datos en localStorage');
      return null;
    } catch (error: any) {
      console.error('❌ InitializeAuth - Error:', error);
      return rejectWithValue('Error al inicializar autenticación');
    }
  }
);

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action para limpiar errores
    clearError: (state) => {
      state.error = null;
    },
    
    // Action para limpiar toda la autenticación
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('token');
      console.log('🧹 AuthSlice - Estado limpiado');
    },
    
    // Action para establecer credenciales directamente en el estado
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token);
      console.log('🔐 AuthSlice - Credenciales establecidas:', action.payload.user);
    },
    
    // Action para establecer solo el usuario (útil para actualizaciones)
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      console.log('👤 AuthSlice - Usuario actualizado:', action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        
        // Solo el token va al localStorage
        localStorage.setItem('token', action.payload.token);
        
        console.log('🏪 AuthSlice - Usuario guardado en Redux store:', action.payload.user);
        console.log('� AuthSlice - User ID:', action.payload.user.id);
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Error en el inicio de sesión';
        state.isAuthenticated = false;
      })
      
      // Register
      .addCase(registerAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        // No establecer autenticación automática después del registro
        // El usuario debe hacer login después del registro
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Error en el registro';
      })
      
      // Logout
      .addCase(logoutAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
        localStorage.removeItem('token');
        console.log('🚪 AuthSlice - Logout exitoso');
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Error al cerrar sesión';
        // Limpiar la sesión aún si hay error
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem('token');
        console.log('⚠️ AuthSlice - Logout con error, pero sesión limpiada');
      })
      
      // Initialize
      .addCase(initializeAuthAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
          console.log('🚀 AuthSlice - Estado inicializado:', action.payload.user);
        } else {
          console.log('🚀 AuthSlice - No hay datos para inicializar');
        }
      });
  },
});

export const { clearError, clearAuth, setCredentials, setUser } = authSlice.actions;
export const authReducer = authSlice.reducer;