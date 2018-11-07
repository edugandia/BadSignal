function CanvasWave(id,) {
  this.canvas = document.getElementById(id);
  this.ctx = this.canvas.getContext("2d");
  this.fps = 60;
  this.counter = 0;
  this.interval;
}
CanvasWave.prototype.start = function() {
  this.interval = setInterval(
    function() {
      this.ctx.clearRect(0, 0, 408, 306);
      this.drawWave();
      this.counter++;
      if (this.counter < 816)
      this.ctx.clearRect(Math.round(Math.random() * 408) - (this.counter/2), Math.round(Math.random() * 306) - (this.counter/2), this.counter, this.counter)
    }.bind(this),
    1000 / this.fps
  );
};

CanvasWave.prototype.drawWave = function() {
  for (var i = 0; i < 153; i++) {
    for (var j = 0; j < 102; j++) {
      var randomGreyScale = Math.round(Math.random() * 255);
      this.ctx.beginPath();
      this.ctx.fillStyle = `rgb(${randomGreyScale}, ${randomGreyScale}, ${randomGreyScale})`;
      this.ctx.fillRect(j * 4, i * 2, 4, 2);
      this.ctx.closePath();
    }
  }
};
CanvasWave.prototype.clearInterval = function() {
  clearInterval(this.interval);
};