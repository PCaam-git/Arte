document.addEventListener("DOMContentLoaded", () => {
    const API_URL = 'http://localhost:8090/api';

    // Función para validar el formulario de inicio de sesión
    function validarLogin() {
        const usuario = document.getElementById("usuario").value.trim();
        const contraseña = document.getElementById("contraseña").value.trim();

        if (!usuario || !contraseña) {
            alert("Debes completar ambos campos para iniciar sesión.");
            return false;
        }
        return true;
    }

    // Función para manejar el inicio de sesión
    document.getElementById('login-form').addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita la recarga de la página
        if (!validarLogin()) return;

        const usuario = document.getElementById("usuario").value;
        const contraseña = document.getElementById("contraseña").value;

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usuario, contraseña })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Inicio de sesión exitoso');
                localStorage.setItem('token', data.token); // Guarda el token en el navegador
                localStorage.setItem('usuario', usuario); // Guarda el nombre de usuario en el navegador

                if (usuario === 'admin' && contraseña === 'admin123') {
                    window.location.href = 'admin.html'; // Redirigir al panel de administrador
                } else {
                    window.location.href = 'index.html'; // Redirigir al usuario normal
                }
            } else {
                alert('Error: ' + data.error);
            }
        } catch (error) {
            console.error("Error en la petición:", error);
            alert('Error en la petición: ' + error.message);
        }
    });

    // Función para manejar el registro de usuario
    document.getElementById('register-form').addEventListener('submit', async (event) => {
        event.preventDefault();

        const nombre = document.getElementById('name').value;
        const usuario = document.getElementById('new-usuario').value;
        const email = document.getElementById('email').value;
        const contraseña = document.getElementById('new-contraseña').value;

        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, usuario, email, contraseña })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Registro exitoso, ahora puedes iniciar sesión');
                window.location.href = 'index.html'; // Redirigir a la página de inicio de sesión
            } else {
                alert('Error: ' + data.error);
            }
        } catch (error) {
            console.error("Error en la petición:", error);
            alert('Error en la petición: ' + error.message);
        }
    });
});
