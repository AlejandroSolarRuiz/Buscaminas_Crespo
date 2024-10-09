// preguntar al usuario por la cantidad de filas del tablero
let filas = prompt("Introduce la cantidad de filas")
// preguntar al usuario por la cantidad de columnas del tablero
let columnas = prompt("Introduce la cantidad de columnas")

function resolverTablero(tablero) {
    for (let i = 0; i < tablero.length; i++) {
        for (let j = 0; j < tablero[0].length; j++) {
            
        }
    }
}

// funcion que comprueba que una posicion del tablero sea valida, 
//para no comprobar casillas que no existan por exceder los limites
function validarCasilla(fila,columna,tablero) {
    return (fila > -1 && fila < tablero.length && columna > -1 && columna < tablero[0].length)
}