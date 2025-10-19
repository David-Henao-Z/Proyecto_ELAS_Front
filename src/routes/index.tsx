import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { 
  HomePage, 
  LoginPage, 
  RegisterPage, 
  Dashboard,
  TutoriasPage, 
  CronogramaPage, 
  EstadisticasPage, 
  EstadoPage, 
  NosotrasPage 
} from '../pages';
import { ProtectedRoute } from '../components/organisms';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'nosotras',
        element: <NosotrasPage />,
      },
      {
        path: 'tutorias',
        element: (
          <ProtectedRoute>
            <TutoriasPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'cronograma',
        element: (
          <ProtectedRoute>
            <CronogramaPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'estadisticas',
        element: (
          <ProtectedRoute>
            <EstadisticasPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'estado',
        element: (
          <ProtectedRoute>
            <EstadoPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);