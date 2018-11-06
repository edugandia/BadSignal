function CanvasDistorsion(id, level) {
  this.canvas = document.getElementById(id);
  this.ctx = this.canvas.getContext("2d");
  this.fps = 60;
  this.opacity = 1;
  this.counter = 0;
  this.interval
}

CanvasDistorsion.prototype.start = function() {
  this.opacity = 1;
  this.interval = setInterval(
    function() {
      this.ctx.clearRect(0, 0, 408, 306);
      this.drawWhiteNoise();
      // this.reveal();
      this.counter++

      if(this.counter % 2 === 0){
        if(this.opacity > 0){
          this.opacity = (this.opacity - 0.001).toFixed(3);
          this.counter = 0;
        }
        // console.log(this.opacity);
      }
    }.bind(this),
    1000 / this.fps
  );
};

CanvasDistorsion.prototype.drawWhiteNoise = function() {
  for (var i = 0; i < 31; i++) {
    for (var j = 0; j < 41; j++) {
      var randomGreyScale = Math.round(Math.random() * 255);
      this.ctx.beginPath();
      this.ctx.fillStyle = `rgba(${randomGreyScale}, ${randomGreyScale}, ${randomGreyScale}, ${this.opacity})`;
      this.ctx.fillRect(j * 10, i * 10, 10, 10);
      this.ctx.closePath();
    }
  }

  CanvasDistorsion.prototype.clearInterval = function (){
clearInterval(this.interval)
  }
  // CanvasDistorsion.prototype.reveal = function(){
  //   for (var i = 0; i < 31; i++) {
  //     for (var j = 0; j < 41; j++) {
  //       var randomGreyScale = Math.round(Math.random() * 255);
  //       this.ctx.beginPath();
  //       this.ctx.fillStyle = `rgb(${randomGreyScale}, ${randomGreyScale}, ${randomGreyScale})`;
  //       this.ctx.fillRect(j * 10, i * 10, 10, 10);
  //       this.ctx.closePath();
  //     }

  // }
};
