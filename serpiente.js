
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");

    //===== paso 4, ancho y alto de cada cuadrado de la cuadrícula.
    const TAMANIO_CELDA = 25;

    // Variable global para controlar el intervalo
    let intervaloSerpiente;
    let direccionActual = "derecha"; // por defecto
    //posición de la comida 
    let comida = {x: 0, y: 0};
    let puntaje = 0;

    //Variable para velocidad
    let velocidad = 300; 
     // Variable cpara estado del juego
    let juegoTerminado = false; 

    //=====cuerpo de serpiente
    const serpiente = [
      {x: 10, y: 10},
      {x: 9, y: 10},
      {x: 8, y: 10}
    ];
    

    // Primera pintura del juego al cargar la página
    dibujarTodo();

    // =========================
    // FUNCIONES DE DIBUJO
    // =========================

    function limpiarCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function dibujarTodo() {
      limpiarCanvas();
      //paso 7 llamar a funcion
      dibujarTablero();
       // Dibuja  la serpiente
      pintarSerpiente();
      //dibuja comida
       pintarComida(); 
    }

        //===== paso 5
    function dibujarTablero() {
      //==== paso 6 linea
      // Colocar un color de línea (similar a fillStyle)
      ctx.strokeStyle = "#00ff00"; // Verde brillante para que se vea bien

      //=== para for
      ctx.lineWidth = 1;

      // Bucle for para dibujar líneas verticales
      // La posición X avanza de TAMANIO_CELDA en TAMANIO_CELDA
      for (let x = 0; x <= canvas.width; x += TAMANIO_CELDA) {

        // Iniciar un trazo 
        ctx.beginPath();

        // Posición inicial borde superior
        ctx.moveTo(x, 0);

        // posición final
        ctx.lineTo(x, canvas.height);

        // paso 8 otra linea horizontal
        //ctx.moveTo(50, 250);
        //ctx.lineTo(450, 250);

        // paso 8 otra linea en diagonal inversa
        //ctx.moveTo(50, 450);
        //ctx.lineTo(450, 50);

        // Dibujar la línea
        ctx.stroke();
      }


      // posición Y avanza de TAMANIO_CELDA en TAMANIO_CELDA
      for (let y = 0; y <= canvas.height; y += TAMANIO_CELDA) {
        ctx.beginPath();
        ctx.moveTo(0, y);                    // Inicio: izquierda
        ctx.lineTo(canvas.width, y);         // Fin: derecha (todo el ancho)
        ctx.stroke();
      }
    }



// ===== parte 2 PASO 1: Función para pintar una parte (cuadrado) =====
function pintarParte(lineaX, lineaY, color) {
  // Calcular la posición real en píxeles dentro del canvas
  let posX = lineaX * TAMANIO_CELDA;
  let posY = lineaY * TAMANIO_CELDA;

  // Configurar color de relleno (verde para la serpiente)
  ctx.fillStyle = color; 

  // Dibujar el cuadrado
  ctx.fillRect(posX, posY, TAMANIO_CELDA, TAMANIO_CELDA);

  // Opcional: Agregar borde para que se vea mejor
  ctx.strokeStyle = "#166534"; // Verde oscuro
  ctx.lineWidth = 1;
  ctx.strokeRect(posX, posY, TAMANIO_CELDA, TAMANIO_CELDA);
}


function pintarSerpiente(){
  // Recorrer el arreglo usando un for
  for (let i = 0; i < serpiente.length; i++) {
    
    // Obtener el segmento actual
    let segmento = serpiente[i];
    
    //DIFERENCIAR CABEZA DEL CUERPO
    if (i === 0) {
      // Primer elemento = CABEZA (amarillo)
      pintarParte(segmento.x, segmento.y, "#facc15"); // Amarillo brillante
    } else {
      // Resto de elementos = CUERPO (rojo)
      pintarParte(segmento.x, segmento.y, "#ef4444"); // Rojo brillante
    }
  }
}


//pintar la comida ===
function pintarComida() {
  // Calcular el numero masximo de celdas en X e Y
  let maxCeldasX = canvas.width / TAMANIO_CELDA;   // 600 / 25 = 24
  let maxCeldasY = canvas.height / TAMANIO_CELDA;  // 600 / 25 = 24

  //evita la comida aparezca sobre serpiente
  let posicionValida = false;

  while (!posicionValida) {
    //posiciones aleatorias
    comida.x = Math.floor(Math.random() * maxCeldasX);
    comida.y = Math.floor(Math.random() * maxCeldasY);

    // Verificar que la posición no esté ocupada por la serpiente
    posicionValida = true;
    for (let i = 0; i < serpiente.length; i++) {
      if (serpiente[i].x === comida.x && serpiente[i].y === comida.y) {
        posicionValida = false;
        break;
      }
    }
  }

  // Dibujar la comida azul
  pintarParte(comida.x, comida.y, "#3b82f6");
}


//Funcion atrapaComida() 
function atrapaComida() {
  // Obtener la cabeza de la serpiente (primer elemento del arreglo)
  let cabeza = serpiente[0];
  
  // Si la cabeza coincide con la posición de la comida
  if (cabeza.x === comida.x && cabeza.y === comida.y) {
    return true;  // La serpiente comio
  } else {
    return false; // No hay colisión
  }
}


// Evitar que retroceda sobre sí misma
function cambiarDireccion(direccion) {
  if (juegoTerminado) return; // No cambiar dirección si el juego terminó

  if (direccion === "derecha" && direccionActual === "izquierda") return;
  if (direccion === "izquierda" && direccionActual === "derecha") return;
  if (direccion === "arriba" && direccionActual === "abajo") return;
  if (direccion === "abajo" && direccionActual === "arriba") return;

  if (direccion === "derecha") direccionActual = "derecha";
  else if (direccion === "izquierda") direccionActual = "izquierda";
  else if (direccion === "arriba") direccionActual = "arriba";
  else if (direccion === "abajo") direccionActual = "abajo";
  else if (direccion === "pausar") pausarJuego();
}


// =====3era PARTE 1: Función moverDerecha() =====
function moverDerecha() {
  // Obtener la posición de la cabeza actual (primer elemento)
  let cabeza = serpiente[0];
  
  //Crea nuevo cabeza ubicado una celda a la derecha
  //    (sumamos 1 a la coordenada X)
  let nuevaCabeza = {
    x: cabeza.x + 1,
    y: cabeza.y
  };
  
  // Agregar este nuevo objeto al inicio del arreglo
  serpiente.unshift(nuevaCabeza);
  
  // Eliminar el último elemento del arreglo (la cola)
  serpiente.pop();
  
  // Redibujar la serpiente en su nueva posicion
  pintarSerpiente();
}


// ===== Mover a la izquierda =====
function moverIzquierda() {
  let cabeza = serpiente[0];
  let nuevaCabeza = {
    x: cabeza.x - 1, // Restamos 1 a la coordenada X
    y: cabeza.y
  };
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

// ===== Mover hacia arriba =====
function moverArriba() {
  let cabeza = serpiente[0];
  let nuevaCabeza = {
    x: cabeza.x,
    y: cabeza.y - 1 // Restamos 1 a la coordenada Y
  };
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

// ===== Mover hacia abajo =====
function moverAbajo() {
  let cabeza = serpiente[0];
  let nuevaCabeza = {
    x: cabeza.x,
    y: cabeza.y + 1 // Sumamos 1 a la coordenada Y
  };
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}


// =====3era PARTE 4: Función iniciarJuego() =====
function iniciarJuego() {
  console.log(" Juego iniciado - La serpiente se move automáticamente");
  
  // guarda el ejecutar moverSerpiente() cada 1 seg velocidad =1000
  intervaloSerpiente = setInterval(moverSerpiente, velocidad);
}


// =====3era PARTE 4: Función pausarJuego() =====
function pausarJuego() {
  console.log(" Juego pausado");
  
  // Detener la ejecución del intervalo
  clearInterval(intervaloSerpiente);
}



// Función moverSerpiente() actualizada =====
function moverSerpiente() {
  // Obtener la cabeza actual y crear la nueva cabeza
  let cabeza = serpiente[0];
  let nuevaCabeza = {x: cabeza.x, y: cabeza.y};

  // 2. Calcular la nueva posicion segun la dirección
  if (direccionActual === "derecha") nuevaCabeza.x++;
  else if (direccionActual === "izquierda") nuevaCabeza.x--;
  else if (direccionActual === "arriba") nuevaCabeza.y--;
  else if (direccionActual === "abajo") nuevaCabeza.y++;

//Validar si toca los bordes (GAME OVER)
  let maxCeldasX = canvas.width / TAMANIO_CELDA;
  let maxCeldasY = canvas.height / TAMANIO_CELDA;

  if (nuevaCabeza.x < 0 || nuevaCabeza.x >= maxCeldasX || 
      nuevaCabeza.y < 0 || nuevaCabeza.y >= maxCeldasY) {
    gameOver();
    return;
  }

  // Agregar la nueva cabeza 
  serpiente.unshift(nuevaCabeza);

  //Verificar si comió 
  if (atrapaComida()) {
    // Sumar un punto al marcador
    puntaje += 1;
    mostrarTexto("txtPuntaje", puntaje);

    // Aumentar velocidad cada 5 puntos
    if (puntaje % 5 === 0 && velocidad > 100) {
      velocidad -= 50; // Hace el juego más rápido
      clearInterval(intervaloSerpiente);
      intervaloSerpiente = setInterval(moverSerpiente, velocidad);
      console.log("¡Velocidad aumentada! Nueva velocidad: " + velocidad + "ms");
    }

    // Hacer crecer la serpiente (Agregar un nuevo cuadrado al final)
    let cola = serpiente[serpiente.length - 1];
    let nuevaCola = {x: cola.x, y: cola.y};

    // La nueva cola se agrega en dirección contraria al movimiento
    if (direccionActual === "derecha") nuevaCola.x--;
    else if (direccionActual === "izquierda") nuevaCola.x++;
    else if (direccionActual === "arriba") nuevaCola.y++;
    else if (direccionActual === "abajo") nuevaCola.y--;

    serpiente.push(nuevaCola);

    // Generar nueva comida en otra posicion
    pintarComida();
    
  } else {
    // Si NO comió, eliminar el último segmento (la cola) para simular el movimiento
    serpiente.pop();
  }
  
  // 5. Redibujar la serpiente en su nueva posición
  pintarSerpiente();
}


// Función para manejar el Game Over
function gameOver() {
  juegoTerminado = true;
  clearInterval(intervaloSerpiente);
  mostrarTexto("estado", "GAME OVER");
  alert("¡GAME OVER! La serpiente chocó. Puntaje final: " + puntaje);
}

//botón "Reiniciar juego"
function reiniciarJuego() {
  // Detener el intervalo actual
  clearInterval(intervaloSerpiente);
  
  // Reiniciar variables a su estado inicial
  puntaje = 0;
  velocidad = 300; // Reiniciar velocidad
  direccionActual = "derecha";
  juegoTerminado = false;
  
  //Reiniciar la serpiente a su posición inicial
  serpiente.length = 0; // Vaciar el arreglo de forma segura
  serpiente.push({x: 10, y: 10});
  serpiente.push({x: 9, y: 10});
  serpiente.push({x: 8, y: 10});
  
  // 4. Actualizar la interfaz
  mostrarTexto("puntaje", puntaje);
  mostrarTexto("estado", "Listo");
  
  // 5. Redibujar todo y generar nueva comida
  pintarComida();
  dibujarTodo();
  
  console.log("Juego reiniciado correctamente");
}



// prueba, pintar un cuadrado en la posición (5, 1)
/*pintarParte(5, 5);
pintarParte(10,2);

pintarParte(3,23);
pintarParte(0,10);*/

