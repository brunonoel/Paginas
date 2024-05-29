document.addEventListener("DOMContentLoaded", function() {
    const content = document.getElementById('content');
    const navBar = document.querySelector('nav ul');

    let users = [];

    const pages = {
        inicio: `
            <div class="content">
                <div class="titulo">
                    <h1>BIENVENIDOS A ByP</h1>
                </div>
                <div class="carrusel">
                    <img src="Imagenes/imagen (1).jpg" alt="Imagen 1">
                    <img src="Imagenes/imagen (2).jpg" alt="Imagen 2">
                    <img src="Imagenes/imagen (3).jpg" alt="Imagen 3">
                    <div class="botones-navegacion">
                        <button class="anterior">&#10094;</button>
                        <button class="siguiente">&#10095;</button>
                    </div>
                </div>
            </div>
        `,
        nosotros: `
            <div class="content">
                <h1>Nosotros</h1>
                <p>Contenido de la página de nosotros.</p>
            </div>
        `,
        historia: `
            <div class="content">
                <h1>Historia</h1>
                <p>Contenido de la página de historia.</p>
            </div>
        `,
        politicas: `
            <div class="content">
                <h1>Políticas de Servicio</h1>
                <p>Contenido de la página de políticas de servicio.</p>
            </div>
        `,
        maquillajeArtistico: `
            <div class="content">
                <h1>Maquillaje Artístico</h1>
                <p>Contenido de la página de maquillaje artístico.</p>
            </div>
        `,
        animaciones: `
            <div class="content">
                <h1>Animaciones</h1>
                <p>Contenido de la página de animaciones.</p>
            </div>
        `,
        contacto: `
            <div class="content">
                <h1>Contacto</h1>
                <p>Contenido de la página de contacto.</p>
            </div>
        `,
        iniciar: `
            <div class="content">
                <div class="titulo">
                    <h1>INICIAR SESIÓN</h1>
                </div>
                <form id="loginForm" class="iniciar">
                    <label for="username">Usuario:</label>
                    <input type="text" id="username" name="username" required><br><br>
                    <label for="password">Contraseña:</label>
                    <input type="password" id="password" name="password" required><br><br>
                    <input type="submit" value="Ingresar">
                </form>
                <div class="redirect">
                    <h3>¿TODAVÍA NO ERES USUARIO?</h3>
                    <button id="registro">REGISTRARSE</button>
                </div>
            </div>
        `,
        registro: `
            <div class="content">
                <div class="titulo">
                    <h1>REGISTRARSE</h1>
                </div>
                <form id="registroForm" class="registro">
                    <label for="new-username">Usuario:</label>
                    <input type="text" id="new-username" name="new-username" required><br><br>
                    <label for="new-password">Contraseña:</label>
                    <input type="password" id="new-password" name="new-password" required><br><br>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required><br><br>
                    <label for="direccion">Dirección:</label>
                    <input type="text" id="direccion" name="direccion" required><br><br>
                    <label for="provincia">Provincia:</label>
                    <input type="text" id="provincia" name="provincia" required><br><br>
                    <label for="telefono">Teléfono/Celular:</label>
                    <input type="tel" id="telefono" name="telefono" required><br><br>
                    <input type="submit" value="Registrarse">
                </form>
            </div>
        `,
        perfil: `
            <div class="content">
                <div class="titulo">
                    <h1>PERFIL DEL USUARIO</h1>
                </div>
                <div class="perfil">
                    <img id="avatar" src="Imagenes/default-avatar.png" alt="Avatar" class="avatar">
                    <h2 id="perfil-username"></h2>
                    <p id="perfil-email"></p>
                    <p id="perfil-direccion"></p>
                    <p id="perfil-provincia"></p>
                    <p id="perfil-telefono"></p>
                    <input type="file" id="upload-avatar">
                </div>
                <h3>Servicios Adquiridos</h3>
                <ul id="servicios-lista">
                    <!-- Aquí se listarán los servicios adquiridos -->
                </ul>
            </div>
        `
    };

    function loadContent(section) {
        content.innerHTML = pages[section];

        if (section === 'iniciar') {
            document.getElementById('registro').addEventListener('click', function() {
                loadContent('registro');
            });

            const loginForm = document.getElementById('loginForm');
            loginForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;

                if (login(username, password)) {
                    alert('Inicio de sesión exitoso');
                    updateNavBar(username);
                    loadContent('inicio');
                } else {
                    alert('Usuario o contraseña incorrectos');
                }
            });
        }

        if (section === 'registro') {
            const form = document.getElementById('registroForm');
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                const username = document.getElementById('new-username').value;
                const password = document.getElementById('new-password').value;
                const email = document.getElementById('email').value;
                const direccion = document.getElementById('direccion').value;
                const provincia = document.getElementById('provincia').value;
                const telefono = document.getElementById('telefono').value;

                if (!usernameAvailable(username)) {
                    alert('Nombre de usuario no disponible');
                    return;
                }

                if (!isValidPassword(password)) {
                    alert('La contraseña debe tener al menos 8 caracteres e incluir letras y números');
                    return;
                }

                if (validateForm(username, password, email, direccion, provincia, telefono)) {
                    users.push({ username, password, email, direccion, provincia, telefono, avatar: 'Imagenes/avatar.jpg', servicios: [] });
                    alert('Registro exitoso');
                    loadContent('iniciar');
                }
            });
        }

        if (section === 'perfil') {
            const username = sessionStorage.getItem('currentUser');
            const user = users.find(u => u.username === username);

            if (user) {
                document.getElementById('perfil-username').textContent = user.username;
                document.getElementById('perfil-email').textContent = `Email: ${user.email}`;
                document.getElementById('perfil-direccion').textContent = `Dirección: ${user.direccion}`;
                document.getElementById('perfil-provincia').textContent = `Provincia: ${user.provincia}`;
                document.getElementById('perfil-telefono').textContent = `Teléfono/Celular: ${user.telefono}`;
                document.getElementById('avatar').src = user.avatar;

                const uploadAvatar = document.getElementById('upload-avatar');
                uploadAvatar.addEventListener('change', function() {
                    const file = this.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = function(e) {
                            user.avatar = e.target.result;
                            document.getElementById('avatar').src = user.avatar;
                        };
                        reader.readAsDataURL(file);
                    }
                });

                const serviciosLista = document.getElementById('servicios-lista');
                serviciosLista.innerHTML = '';
                user.servicios.forEach(servicio => {
                    const li = document.createElement('li');
                    li.textContent = servicio;
                    serviciosLista.appendChild(li);
                });
            }
        }
    }

    function usernameAvailable(username) {
        return !users.some(user => user.username === username);
    }

    function isValidPassword(password) {
        return password.length >= 8 && /\d/.test(password) && /[a-zA-Z]/.test(password);
    }

    function validateForm(username, password, email, direccion, provincia, telefono) {
        // Validaciones adicionales si son necesarias
        return true;
    }

    function login(username, password) {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            sessionStorage.setItem('currentUser', username);
            return true;
        }
        return false;
    }

    function updateNavBar(username) {
        const user = users.find(u => u.username === username);
        if (user) {
            const avatarImg = document.createElement('img');
            avatarImg.src = user.avatar;
            avatarImg.alt = "Avatar";
            avatarImg.className = "navbar-avatar";
            avatarImg.style.width = "40px";
            avatarImg.style.height = "40px";
            avatarImg.style.borderRadius = "50%";
            avatarImg.addEventListener('click', function() {
                loadContent('perfil');
            });

            loginRegisterLink.innerHTML = ''; // Limpiar el contenido del link
            loginRegisterLink.appendChild(avatarImg); // Agregar el nuevo avatar
        }
    }

    // Load default section (Inicio)
    loadContent('inicio');

    // Attach click event to all navigation links
    const navLinks = document.querySelectorAll('nav a[data-section]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const section = this.getAttribute('data-section');
            loadContent(section);
        });
    });

    // Carrusel de imágenes
    var index = 0;
    var imagenes = document.querySelectorAll(".carrusel img");
    var total = imagenes.length;
    var intervalo; // Variable para almacenar el intervalo del carrusel

    // Función para mostrar la siguiente imagen
    function siguienteImagen() {
        imagenes[index].style.display = "none";
        index = (index + 1) % total;
        imagenes[index].style.display = "block";
    }

    // Función para mostrar la imagen anterior
    function imagenAnterior() {
        imagenes[index].style.display = "none";
        index = (index - 1 + total) % total;
        imagenes[index].style.display = "block";
    }

    // Evento para avanzar a la siguiente imagen
    var botonSiguiente = document.querySelector(".botones-navegacion .siguiente");
    botonSiguiente.addEventListener("click", function() {
        clearInterval(intervalo); // Detener el carrusel
        siguienteImagen();
    });

    // Evento para retroceder a la imagen anterior
    var botonAnterior = document.querySelector(".botones-navegacion .anterior");
    botonAnterior.addEventListener("click", function() {
        clearInterval(intervalo); // Detener el carrusel
        imagenAnterior();
    });

    // Automáticamente cambiar a la siguiente imagen cada 5 segundos
    intervalo = setInterval(siguienteImagen, 2500);
});