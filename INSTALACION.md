# 🔧 Guía Completa de Instalación - Proyecto ELAS

Esta guía te ayudará a configurar el proyecto ELAS desde cero en cualquier computadora.

## 📋 Tabla de Contenidos

1. [Instalación de Node.js y npm](#1-instalación-de-nodejs-y-npm)
2. [Verificación de la instalación](#2-verificación-de-la-instalación)
3. [Instalación de Git](#3-instalación-de-git)
4. [Configuración del proyecto ELAS](#4-configuración-del-proyecto-elas)
5. [Instalación de dependencias](#5-instalación-de-dependencias)
6. [Configuración del entorno](#6-configuración-del-entorno)
7. [Ejecución del proyecto](#7-ejecución-del-proyecto)
8. [Solución de problemas comunes](#8-solución-de-problemas-comunes)

---

## 1. 📦 Instalación de Node.js y npm

### Para Windows:

#### Opción A: Descarga directa (Recomendado)
1. Ve a [https://nodejs.org](https://nodejs.org)
2. Descarga la versión **LTS** (Long Term Support)
3. Ejecuta el instalador `.msi` descargado
4. Sigue el asistente de instalación:
   - Acepta los términos y condiciones
   - Mantén la ruta de instalación por defecto
   - Asegúrate de que "Add to PATH" esté marcado
5. Reinicia tu computadora

#### Opción B: Usando Chocolatey
```powershell
# Instalar Chocolatey primero (ejecutar como administrador)
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

# Instalar Node.js
choco install nodejs
```

### Para macOS:

#### Opción A: Descarga directa
1. Ve a [https://nodejs.org](https://nodejs.org)
2. Descarga la versión **LTS**
3. Ejecuta el instalador `.pkg` descargado
4. Sigue el asistente de instalación

#### Opción B: Usando Homebrew
```bash
# Instalar Homebrew si no lo tienes
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Instalar Node.js
brew install node
```

### Para Linux (Ubuntu/Debian):

#### Opción A: Usando NodeSource
```bash
# Actualizar repositorios
sudo apt update

# Instalar curl si no está instalado
sudo apt install -y curl

# Agregar repositorio NodeSource
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -

# Instalar Node.js
sudo apt-get install -y nodejs
```

#### Opción B: Usando snap
```bash
sudo snap install node --classic
```

---

## 2. ✅ Verificación de la instalación

Abre una terminal/línea de comandos y ejecuta:

```bash
# Verificar versión de Node.js
node --version
# Debe mostrar algo como: v20.x.x

# Verificar versión de npm
npm --version
# Debe mostrar algo como: 10.x.x
```

**Versiones mínimas requeridas:**
- Node.js: 18.0.0 o superior
- npm: 8.0.0 o superior

---

## 3. 🌍 Instalación de Git

### Para Windows:
1. Ve a [https://git-scm.com/download/win](https://git-scm.com/download/win)
2. Descarga el instalador
3. Ejecuta el instalador y acepta las configuraciones por defecto

### Para macOS:
```bash
# Usando Homebrew
brew install git

# O instalar Xcode Command Line Tools
xcode-select --install
```

### Para Linux:
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install git

# CentOS/RHEL
sudo yum install git
```

**Verificar instalación:**
```bash
git --version
```

---

## 4. 🚀 Configuración del proyecto ELAS

### Paso 1: Obtener el código fuente

#### Opción A: Clonar desde Git (si tienes acceso al repositorio)
```bash
# Navegar al directorio donde quieres el proyecto
cd Desktop

# Clonar el repositorio
git clone <URL_DEL_REPOSITORIO_ELAS>
cd elas_react
```

#### Opción B: Descargar archivo ZIP
1. Descarga el archivo ZIP del proyecto
2. Extrae el contenido en tu carpeta deseada
3. Abre terminal en la carpeta del proyecto

### Paso 2: Verificar estructura del proyecto
```bash
# Listar contenido del directorio
ls -la
# O en Windows:
dir

# Debes ver archivos como:
# - package.json
# - src/
# - public/
# - vite.config.ts
# - tailwind.config.js
```

---

## 5. 📚 Instalación de dependencias

### Paso 1: Instalar todas las dependencias
```bash
# En la raíz del proyecto (donde está package.json)
npm install
```

Este comando instalará automáticamente:
- **React 19** - Framework de UI
- **TypeScript** - Tipado estático
- **Vite** - Herramienta de build
- **Tailwind CSS** - Framework de CSS
- **Redux Toolkit** - Gestión de estado
- **React Router DOM** - Enrutamiento
- **Axios** - Cliente HTTP
- **Y muchas más...**

### Paso 2: Verificar instalación
```bash
# Verificar que node_modules se creó
ls node_modules
# O en Windows:
dir node_modules

# Verificar dependencias específicas
npm list --depth=0
```

### Dependencias principales que se instalan:

#### 🎯 Dependencias de producción:
```json
{
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "typescript": "^5.6.2",
  "@reduxjs/toolkit": "^2.3.0",
  "react-redux": "^9.1.2",
  "react-router-dom": "^7.0.1",
  "axios": "^1.7.7",
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.5.4"
}
```

#### 🛠️ Dependencias de desarrollo:
```json
{
  "@vitejs/plugin-react": "^4.3.3",
  "vite": "^6.0.1",
  "tailwindcss": "^3.4.0",
  "postcss": "^8.4.47",
  "autoprefixer": "^10.4.20",
  "@tailwindcss/forms": "^0.5.9",
  "@tailwindcss/typography": "^0.5.15",
  "tailwindcss-animate": "^1.0.7"
}
```

---

## 6. ⚙️ Configuración del entorno

### Paso 1: Crear archivo de variables de entorno
```bash
# Crear archivo .env en la raíz del proyecto
touch .env
# O en Windows, crear manualmente el archivo
```

### Paso 2: Configurar variables
Edita el archivo `.env` con tu editor de texto favorito:

```env
# URL del backend (ajustar según tu configuración)
VITE_API_URL=http://127.0.0.1:8000

# Nombre de la aplicación
VITE_APP_NAME=ELAS

# Modo de desarrollo
VITE_MODE=development

# URL base para imágenes (opcional)
VITE_IMAGES_URL=/images
```

### Paso 3: Verificar configuración de Tailwind
El archivo `tailwind.config.js` debe contener:

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'elas-navy': '#041e49',
        'elas-blue': '#9cc5f2',
        'elas-light': '#e8f4fd',
        'elas-dark': '#032440',
      },
      fontFamily: {
        'caprasimo': ['Caprasimo', 'cursive'],
        'questrial': ['Questrial', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
}
```

---

## 7. 🎮 Ejecución del proyecto

### Paso 1: Iniciar servidor de desarrollo
```bash
# Ejecutar en modo desarrollo
npm run dev
```

### Paso 2: Verificar ejecución
- La consola mostrará algo como:
```
VITE v6.0.1  ready in 1420 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Paso 3: Abrir en navegador
- Ve a `http://localhost:5173`
- Deberías ver la página de inicio de ELAS

### Comandos adicionales disponibles:

```bash
# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview

# Verificar errores de linting
npm run lint

# Verificar tipos de TypeScript
npm run type-check
```

---

## 8. 🛠️ Solución de problemas comunes

### ❌ Error: "npm no se reconoce como comando"

**Solución:**
1. Reinicia tu computadora después de instalar Node.js
2. Verifica que Node.js esté en el PATH:
   - Windows: Ve a Variables de Entorno y verifica que `C:\Program Files\nodejs` esté en PATH
   - Mac/Linux: Ejecuta `echo $PATH` y verifica que incluya Node.js

### ❌ Error: "Cannot find module" durante npm install

**Solución:**
```bash
# Limpiar cache de npm
npm cache clean --force

# Eliminar node_modules y package-lock.json
rm -rf node_modules package-lock.json
# O en Windows:
rmdir /s node_modules
del package-lock.json

# Reinstalar dependencias
npm install
```

### ❌ Error: "EACCES: permission denied" (Mac/Linux)

**Solución:**
```bash
# Configurar directorio global de npm
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'

# Agregar a PATH (añadir a ~/.bashrc o ~/.zshrc)
export PATH=~/.npm-global/bin:$PATH

# Recargar configuración
source ~/.bashrc
```

### ❌ Error: Puerto 5173 ya está en uso

**Solución:**
```bash
# Matar proceso que usa el puerto
# Windows:
netstat -ano | findstr :5173
taskkill /PID <numero_pid> /F

# Mac/Linux:
lsof -ti:5173 | xargs kill -9

# O usar puerto diferente
npm run dev -- --port 3000
```

### ❌ Error: "Module not found: Can't resolve 'tailwindcss'"

**Solución:**
```bash
# Reinstalar dependencias de Tailwind
npm install -D tailwindcss postcss autoprefixer

# Regenerar configuración
npx tailwindcss init -p
```

### ❌ Error: Tipografías no se cargan

**Verificar:**
1. Internet está conectado (las fuentes vienen de Google Fonts)
2. El archivo `index.html` contiene los enlaces a Google Fonts:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Caprasimo&family=Questrial&display=swap" rel="stylesheet">
```

---

## 🎯 Verificación final

Si todo está configurado correctamente, deberías poder:

1. ✅ Ejecutar `npm run dev` sin errores
2. ✅ Ver la página de inicio de ELAS en `http://localhost:5173`
3. ✅ Navegar entre páginas (Inicio, Login, Registro, Nosotras)
4. ✅ Ver los estilos correctamente aplicados
5. ✅ Ver las tipografías Caprasimo y Questrial

---

## 🆘 Soporte adicional

### Recursos útiles:
- [Documentación oficial de Node.js](https://nodejs.org/docs/)
- [Documentación de React](https://react.dev/)
- [Documentación de Vite](https://vitejs.dev/)
- [Documentación de Tailwind CSS](https://tailwindcss.com/)

### Para obtener ayuda:
1. Revisa los logs de error en la consola
2. Busca el error específico en Google
3. Consulta la documentación oficial de las tecnologías
4. Contacta al equipo de desarrollo de ELAS

---

¡Felicidades! 🎉 Has configurado exitosamente el proyecto ELAS en tu computadora.

**Próximos pasos:**
- Familiarízate con la estructura del proyecto
- Explora los componentes en `src/components/`
- Revisa las páginas en `src/pages/`
- Personaliza los estilos según tus necesidades

💡 **Tip:** Mantén siempre actualizado Node.js y las dependencias para obtener las últimas características y mejoras de seguridad.