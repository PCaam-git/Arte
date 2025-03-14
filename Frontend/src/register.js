//register.js
// URL base para las peticiones de autenticación
const API_URL = 'http://localhost:8090/api';

// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {

   // Función auxiliar para validar campos del login
   function validarLogin() {
       const usuario = document.getElementById("usuario").value.trim();
       const contraseña = document.getElementById("contraseña").value.trim();

       // Verificar que los campos no estén vacíos
       if (!usuario || !contraseña) {
           alert("Debes completar ambos campos para iniciar sesión.");
           return false;
       }
       return true;
   }

   // Manejador del formulario de inicio de sesión
   document.getElementById('login-form').addEventListener('submit', async (event) => {
       event.preventDefault(); // Prevenir envío tradicional del formulario
       if (!validarLogin()) return;

       // Obtener datos del formulario
       const usuario = document.getElementById("usuario").value;
       const contraseña = document.getElementById("contraseña").value;

       try {
           // Realizar petición de login al servidor
           const response = await fetch(`${API_URL}/login`, {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ usuario, contraseña })
           });

           const data = await response.json();

           if (response.ok) {
               alert('Inicio de sesión exitoso');
               // Almacenar datos de sesión
               localStorage.setItem('token', data.token);
               localStorage.setItem('usuario', usuario);

               // Redirigir según el tipo de usuario
               if (usuario === 'admin' && contraseña === 'admin123') {
                   window.location.href = 'admin-panel.html'; // Panel de administrador
               } else {
                   window.location.href = 'usuarios-panel.html'; // Vista de usuario normal
               }
           } else {
               alert('Error: ' + data.error);
           }
       } catch (error) {
           console.error("Error en la petición:", error);
           alert('Error en la petición: ' + error.message);
       }
   });

   // Manejador del formulario de registro
   document.getElementById('register-form').addEventListener('submit', async (event) => {
       event.preventDefault();

       // Obtener datos del formulario de registro
       const nombre = document.getElementById('name').value;
       const usuario = document.getElementById('new-usuario').value;
       const email = document.getElementById('email').value;
       const contraseña = document.getElementById('new-contraseña').value;

       try {
           // Enviar petición de registro al servidor
           const response = await fetch(`${API_URL}/register`, {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ nombre, usuario, email, contraseña })
           });

           const data = await response.json();

           if (response.ok) {
               alert('Registro exitoso, ahora puedes iniciar sesión');
               window.location.href = 'usuarios-panel.html'; // Redirigir tras registro exitoso
           } else {
               alert('Error: ' + data.error);
           }
       } catch (error) {
           console.error("Error en la petición:", error);
           alert('Error en la petición: ' + error.message);
       }
   });
});