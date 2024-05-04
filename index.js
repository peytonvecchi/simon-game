var sequence = [];
var playerSequence = [];
var level = 0;
var beginningOfGame = true;
var name = "";

$(document).on("keydown", () => {
  if (beginningOfGame == true) {
    beginningOfGame = false;
    gameGo();
  }
});

$(document).on("click", () => {
  if (beginningOfGame == true) {
    beginningOfGame = false;
    gameGo();
  }
});

// PASS EVENT TO USE 'this.id'
$(".btn").click((event) => {

  // adding pressed color to playerSequence and logging it in the console
  var color = event.target.id;
  playerSequence.push(color);
  console.log(`player sequence: ${playerSequence}`);

  //pressing the button
  pressButton(color);

  //checking if player did not select the correct sequence
  if (
    playerSequence[playerSequence.length - 1] !=
    sequence[playerSequence.length - 1]
  ) {
    gameOver();
  } else {
    console.log("good");
  }

  //checking if the player selected a button without the game starting
  if (sequence.length == 0) {
    gameOver();
  } else if (playerSequence.length == level) {
    gameGo();
  }
});

function gameGo() {
  //clearing player sequence
  playerSequence = [];

  // incrementing level and updating the title
  level++;
  console.log(`level: ${level}`);
  updateLevelTitle(level);

  // getting the next color in the sequence and logging it
  sequence.push(getNextColor());
  console.log(`game sequence: ${sequence}`);

  //pressing the button with 400ms delay
  setTimeout(() => {
    pressButton(sequence[sequence.length - 1]);
  }, 400);

  if (level == 8) {
    name = prompt("You've beaten level 7, Congrats! Enter your first name!").toLowerCase();
    if (name == "joanna" || name == "jojo" || name == "jo") {
      joanna();
    }
  }
}

function updateLevelTitle(num) {
  $("#level-title").text(`Level ${num}`);
}

function getNextColor() {
  //getting next color in the sequence
  let colors = ["green", "red", "blue", "yellow"];
  let choice = Math.floor(Math.random() * 4);
  console.log(colors[choice]);
  return colors[choice];
}

function pressButton(buttonColor) {
  let audio = new Audio(`./sounds/${buttonColor}.mp3`);

  $(`.btn.${buttonColor}`).addClass("pressed");
  setTimeout(() => {
    $(`.btn.${buttonColor}`).removeClass("pressed");
  }, 100);

  audio.play();
}

function gameOver() {
  $("#level-title").text("Game Over! Press Any Key To Restart");

  let audio = new Audio("./sounds/wrong.mp3");
  audio.play();

  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 400);

  level = 0;
  sequence = [];
  playerSequence = [];
  beginningOfGame = true;
}

function joanna() {
  var emojis = ["🩷 🧡 🩷", "🥰 😍 🥰", "🎀 👑 💖", "🍌 🌭 🌯", "✨ 👸🏻 ✨", "☝️🤓", "😘 😘 😘", "❤️ 🫶 ❤️"];

  $(".btn").addClass("hidden");

  let audio = new Audio("./sounds/princess.mp3");
  audio.play();

  $("#level-title").text("Hey ❤️JoJo❤️ 😘 🫶");
  $("#level-title").css("color", "orange");
  $("body").css("background-color", "pink");
  $(".food").removeClass("hidden");
  $(".refresh").removeClass("hidden");

  playEmojis(emojis, 0); // Start playing emojis recursively
}

function playEmojis(arr, index) {
  $(".food").text(arr[index % arr.length]); // Use modulo to cycle through the array infinitely

  setTimeout(() => {
    playEmojis(arr, index + 1); // Call playEmojis recursively with the next index
  }, 2000);
}
