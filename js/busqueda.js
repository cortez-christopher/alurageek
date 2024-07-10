document.addEventListener('DOMContentLoaded', (evento) => {
  const busquedaIcono = document.getElementById('busqueda-icono');
  const busquedaContenedor = document.getElementById('busqueda-contenedor');
  const busquedaInput = document.getElementById('busqueda-input');
  const cerrarBusqueda = document.getElementById('cerrar-busqueda');

  busquedaIcono.addEventListener('click', () => {
    busquedaContenedor.classList.toggle('mostrar-mensaje');
    busquedaInput.focus();
  });

  cerrarBusqueda.addEventListener('click', () => {
    busquedaContenedor.classList.remove('mostrar-mensaje');
  });

  busquedaContenedor.addEventListener('click', (e) => {
    if (e.target === busquedaContenedor) {
      busquedaContenedor.classList.remove('mostrar-mensaje');
    }
  });

});

//busqueda.js