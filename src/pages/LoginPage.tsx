import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginAsync, clearError } from '../slices/authReducer';
import { Button, Input, Label } from '../components/atoms';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear field error when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = () => {
    const errors: { email?: string; password?: string } = {};
    
    if (!formData.email) {
      errors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Por favor ingresa un email válido';
    }
    
    if (!formData.password) {
      errors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const result = await dispatch(loginAsync(formData));
      
      console.log('Login result:', result); // Debug log
      
      // Si el login es exitoso, redirigir al dashboard
      if (loginAsync.fulfilled.match(result)) {
        console.log('Login successful, redirecting to dashboard'); // Debug log
        navigate('/dashboard', { replace: true });
      } else if (loginAsync.rejected.match(result)) {
        console.error('Login failed:', result.payload); // Debug log
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: "url('/images/Fondo.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay para mejorar legibilidad */}
      <div className="absolute inset-0 bg-elas-navy/20"></div>
      
      <div className="relative z-10 max-w-md w-full">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="mx-auto h-20 w-auto flex justify-center mb-4">
            <img
              src="/images/logo.png"
              alt="ELAS Logo"
              className="h-full w-auto"
            />
          </div>
          <h1 className="text-3xl font-bold text-elas-navy mb-2 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
            Bienvenida a ELAS
          </h1>
          <p className="text-elas-navy bg-white/80 backdrop-blur-sm rounded-lg p-2">Inicia sesión para continuar</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-elas-blue/30 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div>
              <Label htmlFor="email" required className="text-elas-navy mb-2">
                Correo Electrónico
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Ingresa tu correo electrónico"
                className={`mt-1 border-elas-navy/30 focus:border-elas-blue focus:ring-elas-blue ${formErrors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                disabled={isLoading}
              />
              {formErrors.email && (
                <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password" required className="text-elas-navy mb-2">
                Contraseña
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Tu contraseña"
                className={`mt-1 border-elas-navy/30 focus:border-elas-blue focus:ring-elas-blue ${formErrors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                disabled={isLoading}
              />
              {formErrors.password && (
                <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link to="/register" className="font-medium text-elas-blue hover:text-elas-blue/80 transition-colors">
                  ¿No tienes cuenta? Regístrate
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isLoading}
              className="w-full bg-elas-blue text-elas-navy hover:bg-elas-blue/90 border-0 font-semibold transition-colors"
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link 
              to="/" 
              className="text-sm text-elas-navy/70 hover:text-elas-navy underline transition-colors"
            >
              Volver al inicio
            </Link>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-white bg-elas-navy/80 backdrop-blur-sm rounded-lg p-3 shadow-lg">
            © 2024 ELAS. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;