document.addEventListener("DOMContentLoaded", function() {
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



document.addEventListener("DOMContentLoaded", function() {
    // Ocultar todos los submenús
    var submenus = document.querySelectorAll('.desplegable-sub ul');
    submenus.forEach(function(submenu) {
        submenu.style.display = 'none';
    });

    // Seleccionar los elementos desplegables de "SERVICIOS"
    var servicios = document.querySelector('.desplegable');

    // Seleccionar los elementos desplegables de "Boton 1" y "Boton 2"
    var boton1 = document.querySelector('.desplegable-sub:nth-child(1)');
    var boton2 = document.querySelector('.desplegable-sub:nth-child(2)');

    // Función para ocultar todos los submenús excepto el pasado como argumento
    function ocultarSubmenus(exceptoEste) {
        submenus.forEach(function(submenu) {
            if (submenu !== exceptoEste) {
                submenu.style.display = 'none';
            }
        });
    }

    // Mostrar el submenú correspondiente al pasar el mouse sobre "Boton 1"
    boton1.addEventListener('mouseover', function() {
        ocultarSubmenus(this.querySelector('ul'));
        var submenu = this.querySelector('ul');
        submenu.style.display = 'block';
        submenu.style.left = '100%'; // Ajusta el submenú a la derecha
        submenu.style.top = this.offsetTop + 'px'; // Ajusta el submenú a la misma altura que el botón
    });

    // Mostrar el submenú correspondiente al pasar el mouse sobre "Boton 2"
    boton2.addEventListener('mouseover', function() {
        ocultarSubmenus(this.querySelector('ul'));
        var submenu = this.querySelector('ul');
        submenu.style.display = 'block';
        submenu.style.left = '100%'; // Ajusta el submenú a la derecha
        submenu.style.top = this.offsetTop + 'px'; // Ajusta el submenú a la misma altura que el botón
    });

    // Ocultar todos los submenús al mover el mouse fuera de "SERVICIOS"
    servicios.addEventListener('mouseenter', function() {
        ocultarSubmenus(null); // Pasa null para ocultar todos los submenús
    });
});
