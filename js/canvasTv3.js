//todo: consider using strategy pattern
function CanvasWave(id,) {
  this.canvas = document.getElementById(id);
  this.ctx = this.canvas.getContext("2d");
  this.fps = 60;
  this.counter = 0;
  this.lineCounter = 3;
  this.interval;
}
CanvasWave.prototype.start = function() {
  this.interval = setInterval(
    function() {
      this.ctx.clearRect(0, 0, 408, 306);
      this.drawWave();
      this.counter++;
      if (this.counter % 20 === 0){
        this.lineCounter -= 0.01;
      }
    }.bind(this),
    1000 / this.fps
  );
};

CanvasWave.prototype.drawWave = function() {
  for (var i = 0; i < 310; i++) {
    var randomGreyScale = Math.round(Math.random() * 255);
    this.ctx.strokeStyle = `rgba(${randomGreyScale}, ${randomGreyScale}, ${randomGreyScale}, 0.5)`;
    this.ctx.lineWidth = this.lineCounter;
    this.ctx.beginPath();
    this.ctx.moveTo(100,Math.random() * (308) -100);
    //todo: consider using a function to avoid repetitions
    this.ctx.lineTo(  Math.round(Math.random() * 5),  Math.round(Math.random() * 5));
    this.ctx.lineTo(  Math.round(Math.random() * 5),  Math.round(Math.random() * 5));
    this.ctx.lineTo(  Math.round(Math.random() * 5),  Math.round(Math.random() * 5));
    this.ctx.lineTo(  Math.round(Math.random() * 5),  Math.round(Math.random() * 5));
    this.ctx.lineTo(  Math.round(Math.random() * 5),  Math.round(Math.random() * 5));
    this.ctx.lineTo(  Math.round(Math.random() * 5),  Math.round(Math.random() * 5));
    this.ctx.lineTo(418, Math.random() * (308) -100);
    this.ctx.stroke();
  }
};

CanvasWave.prototype.clearInterval = function() {
  clearInterval(this.interval);
};