document.addEventListener('DOMContentLoaded', function() {
  const agregarBoton = document.getElementById('agregar-boton');
  const agregarProducto = document.getElementById('agregar-producto');
  const cerrarVentana = document.querySelector('.cerrar-ventana');
  const formulario = document.getElementById('form-agregar-producto');

  agregarBoton.addEventListener('click', function() {
    agregarProducto.classList.toggle('active');
  });

  cerrarVentana.addEventListener('click', function() {
    agregarProducto.classList.remove('active');
    formulario.reset(); 
    formulario.removeAttribute('data-id'); 
  });

  formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    // Capturar los datos del formulario
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const categoria = document.getElementById('categoria').value;
    const precio = parseFloat(document.getElementById('precio').value); 
    const imagen = document.getElementById('imagen').value;

    const nuevoProducto = {
      nombre: nombre,
      descripcion: descripcion,
      categoria: categoria,
      precio: precio,
      imagen: imagen
    };

    const idProducto = formulario.dataset.id;

    if (idProducto) {
      // Actualizar producto existente
      fetch(`http://localhost:3001/productos/${idProducto}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoProducto)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Producto actualizado:', data);

        
        alert('Producto actualizado exitosamente');
        formulario.reset();
        formulario.removeAttribute('data-id');
        agregarProducto.classList.remove('active');
        
        
        window.cargarProductos();
      })
      .catch(error => {
        console.error('Error al actualizar el producto:', error);
      });
    } else {
      // Crear nuevo producto
      fetch('http://localhost:3001/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoProducto)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Producto agregado:', data);

        
        alert('Producto agregado exitosamente');
        formulario.reset();
        
        
        window.cargarProductos();
      })
      .catch(error => {
        console.error('Error al agregar el producto:', error);
      });
    }
  });
});






