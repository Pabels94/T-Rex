var isPressed = false;
var canvas;
var start = true;



$(document).ready(function(){
  startGame();
})

function startGame() {
  canvas = document.createElement("canvas");
  canvas.width = 1420;
  canvas.height = 500;
  context = canvas.getContext("2d");
  document.body.insertBefore(canvas, document.body.childNodes[0]);
  this.frameNo = 0;
  var game = new Game(this.context, this.canvas.width, this.canvas.height);
  game.setupKeys();
  game.start();
}

function Game (ctx, width, height) {
  this.ctx = ctx;
  this.width = width;
  this.height = height;
  this.background = null;
  this.piece = null;
  this.floor = null;
  this.obstacles = [];
  this.velocidad = 12;
  this.counter = 0;
  this.positionRandom = 0;
  this.isPaused = false;
  this.myMusic = null;
  this.mySound = null;
}


Game.prototype.obstacleGenerator = function(){

    this.positionRandom = Math.floor(Math.random() * (4000 - 1492 + 1)+ 1492);

    this.obstacles.push(new Obstacle(50, 50, "computer-18.png", this.positionRandom, 430, this.ctx, 0, "image"));
}

Game.prototype.moveObject = function(object, velocidad){
  object.x -= this.velocidad;

  // setInterval(function(){
  //     this.velocidad += 1;
  // }.bind(this),5000);
  // console.log(this.velocidad);
};

Game.prototype.start = function() {
  this.frameNo = 0;
  this.interval = setInterval(this.update.bind(this), 20);
  this.background = new Component(1420, 500, "#9DD9D2", 0, 0, this.ctx);
  this.piece = new Player(110, 390, this.ctx, 1.05);
  this.floor = new Component(1420, 20, "#EE6055", 0, 480, this.ctx);
  this.myMusic = new Sound("song.mp3");
  this.myMusic.play();
  this.mySound = new Sound("salto.wav");
  // this.piece.gravity = 1.05;
  this.obstacleGenerator();
}

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.width, this.height);
}

Game.prototype.stopGameOver = function() {
  // this.ctx.fillStyle = "#23395B";
  // this.ctx.font = "20px PressStart2P";
  // this.ctx.fillText("GAME OVER",140,160);
  clearInterval(this.interval);
}

Game.prototype.crashWith = function(element1, element2){
  var myleft = element1.x;
        var myright = element1.x + (element1.width);
        var mytop = element1.y;
        var mybottom = element1.y + (element1.height);
        var otherleft = element2.x;
        var otherright = element2.x + (element2.width);
        var othertop = element2.y;
        var otherbottom = element2.y + (element2.height);
        var crash = true;
        if ((mybottom < othertop) ||
               (mytop > otherbottom) ||
               (myright < otherleft) ||
               (myleft > otherright)) {
           crash = false;
        }
        return crash;
}

Game.prototype.pauseGame = function(){
  clearInterval(this.interval);
}

Game.prototype.allObstacles = function(){
  this.obstacles.forEach(function(e, i, array){
  e.update();
  this.moveObject(e,this.velocidad);
  if (e.x <= -40) {
    array.splice(i,1);
  }
}.bind(this));
}


Game.prototype.randomControl = function () {

  if(this.counter % 60 === 0){
    this.obstacleGenerator();
    if(this.obstacles.positionRandom === 1492)
     this.obstacles.push(new Component);
  };


};
Game.prototype.update = function () {
  this.obstacles.forEach( function(e, i){
    if(this.crashWith(this.piece,this.obstacles[i])){
      this.stopGameOver();
      this.myMusic.stop();
    };
  }.bind(this));


  this.clear();
  this.background.update();
  this.floor.update();
  this.piece.hitBottom(canvas, this.piece, this.floor);
  this.piece.newPos();
  this.piece.drawCharacter();
  this.allObstacles();
  this.counter++;
  if(this.counter%500 === 0){
    this.velocidad+=2;
  };
  this.ctx.fillStyle = "#23395B";
  this.ctx.font = "18px PressStart2P";
  this.ctx.fillText("Score:" + " " + Math.floor(this.counter / 5),40,60);
  this.randomControl();

}

Game.prototype.accelerate = function (n) {
    this.piece.gravity = n;
}

Game.prototype.setupKeys = function () {
  document.onkeyup  = function(e){
    switch (e.keyCode) {
      case 38:
        if ( !this.piece.isJumping ) {
          if(this.piece.y < 300){
            return false;
          }
          this.piece.gravity = -1.8;
          this.piece.isJumping = true;
          this.mySound.play();
          setTimeout(function(){
            this.piece.gravity = 2.1;
            this.piece.changeJump();
          }.bind(this), 250)
        }
        break;

      case 32:
        if ( !this.piece.isJumping ) {
          if(this.piece.y < 300){
            return false;
          }

          this.piece.gravity = -1.8;
          this.piece.isJumping = true;
          this.mySound.play();
          setTimeout(function(){
            this.piece.gravity = 2.1;
            this.piece.changeJump();
          }.bind(this), 250)
        }
        break;

        case 80:
          if(this.isPaused === true){
            this.interval = setInterval(this.update.bind(this), 20);
            this.isPaused = false;
          }else{
            this.pauseGame()
            this.isPaused = true;
          }

          // alert('el juego está parado, pulsa ok para continuar ');
    }
  }.bind(this)
};
