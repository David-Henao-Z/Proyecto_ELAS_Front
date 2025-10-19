import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logoutAsync } from '../slices/authReducer';
import TutoriasPage from './TutoriasPage';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [activeSection, setActiveSection] = useState('cronograma');

  const handleLogout = async () => {
    await dispatch(logoutAsync());
    navigate('/', { replace: true });
  };

  const sidebarItems = [
    { id: 'cronograma', label: 'Cronograma', icon: '📅' },
    { id: 'estadisticas', label: 'Estadísticas', icon: '📊' },
    { id: 'estado-animo', label: 'Estado de Ánimo', icon: '💝' },
    { id: 'tutorias', label: 'Tutorías', icon: '👥' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'cronograma':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-caprasimo text-elas-navy mb-4">Cronograma</h2>
            <p className="font-questrial text-gray-600">Aquí puedes ver tu cronograma de actividades.</p>
          </div>
        );
      case 'estadisticas':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-caprasimo text-elas-navy mb-4">Estadísticas</h2>
            <p className="font-questrial text-gray-600">Visualiza tus estadísticas y progreso.</p>
          </div>
        );
      case 'estado-animo':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-caprasimo text-elas-navy mb-4">Estado de Ánimo</h2>
            <p className="font-questrial text-gray-600">Registra y monitorea tu estado emocional.</p>
          </div>
        );
      case 'tutorias':
        return <TutoriasPage />;
      default:
        return (
          <div className="p-6">
            <h2 className="text-2xl font-caprasimo text-elas-navy mb-4">Bienvenida a ELAS</h2>
            <p className="font-questrial text-gray-600">Selecciona una opción del menú lateral.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-elas-navy shadow-lg">
        {/* Logo */}
        <div className="p-6 border-b border-elas-navy/20">
          <div className="flex items-center justify-center">
            <img
              src="/images/logo.png"
              alt="ELAS Logo"
              className="h-12 w-auto"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg font-questrial transition-colors ${
                    activeSection === item.id
                      ? 'bg-elas-blue text-elas-navy font-medium'
                      : 'text-elas-blue hover:bg-elas-blue/10 hover:text-white'
                  }`}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-xl font-caprasimo text-elas-navy">
                Dashboard ELAS
              </h1>
            </div>
            
            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-elas-blue rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-elas-navy"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="font-questrial text-gray-700 hidden md:block">
                  {user?.nombre || 'Usuario'}
                </span>
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                  <div className="py-1">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm font-questrial text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <svg
                        className="w-4 h-4 mr-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>

      {/* Overlay para cerrar menú en móvil */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;