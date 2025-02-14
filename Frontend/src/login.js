const API_URL = 'http://localhost:8090/api/login';

document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const usuario = document.getElementById('usuario').value;
    const contraseña = document.getElementById('contraseña').value;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario, contraseña })
        });

        const data = await response.json();
        if (response.ok) {
            alert('Inicio de sesión exitoso');
            localStorage.setItem('token', data.token);
            window.location.href = 'admin.html';
        } else {
            document.getElementById('error-message').textContent = 'Usuario o contraseña incorrectos';
        }
    } catch (error) {
        console.error('Error en la petición:', error);
        document.getElementById('error-message').textContent = 'Error en la petición';
    }
});