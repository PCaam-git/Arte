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

