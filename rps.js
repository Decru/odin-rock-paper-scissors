function getComputerChoice() {
    let randomInt = Math.round(Math.random() * 2);
    return ['rock', 'paper', 'scissors'][randomInt];
}
function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    if (firstSelectionWin(playerSelection, computerSelection) === null) {
        return `Draw! You both chose ${playerSelection}`;
    }
    if (firstSelectionWin(playerSelection, computerSelection)) {
        return `You won! ${playerSelection} beats ${computerSelection}.`;
    } else {
        return `You Lost! ${computerSelection} beats ${playerSelection}`;
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