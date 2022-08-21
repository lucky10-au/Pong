
// initial variables
let ballX = 225 *2
let ballY = 140 *2
let leftRacketX = 20 *2
let leftRacketY = 100 *2
let rightRacketX = 440 *2
let rightRacketY = 100 *2
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
  ctx.fillText(startTimer, 240 *2, 170 *2);
  ctx.fill();
  ctx.closePath();
  
  ctx.beginPath();
  ctx.rect(ballX, ballY, 20 *2, 20 *2);
  ctx.fillStyle = colour;
  ctx.fill();
  ctx.closePath();
} if (state == "start") {
  ctx.beginPath();
  ctx.rect(ballX, ballY, 20 *2, 20 *2);
  ctx.fillStyle = colour;
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.font = "50px Arial";
  ctx.fillStyle = timerColour;
  ctx.fillText(startTimer, 230 *2, 170 *2);
  ctx.fill();
  ctx.closePath();

}

  ctx.beginPath();
  ctx.rect(leftRacketX, leftRacketY, 20 *2, 100 *2);
  ctx.fillStyle = colour;
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.rect(rightRacketX, rightRacketY, 20 *2, 100 *2);
  ctx.fillStyle = colour;
  ctx.fill();
  ctx.closePath();



}

function paddleMove() {
  if (rightUpPressed == true) {
    rightRacketY-=10 *2
  }
  if (rightDownPressed == true) {
    rightRacketY+=10 *2
  }
  if (leftUpPressed == true) {
    leftRacketY-=10 *2
  }
  if (leftDownPressed == true) {
    leftRacketY+=10 *2
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

    if (startTimer <= -1) {
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
              } if (eventDown.key == "ArrowDown" && rightRacketY < 220 *2) {
                rightDownPressed = true
                paddleMove()
              } if (eventDown.key == "w" && leftRacketY > 0) {
                leftUpPressed = true
                paddleMove()
              } if (eventDown.key == "s" && leftRacketY < 220 *2) {
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
    draw(ctx, "white")
    //Racket bounce code
    if (ballX >= rightRacketX - 20 *2 && ballY <= (rightRacketY + 100 *2) && ballY >= (rightRacketY + 5 *2)) {
      rightRacketHit = true
      leftRacketHit = false
    }
    if (ballX <= leftRacketX + 20 *2 && ballY <= (leftRacketY + 100 *2) && ballY >= leftRacketY) {
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
    //
    if (ballX <= 0) {
      colour = "#000000"
      team = "Right"
      state = "finish"
    }
    if (ballX >= 480 *2) {
      colour = "#000000"
      team = "Left"
      state = "finish"
    }
    if (ballY >= 300 *2) {
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
    ctx.font = "70px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(team + " Won!", 170 *2, 170 *2);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.font = "45px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Play again", 190 *2, 200 *2);
    ctx.fill();
    ctx.closePath();
    window.addEventListener('mousemove', function (e) {
      if (e.clientX >= 380 && e.clientX <= 677 && e.clientY >= 400 && e.clientY <= 407 && state == "finish") {
        state = "start"
      }
  });
  }

  // schedule the event loop to go again
  setTimeout(gameLoop, speed)
}
