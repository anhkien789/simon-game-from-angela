var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour = "";
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

function playSound(sound) {
  switch (sound) {
    case "yellow":
      var yellowAudio = new Audio("./sounds/yellow.mp3");
      yellowAudio.play();
      break;
    case "blue":
      var blueAudio = new Audio("./sounds/blue.mp3");
      blueAudio.play();
      break;
    case "green":
      var greenAudio = new Audio("./sounds/green.mp3");
      greenAudio.play();
      break;
    case "red":
      var redAudio = new Audio("./sounds/red.mp3");
      redAudio.play();
      break;
    case "wrong":
      var wrongAudio = new Audio("./sounds/wrong.mp3");
      wrongAudio.play();
      break;

    default:
      console.log(sound);
  }
}

function animatePress(currentColour) {
  $(currentColour).addClass("pressed");
  setTimeout(function () {
    $(currentColour).removeClass("pressed");
  }, 100);
}

function startOver() {
  started = false;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  var selectedButtonId = "#" + randomChosenColour;

  $(selectedButtonId).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

  level += 1;
  $("#level-title").text("Level " + level);

  //   console.log(gamePattern);
}

$(".btn").on("click", function (event) {
  var userChosenColour = $(this).attr("id");
  var userChosenColourId = "#" + userChosenColour;
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColourId);
  playSound(userChosenColour);
  checkAnswer(level);
  //   console.log(userClickedPattern);
});

$(document).on("keydown", function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel) {
  if (userClickedPattern.length <= currentLevel) {
    let hasOneWrongAnswer = false;
    for (let index = 0; index < userClickedPattern.length; index++) {
      if (userClickedPattern[index] !== gamePattern[index]) {
        hasOneWrongAnswer = true;
      }
    }
    if (hasOneWrongAnswer) {
      // console.log("wrong");
      startOver();
      playSound("wrong");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
    } else {
      // console.log("success");
      if (userClickedPattern.length === currentLevel) {
        setTimeout(function () {
          nextSequence();
          userClickedPattern = [];
        }, 1000);
        // console.log("level", level);
      }
    }
  }
}
