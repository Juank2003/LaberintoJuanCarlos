const TABLERO = document.querySelector('.tablero');

let personajeX = 1, personajeY = 1;
let llaveX = 10, llaveY = 10;
let movimientoX = 0, movimientoY = 0;

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
    xy += `<div class="pared" style="grid-area: 2 / 2;"></div>`;
    TABLERO.innerHTML = xy;

    console.log(personajeX, personajeY);
};

document.addEventListener('keydown', cambiarDireccion);
iniciarJuego();
