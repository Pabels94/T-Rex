function startGame() {
    myGameArea.start();

    myGameBackground = new component(800, 500, "lightBlue", 0, 0);
    myGamePiece = new component(50, 90, "black", 40, 390);
    myGameFloor = new component(800, 20, "Brown", 0, 480);

    myGamePiece.gravity = 0.05;
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





function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 0.05;
    this.gravitySpeed = 0;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY;

    }
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.newPos();
    myGamePiece.update();
}

function moveup() {
  console.log("up")
    myGamePiece.speedY -= 1;
}

function movedown() {
  console.log("down")
    myGamePiece.speedY += 1;
}

function updateGameArea() {
    myGameArea.clear();
    // myGamePiece.speedX = 0;
    // myGamePiece.speedY = 0;
    // if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -1; }
    // if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 1; }
    myGameBackground.update();
    myGameFloor.update();
    myGamePiece.newPos();
    myGamePiece.update();
}

startGame();
