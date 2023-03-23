// myCanvas영역
 let canvas = $("#myCanvas")[0];
 
 let ctx = canvas.getContext("2d");
 let w = $("#myCanvas").width();
 let h = $("#myCanvas").height();
 // 뱀과 먹이의 크기
 let sq = 15;
 let food;
 let snake;
 // 게임 시작 후 처음 움직이는 방향설정
 let d = "RIGHT";
 
 
//먹이의 위치를 랜덤으로 추출
 function placeFood() {
  food = {
   // 해당 영역의 너비만큼 sq의 길이를 빼준다 
   x : Math.round(Math.random()*(w-sq)/sq),
   y : Math.round(Math.random()*(h-sq)/sq)
  }
 }

 // 뱀의 위치를 랜덤으로 추출
 function placeSnake() {
  snake = {
   x : Math.round(Math.random()*(w-sq)/sq),
   y : Math.round(Math.random()*(h-sq)/sq)
  }
 }
 
 // 위치에 맞춰 색을 넣어준다.
 function paint_cell(x,y, color){
  ctx.fillStyle=color;
  ctx.fillRect(x*sq,y*sq,sq,sq);
  ctx.strokeStyle="white";
  ctx.strokeRect(x*sq,y*sq,sq,sq);
 }
 
 // food와 snake의 위치를 최초 세팅
 placeFood();
 paint_cell(food.x, food.y, "grey");
 placeSnake();
 paint_cell(snake.x, snake.y, "green");
 

 let gameloop = setInterval(update, 100);

 function update() {
  if (d == "RIGHT")
   snake.x = snake.x + 1;
  else if (d == "LEFT")
   snake.x = snake.x - 1;
  else if (d == "UP") 
   snake.y = snake.y - 1;
  else if (d == "DOWN")
   snake.y = snake.y + 1;

  
  // 뱀이 지나간 위치를 다시 검은색으로 채워준다.
  // blank() 함수를 먼저 호출해준다.
  blank();
  
  paint_cell(food.x, food.y, "grey");
  paint_cell(snake.x, snake.y, "green");
  
  //경계선에 닿으면 게임이 종료된다.
  check_borders();
  
  // setInterval 할때 snake와 food의 위치도 같이 설정해 줘야 한다.
  check_food();
 }
 
 //경계선에 닿으면 게임이 종료된다.
 function check_borders() {
  if (snake.x < 0 || snake.x > (w-sq)/sq 
		  || snake.y < 0 || snake.y > (h-sq)/sq) {
   clearInterval(gameloop);
   showGameOver();
  }
 }

 function showGameOver() {
  let current = $('#current').text();
  $('#final').text(current);
  $('#gameover').fadeIn();
 }

 function blank(){
  //Paint The Canvas
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, w, h);
//  ctx.strokeStyle = "white";
//  ctx.strokeRect(0, 0, w, h);
 }

 function check_food() {
  if (food.x == snake.x && food.y == snake.y) {
   let current = parseInt($('#current').text());
   current += 1;
   $('#current').text(current);
   placeFood();
  }
 }

 //Keyboard Controller
 $(document).keydown(function(e){
  //39: RIGHT
  //37: LEFT
  //38: UP
  //40: DOWN
  let key = e.which;
  if(key == "37") {
   snake.x -= 1;
   d = "LEFT";
  } else if(key == "38") {
   snake.y -= 1;
   d = "UP";
  } else if(key == "39") {
   snake.x += 1;
   d = "RIGHT";
  } else if(key == "40") {
   snake.y += 1;
   d = "DOWN";
  }
  
  blank();
  
  // snake와 food의 위치를 파악한다.
  check_food();
  
  // 한번 더 호출해 줘야 깜빡이는걸 자연스럽게 바꿔 줄 수 있다. 
  paint_cell(food.x, food.y,"grey");
  paint_cell(snake.x, snake.y,"green");

 });
 
