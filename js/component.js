
function Component(width, height, color, x, y, ctx, gravity) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.color = color;
  this.speedY = 0;
  this.gravity = gravity;
  this.gravitySpeed = 0;
  this.isJumping = false;
  this.ctx = ctx;
}

Component.prototype.update = function () {
  this.ctx.fillStyle = this.color;
  this.ctx.fillRect(this.x, this.y, this.width, this.height);
}

Component.prototype.newPos = function () {
  this.gravitySpeed += this.gravity;
  this.y += this.speedY + this.gravitySpeed;
}

Component.prototype.hitBottom = function (canvas, myGamePiece, myGameFloor ) {
  var rockbottom = canvas.height - myGamePiece.height - myGameFloor.height;
  if (this.y > rockbottom) {
    this.y = rockbottom;
    this.gravitySpeed = 0;
    this.isJumping = false;
  }
}

//*****************************************************************************
