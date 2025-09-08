// Tasa de conversión fija (1 USD = 4000 COP)
const tasaConversion = 4000;

// Captura de elementos del DOM
const form = document.getElementById("form-conversor");   // formulario principal
const selectOpcion = document.getElementById("opcion");   // menú de opciones (usd→cop / cop→usd)
const inputMonto = document.getElementById("monto");      // campo para ingresar monto
const resultado = document.getElementById("resultado");   // texto donde se mostrará el resultado
const acciones = document.getElementById("acciones");     // botones extra (nueva conversión / salir)
const btnNueva = document.getElementById("nueva-conversion"); // botón nueva conversión
const btnSalir = document.getElementById("salir");        // botón salir
const contenedor = document.getElementById("contenedor"); // caja principal
const despedida = document.getElementById("despedida");   // caja de despedida
const btnVolver = document.getElementById("volver");      // botón volver

// Evento para realizar la conversión al enviar el formulario
form.addEventListener("submit", function (e) {
  e.preventDefault(); // evita recargar la página
  let monto = inputMonto.value.trim(); // obtiene el valor escrito
  let opcion = selectOpcion.value;     // obtiene opción seleccionada

  // Validación: que el monto sea número válido
  if (monto === "" || isNaN(monto) || Number(monto) <= 0) {
    resultado.textContent = "⚠️ Ingrese un monto válido."; // mensaje de error
    resultado.style.color = "red";
    return;
  }

  let montoNumber = Number(monto); // convierte a número real
  let resultadoTexto = "";

  // Si la opción es de USD a COP
  if (opcion === "usd-cop") {
    let cop = montoNumber * tasaConversion; // multiplica por la tasa
    let copFormateado = cop.toLocaleString("es-CO"); // formato colombiano
    resultadoTexto = `${montoNumber} USD equivalen a ${copFormateado} COP`;
  } 
  // Si la opción es de COP a USD
  else if (opcion === "cop-usd") {
    let usd = montoNumber / tasaConversion; // divide por la tasa
    let usdFormateado = usd.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); // formato gringo
    resultadoTexto = `${montoNumber.toLocaleString("es-CO")} COP equivalen a ${usdFormateado} USD`;
  }

  resultado.textContent = resultadoTexto; // muestra el resultado en pantalla
  resultado.style.color = "green";

  acciones.style.display = "block"; // activa botones de acción
});

// Evento: limpiar y hacer nueva conversión
btnNueva.addEventListener("click", function () {
  inputMonto.value = "";           // limpia el campo
  resultado.textContent = "";      // limpia resultado
  acciones.style.display = "none"; // oculta botones
});

// Evento: salir del programa
btnSalir.addEventListener("click", function () {
  contenedor.style.display = "none"; // oculta el contenedor principal
  despedida.style.display = "block"; // muestra pantalla de despedida
});

// Evento: volver al conversor
btnVolver.addEventListener("click", function () {
  despedida.style.display = "none";  // oculta despedida
  contenedor.style.display = "block"; // muestra el conversor
  inputMonto.value = "";             // limpia monto
  resultado.textContent = "";        // limpia resultado
  acciones.style.display = "none";   // oculta botones
});
