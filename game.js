var isPressed = false;
canvas : document.createElement("canvas"),

function startGame() {
  myGameArea.start();

  myGameBackground = new Component(800, 500, "#9DD9D2", 0, 0);
  myGamePiece = new Component(50, 90, "#23395B", 40, 390);
  myGameFloor = new Component(800, 20, "#EE6055", 0, 480);

  myGamePiece.gravity = 0.05;

  setupKeys();
}

function Game () {

}

Game.prototype.start = function () {
  this.canvas.width = 800;
  this.canvas.height = 500;
  this.context = this.canvas.getContext("2d");
  document.body.insertBefore(this.canvas, document.body.childNodes[0]);
  this.frameNo = 0;
  this.interval = setInterval(updateGameArea, 20);
};


Game.prototype.clear : function() {
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

function updateGameArea() {
    myGameArea.clear();
    myGameBackground.update();
    myGameFloor.update();
    myGamePiece.newPos();
    myGamePiece.update();
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
            setTimeout(function(){
              myGamePiece.gravity = 2.8;
            }, 250)
          }
        break;

        case 32:
            if ( myGamePiece.isJumping === false) {
              myGamePiece.gravity = -1.8;
              myGamePiece.isJumping = true;
              setTimeout(function(){
                myGamePiece.gravity = 2.8;
              }, 250)
            }
          break;
    }
  }
}
startGame();










// ****************************************************************************************************
// var isPressed = false;
// var myGameObstacle = [];
//
//
// function startGame() {
//     myGameArea.start();
//
//     myGameBackground = new Component(800, 500, "#9DD9D2", 0, 0);
//     myGamePiece = new Player(50, 90, "#23395B", 40, 390);
//     myGameFloor = new Component(800, 20, "#EE6055", 0, 480);
//     myGameObstacle.push(new  Component(30, 90, "#2CA58D", 520, 390));
//
//     myGamePiece.gravity = 0.05;
//
//     setupKeys();
// }
//
// var myGameArea = {
//     canvas : document.createElement("canvas"),
//     start : function() {
//         this.canvas.width = 800;
//         this.canvas.height = 500;
//         this.context = this.canvas.getContext("2d");
//         document.body.insertBefore(this.canvas, document.body.childNodes[0]);
//         this.frameNo = 0;
//         this.interval = setInterval(updateGameArea, 20);
//     },
//     clear : function() {
//         this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
//     },
//
//     stop : function(){
//       clearInterval(this.interval);
//     }
// }
//
//
//
// function Player(width, height, color, x, y) {
//     this.width = width;
//     this.height = height;
//     this.x = x;
//     this.y = y;
//     this.speedY = 0;
//     this.gravity = -1.8;
//     this.gravitySpeed = 0;
//     this.isJumping = false;
//
//     this.update = function() {
//         ctx = myGameArea.context;
//         ctx.fillStyle = color;
//         ctx.fillRect(this.x, this.y, this.width, this.height);
//     }
//     this.newPos = function() {
//
//         this.gravitySpeed += this.gravity;
//         this.y += this.speedY + this.gravitySpeed;
//
//         this.hitBottom();
//     }
//
//     this.hitBottom = function() {
//         var rockbottom = myGameArea.canvas.height - myGamePiece.height - myGameFloor.height;
//         if (this.y > rockbottom) {
//             this.y = rockbottom;
//             this.gravitySpeed = 0;
//             this.isJumping = false;
//         }
//     }
// }
//
// function Component(width, height, color, x, y) {
//     this.width = width;
//     this.height = height;
//     this.x = x;
//     this.y = y;
//     this.speedY = 0;
//
//     this.update = function() {
//         ctx = myGameArea.context;
//         ctx.fillStyle = color;
//         ctx.fillRect(this.x, this.y, this.width, this.height);
//     }
//
//     this.newPos = function() {
//         this.gravitySpeed += this.gravity;
//         this.y += this.speedY + this.gravitySpeed;
//     }
//
//     this.crashWith = function(otherobj) {
//        var myleft = this.x;
//        var myright = this.x + (this.width);
//        var mytop = this.y;
//        var mybottom = this.y + (this.height);
//        var otherleft = otherobj.x;
//        var otherright = otherobj.x + (otherobj.width);
//        var othertop = otherobj.y;
//        var otherbottom = otherobj.y + (otherobj.height);
//        var crash = true;
//        if ((mybottom < othertop) ||
//               (mytop > otherbottom) ||
//               (myright < otherleft) ||
//               (myleft > otherright)) {
//           crash = false;
//        }
//        return crash;
//    }
// }
//
// function updateGameArea() {
//   var x, y;
//     for (i = 0; i < myGameObstacle.length; i += 1) {
//         if (myGamePiece.crashWith(myGameObstacle[i])) {
//             myGameArea.stop();
//             return;
//         }
//     }
//     myGameArea.clear();
//     myGameArea.frameNo += 1;
//     if (myGameArea.frameNo == 1 || everyinterval(150)) {
//         x = myGameArea.canvas.width;
//         y = myGameArea.canvas.height - 20;
//   // Aquí está el problema lo de abajo me sale que no es una función
//   //(he probado ha cambair metiedo los datos en push de GameObstacle)
//         myGameObstacle[0];
//
//     }
//     // for (i = 0; i < myGameObstacle.length; i += 1) {
//     //     myGameObstacle[i].x += -1;
//     //     myGameObstacle[i].update();
//     // }
//
//     myGameArea.clear();
//     myGameObstacle[0].x -= 7;
//     myGameBackground.update();
//     myGameFloor.update();
//     myGamePiece.newPos();
//     myGamePiece.update();
//     myGameObstacle.update();
//     // myGameObstacle.crashWith();
// }
//
// function everyinterval(n) {
//     if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
//     return false;
// }
//
// function accelerate(n) {
//     myGamePiece.gravity = n;
// }
//
// function setupKeys() {
//   document.onkeyup  = function(e){
//     switch (e.keyCode) {
//       case 38:
//           if ( myGamePiece.isJumping === false) {
//             myGamePiece.gravity = -1.8;
//             myGamePiece.isJumping = true;
//             console.log("up");
//             setTimeout(function(){
//               myGamePiece.gravity = 2.8;
//
//               console.log("down");
//             }, 250)
//           }
//         break;
//
//         case 32:
//             if ( myGamePiece.isJumping === false) {
//               myGamePiece.gravity = -1.8;
//               myGamePiece.isJumping = true;
//               console.log("up");
//               setTimeout(function(){
//                 myGamePiece.gravity = 2.8;
//
//                 console.log("down");
//               }, 250)
//             }
//           break;
//     }
//   }
// }
//
// startGame();
