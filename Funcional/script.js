const numFilas = 8;
const numColumnas = 8;
const numMinas = 10;

// define las direcciones correspondientes a las 8
// posiciones adyacentes
const direcciones = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
];

const tableroJuego = document.getElementById("tablero");
let tablero = [];

// crea el tablero
function crearTablero(filas, columnas) {
    const tablero = [];
    for (let i = 0; i < filas; i++) {
        const fila = [];
        for (let j = 0; j < columnas; j++) {
            const casilla = {
                esMina: false,
                revelada: false,
                contador: 0,
            };
            tablero[i][j] = casilla;
        }
    }
}

// funcion que crea la posicion de las minas
// se comprueba si en la casilla existe una mina y si no se escribe -1 respresentando a la mina
function crearMinas(tablero, minas) {
    let minasColocadas = 0;
    while (minasColocadas < minas) {
        let filaMina = Math.floor(Math.random() * filas);
        let columnaMina = Math.floor(Math.random() * columnas);

        if (!tablero[filaMina][columnaMina].esMina) {
            tablero[filaMina][columnaMina].esMina = true;
            minasColocadas++;
        }
    }
}

// // funcion encargada de resolver el tablero, colocando en
// // cada casilla el valor correspondiente a la cantidad de minas
// // adyacentes
// function resolverTablero(tablero) {
//     // por cada fila y por cada columna,
//     // es decir por cada casilla
//     for (let i = 0; i < tablero.length; i++) {
//         for (let j = 0; j < tablero[0].length; j++) {
//             // si la casilla no tiene una mina
//             if (tablero[i][j] != -1) {
//                 // invoco a un metodo que me calcula el valor de la casilla
//                 calcularCasilla(i, j, tablero);
//             }
//         }
//     }
// }

// calcula el valor de una casilla dada
function calcularCasilla(fila, columna) {
    // recorre cada direccion adyacente
    for (let i = 0; i < direcciones.length; i++) {
        let nuevaFila = fila + direcciones[i][0];
        let nuevaColumna = columna + direcciones[i][1];

        // si la casilla adyacente es una casilla valida y tiene una mina
        if (
            validarCasilla(nuevaFila, nuevaColumna) &&
            tablero[nuevaFila][nuevaColumna].esMina
        ) {
            // incremento en 1 el valor de la casilla actual
            tablero[fila][columna].contador++;
        }
    }
}

// funcion que comprueba que una posicion del tablero sea valida,
//para no comprobar casillas que no existan por exceder los limites
function validarCasilla(fila, columna) {
    // devuelve verdadero si la fila y la columna existen en el tablero
    // son validas las posiciones desde 0 hasta el length-1
    return (
        fila > -1 &&
        fila < tablero.length &&
        columna > -1 &&
        columna < tablero[0].length
    );
}

function revelarCasilla(fila, columna) {
    if (!validarCasilla(fila, columna) || tablero[fila][columna].revelada) {
        return;
    }

    tablero[fila][columna].revelada = true;
    
    if (tablero[fila][columna].esMina) {
        gameOver();
    } else if (tablero[fila][columna].contador === 0) {
        calcularCasilla(fila,columna);
        revelarCasilla(fila, columna);
    }
}

function gameOver() {
    //TODO
}
