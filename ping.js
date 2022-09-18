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
let leftCheat = 0
let rightCheat = 0
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
function beep() {
  var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");  
  snd.play();
}
beep();

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
      window.addEventListener('keydown', (eventDown) => {
        if (eventDown.key == "1") {
          leftCheat++
        }
        if (leftCheat == 4 ) {
          team = "Red"
          winColour = "#f52c2c"
          state = "finish"
        }
        if (eventDown.key == "ArrowRight") {
          rightCheat++
        }
        if (rightCheat == 4) {
          team = "Blue"
          winColour = "#3532ed"
          state = "finish"
        }
      })

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
            beep();
          }
          if (direction == "slightlydown,right" || direction == "down,right" || direction == "verydown,right") {
            direction = "verydown,left"
            beep();
          }
        } else if (ballX >= (rightRacketX-25) && ballY >= (rightRacketY+25) && ballY <= (rightRacketY+75)){
          if (direction == "slightlyup,right" || direction == "up,right" || direction == "veryup,right") {
            direction = "up,left"
            beep();
          }
          if (direction == "slightlydown,right" || direction == "down,right" || direction == "verydown,right") {
            direction = "down,left"
            beep();
          }
        } else if (ballX >= (rightRacketX-25) && ballY >= (rightRacketY+75) && ballY <= (rightRacketY+100)){
          if (direction == "slightlyup,right" || direction == "up,right" || direction == "veryup,right") {
            direction = "slightlyup,left"
            beep();
          }
          if (direction == "slightlydown,right" || direction == "down,right" || direction == "verydown,right") {
            direction = "slightlydown,left"
            beep();
          }
        } else if (ballX >= (rightRacketX-25) && ballY >= (rightRacketY+100) && ballY <= (rightRacketY+125)){
          if (direction == "slightlyup,right" || direction == "up,right" || direction == "veryup,right") {
            direction = "slightlyup,left"
            beep();
          }
          if (direction == "slightlydown,right" || direction == "down,right" || direction == "verydown,right") {
            direction == "slightlyup,left"
            beep();
          }
        } else if (ballX >= (rightRacketX-25) && ballY >= (rightRacketY+125) && ballY <= (rightRacketY+175)){
          if (direction == "slightlyup,right" || direction == "up,right" || direction == "veryup,right") {
            direction = "up,left"
            beep();
          }
          if (direction == "slightlydown,right" || direction == "down,right" || direction == "verydown,right") {
            direction = "down,left"
            beep();
          }
        } else if (ballX >= (rightRacketX-25) && ballY >= (rightRacketY+175) && ballY <= (rightRacketY+200)){
          if (direction == "slightlyup,right" || direction == "up,right" || direction == "veryup,right") {
            direction = "veryup,left"
            beep();
          }
          if (direction == "slightlydown,right" || direction == "down,right" || direction == "verydown,right") {
            direction = "verydown,left"
            beep();
          }
        }
       //
        if (ballX <= (leftRacketX+25) && ballY >= leftRacketY && ballY <= (leftRacketY+25)){
          if (direction == "slightlyup,left" || direction == "up,left" || direction == "veryup,left") {
            direction = "veryup,right"
            beep();
          }
          if (direction == "slightlydown,left" || direction == "down,left" || direction == "verydown,left") {
            direction = "verydown,right"
            beep();
          }
        } else if (ballX <= (leftRacketX+25) && ballY >= (leftRacketY+25) && ballY <= (leftRacketY+75)){
          if (direction == "slightlyup,left" || direction == "up,left" || direction == "veryup,left") {
            direction = "up,right"
            beep();
          }
          if (direction == "slightlydown,left" || direction == "down,left" || direction == "verydown,left") {
            direction = "down,right"
            beep();
          }
        } else if (ballX <= (leftRacketX+25) && ballY >= (leftRacketY+75) && ballY <= (leftRacketY+100)){
          if (direction == "slightlyup,left" || direction == "up,left" || direction == "veryup,left") {
            direction = "slightlyup,right"
            beep();
          }
          if (direction == "slightlydown,left" || direction == "down,left" || direction == "verydown,left") {
            direction = "slightlydown,right"
            beep();
          }
        } else if (ballX <= (leftRacketX+25) && ballY >= (leftRacketY+100) && ballY <= (leftRacketY+125)){
          if (direction == "slightlyup,left" || direction == "up,left" || direction == "veryup,left") {
            direction = "slightlyup,right"
            beep();
          }
          if (direction == "slightlydown,left" || direction == "down,left" || direction == "verydown,left") {
            direction = "slightlydown,right"
            beep();
          }
        } else if (ballX <= (leftRacketX+25) && ballY >= (leftRacketY+125) && ballY <= (leftRacketY+175)){
          if (direction == "slightlyup,left" || direction == "up,left" || direction == "veryup,left") {
            direction = "up,right"
            beep();
          }
          if (direction == "slightlydown,left" || direction == "down,left" || direction == "verydown,left") {
            direction = "down,right"
            beep();
          }
        } else if (ballX <= (leftRacketX+25)&& ballY >= (leftRacketY+175) && ballY <= (leftRacketY+200)){
          if (direction == "slightlyup,left" || direction == "up,left" || direction == "veryup,left") {
            direction = "veryup,right"
            beep();
          }
          if (direction == "slightlydown,left" || direction == "down,left" || direction == "verydown,left") {
            direction = "verydown,right"
            beep();
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
  setTimeout(gameLoop, speed)}
