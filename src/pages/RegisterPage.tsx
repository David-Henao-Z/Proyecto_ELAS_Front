import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { registerAsync, clearError } from '../slices/authReducer';
import { Button, Input, Label, AlertDialog } from '../components/atoms';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmPassword: '',
    telefono: '',
    carrera: '',
    rol_id: 1, // Por defecto rol de estudiante
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [successVariant, setSuccessVariant] = useState<'default' | 'success'>('default');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
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
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.nombre.trim()) {
      errors.nombre = 'El nombre es requerido';
    }
    
    if (!formData.apellido.trim()) {
      errors.apellido = 'El apellido es requerido';
    }
    
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
    
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Confirma tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Preparar datos para el backend según la estructura requerida
    const registerData = {
      nombre: formData.nombre,
      email: formData.email,
      rol_id: formData.rol_id,
      password: formData.password,
      // Campos adicionales opcionales que se pueden enviar si el backend los acepta
      apellido: formData.apellido,
      telefono: formData.telefono,
      carrera: formData.carrera,
    };
    
    const result = await dispatch(registerAsync(registerData));
    
    if (registerAsync.fulfilled.match(result)) {
      // Verificar si el código de estado es 201 (Created)
      if (result.payload.statusCode === 201) {
        setSuccessMessage('Usuario creado correctamente');
        setSuccessVariant('success');
      } else {
        setSuccessMessage('Tu cuenta ha sido creada exitosamente. Ahora puedes iniciar sesión con tu email y contraseña.');
        setSuccessVariant('default');
      }
      setShowSuccess(true);
    }
  };

  const handleSuccessAction = () => {
    navigate('/login');
  };

  return (
    <>
      <div 
        className="min-h-screen flex items-center justify-center px-4 py-8"
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
            Únete a ELAS
          </h1>
          <p className="text-elas-navy bg-white/80 backdrop-blur-sm rounded-lg p-2">Crea tu cuenta para comenzar</p>
        </div>

        {/* Register Form */}
        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-elas-blue/30 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nombre" required className="text-elas-navy">
                  Nombre
                </Label>
                <Input
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="Tu nombre"
                  className={`mt-1 border-elas-navy/30 focus:border-elas-blue focus:ring-elas-blue ${formErrors.nombre ? 'border-red-500' : ''}`}
                  disabled={isLoading}
                />
                {formErrors.nombre && (
                  <p className="mt-1 text-xs text-red-600">{formErrors.nombre}</p>
                )}
              </div>

              <div>
                <Label htmlFor="apellido" required className="text-elas-navy">
                  Apellido
                </Label>
                <Input
                  id="apellido"
                  name="apellido"
                  type="text"
                  value={formData.apellido}
                  onChange={handleInputChange}
                  placeholder="Tu apellido"
                  className={`mt-1 border-elas-navy/30 focus:border-elas-blue focus:ring-elas-blue ${formErrors.apellido ? 'border-red-500' : ''}`}
                  disabled={isLoading}
                />
                {formErrors.apellido && (
                  <p className="mt-1 text-xs text-red-600">{formErrors.apellido}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="email" required className="text-elas-navy">
                Correo Electrónico
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="tu-email@ejemplo.com"
                className={`mt-1 border-elas-navy/30 focus:border-elas-blue focus:ring-elas-blue ${formErrors.email ? 'border-red-500' : ''}`}
                disabled={isLoading}
              />
              {formErrors.email && (
                <p className="mt-1 text-xs text-red-600">{formErrors.email}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="telefono" className="text-elas-navy">
                  Teléfono
                </Label>
                <Input
                  id="telefono"
                  name="telefono"
                  type="text"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  placeholder="Tu número de teléfono"
                  className="mt-1 border-elas-navy/30 focus:border-elas-blue focus:ring-elas-blue"
                  disabled={isLoading}
                />
              </div>

              <div>
                <Label htmlFor="carrera" className="text-elas-navy">
                  Carrera
                </Label>
                <Input
                  id="carrera"
                  name="carrera"
                  type="text"
                  value={formData.carrera}
                  onChange={handleInputChange}
                  placeholder="Tu carrera universitaria"
                  className="mt-1 border-elas-navy/30 focus:border-elas-blue focus:ring-elas-blue"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="rol_id" className="text-elas-navy">
                Tipo de Usuario
              </Label>
              <select
                id="rol_id"
                name="rol_id"
                value={formData.rol_id}
                onChange={(e) => setFormData(prev => ({ ...prev, rol_id: parseInt(e.target.value) }))}
                className="mt-1 w-full rounded-md border border-elas-navy/30 bg-white px-3 py-2 text-sm focus:border-elas-blue focus:ring-elas-blue disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isLoading}
              >
                <option value={1}>Estudiante</option>
                <option value={2}>Tutora</option>
              </select>
            </div>

            <div>
              <Label htmlFor="password" required className="text-elas-navy">
                Contraseña
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Mínimo 6 caracteres"
                className={`mt-1 border-elas-navy/30 focus:border-elas-blue focus:ring-elas-blue ${formErrors.password ? 'border-red-500' : ''}`}
                disabled={isLoading}
              />
              {formErrors.password && (
                <p className="mt-1 text-xs text-red-600">{formErrors.password}</p>
              )}
            </div>

            <div>
              <Label htmlFor="confirmPassword" required className="text-elas-navy">
                Confirmar Contraseña
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Repite tu contraseña"
                className={`mt-1 border-elas-navy/30 focus:border-elas-blue focus:ring-elas-blue ${formErrors.confirmPassword ? 'border-red-500' : ''}`}
                disabled={isLoading}
              />
              {formErrors.confirmPassword && (
                <p className="mt-1 text-xs text-red-600">{formErrors.confirmPassword}</p>
              )}
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="text-sm">
                <Link to="/login" className="font-medium text-elas-blue hover:text-elas-blue/80 transition-colors">
                  ¿Ya tienes cuenta? Inicia sesión
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
              {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link 
              to="/" 
              className="text-sm text-elas-navy/70 hover:text-elas-navy transition-colors underline"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
      </div>

      {/* Alert Dialog para éxito */}
      <AlertDialog
        open={showSuccess}
        onOpenChange={setShowSuccess}
        title={successVariant === 'success' ? '¡Usuario Creado Correctamente!' : '¡Registro Exitoso!'}
        description={successMessage}
        actionLabel="Ir al Login"
        onAction={handleSuccessAction}
        variant={successVariant}
      />
    </>
  );
};

export default RegisterPage;
