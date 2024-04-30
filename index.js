//Definimos las variables y constantes del Juego
const TABLERO = document.querySelector('.tablero');

const personajeSeleccionado = localStorage.getItem('personajeSeleccionado');

let personajeX = 2, personajeY = 2;
let princesaX = 16, princesaY = 16;
let movimientoX = 0, movimientoY = 0;
let llaveX = 14, llaveY = 9;
let vidas = 3; // Vidas
let paredMoverX = 16, paredMoverY = 12;
let intervalo;


//Creamos un array con las posiciones de las paredes
const paredes = [
    [3, 2], [3, 3], [3, 5], [4, 3], [5, 3], [4, 5], [3, 6], [3, 7], [3, 8], [3, 10], [3, 11], [3, 13], [3, 14], [3, 15], [2, 10], [4, 8], [4, 13], [4, 15],
    [5, 8], [5, 9], [5, 10], [5, 11], [5, 12], [5, 13], [5, 15], [7, 16], [7, 15], [7, 14], [7, 13], [6, 13], [5, 5], [5, 6], [6, 3], [7, 3], [7, 4], [7, 5], [7, 7], [7, 8], [6, 8],
    [9, 3], [9, 4], [9, 5], [9, 6], [9, 7], [9, 8], [10, 3], [10, 4], [10, 8], [11, 3], [11, 4], [11, 6], [11, 7], [11, 8], [12, 6], [13, 2], [13, 3], [13, 4], [13, 6], [13, 2],
    [14, 3], [14, 6], [14, 8], [13, 8], [15, 3], [15, 6], [15, 8], [16, 8], [13, 9], [13, 10], [13, 12], [14, 12], [15, 12], [14, 10], [15, 10], [14, 4], [15, 4], [11, 10],
    [11, 11], [11, 12], [12, 12], [15, 14], [15, 15], [15, 16], [13, 13], [13, 14], [13, 15], [11, 14], [11, 15], [11, 16], [9, 11], [9, 12], [9, 13], [9, 14], [9, 15], [10, 10], [9, 10],
    [8, 10], [7, 10], [8, 11], [7, 11], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1],[11, 1], [12, 1], [13, 1], [14, 1], [15, 1], [16, 1], [1, 17], [2, 17],
    [3, 17], [4, 17], [5, 17], [6, 17], [7, 17], [8, 17], [9, 17], [10, 17], [11, 17], [12, 17], [13, 17], [14, 17], [15, 17], [16, 17], [17, 17],[17, 1], [17, 2], [17, 3], [17, 4],
    [17, 5], [17, 6], [17, 7], [17, 8], [17, 9], [17, 10], [17, 11], [17, 12], [17, 13], [17, 14], [17, 15], [17, 16], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8],
    [1, 9], [1, 10], [1, 11], [1, 12], [1, 13], [1, 14], [1, 15], [1, 16],];


//Funciones para mostrar la previsualizacion del personaje a la hora de elegir
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('personaje').addEventListener('change', mostrarPrevisualizacion);
    mostrarPrevisualizacion();
});

// Establecerá la previsualización del caballero por defecto al cargar la página
 mostrarPrevisualizacion=()=> {
    let eleccion = document.getElementById('personaje').value;
    let previsualizacion = document.getElementById('previsualizacionPersonaje');

    // Cambiar el fondo de la previsualización
    previsualizacion.style.backgroundImage = `url('${eleccion}')`;
    previsualizacion.style.backgroundSize = 'cover';
    previsualizacion.style.backgroundPosition = 'center';
    previsualizacion.style.width = '100px';
    previsualizacion.style.height = '100px';
}

//Funciona para elegir personaje, este se almacena en el locaStorage del navegador para poder ser usado en el juego.
const elegirPersonaje=()=> {
    let personajeSeleccionado = document.getElementById('personaje').value;
    localStorage.setItem('personajeSeleccionado', personajeSeleccionado);
    window.location.href = 'index.html';
}

//Funcion para asignar las coordenadas x y al array de las paredes
const paredXY = (x, y) => {
    for (let i = 0; i < paredes.length; i++) {
        if (paredes[i][0] === x && paredes[i][1] === y) {
            return true;
        }
    }
    return false;
};

//Funcion para cambiar la direccion del personaje
const cambiarDireccion = (i) => {
    let paredX = personajeX;
    let paredY = personajeY;

    //Delimitadores de movimiento
    if (i.key === 'ArrowUp' && !paredXY(personajeX -1, personajeY)) {
        paredX -= 1;
    } else if (i.key === 'ArrowDown' && !paredXY(personajeX + 1, personajeY)) {
        paredX += 1;
    } else if (i.key === 'ArrowLeft' && !paredXY(personajeX, personajeY - 1)) {
        paredY -= 1;
    } else if (i.key === 'ArrowRight' && !paredXY(personajeX, personajeY + 1)) {
        paredY += 1;
    }
    // Si el personaje no se mueve, no se actualiza la posición
    if (paredX !== personajeX || paredY !== personajeY) {
        personajeX = paredX;
        personajeY = paredY;
    }
    // Si el personaje llega a la princesa, ganas el juego
    if (personajeX === princesaX && personajeY === princesaY) {
        ganarJuego();
    }
    // Si el personaje llega a la llave, coge la llave
    if (personajeX === llaveX && personajeY === llaveY) {
        cogerLlave();
    }

    iniciarJuego();
};


//Funcion que maneja el tiempo y las vidas con setInterval, cada 15 segundos si no llegas al objetivo pierdes una vida
const contador = () => {
    let tiempo = 15;

    intervalo = setInterval(function() {
        tiempo--;
        document.getElementById('segundos').textContent = tiempo; // Actualizar html
        document.getElementById('vidas').textContent = vidas;
        // Si el tiempo llega a 0, pierdes una vida, si llegas a 0 vidas pierdes el juego.
        if (tiempo <= 0) {
            clearInterval(intervalo);
            personajeX = 2;
            personajeY = 2;
            vidas--;
            if (vidas > 0) {
                contador();
            } else if (vidas === 0) {
                perderJuego();
            }
        }

    }, 1000);
};

//Funcion lanzadora del juego, carga los divs con las posiciones y las coordenadas iniciales
const iniciarJuego = () => {

    // Dibujamos el tablero con los elemnetos del juego
    let xy = `<div class="personaje" style="grid-area: ${personajeX} / ${personajeY}; background-image: url('${personajeSeleccionado}');"></div>`;
    xy += `<div class="princesa" style="grid-area: ${princesaX} / ${princesaY};"></div>`;
    xy += `<div class="llave" style="grid-area: ${llaveX} / ${llaveY};"></div>`;
    xy += `<div class="paredMover" style="grid-area: ${paredMoverX} / ${paredMoverY};"></div>`;

    for (let i = 0; i < paredes.length; i++) {
        xy += `<div class="pared" style="grid-area: ${paredes[i][0]} / ${paredes[i][1]};"></div>`;
    }
    // Mostramos el tablero
    TABLERO.innerHTML = xy;
};

//Funcion para mostrar que perdiste
const perderJuego = () => {
    let perder = document.getElementById('popupPerder');
    perder.style.display = 'block';
}

//Funcion para mostrar que ganaste
const ganarJuego = () => {
    clearInterval(intervalo);
    let ganar = document.getElementById('popup');
    ganar.style.display = 'block';
}

//Funcion que cambia la posicion de la llave
const cogerLlave = () => {
    paredMoverX = 15;
    paredMoverY = 13;
}

//Lanzadores
document.addEventListener('keydown', cambiarDireccion);
iniciarJuego();
contador();
