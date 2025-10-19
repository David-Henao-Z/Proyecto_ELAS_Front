# 🌸 ELAS - Plataforma Educativa para Mujeres

Una aplicación web moderna construida con React 19, TypeScript, Vite y Tailwind CSS, diseñada específicamente para el empoderamiento educativo de las mujeres.

## ✨ Características Principales

- ⚛️ **React 19** con las últimas funcionalidades y optimizaciones
- 🔷 **TypeScript** para desarrollo con tipado seguro
- ⚡ **Vite** para desarrollo y construcción ultra-rápidos
- 🎨 **Tailwind CSS** para estilos utility-first personalizados
- 🔬 **Atomic Design** para organización óptima de componentes
- 📱 **Diseño Responsivo** con enfoque mobile-first
- 🔐 **Sistema de Autenticación** completo con JWT
- 📊 **Dashboard Interactivo** con sidebar personalizado
- 🎥 **Sistema de Tutorías** con integración de YouTube
- 💫 **Animaciones Fluidas** y experiencia de usuario optimizada

## 🏗️ Estructura del Proyecto

```
src/
├── components/          # Biblioteca de componentes organizados por Atomic Design
│   ├── atoms/          # Bloques básicos (Button, Input, Label, Alert, AlertDialog)
│   ├── molecules/      # Grupos simples de átomos (FormField, SearchBar)
│   ├── organisms/      # Componentes UI complejos (LoginForm, Navigation, ProtectedRoute)
│   └── templates/      # Componentes de layout a nivel de página
├── pages/              # Páginas de la aplicación
│   ├── HomePage.tsx    # Página de inicio con carousel
│   ├── LoginPage.tsx   # Página de inicio de sesión
│   ├── RegisterPage.tsx # Página de registro
│   ├── Dashboard.tsx   # Dashboard principal con sidebar
│   ├── TutoriasPage.tsx # Sistema de tutorías por materias
│   └── NosotrasPage.tsx # Información sobre ELAS
├── services/           # Servicios de API y autenticación
│   ├── apiService.ts   # Cliente HTTP con interceptores
│   └── authService.ts  # Gestión de autenticación
├── store/              # Estado global con Redux Toolkit
│   ├── store.ts        # Configuración del store
│   ├── hooks.ts        # Hooks tipados para Redux
│   └── slices/         # Slices de Redux
├── interfaces/         # Definiciones de tipos TypeScript
├── utils/              # Funciones utilitarias
├── routes/             # Configuración de rutas con React Router
└── assets/             # Recursos estáticos (imágenes, iconos)
```

## 🎨 Metodología Atomic Design

### 🔴 Átomos (Atoms)
Componentes básicos reutilizables:
- `Button` - Botones con variantes ELAS
- `Input` - Campos de entrada personalizados
- `Label` - Etiquetas para formularios
- `Alert` - Componentes de alerta
- `AlertDialog` - Diálogos modales

### 🟡 Moléculas (Molecules)
Combinaciones simples de átomos:
- `FormField` - Campo de formulario completo
- `SearchBar` - Barra de búsqueda

### 🟢 Organismos (Organisms)
Componentes complejos de interfaz:
- `LoginForm` - Formulario de inicio de sesión
- `Navigation` - Navegación principal
- `ProtectedRoute` - Rutas protegidas

## 🎯 Funcionalidades ELAS

### 🔐 Sistema de Autenticación
- Registro de usuarios con roles (Estudiante, Tutora)
- Inicio de sesión con JWT
- Rutas protegidas
- Gestión de sesiones

### 📊 Dashboard Interactivo
- Sidebar con navegación intuitiva
- Secciones: Cronograma, Estadísticas, Estado de Ánimo, Tutorías
- Menú de usuario con cierre de sesión
- Colores corporativos ELAS (#041e49, #9cc5f2)

### 🎥 Sistema de Tutorías
- Organización por materias educativas
- Integración con videos de YouTube
- Miniaturas y descripciones
- Navegación fluida entre contenidos

### 🎨 Diseño ELAS
- Paleta de colores personalizada
- Tipografías: Caprasimo para títulos, Questrial para texto
- Componentes con estilo corporativo
- Animaciones y transiciones suaves

This project follows the **Atomic Design** methodology by Brad Frost:

- **Atoms**: Basic HTML elements and fundamental components
- **Molecules**: Simple groups of atoms functioning as a unit
- **Organisms**: Complex components composed of molecules and/or atoms
- **Templates**: Page-level layout components that place components into a layout
- **Pages**: Specific instances of templates with real content

## � Instalación y Configuración

### Prerrequisitos

- **Node.js 18+** (Recomendado: Node.js 20 LTS)
- **npm** o **yarn** como gestor de paquetes
- **Git** para control de versiones

### Instalación Paso a Paso

1. **Clonar o descargar el proyecto**
   ```bash
   git clone <url-del-repositorio>
   cd elas_react
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   # Crear archivo .env en la raíz del proyecto
   touch .env
   ```
   
   Contenido del archivo `.env`:
   ```env
   VITE_API_URL=http://127.0.0.1:8000
   VITE_APP_NAME=ELAS
   ```

4. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:5173`

5. **Construir para producción**
   ```bash
   npm run build
   ```

6. **Previsualizar build de producción**
   ```bash
   npm run preview
   ```

## � Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo con recarga automática
- `npm run build` - Construye el proyecto para producción
- `npm run lint` - Ejecuta ESLint para verificar calidad del código
- `npm run preview` - Previsualiza el build de producción localmente

## 🛠️ Stack Tecnológico

### Tecnologías Principales
- **React 19** - Última versión con nuevas funcionalidades
- **TypeScript** - JavaScript con tipado seguro
- **Vite** - Herramienta de build ultrarrápida
- **Tailwind CSS** - Framework CSS utility-first

### Gestión de Estado y Navegación
- **Redux Toolkit** - Gestión de estado moderna
- **React Router DOM v7** - Enrutamiento del lado del cliente
- **React Redux** - Integración oficial de Redux con React

### API y Manejo de Datos
- **Axios** - Cliente HTTP para peticiones API
- **Servicio API Personalizado** - Gestión centralizada con interceptores

### Herramientas de Desarrollo
- **ESLint** - Linting y verificación de calidad
- **PostCSS** - Procesamiento CSS con Autoprefixer
- **VS Code Tasks** - Flujos de trabajo integrados

## 🎯 Características Implementadas

### ✅ Sistema de Autenticación
- Página de login con validación de formulario
- Página de registro integral
- Gestión de estado con Redux
- Rutas protegidas para usuarios autenticados
- Gestión automática de tokens y persistencia

### ✅ Navegación y Enrutamiento
- Integración con React Router DOM v7
- Navegación dinámica basada en estado de autenticación
- Rutas protegidas con redirecciones automáticas
- Soporte para navegación breadcrumb

### ✅ Componentes UI (Atomic Design)
- **Átomos**: Button, Input, Label, Alert, AlertDialog
- **Moléculas**: FormField, SearchBar con lógica reutilizable
- **Organismos**: LoginForm, ProtectedRoute con comportamiento complejo
- **Plantillas**: Layouts consistentes para páginas
- **Páginas**: Implementaciones completas de páginas

### ✅ Integración con API
- Servicio API centralizado con Axios
- Interceptores de petición/respuesta
- Manejo de errores y gestión de tokens
- Interfaces TypeScript para todas las respuestas

### ✅ Gestión de Estado
- Configuración de store con Redux Toolkit
- Slice de autenticación con thunks asíncronos
- Hooks tipados para integración React-Redux

## 📐 Guías de Desarrollo

### Creación de Componentes

Al crear nuevos componentes, sigue estas pautas:

1. **Coloca componentes en niveles atómicos apropiados**:
   - Elementos simples y reutilizables → `atoms/`
   - Grupos de átomos → `molecules/`
   - Componentes complejos independientes → `organisms/`

2. **Usa interfaces TypeScript** para props
3. **Exporta tipos y componentes** desde archivos index
4. **Sigue convenciones de nomenclatura**: PascalCase para componentes

### Estilizado con Tailwind CSS

- Usa clases utility para estilizado
- Crea componentes personalizados para patrones repetidos
- Sigue diseño responsivo mobile-first
- Usa tokens de diseño de Tailwind para consistencia

## � Paleta de Colores ELAS

```css
/* Colores principales */
--elas-navy: #041e49;     /* Títulos y texto principal */
--elas-blue: #9cc5f2;     /* Botones y acentos */
--elas-light: #e8f4fd;    /* Fondos claros */
--elas-dark: #032440;     /* Variante oscura */
```

## 🔗 Endpoints de API

### Autenticación
- `POST /auth/login` - Inicio de sesión
- `POST /auth/register` - Registro de usuario
- `POST /auth/logout` - Cerrar sesión
- `GET /auth/me` - Obtener usuario actual

### Usuarios
- `POST /usuarios` - Crear nuevo usuario
- `GET /usuarios` - Listar usuarios

## 🤝 Contribuciones

1. Sigue los principios de Atomic Design
2. Escribe interfaces TypeScript para todas las props
3. Usa Tailwind CSS para estilizado
4. Mantén formato de código consistente
5. Prueba componentes antes de enviar

## � Soporte

Para soporte técnico o consultas sobre el proyecto ELAS:
- 📧 Email: soporte@elas.edu
- 📱 WhatsApp: +XX XXX XXX XXXX

## 📝 Licencia

Este proyecto está licenciado bajo la Licencia MIT.

---

Desarrollado con ❤️ para el empoderamiento educativo de las mujeres
🌸 **ELAS** - Educación, Liderazgo, Apoyo, Sororidad
```
