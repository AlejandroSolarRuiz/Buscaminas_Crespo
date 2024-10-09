let filas;
let columnas;
let minas;
let tablero = [];

function solicitarNumero(mensaje, maximo) {
    while (true) {
        let input = prompt(mensaje);
        if (input == null) {
            alert("Programa Finalizado");
            return null;
        }
        const numero = parseInt(input);
        if (!isNaN(numero) && numero > 0 && numero < maximo) {
            return numero;
        }
        alert(
            `El valor introducido es incorrecto, debe estar entre 1 y ${maximo}, Intentelo de nuevo`
        );
    }
}

function solicitarDatos() {
    filas = solicitarNumero(
        "Introduce el numero de filas (mínimo 1 y máximo 9)",
        9
    );

    columnas = solicitarNumero(
        "Introduce el numero de columnas (mínimo 1 y máximo 9)",
        9
    );

    let maxMinas = Math.floor((filas * columnas) / 2.5);
    minas = solicitarNumero(
        `Introduce el numero de minas (mínimo 1 y máximo ${Math.min(
            maxMinas,
            12
        )})`,
        Math.min(maxMinas, 12)
    );
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
        let nuevaFila = direcciones[i][0];
        let nuevaColumna = direcciones[i][1];

        // si la casilla adyacente es una casilla valida y tiene una mina
        if (
            validarCasilla(nuevaFila, nuevaColumna, tablero) &&
            tablero[nuevaFila][nuevaColumna] == -1
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

function crearTablero(filas, columnas) {
    for (let i = 0; i < filas; i++) {
        tablero[i] = [];
        for (let j = 0; j < columnas; j++) {
            tablero[i][j] = 0;
        }
    }
}

let minasColocadas = 0;

function crearMinas(tablero, minas) {
    while (minasColocadas < minas) {
        console.log(tablero[0]);
        let columnasMina = Math.floor(Math.random() * tablero[0].length);
        let filaMina = Math.floor(Math.random() * tablero.length);

        if (tablero[filaMina][columnasMina] == -1) {
            continue;
        } else {
            tablero[filaMina][columnasMina] == -1;
            minasColocadas--;
        }
    }
}

function mostrarTablero(tablero) {
    for (let i = 0; i < tablero.length; i++) {
        for (let j = 0; j < tablero[i].length; j++) {
            document.write(tablero[i][j] + " ");
        }
        document.write("<br>");
    }
}

solicitarDatos();
tablero = crearTablero(filas, columnas);
crearMinas(tablero, minas);
mostrarTablero(tablero);
resolverTablero(tablero);
mostrarTablero(tablero);
