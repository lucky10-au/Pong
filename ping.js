
// initial variables
let ballX = 225
let ballY = 140
let leftRacketX = 20
let leftRacketY = 100
let rightRacketX = 440
let rightRacketY = 100
let colour = "#ffffff"
let won = false
let team = "Left "
let speed = 500
let ballDirectionX = 1
let ballDirectionY = 0
let rightRacketHit = false
let leftRacketHit = false
let startTimer = 3
let timerColour = "white"
let rightUpPressed = false
let rightDownPressed = false
let leftUpPressed = false
let leftDownPressed = false
let state = "start" // start, playing and finish

window.addEventListener("load", function () {
  gameLoop()
})

function draw(ctx, colour) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

if (state == "playing") {
  ctx.beginPath();
  ctx.font = "50px Arial";
  ctx.fillStyle = timerColour;
  ctx.fillText(startTimer, 220, 170);
  ctx.fill();
  ctx.closePath();
  
  ctx.beginPath();
  ctx.rect(ballX, ballY, 20, 20);
  ctx.fillStyle = colour;
  ctx.fill();
  ctx.closePath();
} if (state == "start") {
  ctx.beginPath();
  ctx.rect(ballX, ballY, 20, 20);
  ctx.fillStyle = colour;
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.font = "50px Arial";
  ctx.fillStyle = timerColour;
  ctx.fillText(startTimer, 220, 170);
  ctx.fill();
  ctx.closePath();
}

  ctx.beginPath();
  ctx.rect(leftRacketX, leftRacketY, 20, 100);
  ctx.fillStyle = colour;
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.rect(rightRacketX, rightRacketY, 20, 100);
  ctx.fillStyle = colour;
  ctx.fill();
  ctx.closePath();



}

function paddleMove() {
  if (rightUpPressed == true) {
    rightRacketY-=10
  }
  if (rightDownPressed == true) {
    rightRacketY+=10
  }
  if (leftUpPressed == true) {
    leftRacketY-=10
  }
  if (leftDownPressed == true) {
    leftRacketY+=10
  }
}

function gameLoop() {
  let canvas = document.getElementById("myCanvas");
  let ctx = canvas.getContext("2d");


  if (state == "start") {
    // event loop is every second
    speed = 1000

    draw(ctx, "black")

    startTimer--

    if (startTimer <= 0) {
      timerColour = "black"
      state = "playing"

      speed = 0
      //////////
      //Credit to Nicky Dover for his good idea and code https://medium.com/@dovern42/handling-multiple-key-presses-at-once-in-vanilla-javascript-for-game-controllers-6dcacae931b7
      //remember to make the variables change to make the paddle go up and down

            window.addEventListener('keydown', (eventDown) => {
              if (eventDown.key == "ArrowUp" && rightRacketY > 0) {
                rightUpPressed = true
                paddleMove()
              } if (eventDown.key == "ArrowDown" && rightRacketY < 220) {
                rightDownPressed = true
                paddleMove()
              } if (eventDown.key == "w" && leftRacketY > 0) {
                leftUpPressed = true
                paddleMove()
              } if (eventDown.key == "s" && leftRacketY < 220) {
                leftDownPressed = true
                paddleMove()
              }
            });

            window.addEventListener('keyup', (eventUp) => {
              if (eventUp.key == "ArrowUp" && rightRacketY > 0) {
                rightUpPressed = false
                paddleMove()
              } if (eventUp.key == "ArrowDown" && rightRacketY < 220) {
                rightDownPressed = false
                paddleMove()
              } if (eventUp.key == "w" && leftRacketY > 0) {
                leftUpPressed = false
                paddleMove()
              } if (eventUp.key == "s" && leftRacketY < 220) {
                leftDownPressed = false
                paddleMove()
              }
            });


      ////////////////
    }
   
  }


  if (state == "playing") {
    draw(ctx, "white")
    
    if (ballX >= rightRacketX - 20 && ballY <= (rightRacketY + 100) && ballY >= (rightRacketY + 5)) {
      rightRacketHit = true
      leftRacketHit = false
    }
    if (ballX <= leftRacketX + 20 && ballY <= (leftRacketY + 100) && ballY >= leftRacketY) {
      leftRacketHit = true
      rightRacketHit = false
    }

    if (leftRacketHit == true) {
      ballDirectionX = 1
      let random = Math.round(Math.random())
      if (random == 0) {
        ballDirectionY = 0
      }
      if (random == 1) {
        ballDirectionY = 1
      }
      leftRacketHit = false
    }
    if (rightRacketHit == true) {
      ballDirectionX = 0
      let random = Math.round(Math.random())
      if (random == 0) {
        ballDirectionY = 0
      }
      if (random == 1) {
        ballDirectionY = 1
      }
      rightRacketHit = false
    }
    if (ballX <= 0) {
      colour = "#000000"
      team = "Right"
      state = "finish"
    }
    if (ballX >= 480) {
      colour = "#000000"
      team = "Left"
      state = "finish"
    }
    if (ballY >= 300) {
      ballDirectionY = 0
    }
    if (ballY <= 0) {
      ballDirectionY = 1
    }
    if (ballDirectionX == 1) {
      ballX++;
    }
    if (ballDirectionX == 0) {
      ballX--
    }
    if (ballDirectionY == 1) {
      ballY++;
    }
    if (ballDirectionY == 0) {
      ballY--
    }



  }


  if (state == "finish") {
    ctx.beginPath();
    ctx.font = "50px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(team + " Won!", 145, 170);
    ctx.fill();
    ctx.closePath();
  }

  // schedule the event loop to go again
  setTimeout(gameLoop, speed)
}
