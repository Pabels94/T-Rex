var isPressed = false;

function startGame() {
    myGameArea.start();

    myGameBackground = new Component(800, 500, "#9DD9D2", 0, 0);
    myGamePiece = new Component(50, 90, "#23395B", 40, 390);
    myGameFloor = new Component(800, 20, "#EE6055", 0, 480);
    myGameObstacle = new  Component(30, 90, "#2CA58D", 520, 390);

    myGamePiece.gravity = 0.05;

    setupKeys();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 800;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // stop : function(){
    //   clearInterval(this.interval);
    // }
}

// function component(width, height, color, x, y) {
//     this.width = width;
//     this.height = height;
//     this.x = x;
//     this.y = y;
//     ctx = myGameArea.context;
//     ctx.fillStyle = color;
//     ctx.fillRect(this.x, this.y, this.width, this.height);
// }

function Component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedY = 0;
    this.gravity = -1.8;
    this.gravitySpeed = 0;

    this.isJumping = false;

    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {

        this.gravitySpeed += this.gravity;
        this.y += this.speedY + this.gravitySpeed;

        this.hitBottom();
    }

    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - myGamePiece.height - myGameFloor.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
            this.isJumping = false;

        }
      }

    // this.jump = function(){
    //   document.onkeyup = function(e){
    //     switch (e.keyCode) {
    //       case 38:
    //         myGamePiece.gravity = 0.9;
    //         break;
    //     }
    //     document.onkeydown = function(e){
    //       switch (e.keyCode) {
    //       case 38:
    //        myGamePiece.gravity = -4;
    //      }
    //     }
    //
    //   }
    //   .bind(this);
    // }


    // this.down = function(){
    //   document.onkeyup = function(e){
    //     switch (e.keyCode) {
    //       case 40:
    //         myGamePiece.height = 45;
    //         break;
    //     }
    //   }
    //   .bind(this);
    // }


}

function updateGameArea() {
    myGameArea.clear();
    myGameBackground.update();
    myGameFloor.update();
    myGamePiece.newPos();
    myGamePiece.update();
    myGameObstacle.update();
    //myGamePiece.jump();
    // myGamePiece.down();

}

function accelerate(n) {
    myGamePiece.gravity = n;

}

function setupKeys() {
  document.onkeyup  = function(e){
    switch (e.keyCode) {
      case 38:
          if ( myGamePiece.isJumping === false) {
            myGamePiece.gravity = -1.8;
            myGamePiece.isJumping = true;
            console.log("up");
            setTimeout(function(){
              myGamePiece.gravity = 2.8;

              console.log("down");
            }, 250)
          }
        break;

        case 32:
            if ( myGamePiece.isJumping === false) {
              myGamePiece.gravity = -1.8;
              myGamePiece.isJumping = true;
              console.log("up");
              setTimeout(function(){
                myGamePiece.gravity = 2.8;

                console.log("down");
              }, 250)
            }
          break;
    }
  }
  // document.onkeydown = function(e){
  //   switch (e.keyCode) {
  //   case 38:
  //     if (!myGamePiece.isMoving) {
  //       myGamePiece.gravity = -4;
  //     }
  //     break;
  //  }
  // }
}

startGame();
