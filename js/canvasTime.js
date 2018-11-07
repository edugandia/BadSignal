function CanvasTime(id) {
  this.canvas = document.getElementById(id);
  this.ctx = this.canvas.getContext("2d");
  this.fps = 60;
  this.x = 0;
  this.y = 0;
  this.velThunder = 1.6;
  this.imgTv = new Image();
  this.imgTv.src = "images/clipart1511622019.png";
  this.imgThunder = new Image();
  this.imgThunder.src = "images/thunder.png";
}

CanvasTime.prototype.start = function() {
  this.interval = setInterval(
    function() {
      this.clear();
      this.moveThunder();
      this.drawTv();
      this.drawThunder();
      gameSelector.timeEnd();
    }.bind(this),
    1000 / this.fps
  );
};


CanvasTime.prototype.clear = function() {
  this.ctx.clearRect(0, 0, 610, 60);
};

CanvasTime.prototype.drawTv = function() {
  this.ctx.drawImage(this.imgTv, 550, 0, 60, 60);
  this.ctx.beginPath();
  this.ctx.moveTo(0, 32);
  this.ctx.lineTo(550, 32);
  this.ctx.lineWidth = "4";
  this.ctx.stroke();
};

CanvasTime.prototype.moveThunder = function() {
  this.x += this.velThunder;
};

CanvasTime.prototype.drawThunder = function() {
  this.ctx.drawImage(this.imgThunder, this.x, 0, 60, 60);
};
CanvasTime.prototype.clearInterval = function() {
  clearInterval(this.interval);
};
