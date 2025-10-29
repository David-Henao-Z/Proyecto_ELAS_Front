import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from '../slices/authReducer';
import { estadoAnimoReducer } from '../slices/estadoAnimoSlice';
import cronogramaReducer from '../slices/cronogramaSlice';
import { estadisticasReducer } from '../slices/estadisticasSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  estadoAnimo: estadoAnimoReducer,
  cronograma: cronogramaReducer,
  estadisticas: estadisticasReducer,
  // Aquí se pueden agregar más reducers en el futuro
  // user: userReducer,
  // tutoria: tutoriaReducer,
});

export type RootState = ReturnType<typeof rootReducer>;