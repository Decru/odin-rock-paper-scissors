function getComputerChoice() {
    randomInt = Math.floor(Math.random() * 2);
    return ['rock', 'paper', 'scissors'][randomInt];
}