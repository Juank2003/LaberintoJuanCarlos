const TABLERO = document.querySelector('.tablero');

let personajeX = 1, personajeY = 1;
let llaveX = 10, llaveY = 10;
let movimientoX = 0, movimientoY = 0;
let vidas = 3; // Vidas

const paredes = [[2,1], [2, 2], [2, 3], [2, 4], [2,5], [2, 6], [2, 7], [2, 8], [2, 9],
     [4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [4, 8], [4, 9], [4, 10],
     [6,1],[6,1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8], [6, 9],
     [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8], [8, 9], [8, 10],
     [10,1],[10,1], [10, 2], [10, 3], [10, 4], [10, 5], [10, 6], [10, 7], [10, 8], [10, 9],
];

const paredXY = (x, y) => {
    for (let i = 0; i < paredes.length; i++) {
        if (paredes[i][0] === x && paredes[i][1] === y) {
            return true; // Hay una pared en la posición (x, y)
        }
    }
    return false;
};

const cambiarDireccion = (i) => {
    let paredX = personajeX;
    let paredY = personajeY;

    if (i.key === 'ArrowUp' && personajeX > 1 && !paredXY(personajeX -1, personajeY)) {
        paredX -= 1;
    } else if (i.key === 'ArrowDown' && personajeX < 10 && !paredXY(personajeX + 1, personajeY)) {
        paredX += 1;
    } else if (i.key === 'ArrowLeft' && personajeY > 1 && !paredXY(personajeX, personajeY - 1)) {
        paredY -= 1;
    } else if (i.key === 'ArrowRight' && personajeY < 10 && !paredXY(personajeX, personajeY + 1)) {
        paredY += 1;
    }

    if (paredX !== personajeX || paredY !== personajeY) {
        personajeX = paredX;
        personajeY = paredY;
    }

    iniciarJuego();
};

const contador = () => {
    let tiempo = 11; // Tiempo en segundos

    const intervalo = setInterval(function() {
        tiempo--; // Decrementamos el tiempo
        document.getElementById('segundos').textContent = tiempo; // Actualizamos el elemento HTML
        document.getElementById('vidas').textContent = vidas; // Actualizamos el elemento HTML

        if (tiempo <= 0) {
            clearInterval(intervalo);
            personajeX = 1;
            personajeY = 1;
            vidas--;
            if (vidas > 0) {
                contador();
            } else {
            //aqui el juego se acaba y te lleva el menu
            }
        }

    }, 1000);
};

const iniciarJuego = () => {
    personajeX += movimientoX;
    personajeY += movimientoY;

    movimientoX = 0;
    movimientoY = 0;

    let xy = `<div class="personaje" style="grid-area: ${personajeX} / ${personajeY};"></div>`;
    xy += `<div class="llave" style="grid-area: ${llaveX} / ${llaveY};"></div>`;

    for (let i = 0; i < paredes.length; i++) {
        xy += `<div class="pared" style="grid-area: ${paredes[i][0]} / ${paredes[i][1]};"></div>`;
    }

    TABLERO.innerHTML = xy;
};

document.addEventListener('keydown', cambiarDireccion);
iniciarJuego();
contador();
