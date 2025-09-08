// paso1 : crear selectores para el container resultado y el formulario
const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

// escuchar evento de carga y submit
window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
});

// función buscar clima
function buscarClima(e) {
    e.preventDefault();

    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if (ciudad === '' || pais === '') {
        mostrarError('Ambos campos son obligatorios');
        return;
    }

    // si los campos tienen datos, consultamos la API
    consultarAPI(ciudad, pais);
}

// función para mostrar errores
function mostrarError(mensaje) {
    const alerta = document.querySelector('.bg-red-100');
    if (!alerta) {
        const alerta = document.createElement('div');
        alerta.classList.add(
            'bg-red-100',
            'border-red-400',
            'text-red-700',
            'px-4',
            'py-3',
            'rounded',
            'max-w-md',
            'mx-auto',
            'mt-6',
            'text-center'
        );
        alerta.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class="block">${mensaje}</span>
        `;
        container.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}

// función para consultar la API
function consultarAPI(ciudad, pais) {
    const appId = 'f521e25b7d12e3b960655c4148b02b00'; // tu API key
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            if (datos.cod === "404" || datos.cod === 404) {
                mostrarError("Ciudad no encontrada");
                return;
            }
            limpiarHTML();
            mostrarClima(datos);
        })
        .catch(error => {
            mostrarError('Error al consultar la API');
            console.error(error);
        });
}

// limpiar HTML antes de mostrar resultados nuevos
function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

// función para mostrar el clima
function mostrarClima(datos) {
    const { name, main: { temp, temp_max, temp_min } } = datos;

    const grados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);

    const nombreCiudad = document.createElement('p');
    nombreCiudad.innerHTML = `Clima en ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl');    

    const actual = document.createElement('p');
    actual.innerHTML = `${grados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');

    const tempMaxima = document.createElement('p'); 
    tempMaxima.innerHTML = `Max: ${max} &#8451;`;
    tempMaxima.classList.add('text-xl');

    const tempMinima = document.createElement('p');
    tempMinima.innerHTML = `Min: ${min} &#8451;`;
    tempMinima.classList.add('text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white', 'p-4', 'bg-pink-500', 'rounded-lg', 'mt-4');    

    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);

    resultado.appendChild(resultadoDiv);
}

// convertir de Kelvin a °C
function kelvinACentigrados(grados) {
    return parseInt(grados - 273.15);
}
