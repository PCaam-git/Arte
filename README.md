### 🎨 Proyecto Arte - Tienda de Obras de Arte
Gestión de obras de arte con administración protegida y API REST.

Este proyecto es una aplicación web que permite visualizar y administrar una tienda de arte. Los usuarios pueden ver las obras disponibles, mientras que los administradores pueden agregar, modificar y eliminar obras mediante un panel de gestión protegido con autenticación.

##📌 Características principales
✅ CRUD completo para gestionar obras de arte.
✅ 🔐 Sistema de autenticación (registro y login).
✅ 🌐 Backend con Node.js y SQLite como base de datos.
✅ 🎨 Frontend en HTML, CSS y JavaScript con Bootstrap y estilo propio.
✅ 🔄 API REST para interactuar con las obras de arte.
✅ 🖼️ Soporte para subir y gestionar imágenes.
✅ 🛠️ Pruebas de API realizadas con Hoppscotch.
✅ 📂 Gestión de versiones en GitHub con ramas, pull requests y etiquetas.


##🚀 Instalación y ejecución
1️⃣ Clonar el repositorio
git clone https://github.com/PCaam-git/Arte.git
cd Arte

2️⃣ Configurar e iniciar el backend
cd Backend
npm install
npm start

📌El backend se ejecutará en http://localhost:8090/

3️⃣ Iniciar el frontend
Abrir index.html en un navegador.



##📡 Endpoints de la API
La API sigue el estándar REST para gestionar las obras de arte y la autenticación.

🔐 Autenticación
|Método	| Endpoint	| Descripción|
|-------|---------|-----------|
|POST	| /api/login| Iniciar sesión como administrador |

🖼️ Obras de arte
|Método |	Endpoint |	Descripción |
|------ | -------- | ------------ |
|GET	| /api/arte/obras	| Obtener todas las obras |
|GET	| /api/arte/obras/:id	| Obtener una obra por ID |
|POST	| /api/arte/obras	| Crear una nueva obra |
|PUT	| /api/arte/obras/:id	| Modificar una obra existente |
|DELETE	| /api/arte/obras/:id	| Eliminar una obra |


##🎨 Capturas de Pantalla
📌 Página de inicio
![Captura página de inicio](https://github.com/user-attachments/assets/b6c8c4ba-3a72-45c1-bd39-aa812f49e25e)

📌 Registro de usuarios e inicio de sesión
![Captura inicio sesión](https://github.com/user-attachments/assets/cbd64724-7a77-4d7b-a00e-62f4b3fddd1e)

📌 Panel de administrador
![Captura admin](https://github.com/user-attachments/assets/b22225ff-2475-4afa-98fe-cd959bb8b1f9)



##📝 Requisitos cumplidos
✔️ Backend con CRUD completo.
✔️ Frontend con CRUD funcional.
✔️ Repositorio en GitHub con gestión de ramas y pull requests.
✔️ Etiquetado de versiones en GitHub.
✔️ Protección de zona de administración con login.
✔️ Validaciones en backend y frontend.
✔️ Colección Hoppscotch añadida para pruebas de API.
✔️ Soporte para imágenes en las obras.

##🔖 Licencia
Este proyecto es de código abierto bajo la licencia MIT.


# 🎯 Guía Simple de Testing - Proyecto Arte

Esta es una guía **súper simple** para ejecutar tests en tu proyecto Arte.

## 🚀 Comandos Básicos

### 1️⃣ Tests Rápidos (sin Docker)
```bash
# Tests unitarios (rápidos)
npm run unit-test

# Tests de integración (con BD actual)
npm run integration-test

# Todos los tests juntos
npm run test
```

### 2️⃣ Tests con Docker (completos)

**Paso a paso:**

1. **Levantar base de datos de test:**
   ```bash
   npm run test-db-up
   ```

2. **Verificar que esté lista:**
   ```bash
   npm run test-db-check
   ```
   
   Si ves ✅, continúa al paso 3.
   Si ves ❌, espera 10 segundos y repite este paso.

3. **Ejecutar tests:**
   ```bash
   npm run integration-test
   ```

4. **Limpiar cuando termines:**
   ```bash
   npm run test-db-down
   ```

## 🛠️ Comandos de Docker

### Base de Datos de Desarrollo
```bash
npm run dev-db-up      # Levantar BD desarrollo
npm run dev-db-down    # Bajar BD desarrollo
npm run dev-db-status  # Ver estado
npm run dev-db-logs    # Ver logs
```

### Base de Datos de Testing
```bash
npm run test-db-up     # Levantar BD test
npm run test-db-down   # Bajar BD test
npm run test-db-check  # ¿Está lista?
npm run test-db-status # Ver estado
npm run test-db-logs   # Ver logs
```

## 🔍 Solución de Problemas

### ❌ "No se puede conectar a la base de datos"
1. Verificar Docker está corriendo: `docker ps`
2. Levantar BD: `npm run test-db-up`
3. Esperar 10-15 segundos
4. Verificar: `npm run test-db-check`

### ❌ "Tests fallan"
1. Verificar BD: `npm run test-db-check`
2. Ver logs: `npm run test-db-logs`
3. Reiniciar BD: `npm run test-db-down` + `npm run test-db-up`

### ❌ "Docker no funciona"
1. Asegurarse que Docker Desktop esté corriendo
2. En Windows: abrir Docker Desktop
3. Verificar: `docker --version`

## 📋 Flujo de Trabajo Recomendado

### Para desarrollo diario:
```bash
# 1. Levantar BD desarrollo
npm run dev-db-up

# 2. Desarrollar código...

# 3. Tests rápidos
npm run unit-test

# 4. Al terminar
npm run dev-db-down
```

### Para tests completos:
```bash
# 1. Levantar BD test
npm run test-db-up

# 2. Verificar conexión
npm run test-db-check

# 3. Ejecutar tests
npm run integration-test

# 4. Limpiar
npm run test-db-down
```

## 🎯 Lo Más Importante

- **Tests unitarios**: Siempre funcionan, son rápidos
- **Tests integración**: Necesitan base de datos
- **`npm run test-db-check`**: Tu mejor amigo para verificar BD
- **Docker**: Solo para tests completos, no obligatorio

## 🆘 Si algo no funciona

1. `npm run test-db-check` - ¿BD lista?
2. `npm run test-db-logs` - ¿Qué dice la BD?
3. `docker ps` - ¿Docker corriendo?
4. `npm run clean` - Limpiar todo y empezar de nuevo

**¡Recuerda!** Los tests unitarios (`npm run unit-test`) siempre funcionan sin complicaciones.

