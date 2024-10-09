// preguntar al usuario por la cantidad de filas del tablero
let filas = prompt("Introduce la cantidad de filas")
// preguntar al usuario por la cantidad de columnas del tablero
let columnas = prompt("Introduce la cantidad de columnas")
// preguntar al usuario por la cantidad de minas del tablero
let minas = prompt("Introduce la cantidad de minas")

function resolverTablero(tablero) {
    
}

function buscarMinasAdyacentes(fila,columna,tablero) {
    
}

function crearMinas(filas,columnas,minas){
    if(filas, columnas, minas <= 0){
        alert("Las filas, columnas o minas no pueden ser menor que 0");
    }
    else if( filas, columnas > 9){
        alert("Las filas o columnas no pueden ser mayores de 9");
    }else if (minas > (((filas*columnas)/2,5))){
        alert("Las minas no pueden ser más que la proporcion 1 mina por 2,5 huecos libres")
    }else{
        for (let index = 0; index < minas; index++) {
           let columnasMina = Math.floor((Math.random()*columnas));
           let filaMina = Math.floor(Math.random()*filas);
    }
}