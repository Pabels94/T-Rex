function Obstacle(width, height, color, x, y, ctx, gravity, type) {
  this.type = type;
  if (type == "image"){
    this.image = new Image();
    this.image.src = color;
  }
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

Obstacle.prototype.update = function () {
          if (this.type == "image") {
              this.ctx.drawImage(this.image,
                  this.x,
                  this.y,
                  this.width, this.height);
          } else {
              this.ctx.fillStyle = color;
              this.ctx.fillRect(this.x, this.y, this.width, this.height);
          }
}

Obstacle.prototype.newPos = function () {
  this.gravitySpeed += this.gravity;
  this.y += this.speedY + this.gravitySpeed;
}
