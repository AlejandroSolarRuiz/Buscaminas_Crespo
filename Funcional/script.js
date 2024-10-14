const numFilas = 8;
const numColumnas = 8;
const numMinas = 10;
let juegoTerminado = false;
let celdasReveladas = 0;
let banderas = 10;

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
function crearTablero(filas, columnas, minas) {
    tablero = [];
    for (let i = 0; i < filas; i++) {
        const fila = [];
        for (let j = 0; j < columnas; j++) {
            const casilla = {
                esMina: false,
                revelada: false,
                contador: 0,
            };
            fila.push(casilla);
        }
        tablero.push(fila);
    }
    crearMinas(tablero, minas);
    resolverTablero();
}

// funcion que crea la posicion de las minas
// se comprueba si en la casilla existe una mina y si no se escribe -1 respresentando a la mina
function crearMinas(tablero, minas) {
    let minasColocadas = 0;
    while (minasColocadas < minas) {
        let filaMina = Math.floor(Math.random() * numFilas);
        let columnaMina = Math.floor(Math.random() * numColumnas);

        if (!tablero[filaMina][columnaMina].esMina) {
            tablero[filaMina][columnaMina].esMina = true;
            minasColocadas++;
        }
    }
}

// funcion encargada de resolver el tablero, colocando en
// cada casilla el valor correspondiente a la cantidad de minas
// adyacentes
function resolverTablero() {
    // por cada fila y por cada columna,
    // es decir por cada casilla
    for (let i = 0; i < numFilas; i++) {
        for (let j = 0; j < numColumnas; j++) {
            // si la casilla no tiene una mina
            if (!tablero[i][j].esMina) {
                // invoco a un metodo que me calcula el valor de la casilla
                calcularCasilla(i, j);
            }
        }
    }
}

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
    if (
        !validarCasilla(fila, columna) ||
        tablero[fila][columna].revelada ||
        juegoTerminado
    ) {
        return;
    }

    tablero[fila][columna].revelada = true;
    celdasReveladas++;

    if (tablero[fila][columna].esMina) {
        gameOver();
    } else if (tablero[fila][columna].contador === 0) {
        for (let i = 0; i < direcciones.length; i++) {
            revelarCasilla(
                fila + direcciones[i][0],
                columna + direcciones[i][1]
            );
        }
    }
    actualizarTablero("BUSCAMOROS 3");
    comprobarVictoria();
}

function actualizarTablero(titulo) {
    tableroJuego.innerHTML = "";
    const tabla = document.createElement("table");
    const heading = document.createElement("h2");
    heading.textContent = titulo;

    for (let i = 0; i < numFilas; i++) {
        const fila = document.createElement("tr");
        for (let j = 0; j < numColumnas; j++) {
            const celda = document.createElement("td");
            celda.className = "celda";

            // Mostrar solo minas o números
            if (tablero[i][j].revelada) {
                celda.classList.add("revelada");

                if (tablero[i][j].esMina) {
                    celda.classList.add("mina");
                    celda.textContent = "💣";
                } else if (tablero[i][j].contador > 0) {
                    celda.classList.add(`num-${tablero[i][j].contador}`);
                    celda.textContent = tablero[i][j].contador;
                }
            }
            if (!juegoTerminado) {
                celda.addEventListener("click", () => revelarCasilla(i, j));
                celda.addEventListener("contextmenu", (event) => {
                    event.preventDefault();
                    if (!tablero[i][j].revelada && banderas > 0) {
                        celda.textContent = "🚩";
                        
                        banderas--;
                    }
                })
            }
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }
    tableroJuego.appendChild(heading);
    tableroJuego.appendChild(tabla);
}
function gameOver() {
    alert("GAME OVER!");
    juegoTerminado = true;
    tableroJuego.innerHTML = "";
}

function comprobarVictoria() {
    let celdasSinMinas = numColumnas * numFilas - numMinas;
    if (celdasSinMinas === celdasReveladas) {
        alert("Felicidades!, has ganado");
        tableroJuego.innerHTML = "";
    }
}

crearTablero(numFilas, numColumnas, numMinas);

actualizarTablero("BUSCAMOROS 3");
