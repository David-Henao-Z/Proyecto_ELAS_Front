import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { EstadisticasGenerales, EstadisticasState } from '../interfaces/estadisticas';
import estadisticasService from '../services/estadisticasService';

const initialState: EstadisticasState = {
  estadisticas: null,
  isLoading: false,
  error: null,
};

export const obtenerEstadisticasGeneralesAsync = createAsyncThunk<
  EstadisticasGenerales,
  void,
  { rejectValue: string }
>(
  'estadisticas/obtenerGenerales',
  async (_, { rejectWithValue }) => {
    try {
      const response = await estadisticasService.obtenerEstadisticasGenerales();
      
      if (response.success && response.data) {
        return response.data;
      }
      
      return rejectWithValue(response.message || 'Error al obtener estadísticas');
    } catch (error: any) {
      console.error('❌ Error al obtener estadísticas:', error);
      return rejectWithValue(error.message || 'Error al obtener estadísticas');
    }
  }
);

const estadisticasSlice = createSlice({
  name: 'estadisticas',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(obtenerEstadisticasGeneralesAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(obtenerEstadisticasGeneralesAsync.fulfilled, (state, action: PayloadAction<EstadisticasGenerales>) => {
        state.isLoading = false;
        state.error = null;
        state.estadisticas = action.payload;
      })
      .addCase(obtenerEstadisticasGeneralesAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Error al obtener estadísticas';
      });
  },
});

export const { clearError } = estadisticasSlice.actions;
export const estadisticasReducer = estadisticasSlice.reducer;
