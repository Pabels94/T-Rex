function Player(x, y ,ctx, gravity){
  this.x = x;
  this.y = y;
  this.gravitySpeed = 0;
  this.speedY = 0;
  this.isJumping = false;
  this.gravity = gravity;
  this.ctx = ctx;
  this.spriteWidth = 574;
  this.spriteHeight = 148;
  this.rows = 1;
  this.cols = 7;
  this.width = this.spriteWidth/this.cols;
  this.height = this.spriteHeight/this.rows;
  this.curFrame = 0;
  this.frameCount = 7;
  this.x = 100;
  this.y = 0;
  this.srcX = 0;
  this.srcY = 0;
  this.character = new Image();
  this.character.src = "personaje.png";
  this.updateFrame();
}

Player.prototype.updateFrame = function () {

  this.intervalFrame = setInterval(function(){
    this.curFrame = ++this.curFrame % this.frameCount;
    this.srcX = this.curFrame * this.width;
  }.bind(this), 200);
};

Player.prototype.drawCharacter = function () {
  this.ctx.drawImage(this.character, this.srcX, this.srcY, this.width, this.height, this.x, this.y, this.width, this.height);
}

Player.prototype.newPos = function () {
  this.gravitySpeed += this.gravity;
  this.y += this.speedY + this.gravitySpeed;
}

Player.prototype.hitBottom = function (canvas, myGamePiece, myGameFloor ) {
  var rockbottom = canvas.height - myGamePiece.height - myGameFloor.height;
  if (this.y > rockbottom) {
    this.y = rockbottom;
    this.gravitySpeed = 0;
    this.isJumping = false;
  }
}

Player.prototype.changeJump = function(){
  
}
