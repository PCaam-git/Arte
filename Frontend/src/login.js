// Definir la URL del endpoint de login
const API_URL = 'http://localhost:8090/api/login';

// Event listener para el envío del formulario de login
document.getElementById('login-form').addEventListener('submit', async (event) => {
   // Prevenir el envío tradicional del formulario
   event.preventDefault();

   // Obtener valores de los campos del formulario
   const usuario = document.getElementById('usuario').value;
   const contraseña = document.getElementById('contraseña').value;

   try {
       // Realizar la petición POST al servidor para autenticar
       const response = await fetch(API_URL, {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ usuario, contraseña }) // Enviar credenciales
       });

       // Procesar la respuesta del servidor
       const data = await response.json();
       if (response.ok) {
           // Si la autenticación es exitosa
           alert('Inicio de sesión exitoso');
           // Guardar el token JWT en el almacenamiento local
           localStorage.setItem('token', data.token);
           // Redirigir al panel de administración
           window.location.href = 'admin.html';
       } else {
           // Si las credenciales son incorrectas
           document.getElementById('error-message').textContent = 'Usuario o contraseña incorrectos';
       }
   } catch (error) {
       // Manejar errores de red o del servidor
       console.error('Error en la petición:', error);
       document.getElementById('error-message').textContent = 'Error en la petición';
   }
});