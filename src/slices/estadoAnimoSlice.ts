import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { 
  EstadoAnimo, 
  EstadoAnimoRequest, 
  EstadoAnimoUpdateRequest,
  EstadoAnimoState 
} from '../interfaces/estadoAnimo';
import estadoAnimoService from '../services/estadoAnimoService';

// Estado inicial limpio
const initialState: EstadoAnimoState = {
  estadosAnimo: [],
  historialEstados: [],
  currentEstado: null,
  isLoading: false,
  isLoadingHistorial: false,
  error: null,
};

// Async thunks que conectan con el service
export const crearEstadoAnimoAsync = createAsyncThunk<
  EstadoAnimo,
  EstadoAnimoRequest,
  { rejectValue: string }
>(
  'estadoAnimo/crear',
  async (data, { rejectWithValue }) => {
    try {
      console.log('� CreateThunk - Creando estado con:', data);
      const response = await estadoAnimoService.crearEstadoAnimo(data);
      console.log('✅ CreateThunk - Response del service:', response);
      
      if (response.success && response.data) {
        console.log('✅ CreateThunk - Retornando:', response.data);
        return response.data;
      }
      
      console.error('❌ CreateThunk - Error:', response.message);
      return rejectWithValue(response.message || 'Error al crear estado de ánimo');
    } catch (error: any) {
      console.error('❌ CreateThunk - Exception:', error);
      return rejectWithValue(error.message || 'Error al crear estado de ánimo');
    }
  }
);

export const obtenerEstadoAnimoAsync = createAsyncThunk<
  EstadoAnimo,
  number,
  { rejectValue: string }
>(
  'estadoAnimo/obtener',
  async (id, { rejectWithValue }) => {
    try {
      const response = await estadoAnimoService.obtenerEstadoAnimo(id);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al obtener estado de ánimo');
    }
  }
);

export const obtenerEstadosAnimoUsuarioAsync = createAsyncThunk<
  EstadoAnimo[],
  number | undefined,
  { rejectValue: string }
>(
  'estadoAnimo/obtenerTodos',
  async (usuarioId, { rejectWithValue }) => {
    try {
      console.log('� GetAllThunk - Obteniendo estados para usuario:', usuarioId);
      const response = await estadoAnimoService.obtenerEstadosAnimoUsuario(usuarioId);
      console.log('� GetAllThunk - Response del service:', response);
      console.log('� GetAllThunk - Response.success:', response.success);
      console.log('� GetAllThunk - Response.data:', response.data);
      console.log('📦 GetAllThunk - Es array?:', Array.isArray(response.data));
      
      if (response.success && response.data) {
        console.log('✅ GetAllThunk - Retornando array de', response.data.length, 'elementos');
        console.log('✅ GetAllThunk - Datos:', response.data);
        return response.data;
      }
      
      console.error('❌ GetAllThunk - Error:', response.message);
      return rejectWithValue(response.message || 'Error al obtener estados de ánimo');
    } catch (error: any) {
      console.error('❌ GetAllThunk - Exception:', error);
      return rejectWithValue(error.message || 'Error al obtener estados de ánimo');
    }
  }
);

export const actualizarEstadoAnimoAsync = createAsyncThunk<
  EstadoAnimo,
  { id: number; data: EstadoAnimoUpdateRequest },
  { rejectValue: string }
>(
  'estadoAnimo/actualizar',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await estadoAnimoService.actualizarEstadoAnimo(id, data);
      
      if (response.success && response.data) {
        return response.data;
      }
      
      return rejectWithValue(response.message || 'Error al actualizar estado de ánimo');
    } catch (error: any) {
      console.error('❌ Error al actualizar estado de ánimo:', error);
      return rejectWithValue(error.message || 'Error al actualizar estado de ánimo');
    }
  }
);

export const eliminarEstadoAnimoAsync = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>(
  'estadoAnimo/eliminar',
  async (id, { rejectWithValue }) => {
    try {
      const response = await estadoAnimoService.eliminarEstadoAnimo(id);
      if (response.success) {
        return id;
      }
      throw new Error(response.message);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al eliminar estado de ánimo');
    }
  }
);

// Slice con reducers síncronos
const estadoAnimoSlice = createSlice({
  name: 'estadoAnimo',
  initialState,
  reducers: {
    // Limpiar errores
    clearError: (state) => {
      state.error = null;
    },
    
    // Limpiar estado actual
    clearCurrentEstado: (state) => {
      state.currentEstado = null;
    },
    
    // Establecer estado actual
    setCurrentEstado: (state, action: PayloadAction<EstadoAnimo>) => {
      state.currentEstado = action.payload;
    },
    
    // Agregar estado al historial
    addEstadoToHistorial: (state, action: PayloadAction<EstadoAnimo>) => {
      state.historialEstados.unshift(action.payload);
    },
    
    // Establecer historial completo
    setHistorial: (state, action: PayloadAction<EstadoAnimo[]>) => {
      state.historialEstados = action.payload.sort((a, b) => 
        new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
      );
    },
    
    // Actualizar estado en el historial
    updateEstadoInHistorial: (state, action: PayloadAction<EstadoAnimo>) => {
      const index = state.historialEstados.findIndex(e => e.id === action.payload.id);
      if (index !== -1) {
        state.historialEstados[index] = action.payload;
      }
    },
    
    // Eliminar estado del historial
    removeEstadoFromHistorial: (state, action: PayloadAction<number>) => {
      state.historialEstados = state.historialEstados.filter(e => e.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Crear estado de ánimo
      .addCase(crearEstadoAnimoAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(crearEstadoAnimoAsync.fulfilled, (state, action: PayloadAction<EstadoAnimo>) => {
        state.isLoading = false;
        state.error = null;
        state.estadosAnimo.unshift(action.payload);
        state.historialEstados.unshift(action.payload);
        state.currentEstado = action.payload;
      })
      .addCase(crearEstadoAnimoAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Error al crear estado de ánimo';
      })
      
      // Obtener estado de ánimo individual
      .addCase(obtenerEstadoAnimoAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(obtenerEstadoAnimoAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.currentEstado = action.payload;
      })
      .addCase(obtenerEstadoAnimoAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Error al obtener estado de ánimo';
      })
      
      // Obtener todos los estados de ánimo (historial)
      .addCase(obtenerEstadosAnimoUsuarioAsync.pending, (state) => {
        state.isLoadingHistorial = true;
        state.error = null;
      })
      .addCase(obtenerEstadosAnimoUsuarioAsync.fulfilled, (state, action: PayloadAction<EstadoAnimo[]>) => {
        state.isLoadingHistorial = false;
        state.error = null;
        state.historialEstados = action.payload.sort((a, b) => 
          new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
        );
      })
      .addCase(obtenerEstadosAnimoUsuarioAsync.rejected, (state, action) => {
        state.isLoadingHistorial = false;
        state.error = action.payload || 'Error al obtener estados de ánimo';
      })
      
      // Actualizar estado de ánimo
      .addCase(actualizarEstadoAnimoAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(actualizarEstadoAnimoAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        
        // Actualizar en estadosAnimo
        const index = state.estadosAnimo.findIndex(estado => estado.id === action.payload.id);
        if (index !== -1) {
          state.estadosAnimo[index] = action.payload;
        }
        
        // Actualizar en historialEstados
        const historialIndex = state.historialEstados.findIndex(estado => estado.id === action.payload.id);
        if (historialIndex !== -1) {
          state.historialEstados[historialIndex] = action.payload;
        }
        
        state.currentEstado = action.payload;
      })
      .addCase(actualizarEstadoAnimoAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Error al actualizar estado de ánimo';
      })
      
      // Eliminar estado de ánimo
      .addCase(eliminarEstadoAnimoAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(eliminarEstadoAnimoAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.estadosAnimo = state.estadosAnimo.filter(estado => estado.id !== action.payload);
        if (state.currentEstado?.id === action.payload) {
          state.currentEstado = null;
        }
      })
      .addCase(eliminarEstadoAnimoAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Error al eliminar estado de ánimo';
      });
  },
});

export const { 
  clearError, 
  clearCurrentEstado, 
  setCurrentEstado,
  addEstadoToHistorial,
  setHistorial,
  updateEstadoInHistorial,
  removeEstadoFromHistorial
} = estadoAnimoSlice.actions;

export const estadoAnimoReducer = estadoAnimoSlice.reducer;