const TABLERO = document.querySelector('.tablero');

let personajeX = 1, personajeY = 1;
let llaveX = 10, llaveY = 10;
let movimientoX = 0, movimientoY = 0;

const paredes = [[2,1], [2, 2], [2, 3], [2, 4], [2,5], [2, 6], [2, 7], [2, 8], [2, 9],
     [4, 2], [4, 3], [4, 4], [4,5], [4, 6], [4, 7], [4, 8], [4, 9], [4,10]
];

const cambiarDireccion = (i) => {
    if (i.key === 'ArrowUp' && personajeX > 1) {
        movimientoX = -1;
        movimientoY = 0;
    } else if (i.key === 'ArrowDown' && personajeX <10) {
        movimientoX = 1;
        movimientoY = 0;
    } else if (i.key === 'ArrowLeft' && personajeY > 1) {
        movimientoX = 0;
        movimientoY = -1;
    } else if (i.key === 'ArrowRight' && personajeY < 10) {
        movimientoX = 0;
        movimientoY = 1;
    }
    iniciarJuego();
}



const iniciarJuego = () => {
    personajeX += movimientoX;  //encontrar el elemto que esta en la posicion x e y si si esta en la clase pared ,si tiene la clase pared pared que no se mueva
    personajeY += movimientoY;


    movimientoX = 0;
    movimientoY = 0;


    let xy = `<div class="personaje" style="grid-area: ${personajeX} / ${personajeY};"></div>`;
    xy += `<div class="llave" style="grid-area: ${llaveX} / ${llaveY};"></div>`;

    //${paredes[i][0]}: Aquí, i selecciona una de las paredes de tu lista, y el [0] toma la primera cifra de esa pared, que indica en qué fila debe ir.
    // ${paredes[i][1]}: De nuevo, i selecciona la pared, y el [1] toma la segunda cifra, que indica en qué columna debe ir.

    for (let i = 0; i < paredes.length; i++) {
        xy += `<div class="pared" style="grid-area: ${paredes[i][0]} / ${paredes[i][1]};"></div>`;
    }

    TABLERO.innerHTML = xy;

    console.log(personajeX, personajeY);
};

document.addEventListener('keydown', cambiarDireccion);
iniciarJuego();
