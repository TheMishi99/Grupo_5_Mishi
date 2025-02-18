let botonEnvio = document.querySelector(".shipping");
let botonRetiro = document.querySelector(".pick-up");
let formEnvio = document.querySelector(".shipping-form");
let inputRetiro = document.querySelector(".input-pick-up");
let gifGato = document.querySelector(".catGif");
let botonConfirm = document.querySelector(".confirm-button");

// function provincias(){
//     fetch("https://apis.datos.gob.ar/georef/api/provincias")
//     .then(res => res.ok ? res.json() : Promise.reject(res))
//     .then(data => {
//         let $options = `<option value="Elige una provincia">Elige una provincia</option>`
//         data.provincias.forEach(provincia => $options += `<option value="${provincia.nombre}">${provincia.nombre}</option>`);
//         document.getElementById("province").innerHTML = $options
//     })
// }

function provincias() {
    fetch("https://apis.datos.gob.ar/georef/api/provincias")
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(data => {
            // Obtener el select
            let selectProvince = document.getElementById("province");

            // Guardar la opción "Elige una provincia" para luego reinsertarla
            let defaultOption = selectProvince.querySelector('option[value="Elige una provincia"]');

            // Limpiar opciones existentes
            selectProvince.innerHTML = '';

            // Crear un array para almacenar los nombres de las provincias
            let provinciasArray = data.provincias.map(provincia => provincia.nombre);

            // Ordenar el array alfabéticamente
            provinciasArray.sort();

            // Reinsertar la opción "Elige una provincia" al inicio
            if (defaultOption) {
                selectProvince.appendChild(defaultOption);
            }

            // Crear y añadir opciones al select
            provinciasArray.forEach(provincia => {
                let option = document.createElement('option');
                option.textContent = provincia;
                option.value = provincia;
                selectProvince.appendChild(option);
            });
            document.getElementById("province").addEventListener("change", function () {
                ciudades(encodeURIComponent(this.value));
              });
        });
}
provincias();

function ciudades(prov) {
  fetch(
    `https://apis.datos.gob.ar/georef/api/departamentos?provincia=${prov}&max=50`
  )
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((data) => {
      let $options = `<option value="Elige una ciudad">Elige una ciudad</option>`;
      data.departamentos.forEach(
        (ciudad) =>
          ($options += `<option value="${ciudad.nombre}">${ciudad.nombre}</option>`)
      );
      document.getElementById("city").innerHTML = $options;
    });
}

botonEnvio.addEventListener("click", function (event) {
  event.preventDefault();
  inputRetiro.style.display = "none";
  formEnvio.style.display = "block";
  gifGato.style.display = "block";
  botonRetiro.classList.remove("boton-clicked");
  botonEnvio.classList.add("boton-clicked");
});

botonRetiro.addEventListener("click", function (event) {
  event.preventDefault();
  formEnvio.style.display = "none";
  gifGato.style.display = "none";
  inputRetiro.style.display = "block";
  botonEnvio.classList.remove("boton-clicked");
  botonRetiro.classList.add("boton-clicked");
});

function mostrarVentana() {
  // Crear un elemento div para la ventana emergente
  var ventanaEmergente = document.createElement("div");
  ventanaEmergente.className = "ventana-emergente";

  // Crear el contenido de la ventana emergente
  var contenido = document.createElement("div");
  contenido.className = "contenido";
  contenido.innerHTML = "<p class='hola'>¡Compra realizada con éxito!</p>";

  // Crear un botón para cerrar la ventana emergente
  var botonCerrar = document.createElement("button");
  botonCerrar.textContent = "Cerrar";
  botonCerrar.onclick = function () {
    // Remover la ventana emergente cuando se hace clic en el botón "Cerrar"
    document.body.removeChild(ventanaEmergente);
    // Redireccionar al inicio de la página
    window.location.href = "/";
  };

  // Agregar el contenido y el botón de cierre a la ventana emergente
  ventanaEmergente.appendChild(contenido);
  ventanaEmergente.appendChild(botonCerrar);

  // Agregar la ventana emergente al cuerpo del documento
  document.body.appendChild(ventanaEmergente);

  event.preventDefault();
}
