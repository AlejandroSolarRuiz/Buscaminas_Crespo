// @David Kovacs y @Alejandro Solar

// numero de filas
let filas;
// numero de columnas
let columnas;
// numero de minas
let minas;
// tablero de juego
let tablero = [];
//minas colocadas
let minasColocadas = 0;
//se recibe en container el div tablero-container
const container = document.getElementById("tablero-container");
//se crea un nuevo audio
const audio = new Audio("MusicaEpica.mp3"); 

// esta funcion se encarga de realizar el pedido al usuario de un unico dato
function solicitarNumero(mensaje, minimo, maximo) {
    while (true) {
        let input = prompt(mensaje);
        if (input == null) {
            alert("Programa Finalizado");
            return null;
        }
        const numero = parseInt(input);
        if (!isNaN(numero) && numero >= minimo && numero <= maximo) {
            return numero;
        }
        alert(
            `El valor introducido es incorrecto, debe estar entre ${minimo} y ${maximo}. Inténtelo de nuevo.`
        );
    }
}

// Función que solicita los datos necesarios para configurar el juego
function solicitarDatos() {
    filas = solicitarNumero(
        "Introduce el número de filas (mínimo 1 y máximo 9):",
        1,
        9
    );
    if (filas === null) return;

    switch (filas) {
        case 1:
            columnas = solicitarNumero(
                "Introduce el número de columnas (mínimo 3 y máximo 9):",
                3,
                9
            );
            break;
        case 2:
            columnas = solicitarNumero(
                "Introduce el número de columnas (mínimo 2 y máximo 9):",
                2,
                9
            );
            break;  // Añadido el break que faltaba
        default:
            columnas = solicitarNumero(
                "Introduce el número de columnas (mínimo 1 y máximo 9):",
                1,
                9
            );
            break;
    }
    if (columnas === null) return;

    let maxMinas = Math.floor((filas * columnas) / 2.5);
    minas = solicitarNumero(
        `Introduce el número de minas (mínimo 1 y máximo ${Math.min(
            maxMinas,
            12
        )}):`, 1,
        Math.min(maxMinas, 12)
    );
    if (minas === null) return;
}

// funcion que crea el array del tablero definiendo 0 a las posiciones
function crearTablero(filas, columnas) {
    tablero = [];
    for (let i = 0; i < filas; i++) {
        tablero[i] = [];
        for (let j = 0; j < columnas; j++) {
            tablero[i][j] = 0;
        }
    }
}

// funcion que crea la posicion de las minas
function crearMinas(tablero, minas) {
    minasColocadas = 0; // Reinicio de la variable al empezar a colocar minas
    while (minasColocadas < minas) {
        let filaMina = Math.floor(Math.random() * filas);
        let columnaMina = Math.floor(Math.random() * columnas);
        console.log(filaMina, columnaMina);

        // Simplificación: solo actúa si la casilla no tiene mina
        if (tablero[filaMina][columnaMina] !== -1) {
            tablero[filaMina][columnaMina] = -1;
            minasColocadas++;
        }
    }
}

// calcula el valor de una casilla dada
function calcularCasilla(fila, columna, tablero) {
    let direcciones = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],          [0, 1],
        [1, -1], [1, 0], [1, 1],
    ];

    for (let i = 0; i < direcciones.length; i++) {
        let nuevaFila = fila + direcciones[i][0];
        let nuevaColumna = columna + direcciones[i][1];

        if (
            validarCasilla(nuevaFila, nuevaColumna, tablero) &&
            tablero[nuevaFila][nuevaColumna] === -1
        ) {
            tablero[fila][columna]++;
        }
    }
}

// funcion que comprueba que una posicion del tablero sea valida
function validarCasilla(fila, columna, tablero) {
    return (
        fila >= 0 &&
        fila < tablero.length &&
        columna >= 0 &&
        columna < tablero[0].length
    );
}

// funcion encargada de resolver el tablero
function resolverTablero(tablero) {
    for (let i = 0; i < tablero.length; i++) {
        for (let j = 0; j < tablero[0].length; j++) {
            if (tablero[i][j] !== -1) {
                calcularCasilla(i, j, tablero);
            }
        }
    }
}

// esta funcion se encarga de mostrar el tablero
function mostrarTablero(tablero, titulo) {

    const heading = document.createElement("h2");
    heading.textContent = titulo;

    const tabla = document.createElement("table");

    for (let i = 0; i < tablero.length; i++) {
        const fila = document.createElement("tr");
        for (let j = 0; j < tablero[i].length; j++) {
            const celda = document.createElement("td");
            const valor = tablero[i][j];

            // Mostrar solo minas o números
            if (valor === -1) {
                celda.textContent = "💣";
                celda.classList.add("bomba")

            } else {
                celda.textContent = valor;
                celda.classList.add(`num-${valor}`);
            }
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }

    container.appendChild(heading);
    container.appendChild(tabla);
}


//funcion que a la hora de pulsar el boton se realiza las funciones contenidas en el
document.getElementById("start-button").addEventListener("click", function () {
    //limpia el contenedor
    container.innerHTML='';
    //solicita los datos
    solicitarDatos();
    //crea el tablero
    crearTablero(filas, columnas);
    //crea las minas
    crearMinas(tablero, minas);

    // Mostrar el tablero con solo minas
    mostrarTablero(tablero, "Tablero inicial: minas");

    // Resolver el tablero
    resolverTablero(tablero);

    // Mostrar el tablero resuelto con minas y números
    mostrarTablero(tablero, "Tablero resuelto: minas y números");

    //se restablece el audio desde el principio
    audio.currentTime = 0;
    //se reproduce el audio
    audio.play();
});
