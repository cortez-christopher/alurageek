document.addEventListener("DOMContentLoaded", function() {
  const filtroToggle = document.getElementById("filtro-toggle");
  const filtroOpciones = document.getElementById("filtro-opciones");

  filtroToggle.addEventListener("click", function() {
      filtroOpciones.style.display = filtroOpciones.style.display === "block" ? "none" : "block";
  });

  document.addEventListener("click", function(event) {
      if (!filtroToggle.contains(event.target) && !filtroOpciones.contains(event.target)) {
          filtroOpciones.style.display = "none";
      }
  });
});

// Menu Opciones

document.addEventListener('DOMContentLoaded', function() {
  const opcionesIconos = document.querySelectorAll('.opciones');

  opcionesIconos.forEach(icono => {
    icono.addEventListener('click', function() {
      const menu = this.nextElementSibling;
      if (menu.style.display === 'flex') {
        menu.style.display = 'none';
      } else {
        document.querySelectorAll('.menu-opciones').forEach(menu => menu.style.display = 'none');
        menu.style.display = 'flex';
      }
    });
  });

  document.addEventListener('click', function(event) {
    if (!event.target.classList.contains('opciones') && !event.target.classList.contains('opcion')) {
      document.querySelectorAll('.menu-opciones').forEach(menu => menu.style.display = 'none');
    }
  });

});







