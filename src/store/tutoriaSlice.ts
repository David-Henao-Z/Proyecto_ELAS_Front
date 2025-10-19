import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { tutoriaService } from '../services';
import type { Tutoria, CreateTutoriaData, SearchFilter } from '../interfaces';

interface TutoriaState {
  tutorias: Tutoria[];
  misTutorias: Tutoria[];
  selectedTutoria: Tutoria | null;
  isLoading: boolean;
  error: string | null;
  filters: SearchFilter;
}

const initialState: TutoriaState = {
  tutorias: [],
  misTutorias: [],
  selectedTutoria: null,
  isLoading: false,
  error: null,
  filters: {},
};

// Async thunks
export const fetchTutorias = createAsyncThunk(
  'tutoria/fetchTutorias',
  async (filters: SearchFilter | undefined, { rejectWithValue }) => {
    try {
      return await tutoriaService.getTutorias(filters);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al cargar tutorías');
    }
  }
);

export const fetchMisTutorias = createAsyncThunk(
  'tutoria/fetchMisTutorias',
  async (_, { rejectWithValue }) => {
    try {
      return await tutoriaService.getMisTutorias();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al cargar mis tutorías');
    }
  }
);

export const createTutoria = createAsyncThunk(
  'tutoria/createTutoria',
  async (tutoriaData: CreateTutoriaData, { rejectWithValue }) => {
    try {
      const success = await tutoriaService.createTutoria(tutoriaData);
      if (success) {
        return tutoriaData;
      }
      return rejectWithValue('Error al crear la tutoría');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al crear la tutoría');
    }
  }
);

export const inscribirseTutoria = createAsyncThunk(
  'tutoria/inscribirseTutoria',
  async (tutoriaId: number, { rejectWithValue }) => {
    try {
      const success = await tutoriaService.inscribirseTutoria(tutoriaId);
      if (success) {
        return tutoriaId;
      }
      return rejectWithValue('Error al inscribirse a la tutoría');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al inscribirse a la tutoría');
    }
  }
);

const tutoriaSlice = createSlice({
  name: 'tutoria',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setSelectedTutoria: (state, action) => {
      state.selectedTutoria = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch Tutorias
    builder
      .addCase(fetchTutorias.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTutorias.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tutorias = action.payload;
      })
      .addCase(fetchTutorias.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch Mis Tutorias
    builder
      .addCase(fetchMisTutorias.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMisTutorias.fulfilled, (state, action) => {
        state.isLoading = false;
        state.misTutorias = action.payload;
      })
      .addCase(fetchMisTutorias.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Create Tutoria
    builder
      .addCase(createTutoria.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createTutoria.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createTutoria.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Inscribirse Tutoria
    builder
      .addCase(inscribirseTutoria.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(inscribirseTutoria.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(inscribirseTutoria.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilters, clearError, setSelectedTutoria } = tutoriaSlice.actions;
export default tutoriaSlice.reducer;