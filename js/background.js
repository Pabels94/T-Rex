function Image(width, height, color, dx, speed, ctx, x, y){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.ctx = ctx;
  this.dx = dx;
  this.scale = 1.05;
  this.speed = speed;
  this.imgW;
  this.imgH;
  this.clearX;
  this.clearY;
  this.color = color
  



  img.onload = function() {
    this.imgW = img.width * this.scale;
    this.imgH = img.height * this.scale;
    if (this.imgW > this.width) {
      this.x = this.width - this.imgW; }
    if (this.imgW > this.width) { this.clearX = this.imgW; }
    else { this.clearX = this.width; }
    if (this.imgH > this.width) { this.clearY = this.imgH; }
    else { this.clearY = this.heigth; }
    return setInterval(draw, this.speed);
}

function draw() {
    ctx.clearRect(0, 0, this.clearX, this.clearY);
    if (this.imgW <= this.width) {
        if (this.x > this.width) { this.x = -this.imgW + this.x; }
        if (this.x > 0) { ctx.drawImage(this.img, -this.imgW + this.x, this.y, this.imgW, this.imgH); }
        if (this.x - this.imgW > 0) { ctx.drawImage(this.img, -this.imgW * 2 + this.x, this.y, this.imgW, this.imgH); }
    }
    else {
        if (this.x > (this.width)) { this.x = this.width - this.imgW; }
        if (this.x > (this.width-this.imgW)) { ctx.drawImage(this.img, this.x - this.imgW + 1, this.y, this.imgW, this.imgH); }
    }
    ctx.drawImage(this.img, this.x, this.y,this.imgW, this.imgH);
    x += dx;
}

Component.prototype.update = function () {
  this.ctx.fillStyle = this.color;
  this.ctx.fillRect(this.x, this.y, this.width, this.height);
}

}
