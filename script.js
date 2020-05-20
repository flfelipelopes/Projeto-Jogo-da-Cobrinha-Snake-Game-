let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box,   
}

let direction = "right";


// Criar o background do jogo
function criarBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box)
}

// Criar o corpo da cobrinha
function criarCobrinha(){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

// Criar movimento da cobrinha
function iniciarJogo(){
    criarBG();
    criarCobrinha();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Define os movimentos da cobrinha com base no plano cartesiano com eixos x e y
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    // Cria o movimento de engolir objetos eliminando da frente e jogando para o corpo da cobrinha
    snake.pop();

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

// Atualiza o frame do jogo a cada 100 milisegundos
let jogo = setInterval(iniciarJogo, 100);