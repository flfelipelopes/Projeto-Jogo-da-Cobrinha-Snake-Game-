let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box,   
}

let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}


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

// Criar comida
function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}


// Listener para captar inputs do keyboard
document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

// Criar movimento da cobrinha
function iniciarJogo(){
    // Cria delimitador para que a cobra não saia do background criando efeito de looping
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    // Cria verificação para choque do corpo da cobrinha
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game Over')
        }
    }

    // Chama funções de criação dos desenhos
    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Define os movimentos da cobrinha com base no plano cartesiano com eixos x e y
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    // Define o crescimento da cobrinha e o surgimento de nova comida
    if(snakeX != food.x || snakeY != food.y){
        // Cria o movimento de engolir objetos eliminando da frente e jogando para o corpo da cobrinha
        snake.pop();
    }else{food.x = Math.floor(Math.random() * 15 + 1) * box,
          food.y = Math.floor(Math.random() * 15 + 1) * box;
    }
    

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

// Atualiza o frame do jogo a cada 100 milisegundos
let jogo = setInterval(iniciarJogo, 100);