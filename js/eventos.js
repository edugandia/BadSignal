document.querySelector("#startbutton").onclick = function() {
  document.querySelector("#start").style.display = "none";
  document.querySelector("#main").style.display = "block";
  startGame();
};

document.querySelector("#buttonpoints").onclick = function() {
  document.querySelector("#gameover").style.display = "none";
  document.querySelector("#start").style.display = "flex";
  startGame();
};
