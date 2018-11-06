window.onload = function() {
  var canvasDistorsion = new CanvasDistorsion("canvasTv");
  canvasDistorsion.start();
  var canvasTime = new CanvasTime("canvasTimeBar");
  canvasTime.start();
  var gameselector = new GameSelector();
};

var answer

function GameSelector() {
  this.correctMovie = {};
  this.possibleAnswerArray = [];
  this.randomObject();
  this.pushAnswerArray();
  this.takeMovie();
  this.buttonsDOM();
  this.imageDOM();
}

GameSelector.prototype.randomObject = function() {
  this.correctMovie = movies[Math.floor(Math.random() * movies.length)];
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
    // console.log(this.possibleAnswerArray)
    return;
  }
  this.takeMovie();
};

GameSelector.prototype.buttonsDOM = function() {
  this.possibleAnswerArray.forEach(function(movie) {
    $("#right-block").append(
      $("<button/>", {
        text: movie,
        click: function(e) {
          this.correctAnswer(e.target.innerHTML)
        }.bind(this)
      })
    );
  }.bind(this));
};

GameSelector.prototype.imageDOM = function() {
  $("#imagen-movie").attr("src", this.correctMovie.image);
};

GameSelector.prototype.correctAnswer = function(movieTitle){
    if (movieTitle === this.correctMovie.title){
      alert("CORRECTO!!!!!!!")
    }
  }