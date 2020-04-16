
//snake variables

var initialTailSize = 2;
var tailSize,snake,snakeX,snakeY,lastKeyCode;
//board variables
var gridSize,tileSize,nextX,nextY;
//food position
var foodX,foodY;
//check game OVER
var isKeyPressed,score,scoreStep,X;


setDefaultValues();

function keyDownEvent(e){
  isKeyPressed = true;
  switch(e.keyCode){
    case 37:
      if(lastKeyCode===39){
        nextX=(nextX===-1)?-1:1;
        nextY=0;
        break;
      }else if(lastKeyCode===37){
        break;
      }else{
      nextX=-1;
      nextY=0
      break;
      }
    case 38:
      if(lastKeyCode===40){
        nextX=0;
        nextY=(nextY===-1)?-1:1;
        break;
      }else if(lastKeyCode===38){
              break;
     }else{
      nextX=0;
      nextY=-1;
      break;
      }
    case 39:
    if(lastKeyCode===37){
        nextX=(nextX===1)?1:-1;
        nextY=0;
        break;
      }else if(lastKeyCode===39){
               break;
               }else{
      nextX=1;
      nextY=0;
      break;
      }
    case 40:
     if(lastKeyCode===38){
        nextX=0;
        nextY=(nextY===1)?1:-1;
        break;
      }else if(lastKeyCode===40){
        break;
      }else{
      nextX=0;
      nextY=1;
      break;
      }
  }
  lastKeyCode = e.keyCode;
}

var ctx, canvas,canvasText;
var drawInterval;


canvasText = document.getElementById("canvasText");
var ctx2 = canvasText.getContext("2d");

window.onload=function(){
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  document.addEventListener("keydown",keyDownEvent);

  drawInterval = setInterval(draw,1000/X);
}

function draw(){
  snakeX += nextX;
  snakeY += nextY;

  //Reaches boundary
 if(snakeX < 0){
   snakeX = gridSize-1;
 }
 if(snakeY < 0 ){
   snakeY = gridSize -1;
 }
 if(snakeX > gridSize-1){
   snakeX=0;
 }
  if(snakeY > gridSize -1){
    snakeY = 0;
  }

  //If snake bite food
  if(snakeX===foodX && snakeY === foodY){
    tailSize++;
    score+=scoreStep;
    document.getElementById("score").innerHTML = score;
    foodX = Math.floor(Math.random() * gridSize);
    foodY = Math.floor(Math.random() * gridSize);
  }
  //draw background
  ctx.fillStyle="black";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  //draw snake
  ctx.fillStyle="green";
  for(i=0;i<snake.length;i++){
    ctx.fillRect(
      snake[i].x * tileSize,
      snake[i].y * tileSize,
      tileSize,
      tileSize
    )
     //if snake bite its tale
  if( i>2 && snake[i].x === snake[0].x && snake[i].y ===snake[0].y){
    //tailSize = initialTailSize;
    if(isKeyPressed){
      gameOver()
    }
  }
  }
  //draw apple
  ctx.fillStyle = "red";
  ctx.fillRect(foodX * tileSize, foodY*tileSize,tileSize,tileSize);

  //var gameOver = snake.some((item,i)=>item.x===snakeX && item.y===snakeY &&!(i>tailSize))

  //fill snake
  snake.push({x:snakeX,y:snakeY});

  while(snake.length >tailSize){
    snake.shift();
  }

}
function gameOver(){
  clearInterval(drawInterval);


  //location.reload(true);
  ctx2.clearRect(0,0,400,400);
  ctx2.font="36px Verdana";
  ctx2.fillStyle='black';
  ctx2.strokeStyle="white";
  ctx2.lineWidth=2;
  ctx2.strokeText('GAME OVER',100,200);
  ctx2.fillText('GAME OVER',100,200);
   ctx2.fillStyle='white';
  ctx2.font="20px Verdana";
   //ctx2.strokeText(`Your score is ${score}`,100,150);
  ctx2.fillText(`Your score is ${score}`,130,150);
}
function playAgain(){
  ctx2.clearRect(0,0,400,400);
  clearInterval(drawInterval);
  setDefaultValues();
  document.getElementById("score").innerHTML = score;
    drawInterval = setInterval(draw,1000/X);
}
function changeLevel() {
  playAgain();
}
function setDefaultValues() {
   tailSize = initialTailSize;
   snake = [];
   snakeX=10;
   snakeY=10;
   lastKeyCode;

  //board variables
   gridSize= 20;
   tileSize=20;
   nextX=0;
    nextY=0;

  //food position
   foodX= 15;
   foodY=15;

  //check gameover
   isKeyPressed =false;
   score=0;
   scoreStep = 2;
     X=4;
  var level = document.getElementById("levels").value;
  if (level ==="level2") {
    X=8;
    scoreStep = 5;
  } else if (level==="level3") {
    X=12;
    scoreStep = 10;
  }else {
    X=4;
    scoreStep = 2;
  }
}
