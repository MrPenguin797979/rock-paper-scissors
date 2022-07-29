const cards = [...document.querySelectorAll(".card")];
const cardsElement = document.querySelector(".cards");
const score = document.querySelector(".score");
const userScore = score.querySelector(".score-user");
const computerScore = score.querySelector(".score-computer");
const difficulty = document.querySelector("#difficulty");

const data = ["rock", "paper", "scissors"];

cardsElement.style.display = "none";
score.style.display = "none";

function reset() {
  const result = document.querySelector(".result");
  if (result) result.parentNode.removeChild(result);

  cardsElement.style.display = "flex";
  score.style.display = "flex";

  const currentDifficultyValue = difficulty.value;
  userScore.textContent = currentDifficultyValue;
  computerScore.textContent = currentDifficultyValue;
}

difficulty.addEventListener("change", () => {
  reset();

  cards.forEach((card) => {
    card.addEventListener("click", handleClickItem);
  });
});

function handleShowResult(userChoose, computerChoose, result) {
  result = result.replace(result[0], result[0].toUpperCase());
  if (result !== "Draw") result = `You ${result}`;

  const template = `
    <div class="result">
      <div class="result-image">
        <img src="./img/${userChoose}.png" alt="" />
      </div>
      <div class="result-methods">
        <p class="result-text">${result}</p>
        <button class="result-play-again">Play again</button>
      </div>
      <div class="result-image">
        <img src="./img/${computerChoose}.png" alt="" />
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", template);

  const resultElement = document.querySelector(".result");
  const playAgain = document.querySelector(".result-play-again");

  playAgain.addEventListener("click", () => {
    cardsElement.style.display = "flex";
    resultElement.parentNode.removeChild(resultElement);
  });
}

function handleCreateModal(classify) {
  let message;
  if (classify === "win") {
    message = "Congratulations. You won!";
  } else if (classify === "lose") {
    message = "Do not worry. You can still play again!";
  } else {
    message = "Very good. You had drew with your opponent!";
  }

  const template = `
    <div class="modal">
      <div class="modal-content">
        <p>${message}</p>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", template);

  const modal = document.querySelector(".modal");
  modal.addEventListener("click", handleClickOutModal);
}

function handleClickOutModal(e) {
  if (e.target.matches(".modal")) {
    e.target.parentNode.removeChild(e.target);
  }
}

function handleClickItem(e) {
  cardsElement.style.display = "none";

  const dataItem = e.target.dataset.item;
  const randomData = data[Math.floor(Math.random() * data.length)];

  let userScoreValue = parseInt(userScore.textContent);
  let computerScoreValue = parseInt(computerScore.textContent);

  if (dataItem === randomData) {
    handleShowResult(dataItem, randomData, "draw");
  } else {
    if (dataItem === "rock") {
      if (randomData === "paper") {
        handleShowResult(dataItem, randomData, "lose");
        --userScoreValue;
      } else {
        handleShowResult(dataItem, randomData, "win");
        --computerScoreValue;
      }
    } else if (dataItem === "paper") {
      if (randomData === "scissors") {
        handleShowResult(dataItem, randomData, "lose");
        --userScoreValue;
      } else {
        handleShowResult(dataItem, randomData, "win");
        --computerScoreValue;
      }
    } else if (dataItem === "scissors") {
      if (randomData === "rock") {
        handleShowResult(dataItem, randomData, "lose");
        --userScoreValue;
      } else {
        handleShowResult(dataItem, randomData, "win");
        --computerScoreValue;
      }
    }
  }

  userScore.textContent = userScoreValue;
  computerScore.textContent = computerScoreValue;

  const newUserValue = parseInt(userScore.textContent);
  const newComputerValue = parseInt(computerScore.textContent);

  if (newUserValue === 0 && newComputerValue === 0) {
    handleCreateModal("draw");
    reset();
  } else if (newUserValue === 0) {
    handleCreateModal("lose");
    reset();
  } else if (newComputerValue === 0) {
    handleCreateModal("win");
    reset();
  }
}
