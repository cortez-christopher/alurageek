document.addEventListener('DOMContentLoaded', function() {
  const url = 'http://localhost:3001/productos';
  const agregarProducto = document.getElementById('agregar-producto'); 

  function crearTarjetaProducto(producto) {
    const contenedor = document.createElement('div');
    contenedor.classList.add('producto');

    const opciones = document.createElement('i');
    opciones.classList.add('bx', 'bx-dots-horizontal-rounded', 'opciones');
    contenedor.appendChild(opciones);

    const menuOpciones = document.createElement('div');
    menuOpciones.classList.add('menu-opciones');
    menuOpciones.innerHTML = `
      <button class="opcion agregar" data-id="${producto.id}"><i class='bx bx-add-to-queue'></i>Agregar</button>
      <button class="opcion editar" data-id="${producto.id}"><i class='bx bx-edit-alt'></i>Editar</button>
      <button class="opcion eliminar" data-id="${producto.id}"><i class='bx bx-trash'></i>Eliminar</button>
    `;
    contenedor.appendChild(menuOpciones);

    const img = document.createElement('img');
    img.src = producto.imagen;
    img.alt = producto.nombre;
    contenedor.appendChild(img);

    const detalles = document.createElement('div');
    detalles.classList.add('detalles');
    detalles.innerHTML = `
      <h2>${producto.nombre}</h2>
      <p>${producto.descripcion}</p>
      <span class="precio">$${producto.precio.toFixed(2)}</span>
    `;
    contenedor.appendChild(detalles);

    return contenedor;
  }

  async function cargarProductos() {
    try {
      const respuesta = await fetch(url);
      const productos = await respuesta.json();
      
      const catalogo = document.querySelector('.catalogo');
      catalogo.innerHTML = ''; 

      productos.forEach(producto => {
        const tarjeta = crearTarjetaProducto(producto);
        catalogo.appendChild(tarjeta);
      });

      asignarEventListenersOpciones();
      asignarEventListenersEliminar();
      asignarEventListenersEditar();
      asignarEventListenersAgregar();
    } catch (error) {
      console.error('Error cargando los productos:', error);
    }
  }

  function asignarEventListenersOpciones() {
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
  }

  function asignarEventListenersEliminar() {
    const botonesEliminar = document.querySelectorAll('.opcion.eliminar');

    botonesEliminar.forEach(boton => {
      boton.addEventListener('click', async function() {
        const idProducto = this.dataset.id;
        const confirmacion = confirm('¿Estás seguro de que deseas eliminar este producto?');
        if (confirmacion) {
          try {
            const respuesta = await fetch(`${url}/${idProducto}`, {
              method: 'DELETE'
            });
            if (respuesta.ok) {
              alert('Producto eliminado exitosamente');
              cargarProductos(); 
              this.closest('.menu-opciones').style.display = 'none'; 
            } else {
              throw new Error('Error al eliminar el producto');
            }
          } catch (error) {
            console.error('Error:', error);
          }
        }
      });
    });
  }

  function asignarEventListenersEditar() {
    const botonesEditar = document.querySelectorAll('.opcion.editar');

    botonesEditar.forEach(boton => {
      boton.addEventListener('click', async function() {
        const idProducto = this.dataset.id;
        try {
          const respuesta = await fetch(`${url}/${idProducto}`);
          const producto = await respuesta.json();
          
          // Llenar el formulario con los datos del producto
          document.getElementById('nombre').value = producto.nombre;
          document.getElementById('descripcion').value = producto.descripcion;
          document.getElementById('categoria').value = producto.categoria;
          document.getElementById('precio').value = producto.precio;
          document.getElementById('imagen').value = producto.imagen;
          
          // Marcar el formulario para editar
          document.getElementById('form-agregar-producto').dataset.id = producto.id;
          agregarProducto.classList.add('active'); 
          this.closest('.menu-opciones').style.display = 'none'; 
        } catch (error) {
          console.error('Error al cargar el producto para editar:', error);
        }
      });
    });
  }

  function asignarEventListenersAgregar() {
    const botonesAgregar = document.querySelectorAll('.opcion.agregar');

    botonesAgregar.forEach(boton => {
      boton.addEventListener('click', function() {
        agregarProducto.classList.add('active'); 
        this.closest('.menu-opciones').style.display = 'none'; 
      });
    });
  }

  cargarProductos();

  
  window.cargarProductos = cargarProductos;
});

