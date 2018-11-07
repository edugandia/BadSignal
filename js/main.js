var gameSelector;
window.onload = function() {
  gameSelector = new GameSelector();
  gameSelector.start();
};

function GameSelector() {
  this.level = 1;
  this.lives = 3;
  this.points = 0;
  this.correctMovie = {};
  this.possibleAnswerArray = [];
  // this.shuffleArray();
}
GameSelector.prototype.start = function() {
  this.reset();
  this.trueMovie();
  this.pushAnswerArray();
  this.takeMovie();
  this.buttonsDOM();
  this.imageDOM();
  this.levelDOM();
  this.pointsDOM();

  // canvasDistorsion = new CanvasDistorsion("canvasTv");
  // canvasDistorsion.start();
  // canvasDisapp = new CanvasDisapp("canvasTv");
  // canvasDisapp.start();
  canvasWave = new CanvasWave("canvasTv");
  canvasWave.start();
  canvasTime = new CanvasTime("canvasTimeBar");
  canvasTime.start();
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

GameSelector.prototype.pointsDOM = function(){
  $(".points").text(this.points)
}

// GameSelector.prototype.correctAnswer = function(movieTitle) {
//   if (movieTitle === this.correctMovie.title) {
//     canvasDistorsion.clearInterval();
//     canvasDistorsion.ctx.clearRect(0, 0, 408, 306);
//     setTimeout(
//       function() {
//         $("#imagen-movie").attr("src", "images/giphy.gif");
//       }.bind(this),
//       2000
//     );
//     setTimeout(
//       function() {
//         this.start();
//         this.level++;
//         this.points += 50;
//       }.bind(this),
//       4000
//     );
//   } else {
//     this.lives -= 1;
//     canvasDistorsion.clearInterval();
//     canvasDistorsion.ctx.clearRect(0, 0, 408, 306);
//     setTimeout(
//       function() {
//         $("#imagen-movie").attr("src", "images/noway.gif");
//       }.bind(this),
//       2000
//     );
//     setTimeout(
//       function() {
//         this.start();
//         this.level++;
//       }.bind(this),
//       4000
//     );
//   }
// };

// GameSelector.prototype.correctAnswer = function(movieTitle) {
//   if (movieTitle === this.correctMovie.title) {
//     canvasDisapp.clearInterval();
//     canvasDisapp.ctx.clearRect(0, 0, 408, 306);
//     setTimeout(
//       function() {
//         $("#imagen-movie").attr("src", "images/giphy.gif");
//       }.bind(this),
//       2000
//     );
//     setTimeout(
//       function() {
//         this.start();
//         this.level++;
//         this.points += 50;
//       }.bind(this),
//       4000
//     );
//   } else {
//     this.lives -= 1;
//     canvasDisapp.clearInterval();
//     canvasDisapp.ctx.clearRect(0, 0, 408, 306);
//     setTimeout(
//       function() {
//         $("#imagen-movie").attr("src", "images/noway.gif");
//       }.bind(this),
//       2000
//     );
//     setTimeout(
//       function() {
//         this.start();
//         this.level++;
//       }.bind(this),
//       4000
//     );
//   }
// };

GameSelector.prototype.correctAnswer = function(movieTitle) {
  if (movieTitle === this.correctMovie.title) {
    canvasWave.clearInterval();
    canvasWave.ctx.clearRect(0, 0, 408, 306);
    setTimeout(
      function() {
        $("#imagen-movie").attr("src", "images/giphy.gif");
      }.bind(this),
      2000
    );
    setTimeout(
      function() {
        this.start();
        this.level++;
        this.points += 50;
      }.bind(this),
      4000
    );
  } else {
    this.lives -= 1;
    canvasWave.clearInterval();
    canvasWave.ctx.clearRect(0, 0, 408, 306);
    setTimeout(
      function() {
        $("#imagen-movie").attr("src", "images/noway.gif");
      }.bind(this),
      2000
    );
    setTimeout(
      function() {
        this.start();
        this.level++;
      }.bind(this),
      4000
    );
  }
};