
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");

    //===== paso 4, ancho y alto de cada cuadrado de la cuadrícula.
    const TAMANIO_CELDA = 25;
    

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

      //=====paso 7 llamar a funcion
      dibujarTablero();
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
function pintarParte(lineaX, lineaY) {
  // Calcular la posición real en píxeles dentro del canvas
  let posX = lineaX * TAMANIO_CELDA;
  let posY = lineaY * TAMANIO_CELDA;

  // Configurar color de relleno (verde para la serpiente)
  ctx.fillStyle = "#22c55e"; 

  // Dibujar el cuadrado
  ctx.fillRect(posX, posY, TAMANIO_CELDA, TAMANIO_CELDA);

  // Opcional: Agregar borde para que se vea mejor
  ctx.strokeStyle = "#166534"; // Verde oscuro
  //ctx.lineWidth = 1;
  ctx.strokeRect(posX, posY, TAMANIO_CELDA, TAMANIO_CELDA);
}


// prueba, pintar un cuadrado en la posición (5, 1)
pintarParte(5, 5);
pintarParte(10,2);

pintarParte(3,23);
pintarParte(0,10);

