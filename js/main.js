
var startGame = function() {
  gameSelector = new GameSelector();
  gameSelector.start();
};


function GameSelector() {
  this.currentLevel = 1;
  this.canvasLevel = 0;
  this.canvasName = "";
  this.score = 0;
  this.correctMovie = {};
  this.possibleMovies = [];
  this.rightAnswers = 0;
  this.shuffleArray = shuffleArray(movies);
}


GameSelector.prototype.start = function() {
  if (this.currentLevel !== GameConfig.maxLevels) {
  this.reset();
  this.switchCanvas();
  this.answersGenerator();
  this.buttonsGenerator();
  this.levelPainter();
  this.scorePainter();
    setTimeout(
      function() {
        this.imageGenerator();
      }.bind(this),
      1000
    );
    canvasTime = new CanvasTime("canvasTimeBar");
    canvasTime.start();
  } else {
    this.gameOver();
  }
};


GameSelector.prototype.switchCanvas = function() {
  var levelBackground = document.getElementsByTagName("body")[0];

  switch (this.canvasLevel) {
    case 0:
      canvasDistorsion = new CanvasDistorsion("canvasTv");
      canvasDistorsion.start();
      this.canvasName = canvasDistorsion;
      this.canvasLevel++;
      levelBackground.style.backgroundImage = "url(images/wallpaper.jpg)";
      break;
    case 1:
      canvasDisapp = new CanvasDisapp("canvasTv");
      canvasDisapp.start();
      this.canvasName = canvasDisapp;
      this.canvasLevel++;
      levelBackground.style.backgroundImage = "url(images/background-2.jpg)";
      break;
    case 2:
      canvasWave = new CanvasDisappBlack("canvasTv");
      canvasWave.start();
      this.canvasName = canvasWave;
      this.canvasLevel = 0;
      levelBackground.style.backgroundImage = "url(images/background-3.jpg)";
      break;
  }
};


GameSelector.prototype.reset = function() {
  this.correctMovie = {};
  this.possibleMovies = [];
  //SUSTITUIR REMOVE SIN JQUERY
  $("#right-block button").remove();
};


GameSelector.prototype.answersGenerator = function() {
  this.correctMovie = this.shuffleArray[this.currentLevel - 1];
  this.possibleMovies.push(this.correctMovie.title);
  //QUITAR EL PROTOTYPE DE LA FUNCION PICKERMOVIES
  GameSelector.prototype.pickMovies = function() {
    var ranMovie = movies[Math.floor(Math.random() * movies.length)].title;
    if (
      !this.possibleMovies.includes(ranMovie) &&
      this.possibleMovies.length < GameConfig.possibleAnswers
    ) {
      this.possibleMovies.push(ranMovie);
    } else if (this.possibleMovies.length == GameConfig.possibleAnswers) {
      return;
    }
    this.pickMovies();
    this.possibleMovies = shuffleArray(this.possibleMovies);
  };
  this.pickMovies();
};


GameSelector.prototype.buttonsGenerator = function() {
  this.possibleMovies.forEach(function(movie) {
      $("#right-block").append(
        $("<button/>", {
          text: movie,
          click: function(e) {
            this.correctAnswer(e.target.innerHTML);
            this.endOfTurn();
          }.bind(this)
        })
      );
    }.bind(this)
  );
};


GameSelector.prototype.imageGenerator = function() {
  $("#imagen-movie").attr("src", this.correctMovie.image);
};


GameSelector.prototype.levelPainter = function() {
  $(".level").text(this.currentLevel);
};


GameSelector.prototype.scorePainter = function() {
  $(".score").text(this.score);
};


GameSelector.prototype.endOfTurn = function(){
  canvasTime.clearInterval();
  canvasTime.ctx.clearRect(0, 0, 610, 60);
  this.canvasName.clearInterval();
  this.canvasName.ctx.clearRect(0, 0, 408, 306);
}


GameSelector.prototype.correctAnswer = function(movieTitle) {
  //todo: consider splitting this funcionality into two private functions
  mistery.play();
  if (movieTitle === this.correctMovie.title) {
    setTimeout(
      function() {
        this.currentLevel++;
        this.rightAnswers++;
        this.score += 50;
        this.score += 500 - parseInt(canvasTime.x);
        $("#imagen-movie").attr("src", "images/giphy.gif");
        clap.play();
      }.bind(this),
      5000
    );
    setTimeout(
      function() {
        this.start();
      }.bind(this),
      7000
    );
  } else {
    setTimeout(
      function() {
        this.currentLevel++;
        $("#imagen-movie").attr("src", "images/noway.gif");
        wrong.play();
      }.bind(this),
      5000
    );
    setTimeout(
      function() {
        this.start();
      }.bind(this),
      7000
    );
  }
};


GameSelector.prototype.timeEnd = function() {
  if (canvasTime.x > 520) {
    this.endOfTurn();
    this.currentLevel++;
    $("#imagen-movie").attr("src", "images/overtime.gif");
    timeOut.play();
    setTimeout(
      function() {  
        this.start();
      }.bind(this),
      4000
    );
  }
};


GameSelector.prototype.gameOver = function() {
  if (this.currentLevel === GameConfig.maxLevels) {
    canvasTime.clearInterval();
    canvasTime.ctx.clearRect(0, 0, 610, 60);
    this.canvasName.clearInterval();
    this.canvasName.ctx.clearRect(0, 0, 408, 306);
    $("#imagen-movie").attr("src", "images/GameOver.jpg");
    setTimeout(
      function() {
        document.querySelector("#main").style.display = "none";
        document.querySelector("#gameover").style.display = "flex";
        document.querySelector("#buttonpoints").innerHTML = `HAS COSEGUIDO ${
          this.score
        }PUNTOS. ACERTASTE ${this.rightAnswers} DE ${this.level - 1} PRUEBAS.`;
      }.bind(this),
      2000
    );
  }
};

