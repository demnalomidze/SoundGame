let sequence = [];
let userSequence = [];
let score = 0;
let gameStarted = false;

const colors = ["Red", "Green", "Yellow", "Blue"];

function playSound(soundId) {
  const sound = document.getElementById(soundId);
  sound.currentTime = 0;
  sound.play();
}

function displayColor(color) {
  document.querySelector(".Head").textContent = color; // Show the color name at the top
}

function addColorToSequence(color) {
  sequence.push(color);
  displayColor(color); // Display the next color to be pressed
}

function checkUserInput(color) {
  if (!gameStarted) return; // Do nothing if the game has not started yet

  userSequence.push(color);

  // Check if the user's input matches the sequence at the current position
  if (
    userSequence[userSequence.length - 1] !== sequence[userSequence.length - 1]
  ) {
    // If user clicks the wrong button, play the loss sound and show the "You lost!" message
    playSound("wrong-sound"); // This is where you play the game over sound
    document.querySelector(".Head").textContent = "You lost!"; // Show "You lost!" at the top
    resetGame();
  } else if (userSequence.length === sequence.length) {
    // If the user correctly follows the sequence, increase the score and continue the game
    score++;
    document.getElementById("score").textContent = `Points: ${score}`; // Update score
    setTimeout(() => {
      userSequence = []; // Reset the user's sequence
      generateNextColor(); // Generate the next color to follow
    }, 1000);
  }
}

function generateNextColor() {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  addColorToSequence(randomColor);
}

function resetGame() {
  sequence = []; // Reset the sequence
  userSequence = []; // Reset the user's input sequence
  score = 0; // Reset the score
  document.getElementById("score").textContent = `Points: 0`; // Reset the score display
  gameStarted = false; // Set the gameStarted flag to false
  setTimeout(() => {
    document.querySelector(".Head").textContent = "Press A Key to Start";
  }, 2000);
}

$(document).ready(function () {
  $(".Red, .Green, .Yellow, .Blue").click(function () {
    const color = this.className.split(" ")[0];

    if (!gameStarted) {
      // First click starts the game
      gameStarted = true;
      addColorToSequence(color); // The first color clicked is the first color in the sequence
    } else {
      checkUserInput(color); // Continue checking input once the game has started
    }
  });
});
