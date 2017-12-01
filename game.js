var isPressed = false;

function startGame() {
    myGameArea.start();

    myGameBackground = new Component(800, 500, "lightBlue", 0, 0);
    myGamePiece = new Component(50, 90, "black", 40, 390);
    myGameFloor = new Component(800, 20, "Brown", 0, 480);

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
    this.gravity = 0.05;
    this.gravitySpeed = 0;

    this.isMoving = false;

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
            this.isMoving = false;
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
    //myGamePiece.jump();
    // myGamePiece.down();

}

function accelerate(n) {
    myGamePiece.gravity = n;

}

function setupKeys() {
  document.onkeyup = function(e){
    switch (e.keyCode) {
      case 38:
          myGamePiece.gravity = 0.9;
          myGamePiece.isMoving = true;
        break;
    }
  }
  document.onkeydown = function(e){
    switch (e.keyCode) {
    case 38:
      if (!myGamePiece.isMoving) {
        myGamePiece.gravity = -4;
      }
      break;
   }
  }
}

startGame();
