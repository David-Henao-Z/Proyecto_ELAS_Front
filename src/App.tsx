import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from './store/hooks';
import { initializeAuthAsync } from './slices/authReducer';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Inicializar el estado de autenticación al cargar la app
    dispatch(initializeAuthAsync());
  }, [dispatch]);

  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App
