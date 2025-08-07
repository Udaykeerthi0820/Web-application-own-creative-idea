const options = {
aroma: "Pleasing smell",
pepper: "Salt's partner",
halt: "Put a stop to",
jump: "Rise suddenly",
shuffle: "Mix cards up",
combine: "Add or Mix",
disturb: "Interrupt; upset",
shift: "Move or Period of work",
machine: "Device or appliance",
happy: "Feeling good",
angry: "Very mad",
clean: "Not dirty",
bright: "Full of light",
soft: "Not hard",
quick: "Very fast",
smart: "Very clever",
water: "Clear liquid to drink",
chair: "Something to sit on",
book: "Thing you read",
apple: "A red or green fruit",
phone: "Used to call people",
road: "Path for cars",
music: "What you listen to",
ball: "Round toy",
tree: "Has leaves and branches",
clock: "Tells the time",
light: "Not heavy or makes things visible",
cold: "Not warm",
dream: "See things in sleep"
};

const startBtn = document.getElementById("start");
const restartBtn = document.getElementById("restart");
const startPageBtn = document.getElementById("start-page");
const controlsContainer = document.querySelector(".controls-container");
const gameWrapper = document.querySelector(".wrapper");
const resultContainer = document.querySelector(".result-container");
const resultMessage = document.getElementById("result-message");
const message = document.getElementById("message");
const hintRef = document.querySelector(".hint-ref");
const userInputSection = document.getElementById("user-input-section");
const letterContainer = document.getElementById("letter-container");
const chancesDisplay = document.getElementById("chances-display");

const words = Object.keys(options);
let randomWord = "";
let winCount = 0;
let lossCount = 5;
let levelName = "";

const generateRandomValue = array =>
  Math.floor(Math.random() * array.length);

const generateWord = () => {
randomWord = words[generateRandomValue(words)].toUpperCase();
const hint = options[randomWord.toLowerCase()];
hintRef.innerHTML = `<div><strong>Hint:</strong> ${hint}</div>`;
userInputSection.innerHTML = "";
let displayItem = "";
for (let i = 0; i < randomWord.length; i++) {
    displayItem += '<span class="inputSpace">_ </span>';
}
userInputSection.innerHTML = displayItem;
chancesDisplay.textContent = `Chances Left: ${lossCount}`;
};

const startGame = () => {
winCount = 0;
lossCount = 5;
message.innerText = "";
letterContainer.innerHTML = "";
generateWord();

for (let i = 65; i <= 90; i++) {
    const button = document.createElement("button");
    button.classList.add("letters");
    button.innerText = String.fromCharCode(i);

    button.addEventListener("click", () => {
    const inputSpaces = document.getElementsByClassName("inputSpace");
    let charArray = randomWord.split("");
    let correctGuess = false;

    charArray.forEach((char, index) => {
        if (char === button.innerText) {
        inputSpaces[index].innerText = char;
        winCount++;
        correctGuess = true;
}
    });

    button.disabled = true;

    if (correctGuess) {
        message.innerText = "Correct Letter!";
        message.style.color = "green";
        button.classList.add("correct");
    } else {
        lossCount--;
        message.innerText = "Incorrect Letter!";
        message.style.color = "red";
        button.classList.add("incorrect");
        chancesDisplay.textContent = `Chances Left: ${lossCount}`;
    }

    if (winCount === randomWord.length) {
        gameWrapper.classList.add("hide");
        resultContainer.classList.remove("hide");
        resultMessage.innerText = `🎉 Congratulations! You won ${levelName} level!`;
        restartBtn.classList.add("hide");
        startPageBtn.classList.remove("hide");
    }

    else if (lossCount === 0) {
        gameWrapper.classList.add("hide");
        resultContainer.classList.remove("hide");
        resultMessage.innerHTML = `❌ You lost the ${levelName} level.<br>The correct word was: <strong>${randomWord}</strong>`;
        restartBtn.classList.remove("hide");
        startPageBtn.classList.add("hide");
    }
    });

    letterContainer.appendChild(button);
    }
};

startBtn.addEventListener("click", () => {
const name = document.getElementById("username").value.trim();
const level = document.getElementById("level").value;
if (name === "" || level === "") {
    alert("Please enter your name and select level.");
    return;
}
levelName = level;
startBtn.style.backgroundColor = "#1e3a8a"; 
controlsContainer.classList.add("hide");
gameWrapper.classList.remove("hide");
startGame();
});

restartBtn.addEventListener("click", () => {
resultContainer.classList.add("hide");
gameWrapper.classList.remove("hide");
startGame();
});

startPageBtn.addEventListener("click", () => {
window.location.reload();
});