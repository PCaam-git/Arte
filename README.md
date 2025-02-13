# 🖼️ Proyecto Arte - Tienda de Obras de Arte

Este proyecto es una aplicación web que permite gestionar una tienda de arte, mostrando obras disponibles y permitiendo su administración mediante un usuario con permisos de administrador.

## 📌 Características principales

- 📜 CRUD completo para la gestión de obras de arte.
- 🔐 Sistema de autenticación para administrador (login).
- 🌐 Backend implementado con Node.js y SQLite como base de datos.
- 🎨 Frontend en HTML, CSS y JavaScript para la visualización e interacción.
- 🔄 API REST para gestionar las obras de arte.
- 📂 Uso de GitHub con ramas separadas, pull requests y etiquetas de versiones.
- 🛠️ Pruebas con Hoppscotch para verificar endpoints.

---

## 🚀 Instalación y ejecución

### 1️. Clonar el repositorio

```bash
git clone https://github.com/PCaam-git/Arte.git
cd Arte

2. Configurar e iniciar el backend
cd Backend
npm install
npm start

El backend se ejecutará en http://localhost:8090/

3. Iniciar el frontend
Solo debes abrir index.html en un navegador.


📡 Endpoints de la API

Autenticación
Método	        Endpoint	        Descripción
POST	        /api/login	        Iniciar sesión como administrador

Obras de arte
Método	        Endpoint	            Descripción
GET	            /api/arte/obras	        Obtener todas las obras
GET	            /api/arte/obras/:id	    Obtener una obra por ID
POST	        /api/arte/obras	        Crear una nueva obra
PUT	            /api/arte/obras/:id	    Modificar una obra existente
DELETE	        /api/arte/obras/:id	    Eliminar una obra


📝 Requisitos cumplidos
✅ Backend con CRUD completo.
✅ Frontend con CRUD funcional.
✅ Repositorio en GitHub con gestión de ramas y pull requests.
✅ Etiquetado de versiones.
✅ Protección de zona de administración con login.
✅ Validaciones en backend y frontend.
✅ Colección Hoppscotch añadida para pruebas de API.


🔖 Licencia
Este proyecto es de código abierto bajo la licencia MIT.


