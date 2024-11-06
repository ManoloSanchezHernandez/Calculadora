const pantalla = document.querySelector('.pantalla'); // Selecciona el elemento de la pantalla de la calculadora
let numeroAnterior = ''; // Almacena el primer número ingresado
let operadorActual = ''; // Almacena el operador ingresado
let reiniciarPantalla = false; // Indica si se debe reiniciar la pantalla

function agregar(valor) {
    if (reiniciarPantalla) { // Si se debe reiniciar la pantalla
        pantalla.value = ''; // Limpia la pantalla
        reiniciarPantalla = false; // Establece reiniciarPantalla en falso
    }

    if (['+', '-', '*', '/', '√'].includes(valor)) { // Si el valor es un operador
        if (operadorActual !== '') { // Si ya hay un operador en curso
            calcular(); // Realiza el cálculo antes de añadir el nuevo operador
        }
        numeroAnterior = pantalla.value; // Almacena el valor actual de la pantalla
        operadorActual = valor; // Almacena el operador actual
        reiniciarPantalla = true; // Indica que se debe reiniciar la pantalla para el siguiente número
    } else if (valor === '.') { // Si el valor es un punto decimal
        if (!pantalla.value.includes('.')) { // Si la pantalla no incluye ya un punto decimal
            pantalla.value += valor; // Añade el punto decimal a la pantalla
        }
    } else {
        pantalla.value += valor; // Añade el valor a la pantalla
    }
}

function limpiar() {
    pantalla.value = ''; // Limpia la pantalla
    numeroAnterior = ''; // Reinicia el primer número
    operadorActual = ''; // Reinicia el operador
}

function calcular() {
    if (operadorActual === '' || reiniciarPantalla) // Si no hay operador o la pantalla se debe reiniciar
        return; // No hacer nada
    
    let numero1 = parseFloat(numeroAnterior); // Convierte el primer número a un número de punto flotante
    let numero2 = parseFloat(pantalla.value); // Convierte el segundo número a un número de punto flotante

    if (isNaN(numero1) && operadorActual !== '√' || isNaN(numero2) && operadorActual !== '√') { // Si alguno de los números no es un número válido
        pantalla.value = 'Error'; // Muestra un mensaje de error en la pantalla
        setTimeout(limpiar, 1500); // Limpia la pantalla después de 1.5 segundos
        return;
    }

    let resultado; // Variable para almacenar el resultado
    switch (operadorActual) {
        case '+':
            resultado = numero1 + numero2; // Realiza la suma
            break;
        case '-':
            resultado = numero1 - numero2; // Realiza la resta
            break;
        case '*':
            resultado = numero1 * numero2; // Realiza la multiplicación
            break;
        case '/':
            resultado = numero2 !== 0 ? numero1 / numero2 : 'Error'; // Realiza la división, pero maneja la división por cero
            break;
        case '√':
            resultado = Math.sqrt(numero1); // Realiza la raíz cuadrada
            break;
    }

    if (resultado !== 'Error') {
        resultado = Math.round(resultado * 100000000) / 100000000; // Redondea el resultado para evitar problemas de precisión
    }

    pantalla.value = resultado; // Muestra el resultado en la pantalla
    operadorActual = ''; // Reinicia el operador
    numeroAnterior = ''; // Reinicia el primer número
    reiniciarPantalla = true; // Indica que se debe reiniciar la pantalla para el siguiente número
}

// Manejo de eventos del teclado
document.addEventListener('keydown', (event) => {
    event.preventDefault(); // Previene la acción predeterminada del teclado
    const key = event.key;

    if (/[0-9\+\-\*\/\.]/.test(key)) { // Si la tecla es un número o un operador
        agregar(key); // Añade el valor correspondiente
    } else if (key === 'Enter') {
        calcular(); // Realiza el cálculo si se presiona Enter
    } else if (key === 'Escape') {
        limpiar(); // Limpia la pantalla si se presiona Escape
    } else if (key === 'Backspace') {
        eliminarUltimoDigito(); // Elimina el último dígito si se presiona Backspace
    }
});

// Función para el botón de igual "="
document.querySelector('.igual').addEventListener('click', calcular);

// Función para el botón de retroceso "←"
document.querySelector('.retroceso').addEventListener('click', eliminarUltimoDigito);

// Función para asignar "√" como operador
document.querySelector('.raiz').addEventListener('click', () => {
    agregar('√');
});

// Función para eliminar el último dígito de la pantalla
function eliminarUltimoDigito() {
    pantalla.value = pantalla.value.slice(0, -1);
}
