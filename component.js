function Component(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.speedY = 0;
  this.gravity = -1.8;
  this.gravitySpeed = 0;
  this.isJumping = false;
}

Component.prototype.update = function() {
  ctx = myGameArea.context;
  ctx.fillStyle = color;
  ctx.fillRect(this.x, this.y, this.width, this.height);
}

Component.prototype.newPos = function() {
  this.gravitySpeed += this.gravity;
  this.y += this.speedY + this.gravitySpeed;
  this.hitBottom();
}

Component.prototype.hitBottom = function() {
  var rockbottom = myGameArea.canvas.height - myGamePiece.height - myGameFloor.height;
  if (this.y > rockbottom) {
      this.y = rockbottom;
      this.gravitySpeed = 0;
      this.isJumping = false;
  }
}
