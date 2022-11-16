function getComputerChoice() {
    let randomInt = Math.floor(Math.random() * 3);
    return ['rock', 'paper', 'scissors'][randomInt];
}
function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    if (firstSelectionWin(playerSelection, computerSelection) === null) {
        return { result: null, choices: [playerSelection, computerSelection], reportString: `Draw! You both chose ${playerSelection}`};
    }
    if (firstSelectionWin(playerSelection, computerSelection)) {
        return { result: true, choices: [playerSelection, computerSelection], reportString:`You won! ${playerSelection} beats ${computerSelection}.`};
    } else {
        return { result: false, choices: [playerSelection, computerSelection], reportString:`You Lost! ${computerSelection} beats ${playerSelection}`};
    }
}
function firstSelectionWin(selection1, selection2) {
    if (selection1 === selection2) { return null; }
    return (
        (selection1 === "rock" && selection2 === "scissors") ||
        (selection1 === "paper" && selection2 === "rock") ||
        (selection1 === "scissors" && selection2 === "paper")
    );
}

/* old console logic
function game() {
    let userScore = 0;
    let computerScore = 0;
    for (let i = 0; i < 5; i++) {
        let userInput = prompt('rock paper of scissors?', 'rock');
        let computerInput = getComputerChoice();
        console.log(playRound(userInput, computerInput));
        if (firstSelectionWin(userInput, computerInput) === null) { continue; }
        firstSelectionWin(userInput, computerInput) ? userScore++ : computerScore++
    }
    return `Game done! the final score was: Player: ${userScore}, Computer: ${computerScore}.`
}
*/

let playerScore = 0;
let computerScore = 0;

function showScore() {
    const scoreboard = document.querySelector('.scoreboard');
    if (!scoreboard.classList.contains('scoreboard-show')) scoreboard.classList.add('show-flex');
}
function updateScore(roundResult) {
    if (roundResult['result'] === null) return;

    roundResult['result'] ? playerScore++ : computerScore++;
}
function updateBoard(roundResult) {
    updateImages(roundResult['choices']);
    updateRoundMessage(roundResult['reportString']);
    updateScoreDisplay();
}
function updateImages(choices) {
    const imageElements = [document.querySelector('#player-choice-image'),
        document.querySelector('#computer-choice-image')];
    const imageFilenames = {paper: 'images/paper.png', rock: 'images/rock.jpg', scissors: 'images/scissors.jpg'};

    imageElements[0].src = imageFilenames[choices[0]];
    imageElements[1].src = imageFilenames[choices[1]];
}
function updateRoundMessage(message) {
    const roundMessage = document.querySelector('.bottom-panel');
    roundMessage.textContent = message;
}
function updateScoreDisplay() {
    const scoresDisplay = [document.querySelector('.player-score'),
       document.querySelector('.computer-score')];

    scoresDisplay[0].textContent = `You: ${playerScore}`;
    scoresDisplay[1].textContent = `Computer: ${computerScore}`;
}
function checkEndGame() {
    if (playerScore < 5 && computerScore < 5) return;

    const scoresDisplay = [document.querySelector('.player-final-score'),
        document.querySelector('.computer-final-score')];

    scoresDisplay[0].textContent = `You: ${playerScore}`;
    scoresDisplay[1].textContent = `Computer: ${computerScore}`;

    const endMessage = document.querySelector('.end-win-or-lose');
    playerScore >= 5 ? endMessage.textContent = 'You won the game!' : endMessage.textContent = 'You lost the game!';
    document.querySelector('.board').classList.add('hide');
    document.querySelector('.end-screen').classList.add('show-flex');
}

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        let roundResult = playRound(button.id, getComputerChoice());
        updateScore(roundResult);
        updateBoard(roundResult);
        showScore();
        checkEndGame();
    });
})
