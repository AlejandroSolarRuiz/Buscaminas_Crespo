// preguntar al usuario por la cantidad de filas del tablero
let filas = prompt("Introduce la cantidad de filas")
// preguntar al usuario por la cantidad de columnas del tablero
let columnas = prompt("Introduce la cantidad de columnas")
// preguntar al usuario por la cantidad de minas del tablero
let minas = prompt("Introduce la cantidad de minas")
//Array para guardar las filas y columnas del tablero
let tablero = [];

function resolverTablero(tablero) {
    for (let i = 0; i < tablero.length; i++) {
        for (let j = 0; j < tablero[0].length; j++) {

        }
    }
}

// funcion que comprueba que una posicion del tablero sea valida, 
//para no comprobar casillas que no existan por exceder los limites
function validarCasilla(fila, columna, tablero) {
    return (fila > -1 && fila < tablero.length && columna > -1 && columna < tablero[0].length)
}



function  crearTablero (filas,columnas) {
    for (let i = 0; i < filas; i++) {
        tablero[i] = [];
        for (let j = 0; j < columnas; j++) {
            tablero[i][j] = 0;
        }
    }
}

let minasColocadas = 0;

function crearMinas(filas, columnas, minas) {
    while (minasColocadas < minas) {
        let columnasMina = Math.floor((Math.random() * columnas));
        let filaMina = Math.floor(Math.random() * filas);

        if (tablero[filaMina][columnasMina] == -1){
            continue;
        }else{
            tablero[filaMina][columnasMina] == -1;
            minasColocadas--;
        }
    }
}

function mostrarTablero(tablero){
    for (let i = 0; i < tablero.length; i++) {
        for (let j = 0; j < tablero[i].length; j++) {
            document.write(tablero[i][j] + " ");
        }
        document.write("<br>");
    }
}
