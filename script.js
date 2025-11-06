const textDisplay = document.getElementById("text-display");
const textInput = document.getElementById("text-input");
const timerDisplay = document.getElementById("timer");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const restartBtn = document.getElementById("restart");

const paragraphs = [
  "Programming is the art of turning logic into reality through code.",
  "JavaScript powers the dynamic behavior on most websites today.",
  "Consistency and practice are the keys to becoming a great developer.",
  "React and Node.js together make full stack development more powerful."
];

let timeLeft = 60;
let timer = null;
let currentParagraph = "";
let totalTyped = 0;
let correctChars = 0;
let isTimerRunning = false;

function loadParagraph() {
  const randomIndex = Math.floor(Math.random() * paragraphs.length);
  currentParagraph = paragraphs[randomIndex];
  textDisplay.innerHTML = "";
  currentParagraph.split("").forEach((char) => {
    const span = document.createElement("span");
    span.textContent = char;
    textDisplay.appendChild(span);
  });
  textInput.value = "";
}

function startTimer() {
  if (!isTimerRunning) {
    isTimerRunning = true;
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
      } else {
        clearInterval(timer);
        textInput.disabled = true;
      }
    }, 1000);
  }
}

textInput.addEventListener("input", () => {
  startTimer();
  const input = textInput.value.split("");
  const spans = textDisplay.querySelectorAll("span");

  totalTyped++;
  correctChars = 0;

  spans.forEach((span, index) => {
    const char = input[index];
    if (char == null) {
      span.classList.remove("correct", "incorrect");
    } else if (char === span.textContent) {
      span.classList.add("correct");
      span.classList.remove("incorrect");
      correctChars++;
    } else {
      span.classList.add("incorrect");
      span.classList.remove("correct");
    }
  });

  const wpm = Math.round((correctChars / 5) / ((60 - timeLeft) / 60));
  const accuracy = ((correctChars / totalTyped) * 100).toFixed(1);

  wpmDisplay.textContent = isNaN(wpm) || !isFinite(wpm) ? 0 : wpm;
  accuracyDisplay.textContent = isNaN(accuracy) ? 0 : accuracy;
});
// button
restartBtn.addEventListener("click", () => {
  clearInterval(timer);
  timeLeft = 60;
  timerDisplay.textContent = timeLeft;
  wpmDisplay.textContent = 0;
  accuracyDisplay.textContent = 0;
  totalTyped = 0;
  correctChars = 0;
  isTimerRunning = false;
  textInput.disabled = false;
  loadParagraph();
});

window.onload = loadParagraph;
