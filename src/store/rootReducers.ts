import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from '../slices/authReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  // Aquí se pueden agregar más reducers en el futuro
  // user: userReducer,
  // tutoria: tutoriaReducer,
});

export type RootState = ReturnType<typeof rootReducer>;