document.querySelector('.login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('https://techadministrator.onrender.com/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            // Guardar el token en localStorage
            localStorage.setItem('token', data.token);

            // Redirigir a /almacen
            window.location.href = '/almacen';
        } else {
            // Mostrar mensaje de error si las credenciales no son válidas
            alert('Error: Usuario o contraseña incorrectos.');
        }
    } catch (error) {
        // Mostrar mensaje de error en caso de fallo en la solicitud
        alert('Error: No se pudo conectar con el servidor.');
        console.error('Error:', error);
    }
});
