const boxes = document.querySelectorAll(".box");

let gameStart = false;
let buttonColors = ["red", "green", "blue", "yellow"];
let level = 0;
let currentLevel = 0;
let gameState = [];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    checkCorrect(box);
  });
});

document.addEventListener("keypress", () => {
  if (!gameStart) {
    gameStart = true;
    document.querySelector("h1").textContent = "Level " + level;
    nextLevel();
  }
});

function checkCorrect(box) {
  press(box);
  if (box.id == gameState[currentLevel]) {
    playSound(box.id);
    if (currentLevel == gameState.length - 1) {
      setTimeout(() => {
        nextLevel();
      }, 1000);
    } else {
      currentLevel++;
    }
  } else {
    playSound("wrong");
    document.querySelector("h1").textContent =
      "Game Over! Press Any Key to Start";
    gameStart = false;
    level = 0;
    gameState = [];
    document.body.classList.add("game-over");
    setTimeout(() => {
      document.body.classList.remove("game-over");
    }, 200);
  }
}

function playSound(sound) {
  let audio = new Audio("sounds/" + sound + ".mp3");
  audio.play();
}

function press(box) {
  box.classList.add("pressed");

  setTimeout(() => {
    box.classList.remove("pressed");
  }, 100);
}

function nextLevel() {
  level++;
  document.querySelector("h1").textContent = "Level " + level;

  let randomIndex = Math.floor(Math.random() * 4);
  let randomColor = buttonColors[randomIndex];
  let box = document.querySelector("#" + randomColor);

  press(box);
  playSound(box.id);
  gameState.push(randomColor);
  currentLevel = 0;
}
