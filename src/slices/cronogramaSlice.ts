import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Cronograma, CronogramaRequest, CronogramaUpdateRequest, CronogramaState } from '../interfaces/cronograma';
import cronogramaService from '../services/cronogramaService';

// Estado inicial
const initialState: CronogramaState = {
  cronogramas: [],
  currentCronograma: null,
  selectedDate: new Date().toISOString().split('T')[0],
  selectedMonth: new Date().toISOString().slice(0, 7),
  isLoading: false,
  error: null,
};

// Async Thunks

// Crear cronograma
export const crearCronogramaAsync = createAsyncThunk(
  'cronograma/crear',
  async (data: CronogramaRequest, { rejectWithValue }) => {
    try {
      const cronograma = await cronogramaService.crearCronograma(data);
      return cronograma;
    } catch (error: any) {
      console.error('❌ Error al crear cronograma:', error);
      return rejectWithValue(error.response?.data?.message || 'Error al crear cronograma');
    }
  }
);

// Obtener todos los cronogramas del usuario
export const obtenerCronogramasAsync = createAsyncThunk(
  'cronograma/obtenerTodos',
  async (usuarioId: number, { rejectWithValue }) => {
    try {
      const cronogramas = await cronogramaService.obtenerCronogramasUsuario(usuarioId);
      return cronogramas;
    } catch (error: any) {
      console.error('❌ Error al obtener cronogramas:', error);
      return rejectWithValue(error.response?.data?.message || 'Error al obtener cronogramas');
    }
  }
);

// Obtener cronograma por ID
export const obtenerCronogramaPorIdAsync = createAsyncThunk(
  'cronograma/obtenerPorId',
  async (id: number, { rejectWithValue }) => {
    try {
      const cronograma = await cronogramaService.obtenerCronogramaPorId(id);
      return cronograma;
    } catch (error: any) {
      console.error('❌ Error al obtener cronograma:', error);
      return rejectWithValue(error.response?.data?.message || 'Error al obtener cronograma');
    }
  }
);

// Actualizar cronograma
export const actualizarCronogramaAsync = createAsyncThunk(
  'cronograma/actualizar',
  async ({ id, data }: { id: number; data: CronogramaUpdateRequest }, { rejectWithValue }) => {
    try {
      const cronograma = await cronogramaService.actualizarCronograma(id, data);
      return cronograma;
    } catch (error: any) {
      console.error('❌ Error al actualizar cronograma:', error);
      return rejectWithValue(error.response?.data?.message || 'Error al actualizar cronograma');
    }
  }
);

// Eliminar cronograma
export const eliminarCronogramaAsync = createAsyncThunk(
  'cronograma/eliminar',
  async (id: number, { rejectWithValue }) => {
    try {
      await cronogramaService.eliminarCronograma(id);
      return id;
    } catch (error: any) {
      console.error('❌ Error al eliminar cronograma:', error);
      return rejectWithValue(error.response?.data?.message || 'Error al eliminar cronograma');
    }
  }
);

// Slice
const cronogramaSlice = createSlice({
  name: 'cronograma',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    
    setCronogramas: (state, action: PayloadAction<Cronograma[]>) => {
      state.cronogramas = action.payload;
    },
    
    addCronograma: (state, action: PayloadAction<Cronograma>) => {
      state.cronogramas.push(action.payload);
    },
    
    updateCronogramaInList: (state, action: PayloadAction<Cronograma>) => {
      const index = state.cronogramas.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.cronogramas[index] = action.payload;
      }
    },
    
    removeCronograma: (state, action: PayloadAction<number>) => {
      state.cronogramas = state.cronogramas.filter(c => c.id !== action.payload);
    },
    
    setCurrentCronograma: (state, action: PayloadAction<Cronograma | null>) => {
      state.currentCronograma = action.payload;
    },
    
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
    
    setSelectedMonth: (state, action: PayloadAction<string>) => {
      state.selectedMonth = action.payload;
    },
    
    resetCronogramaState: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    // Crear cronograma
    builder.addCase(crearCronogramaAsync.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(crearCronogramaAsync.fulfilled, (state, action: PayloadAction<Cronograma>) => {
      state.isLoading = false;
      state.cronogramas.push(action.payload);
      state.currentCronograma = action.payload;
    });
    builder.addCase(crearCronogramaAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Obtener todos los cronogramas
    builder.addCase(obtenerCronogramasAsync.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(obtenerCronogramasAsync.fulfilled, (state, action: PayloadAction<Cronograma[]>) => {
      state.isLoading = false;
      state.cronogramas = action.payload;
    });
    builder.addCase(obtenerCronogramasAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Obtener cronograma por ID
    builder.addCase(obtenerCronogramaPorIdAsync.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(obtenerCronogramaPorIdAsync.fulfilled, (state, action: PayloadAction<Cronograma>) => {
      state.isLoading = false;
      state.currentCronograma = action.payload;
    });
    builder.addCase(obtenerCronogramaPorIdAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Actualizar cronograma
    builder.addCase(actualizarCronogramaAsync.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(actualizarCronogramaAsync.fulfilled, (state, action: PayloadAction<Cronograma>) => {
      state.isLoading = false;
      const index = state.cronogramas.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.cronogramas[index] = action.payload;
      }
      state.currentCronograma = action.payload;
    });
    builder.addCase(actualizarCronogramaAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Eliminar cronograma
    builder.addCase(eliminarCronogramaAsync.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(eliminarCronogramaAsync.fulfilled, (state, action: PayloadAction<number>) => {
      state.isLoading = false;
      state.cronogramas = state.cronogramas.filter(c => c.id !== action.payload);
      if (state.currentCronograma?.id === action.payload) {
        state.currentCronograma = null;
      }
    });
    builder.addCase(eliminarCronogramaAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const {
  clearError,
  setCronogramas,
  addCronograma,
  updateCronogramaInList,
  removeCronograma,
  setCurrentCronograma,
  setSelectedDate,
  setSelectedMonth,
  resetCronogramaState,
} = cronogramaSlice.actions;

export default cronogramaSlice.reducer;
