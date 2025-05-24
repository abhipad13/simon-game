const boxes = document.querySelectorAll(".box");
const h1 = document.querySelector("h1");

const game = {
  started: false,
  level: 0,
  sequence: [],
  currentStep: 0,
  colors: ["red", "green", "blue", "yellow"]
};

document.addEventListener("keypress", () => {
  if (!game.started) {
    game.started = true;
    h1.textContent = `Level ${game.level}`;
    nextLevel();
  }
});

boxes.forEach((box) => {
  box.addEventListener("click", () => handleUserClick(box));
});

function handleUserClick(box) {
  press(box);
  playSound(box.id);
  if (box.id === game.sequence[game.currentStep]) {
    game.currentStep++;
    if (game.currentStep === game.sequence.length) {
      setTimeout(nextLevel, 1000);
    }
  } else {
    gameOver();
  }
}

function nextLevel() {
  game.level++;
  h1.textContent = `Level ${game.level}`;
  const color = game.colors[Math.floor(Math.random() * 4)];
  game.sequence.push(color);
  game.currentStep = 0;
  const box = document.getElementById(color);
  press(box);
  playSound(color);
}

function gameOver() {
  playSound("wrong");
  h1.textContent = "Game Over! Press Any Key to Restart";
  document.body.classList.add("game-over");
  setTimeout(() => document.body.classList.remove("game-over"), 200);
  resetGame();
}

function resetGame() {
  game.started = false;
  game.level = 0;
  game.sequence = [];
  game.currentStep = 0;
}

function playSound(color) {
  new Audio(`sounds/${color}.mp3`).play();
}

function press(box) {
  box.classList.add("pressed");
  setTimeout(() => box.classList.remove("pressed"), 100);
}