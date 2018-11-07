var gameSelector;
window.onload = function() {
  gameSelector = new GameSelector();
  gameSelector.start();
};

function GameSelector() {
  this.level = 1;
  this.levelCanvas = 0;
  this.points = 0;
  this.correctMovie = {};
  this.possibleAnswerArray = [];
  this.canvasName = "";
  // this.shuffleArray();
}
GameSelector.prototype.start = function() {
  this.reset();
  this.trueMovie();
  this.switchCanvas();
  this.pushAnswerArray();
  this.takeMovie();
  this.buttonsDOM();
  this.levelDOM();
  this.pointsDOM();
  setTimeout(
    function() {
      this.imageDOM();
    }.bind(this),
    1000
  );

  canvasTime = new CanvasTime("canvasTimeBar");
  canvasTime.start();
};
GameSelector.prototype.switchCanvas = function() {
  if (this.levelCanvas === 0) {
    canvasDistorsion = new CanvasDistorsion("canvasTv");
    canvasDistorsion.start();
    this.canvasName = canvasDistorsion;
  } else if (this.levelCanvas === 1) {
    canvasDisapp = new CanvasDisapp("canvasTv");
    canvasDisapp.start();
    this.canvasName = canvasDisapp;
    this.levelCanvas = 0;
  }
};

//GameSelector.prototype.shuffleArray =function(){}  PENDIENTE!!!!!!!!!!!!!!!!!!!!!!!!!!

GameSelector.prototype.reset = function() {
  this.correctMovie = {};
  this.possibleAnswerArray.forEach(function(movie) {
    $("#right-block button").remove();
  });
  this.possibleAnswerArray = [];
};
GameSelector.prototype.trueMovie = function() {
  this.correctMovie = movies[this.level - 1];
};

GameSelector.prototype.pushAnswerArray = function() {
  this.possibleAnswerArray.push(this.correctMovie.title);
};

GameSelector.prototype.takeMovie = function() {
  var ranMovie = movies[Math.floor(Math.random() * movies.length)].title;
  if (
    !this.possibleAnswerArray.includes(ranMovie) &&
    this.possibleAnswerArray.length < 4
  ) {
    this.possibleAnswerArray.push(ranMovie);
  } else if (this.possibleAnswerArray.length == 4) {
    return;
  }
  this.takeMovie();
};

GameSelector.prototype.buttonsDOM = function() {
  this.possibleAnswerArray.forEach(
    function(movie) {
      $("#right-block").append(
        $("<button/>", {
          text: movie,
          click: function(e) {
            this.correctAnswer(e.target.innerHTML);
          }.bind(this)
        })
      );
    }.bind(this)
  );
};

GameSelector.prototype.imageDOM = function() {
  $("#imagen-movie").attr("src", this.correctMovie.image);
};

GameSelector.prototype.levelDOM = function() {
  $(".level").text(this.level);
};

GameSelector.prototype.pointsDOM = function() {
  $(".points").text(this.points);
};

GameSelector.prototype.correctAnswer = function(movieTitle) {
  if (movieTitle === this.correctMovie.title) {
    canvasTime.clearInterval();
    canvasTime.ctx.clearRect(0, 0, 610, 60);
    this.canvasName.clearInterval();
    this.canvasName.ctx.clearRect(0, 0, 408, 306);
    setTimeout(
      function() {
        this.levelCanvas++;
        this.level++;
        this.points += 50;
        this.points += (500 - parseInt(canvasTime.x));
        $("#imagen-movie").attr("src", "images/giphy.gif");
      }.bind(this),
      2000
    );
    setTimeout(
      function() {
        this.start();
      }.bind(this),
      4000
    );
  } else {
    canvasTime.clearInterval();
    canvasTime.ctx.clearRect(0, 0, 610, 60);
    this.canvasName.clearInterval();
    this.canvasName.ctx.clearRect(0, 0, 408, 306);
    setTimeout(
      function() {
        this.levelCanvas++;
        this.level++;
        $("#imagen-movie").attr("src", "images/noway.gif");
      }.bind(this),
      2000
    );
    setTimeout(
      function() {
        this.start();
      }.bind(this),
      4000
    );
  }
};

GameSelector.prototype.timeEnd = function() {
  if (canvasTime.x > 520) {
    canvasTime.clearInterval();
    canvasTime.ctx.clearRect(0, 0, 610, 60);
    this.canvasName.clearInterval();
    this.canvasName.ctx.clearRect(0, 0, 408, 306);
    this.levelCanvas++;
    this.level++;
    $("#imagen-movie").attr("src", "images/overtime.gif");
    setTimeout(
      function() {
        this.start();
      }.bind(this),
      4000
    );
  }
};
