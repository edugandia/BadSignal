//todo: consider using strategy pattern
function CanvasDisappBlack(id) {
  this.canvas = document.getElementById(id);
  this.ctx = this.canvas.getContext("2d");
  this.fps = 60;
  this.counter = 0;
  this.rectCounter = 0;
  this.interval;
  this.x = Math.random() * (308 - 100) + 100;
  this.y = Math.random() * (229 - 75) + 229;
}

CanvasDisappBlack.prototype.start = function() {
  this.interval = setInterval(
    function() {
      this.ctx.clearRect(0, 0, 408, 306);
      this.drawWhiteNoise();
      this.counter++;
      this.clearRectangles();
      if (this.counter % 120 === 0) {
        this.rectCounter++;
      }

    }.bind(this),
    1000 / this.fps
  );
};

CanvasDisappBlack.prototype.clearRectangles = function() {
  this.ctx.clearRect(this.x - (this.counter * 1.33 / 2), this.y - (this.counter / 2), (1.33 * this.counter), this.counter);
};

CanvasDisappBlack.prototype.drawWhiteNoise = function() {
  for (var i = 0; i < 153; i++) {
    for (var j = 0; j < 102; j++) {
      var randomGreyScale = Math.round(Math.random() * 255);
      var randomGreyScale1 = Math.round(Math.random() * 255);
      var randomGreyScale2 = Math.round(Math.random() * 255);

      this.ctx.beginPath();
      this.ctx.fillStyle = `rgb(${randomGreyScale}, ${randomGreyScale1}, ${randomGreyScale2})`;
      this.ctx.fillRect(j * 4, i * 2, 4, 2);
      this.ctx.closePath();
    }
  }
};

CanvasDisappBlack.prototype.clearInterval = function() {
  clearInterval(this.interval);
};
