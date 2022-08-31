// initial variables
let ballX = 225 *2.5
let ballY = 140 *2.5
let leftRacketX = 20 *2.5
let leftRacketY = 100 *2.5
let rightRacketX = 440 *2.5
let rightRacketY = 100 *2.5
let ballcolour = "#f52c2c"
let rightColour = "#ffffff"
let leftColour = "#ffffff"
let won = false
let team = "Left "
let speed = 50
let startTimer = 3
let timerColour = "#3532ed"
let rightUpPressed = false
let rightDownPressed = false
let leftUpPressed = false
let leftDownPressed = false
let ballSpeed = 1
let winColour = "blue"
let ballState = "moving"
let direction = "down,right"
let state = "start" // start, playing and finish

window.addEventListener("load", function () {
  gameLoop()
})

function draw(ctx, leftColour,rightColour, ballColour) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
if (state == "playing") {
  ctx.beginPath();
  ctx.font = "50px Arial";
  ctx.fillStyle = timerColour;
  ctx.fillText(startTimer, 240 *2.5, 170 *2.5);
  ctx.fill();
  ctx.closePath();
  
  ctx.beginPath();
  ctx.rect(600,0, 15, 800);
  ctx.fillStyle = "#3532ed"
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.rect(585,0, 15, 800);
  ctx.fillStyle = "#f52c2c"
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.rect(ballX, ballY, 20 *2.5, 20 *2.5);
  ctx.fillStyle = ballColour;
  ctx.fill();
  ctx.closePath();
} if (state == "start") {
  ctx.beginPath();
  ctx.rect(ballX, ballY, 20 *2.5, 20 *2.5);
  ctx.fillStyle = ballColour;
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.font = "50px Arial";
  ctx.fillStyle = timerColour;
  ctx.fillText(startTimer, 230 *2.5, 170 *2.5);
  ctx.fill();
  ctx.closePath();
  
}

  ctx.beginPath();
  ctx.rect(leftRacketX, leftRacketY, 20 *2.5, 100 *2);
  ctx.fillStyle = leftColour;
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.rect(rightRacketX, rightRacketY, 20 *2.5, 100 *2);
  ctx.fillStyle = rightColour;
  ctx.fill();
  ctx.closePath();



}

function paddleMove() {
  if (rightUpPressed == true) {
    rightRacketY-=25
  }
  if (rightDownPressed == true) {
    rightRacketY+=25
  }
  if (leftUpPressed == true) {
    leftRacketY-=25
  }
  if (leftDownPressed == true) {
    leftRacketY+=25
  }
  if (rightRacketY < 0) {
    rightRacketY = 0
  }
  if (rightRacketY > 600) {
    rightRacketY = 600
  }
  if (leftRacketY < 0) {
    leftRacketY = 0
  }
  if (leftRacketY > 600) {
    leftRacketY = 600
  }
}
function speedUpBall() {
  ballSpeed+=0.001
  setTimeout(speedUpBall, 1000)
}
speedUpBall()
function gameLoop() {
  let canvas = document.getElementById("myCanvas");
  let ctx = canvas.getContext("2d");


  if (state == "start") {
    // event loop is every second
    speed = 1000

    draw(ctx, "black", "black", "black")

    startTimer--
    if(startTimer == 3) {
      timerColour = "#3532ed"
    }
    if(startTimer == 2) {
      timerColour = "#f52c2c"
    }
    if(startTimer == 1) {
      timerColour = "#3532ed"
    }
    if (startTimer <= -1) {
      timerColour = "black"
      state = "playing"

      speed = 0
      //////////
      //Credit to Nicky Dover for his good idea and code https://medium.com/@dovern42/handling-multiple-key-presses-at-once-in-vanilla-javascript-for-game-controllers-6dcacae931b7

            window.addEventListener('keydown', (eventDown) => {
              if (eventDown.key == "ArrowUp" && rightRacketY > 0) {
                rightUpPressed = true
                paddleMove()
              } if (eventDown.key == "ArrowDown" && rightRacketY < 600) {
                rightDownPressed = true
                paddleMove()
              } if (eventDown.key == "w" && leftRacketY > 0) {
                leftUpPressed = true
                paddleMove()
              } if (eventDown.key == "s" && leftRacketY < 600) {
                leftDownPressed = true
                paddleMove()
              }
            });

            window.addEventListener('keyup', (eventUp) => {
              if (eventUp.key == "ArrowUp") {
                rightUpPressed = false
                paddleMove()
              } if (eventUp.key == "ArrowDown") {
                rightDownPressed = false
                paddleMove()
              } if (eventUp.key == "w") {
                leftUpPressed = false
                paddleMove()
              } if (eventUp.key == "s") {
                leftDownPressed = false
                paddleMove()
              }
            });


      ////////////////
    }
   
  }


  if (state == "playing") {

    draw(ctx, "#f52c2c", "#3532ed", ballcolour)

    //Ball bounce code
    if (ballState == "moving") {
       
      //Code to bounce ball off of racket
        if (ballX >= (rightRacketX-25) && ballY >= rightRacketY && ballY <= (rightRacketY+25)){
          if (direction == "slightlyup,right" || direction == "up,right" || direction == "veryup,right") {
            direction = "veryup,left"
          }
          if (direction == "slightlydown,right" || direction == "down,right" || direction == "verydown,right") {
            direction = "verydown,left"
          }
        } else if (ballX >= (rightRacketX-25) && ballY >= (rightRacketY+25) && ballY <= (rightRacketY+75)){
          if (direction == "slightlyup,right" || direction == "up,right" || direction == "veryup,right") {
            direction = "up,left"
          }
          if (direction == "slightlydown,right" || direction == "down,right" || direction == "verydown,right") {
            direction = "down,left"
          }
        } else if (ballX >= (rightRacketX-25) && ballY >= (rightRacketY+75) && ballY <= (rightRacketY+100)){
          if (direction == "slightlyup,right" || direction == "up,right" || direction == "veryup,right") {
            direction = "slightlyup,left"
          }
          if (direction == "slightlydown,right" || direction == "down,right" || direction == "verydown,right") {
            direction = "slightlydown,left"
          }
        } else if (ballX >= (rightRacketX-25) && ballY >= (rightRacketY+100) && ballY <= (rightRacketY+125)){
          if (direction == "slightlyup,right" || direction == "up,right" || direction == "veryup,right") {
            direction = "slightlyup,left"
          }
          if (direction == "slightlydown,right" || direction == "down,right" || direction == "verydown,right") {
            direction == "slightlyup,left"
          }
        } else if (ballX >= (rightRacketX-25) && ballY >= (rightRacketY+125) && ballY <= (rightRacketY+175)){
          if (direction == "slightlyup,right" || direction == "up,right" || direction == "veryup,right") {
            direction = "up,left"
          }
          if (direction == "slightlydown,right" || direction == "down,right" || direction == "verydown,right") {
            direction = "down,left"
          }
        } else if (ballX >= (rightRacketX-25) && ballY >= (rightRacketY+175) && ballY <= (rightRacketY+200)){
          if (direction == "slightlyup,right" || direction == "up,right" || direction == "veryup,right") {
            direction = "veryup,left"
          }
          if (direction == "slightlydown,right" || direction == "down,right" || direction == "verydown,right") {
            direction = "verydown,left"
          }
        }
       //
        if (ballX <= (leftRacketX+25) && ballY >= leftRacketY && ballY <= (leftRacketY+25)){
          if (direction == "slightlyup,left" || direction == "up,left" || direction == "veryup,left") {
            direction = "veryup,right"
          }
          if (direction == "slightlydown,left" || direction == "down,left" || direction == "verydown,left") {
            direction = "verydown,right"
          }
        } else if (ballX <= (leftRacketX+25) && ballY >= (leftRacketY+25) && ballY <= (leftRacketY+75)){
          if (direction == "slightlyup,left" || direction == "up,left" || direction == "veryup,left") {
            direction = "up,right"
          }
          if (direction == "slightlydown,left" || direction == "down,left" || direction == "verydown,left") {
            direction = "down,right"
          }
        } else if (ballX <= (leftRacketX+25) && ballY >= (leftRacketY+75) && ballY <= (leftRacketY+100)){
          if (direction == "slightlyup,left" || direction == "up,left" || direction == "veryup,left") {
            direction = "slightlyup,right"
          }
          if (direction == "slightlydown,left" || direction == "down,left" || direction == "verydown,left") {
            direction = "slightlydown,right"
          }
        } else if (ballX <= (leftRacketX+25) && ballY >= (leftRacketY+100) && ballY <= (leftRacketY+125)){
          if (direction == "slightlyup,left" || direction == "up,left" || direction == "veryup,left") {
            direction = "slightlyup,right"
          }
          if (direction == "slightlydown,left" || direction == "down,left" || direction == "verydown,left") {
            direction = "slightlydown,right"
          }
        } else if (ballX <= (leftRacketX+25) && ballY >= (leftRacketY+125) && ballY <= (leftRacketY+175)){
          if (direction == "slightlyup,left" || direction == "up,left" || direction == "veryup,left") {
            direction = "up,right"
          }
          if (direction == "slightlydown,left" || direction == "down,left" || direction == "verydown,left") {
            direction = "down,right"
          }
        } else if (ballX <= (leftRacketX+25)&& ballY >= (leftRacketY+175) && ballY <= (leftRacketY+200)){
          if (direction == "slightlyup,left" || direction == "up,left" || direction == "veryup,left") {
            direction = "veryup,right"
          }
          if (direction == "slightlydown,left" || direction == "down,left" || direction == "verydown,left") {
            direction = "verydown,right"
          }
        }
      //
      if (ballY <= 0 && direction == "slightlyup,left") {
        direction = "slightlydown,left"
      }
      if (ballY <= 0 && direction == "slightlyup,right") {
        direction = "slightlydown,right"
      }
      if (ballY <= 0 && direction == "up,left") {
        direction = "down,left"
      }
      if (ballY <= 0 && direction == "up,right") {
        direction = "down,right"
      }
      if (ballY <= 0 && direction == "veryup,left") {
        direction = "verydown,left"
      }
      if (ballY <= 0 && direction == "veryup,right") {
        direction = "verydown,right"
      }

      if (ballY >= 750 && direction == "slightlydown,left") {
        direction = "slightlyup,left"
      }
      if (ballY >= 750 && direction == "slightlydown,right") {
        direction = "slightlyup,right"
      }
      if (ballY >= 750 && direction == "down,left") {
        direction = "up,left"
      }
      if (ballY >= 750 && direction == "down,right") {
        direction = "up,right"
      }
      if (ballY >= 750 && direction == "verydown,left") {
        direction = "veryup,left"
      }
      if (ballY >= 750 && direction == "verydown,right") {
        direction = "veryup,right"
      }


      if (direction == "verydown,right") {
        ballX+=ballSpeed
        ballY+=ballSpeed+0.2
      }
      if (direction == "veryup,right") {
        ballX+=ballSpeed
        ballY-=ballSpeed+0.2
      }
      if (direction == "verydown,left") {
        ballX-=ballSpeed
        ballY+=ballSpeed+0.2
      }
      if (direction == "veryup,left") {
        ballX-=ballSpeed
        ballY-=ballSpeed+0.2
      }


      if (direction == "down,right") {
        ballX+=ballSpeed
        ballY+=ballSpeed
      }
      if (direction == "up,right") {
        ballX+=ballSpeed
        ballY-=ballSpeed
      }
      if (direction == "down,left") {
        ballX-=ballSpeed
        ballY+=ballSpeed
      }
      if (direction == "up,left") {
        ballX-=ballSpeed
        ballY-=ballSpeed
      }


      if (direction == "slightlydown,right") {
        ballX+=ballSpeed
        ballY+=ballSpeed*0.7
      }
      if (direction == "slightlyup,right") {
        ballX+=ballSpeed
        ballY-=ballSpeed*1.7
      }
      if (direction == "slightlydown,left") {
        ballX-=ballSpeed
        ballY+=ballSpeed*0.7
      }
      if (direction == "slightlyup,left") {
        ballX-=ballSpeed
        ballY-=ballSpeed*1.7
      }
      if (ballX <= 0) {
        state = "finish"
        team = "Blue"
        winColour = "#3532ed"
      }
      if (ballX >= 1150) {
        state = "finish"
        team = "Red"
        winColour = "#f52c2c"
      }
    }
  }


  if (state == "finish") {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.beginPath();
    ctx.font = "70px Arial";
    ctx.fillStyle = winColour;
    ctx.fillText(team + " Won!", 170 *2.5, 170 *2.5);
    ctx.fill();
    ctx.closePath();
   
  }

  // schedule the event loop to go again
  setTimeout(gameLoop, speed)
}
