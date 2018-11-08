var gameSelector;
var startGame = function() {
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
  shuffArray = this.shuffleArray(movies);
  this.true = 0;
}

//todo: consider adding a config object\
/*var GameConfig = {
  maxLevels: 20,
  timeSpeed: 0.5
}*/

GameSelector.prototype.start = function() {
  this.switchBackground();
  this.reset();
  this.switchCanvas();
  this.pushAnswerArray();
  this.takeMovie();
  this.buttonsDOM();
  this.levelDOM();
  this.pointsDOM();
  if (this.level !== 5) {
    setTimeout(
      function() {
        this.imageDOM();
      }.bind(this),
      1000
    );
  }

  canvasTime = new CanvasTime("canvasTimeBar");
  canvasTime.start();
};

GameSelector.prototype.switchBackground = function() {
$("body").switchBackground
};

GameSelector.prototype.switchCanvas = function() {
  //todo: consider adding switch / case statement
  if (this.levelCanvas === 0) {
    canvasDistorsion = new CanvasDistorsion("canvasTv");
    canvasDistorsion.start();
    this.canvasName = canvasDistorsion;
    this.levelCanvas++;
      $("body").css('background-image', 'url(images/background-two.jpg)');
    } else if (this.levelCanvas === 1) {
    canvasDisapp = new CanvasDisapp("canvasTv");
    canvasDisapp.start();
    this.canvasName = canvasDisapp;
    this.levelCanvas = 0;
  }
  // canvasWave = new CanvasWave("canvasTv");
  // canvasWave.start();
  // this.canvasName = canvasWave;
};

GameSelector.prototype.reset = function() {
  this.correctMovie = {};
  this.possibleAnswerArray.forEach(function(movie) {
    //todo: consider caching DOM elements in recognizable variables as per $righButton = $("#right-block button")
    $("#right-block button").remove();
  });
  this.possibleAnswerArray = [];
};

//todo: consider moving this logic into a utils class
GameSelector.prototype.shuffleArray = function(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

//todo: consider renaming this method, difficult to understand its functionality
GameSelector.prototype.pushAnswerArray = function() {
  this.correctMovie = movies[this.level - 1];
  this.possibleAnswerArray.push(this.correctMovie.title);
};

GameSelector.prototype.takeMovie = function() {
  var ranMovie = movies[Math.floor(Math.random() * movies.length)].title;
  //todo: remove hardcoded values, and move them to config values
  if (
    !this.possibleAnswerArray.includes(ranMovie) &&
    this.possibleAnswerArray.length < 4
  ) {
    this.possibleAnswerArray.push(ranMovie);
  } else if (this.possibleAnswerArray.length == 4) {
    return;
  }
  this.possibleAnswerArray = this.shuffleArray(this.possibleAnswerArray);
  this.takeMovie();
};

GameSelector.prototype.buttonsDOM = function() {
  this.possibleAnswerArray.forEach(
    function(movie) {
      //todo: remember jquery cached variables convention (with $)
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

//todo: remember improving the function naming, example setCurrentGameplayImage
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
  //todo: consider splitting this funcionality into two private functions
  if (movieTitle === this.correctMovie.title) {
    canvasTime.clearInterval();
    canvasTime.ctx.clearRect(0, 0, 610, 60);
    this.canvasName.clearInterval();
    this.canvasName.ctx.clearRect(0, 0, 408, 306);
    setTimeout(
      function() {
        this.level++;
        this.true++;
        this.points += 50;
        this.points += 500 - parseInt(canvasTime.x);
        $("#imagen-movie").attr("src", "images/giphy.gif");
        clap.play()
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

GameSelector.prototype.gameOver = function() {
  if (this.level === 5) {
    canvasTime.clearInterval();
    canvasTime.ctx.clearRect(0, 0, 610, 60);
    this.canvasName.clearInterval();
    this.canvasName.ctx.clearRect(0, 0, 408, 306);
    $("#imagen-movie").attr("src", "images/GameOver.jpg");
    setTimeout(
      function() {
        document.querySelector("#main").style.display = "none";
        document.querySelector("#gameover").style.display = "flex";
        document.querySelector("#buttonpoints").innerHTML = `TU PUNTUACION ES DE ${this.points}. HAS ACERTADO ${this.true} DE ${this.level - 1} `;
      }.bind(this),
      2000
    );

  }
};
