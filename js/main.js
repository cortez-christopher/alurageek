// Menu despegable

window.addEventListener('scroll', function(){
  const encabezado = document.getElementById('encabezado');
  if (window.scrollY > 50) {
    encabezado.classList.add('scroll');
  }else {
    encabezado.classList.remove('scroll');
  }
})

//main.js

