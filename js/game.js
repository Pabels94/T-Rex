var isPressed = false;
var canvas;

$(document).ready(function(){
  startGame();
})



function startGame() {
  canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 500;
  context = canvas.getContext("2d");
  document.body.insertBefore(canvas, document.body.childNodes[0]);

  var game = new Game(context);
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

}

Game.prototype.start = function() {
  this.frameNo = 0;
  this.interval = setInterval(this.update.bind(this), 20);
  this.background = new Component(800, 500, "#9DD9D2", 0, 0, this.ctx);
  this.piece = new Component(50, 90, "#23395B", 40, 390, this.ctx);
  this.floor = new Component(800, 20, "#EE6055", 0, 480, this.ctx);
  this.piece.gravity = 0.05;
}

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.width, this.height);
}

Game.prototype.update = function () {
  this.clear();
  this.background.update();
  this.floor.update();
  this.piece.hitBottom(canvas, this.piece, this.floor);
  this.piece.newPos();
  this.piece.update();
}

Game.prototype.accelerate = function (n) {
    this.piece.gravity = n;
}

Game.prototype.setupKeys = function () {
  document.onkeyup  = function(e){
    switch (e.keyCode) {
      case 38:
        console.log('38', this.piece.isJumping);
        if ( !this.piece.isJumping ) {
          console.log('inside if')
          this.piece.gravity = -1.8;
          this.piece.isJumping = true;
          setTimeout(function(){
            this.piece.gravity = 2.8;
          }.bind(this), 150)
        }
        break;

      case 32:
        console.log('32');
        if ( !this.piece.isJumping ) {
          this.piece.gravity = -1.8;
          this.piece.isJumping = true;
          setTimeout(function(){
            this.piece.gravity = 2.8;
          }.bind(this), 150)
        }
        break;
    }
  }.bind(this)
};
