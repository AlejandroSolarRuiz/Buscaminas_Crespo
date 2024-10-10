// datos con los que trabaja el programa

// numero de filas
let filas;
// numero de columnas
let columnas;
// numero de minas
let minas;
// tablero de juego
let tablero = [];

// esta funcion se encarga de realizar el pedido al usuario de un unico dato
// "mensaje" indica el texto con el que se pide al usuario informacion
// "maximo" representa el valor máximo que el usuario puede indicar para el dato pedido
function solicitarNumero(mensaje, maximo) {
    // mientras el dato introducido sea erroneo
    while (true) {
        // pido al usuario el mensaje
        let input = prompt(mensaje);

        // si el usuario pulsa cancelar se indica que el programa finalizo
        // y se retorna null para que SolicitarDatos se detenga
        if (input == null) {
            alert("Programa Finalizado");
            return null;
        }
        const numero = parseInt(input);
        if (!isNaN(numero) && numero > 0 && numero <= maximo) {
            return numero;
        }
        alert(
            `El valor introducido es incorrecto, debe estar entre 1 y ${maximo}, Intentelo de nuevo`
        );
    }
}

// Función que solicita los datos necesarios para configurar el juego
function solicitarDatos() {
    // Solicitar filas y columnas
    filas = solicitarNumero("Introduce el número de filas (mínimo 1 y máximo 9):", 9);
    // Si el usuario canceló, salimos de la función
    if (filas === null) return;

    columnas = solicitarNumero("Introduce el número de columnas (mínimo 1 y máximo 9):", 9);
    // Si el usuario canceló, salimos de la función
    if (columnas === null) return;

    // Calcular el número máximo de minas permitido
    let maxMinas = Math.floor((filas * columnas) / 2.5);

    // Solicitar el número de minas, asegurando que sea al menos 1
    minas = solicitarNumero(`Introduce el número de minas (mínimo 1 y máximo ${Math.min(maxMinas, 12)}):`, Math.min(maxMinas, 12));
    // Si el usuario canceló, salimos de la función
    if (minas === null) return;
}


// funcion encargada de resolver el tablero, colocando en
// cada casilla el valor correspondiente a la cantidad de minas
// adyacentes
function resolverTablero(tablero) {
    // por cada fila y por cada columna,
    // es decir por cada casilla
    for (let i = 0; i < tablero.length; i++) {
        for (let j = 0; j < tablero[0].length; j++) {
            // si la casilla no tiene una mina
            if (tablero[i][j] != -1) {
                // invoco a un metodo que me calcula el valor de la casilla
                calcularCasilla(i, j, tablero);
            }
        }
    }
}

// calcula el valor de una casilla dada
function calcularCasilla(fila, columna, tablero) {
    // define las direcciones correspondientes a las 8
    // posiciones adyacentes
    let direcciones = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
    ];

    // recorre cada direccion adyacente
    for (let i = 0; i < direcciones.length; i++) {
        let nuevaFila = fila + direcciones[i][0];
        let nuevaColumna = columna + direcciones[i][1];

        // si la casilla adyacente es una casilla valida y tiene una mina
        if (
            validarCasilla(nuevaFila, nuevaColumna, tablero) &&
            tablero[nuevaFila][nuevaColumna] === -1
        ) {
            // incremento en 1 el valor de la casilla actual
            tablero[fila][columna]++;
        }
    }
}

// funcion que comprueba que una posicion del tablero sea valida,
//para no comprobar casillas que no existan por exceder los limites
function validarCasilla(fila, columna, tablero) {
    // devuelve verdadero si la fila y la columna existen en el tablero
    // son validas las posiciones desde 0 hasta el length-1
    return (
        fila > -1 &&
        fila < tablero.length &&
        columna > -1 &&
        columna < tablero[0].length
    );
}

// funcion que crea el array del tablero definiendo 0 a las posiciones
function crearTablero(filas, columnas) {
    for (let i = 0; i < filas; i++) {
        tablero[i] = [];
        for (let j = 0; j < columnas; j++) {
            tablero[i][j] = 0;
        }
    }
}

let minasColocadas = 0;

// funcion que crea la posicion de las minas
// se comprueba si en la casilla existe una mina y si no se escribe -1 respresentando a la mina
function crearMinas(tablero, minas) {
    while (minasColocadas < minas) {
        let filaMina = Math.floor(Math.random() * filas);
        let columnasMina = Math.floor(Math.random() * columnas);
        console.log(filaMina,columnasMina);
        
        if (tablero[filaMina][columnasMina] === -1) {
            continue;
        } else {
            tablero[filaMina][columnasMina] = -1;
            minasColocadas++;
        }
    }
}

// funcion que imprime el buscaminas en el html
function mostrarTablero(tablero) {
    for (let i = 0; i < tablero.length; i++) {
        for (let j = 0; j < tablero[i].length; j++) {
           document.write(tablero[i][j] + " ");
        }
        document.write("<br>");
    }
    document.write("<br>");
}

window.onload = function() {
    let audio = document.getElementById("musicaFondo");
    audio.play().catch(error => {
        console.log("Autoplay bloqueado. El usuario debe interactuar con la página.");
    });
};

solicitarDatos();
crearTablero(filas, columnas);
crearMinas(tablero, minas);
mostrarTablero(tablero);
resolverTablero(tablero);
mostrarTablero(tablero);
