# ⚡ Comandos Rápidos - Proyecto ELAS

Referencia rápida de todos los comandos necesarios para el proyecto ELAS.

## 🚀 Comandos de Instalación Inicial

### Windows (PowerShell)
```powershell
# 1. Verificar Node.js
node --version
npm --version

# 2. Clonar proyecto (si tienes Git)
git clone <url-repositorio>
cd elas_react

# 3. Instalar dependencias
npm install

# 4. Crear archivo de entorno
New-Item .env -Type File

# 5. Iniciar desarrollo
npm run dev
```

### macOS/Linux (Terminal)
```bash
# 1. Verificar Node.js
node --version
npm --version

# 2. Clonar proyecto
git clone <url-repositorio>
cd elas_react

# 3. Instalar dependencias
npm install

# 4. Crear archivo de entorno
touch .env

# 5. Iniciar desarrollo
npm run dev
```

---

## 📦 Comandos de Gestión de Dependencias

### Instalar dependencias principales (ya incluidas en package.json)
```bash
# Dependencias de React
npm install react@^19.0.0 react-dom@^19.0.0

# TypeScript
npm install -D typescript @types/react @types/react-dom

# Vite
npm install -D vite @vitejs/plugin-react

# Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npm install -D @tailwindcss/forms @tailwindcss/typography tailwindcss-animate

# Redux y Router
npm install @reduxjs/toolkit react-redux react-router-dom

# Utilidades
npm install axios clsx tailwind-merge

# Inicializar Tailwind (solo si no existe configuración)
npx tailwindcss init -p
```

### Actualizar dependencias
```bash
# Ver dependencias desactualizadas
npm outdated

# Actualizar todas las dependencias
npm update

# Actualizar dependencia específica
npm install react@latest
```

---

## 🛠️ Comandos de Desarrollo

### Comandos principales
```bash
# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview

# Verificar código con ESLint
npm run lint

# Corregir errores de ESLint automáticamente
npm run lint -- --fix
```

### Comandos de utilidad
```bash
# Limpiar caché de npm
npm cache clean --force

# Verificar integridad de dependencias
npm audit

# Corregir vulnerabilidades automáticamente
npm audit fix

# Reinstalar todas las dependencias
rm -rf node_modules package-lock.json && npm install
```

---

## 🎨 Comandos de Tailwind CSS

```bash
# Generar CSS de Tailwind
npx tailwindcss -i ./src/index.css -o ./dist/output.css --watch

# Construir CSS para producción
npx tailwindcss -i ./src/index.css -o ./dist/output.css --minify

# Verificar configuración de Tailwind
npx tailwindcss -i ./src/index.css -o ./dist/output.css --content "./src/**/*.{html,js,tsx}"
```

---

## 🔧 Comandos de Git

### Configuración inicial
```bash
# Configurar Git (primera vez)
git config --global user.name "Tu Nombre"
git config --global user.email "tu.email@ejemplo.com"

# Inicializar repositorio local
git init

# Agregar remote origin
git remote add origin <url-repositorio>
```

### Workflow diario
```bash
# Ver estado del repositorio
git status

# Agregar cambios al staging
git add .
git add archivo-especifico.ts

# Hacer commit
git commit -m "feat: agregar nueva funcionalidad"

# Subir cambios
git push origin main

# Bajar cambios del repositorio
git pull origin main

# Crear nueva rama
git checkout -b nombre-rama

# Cambiar de rama
git checkout main
git checkout nombre-rama

# Ver historial de commits
git log --oneline
```

---

## 📱 Comandos de Testing (si se añaden tests)

```bash
# Instalar dependencias de testing
npm install -D @testing-library/react @testing-library/jest-dom vitest jsdom

# Ejecutar tests
npm run test

# Ejecutar tests en modo watch
npm run test:watch

# Ejecutar tests con cobertura
npm run test:coverage
```

---

## 🐳 Comandos de Docker (opcional)

### Crear Dockerfile
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]
```

### Comandos Docker
```bash
# Construir imagen
docker build -t elas-react .

# Ejecutar contenedor
docker run -p 5173:5173 elas-react

# Docker Compose (crear docker-compose.yml)
docker-compose up -d
```

---

## 🔄 Comandos de Mantenimiento

### Limpieza del proyecto
```bash
# Limpiar archivos de build
rm -rf dist/

# Limpiar node_modules
rm -rf node_modules/

# Limpiar caché completo
npm cache clean --force
rm -rf node_modules/ package-lock.json
npm install
```

### Verificación de salud del proyecto
```bash
# Verificar archivos TypeScript
npx tsc --noEmit

# Verificar formato de código
npx prettier --check "src/**/*.{ts,tsx}"

# Corregir formato automáticamente
npx prettier --write "src/**/*.{ts,tsx}"

# Analizar bundle size
npm run build
npx vite-bundle-analyzer dist/
```

---

## 🌐 Comandos de Deploy

### Build para producción
```bash
# Compilar proyecto
npm run build

# Verificar build localmente
npm run preview

# Servir archivos estáticos (usando serve)
npm install -g serve
serve -s dist/
```

### Deploy a diferentes plataformas
```bash
# Vercel
npm install -g vercel
vercel

# Netlify
npm install -g netlify-cli
netlify deploy --prod --dir=dist

# GitHub Pages
npm install -g gh-pages
npm run build
gh-pages -d dist
```

---

## 🐛 Comandos de Debugging

### Análisis de dependencias
```bash
# Ver árbol de dependencias
npm list
npm list --depth=0

# Analizar duplicados
npm ls --depth=0 2>/dev/null | grep "UNMET"

# Ver información de paquete específico
npm info react
npm view react version
```

### Debugging de errores comunes
```bash
# Error de permisos (Mac/Linux)
sudo chown -R $(whoami) ~/.npm

# Puerto ocupado
lsof -ti:5173 | xargs kill -9

# Variables de entorno
echo $NODE_ENV
echo $VITE_API_URL

# Información del sistema
node -p "process.platform"
node -p "process.arch"
npm config list
```

---

## 💡 Comandos de Productividad

### Aliases útiles para tu terminal

#### Para Bash/Zsh (~/.bashrc o ~/.zshrc)
```bash
# Aliases para ELAS
alias elas-dev="cd ~/elas_react && npm run dev"
alias elas-build="cd ~/elas_react && npm run build"
alias elas-clean="cd ~/elas_react && rm -rf node_modules package-lock.json && npm install"

# Aliases generales de npm
alias ni="npm install"
alias nr="npm run"
alias ns="npm start"
alias nt="npm test"
alias nrd="npm run dev"
alias nrb="npm run build"
```

#### Para PowerShell (Windows)
```powershell
# En tu perfil de PowerShell
Function Elas-Dev { Set-Location "C:\path\to\elas_react"; npm run dev }
Function Elas-Build { Set-Location "C:\path\to\elas_react"; npm run build }

Set-Alias ed Elas-Dev
Set-Alias eb Elas-Build
```

---

## 📚 Referencias Rápidas

### Estructura de archivos importantes
```
elas_react/
├── package.json         # Dependencias y scripts
├── vite.config.ts      # Configuración de Vite
├── tailwind.config.js  # Configuración de Tailwind
├── tsconfig.json       # Configuración de TypeScript
├── .env                # Variables de entorno
└── src/
    ├── main.tsx        # Punto de entrada
    ├── App.tsx         # Componente principal
    └── index.css       # Estilos globales
```

### Variables de entorno importantes
```env
VITE_API_URL=http://127.0.0.1:8000
VITE_APP_NAME=ELAS
NODE_ENV=development
```

### Puertos comunes
- **Desarrollo**: 5173 (Vite por defecto)
- **Backend**: 8000 (según configuración)
- **Preview**: 4173 (Vite preview)

---

¡Guarda este archivo como referencia rápida! 📌

**Tip**: Personaliza los aliases y comandos según tu flujo de trabajo preferido.