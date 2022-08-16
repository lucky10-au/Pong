window.addEventListener("load", function() {
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
    let ballX = 225
    let ballY = 140
    let leftRacketX = 20
    let leftRacketY = 100
    let rightRacketX = 440
    let rightRacketY = 100
    let colour = "#ffffff"
    let won = false
    let team = "Left "
    let speed = 10
    let ballDirectionX = 1
    let ballDirectionY = 0
    let rightRacketHit = false
    let leftRacketHit = false
    let startTimer = 3
    let timerColour = "white"
    let state = "start" // start, playing and finish

function gameLoop() {
if (state == "start") {
    function draw() {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.beginPath();
        ctx.rect(ballX, ballY, 20, 20);
        ctx.fillStyle = colour;
        ctx.fill();
        ctx.closePath();
    
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
        
        ctx.beginPath();
        ctx.font = "50px Arial";
        ctx.fillStyle = timerColour;
        ctx.fillText(startTimer, 145, 170);
        ctx.fill();
        ctx.closePath();
      }
      setInterval(draw, 0)
    function timeChange() {
        startTimer--
    }
    if (startTimer <= 0) {
        timerColour = "black"
        state = "playing"
    } else {
        setInterval(timeChange, 1000)
    }


}


if (state == "playing") {
    window.addEventListener('keydown', (event) =>  {
        if (event.key == "ArrowUp" && rightRacketY > 0) {
          rightRacketY-=10
        } if (event.key == "ArrowDown" && rightRacketY < 220) {
          rightRacketY+=10
        } if (event.key == "w" && leftRacketY > 0) {
          leftRacketY-=10
        } if (event.key == "s" && leftRacketY < 220) {
          leftRacketY+=10
        }
        });
      

        function ballMove() {

            if (ballX >= rightRacketX - 10 && ballY <= (rightRacketY + 100) && ballY >= (rightRacketY + 5)) {
              rightRacketHit = true
              leftRacketHit = false
            }
            if (ballX <= leftRacketX + 10 && ballY <= (leftRacketY + 100) && ballY >= leftRacketY) {
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
            if (ballY >= 320) {
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

          setInterval(ballMove, speed);

          function speedUp() {
            speed-=2
          }
        
          setInterval(speedUp, 5000)
}


if (state == "finish") {
    ctx.beginPath();
    ctx.font = "50px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(team + " Won!", 145, 170);
    ctx.fill();
    ctx.closePath();
}


}


















})