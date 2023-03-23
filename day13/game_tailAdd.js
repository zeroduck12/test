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
//   ctx.strokeStyle="white";
  ctx.strokeRect(x*sq,y*sq,sq,sq);
 }
 

 //프로그램 시작
 $(function(){

// 뱀의 위치를 이동하는 함수
   //왼쪽으로 뱀을 움직이기(움직이는 것에 맞게 색도 다시 넣어주기)
 function moveSnakeLeft(){
   snake = {
      x : snake.x -1,
      y : snake.y
   }
 };
 function moveSnakeRight(){
   snake = {
      x : snake.x +1,
      y : snake.y
   }
 };
 function moveSnakeUp(){
   snake = {
      x : snake.x,
      y : snake.y -1
   }
 };
 function moveSnakeDown(){
   snake = {
      x : snake.x,
      y : snake.y +1
   }
 };

//방향이동을 위한 초기갑스으로 오른쪽 설정하기
let keyCodeNum = 39;

function moveSnake(){
   
   $("#here").keydown(function(event){
     keyCodeNum = event.keyCode;
   });

      if(keyCodeNum==37){
         return moveSnakeLeft();
      }
      if(keyCodeNum==38){
         return moveSnakeUp();
      }
      if(keyCodeNum==39){
         return moveSnakeRight();
      }
      if(keyCodeNum==40){
         return moveSnakeDown();
      }
   };

   // food와 snake의 위치를 최초 세팅
   placeFood();
   paint_cell(food.x, food.y, "grey");
   placeSnake();
   paint_cell(snake.x, snake.y, "green");

   //현재 점수 변수 선언
   let nowScore = 0;

   //0.5초마다 snake가 이동하기
   setInterval(function(){

      for(let i = 0; i<=nowScore;i++){
      }
      paint_cell(snake.x, snake.y, "black");
      moveSnake();
      paint_cell(snake.x, snake.y, "green");

      //게임이 끝나는 조건
      if(snake.x < 0 ||snake.y < 0 || snake.x >(w-sq)/sq || snake.y >(h-sq)/sq){
         clearInterval();
         $("#gameover").css("display","block");
         $("#final").html(nowScore);
      }

      //점수를 얻는 경우
      if(snake.x == food.x && snake.y == food.y){
         nowScore++;
         $("#current").html(nowScore);
         placeFood();
         paint_cell(food.x, food.y, "grey");
      }

   }, 100);




});