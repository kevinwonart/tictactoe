const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Board {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.grid = Array.from({ length: this.rows }, () => Array(this.columns).fill(""));
  }
}
const player1 = "x";
const player2 = "o";
let player = "";

let turn = player1;
const board = new Board(3,3);
function printBoard(){
  console.log(` ${board.grid[0][0]} | ${board.grid[0][1]} | ${board.grid[0][2]}`);
  console.log('-----------');
  console.log(` ${board.grid[1][0]} | ${board.grid[1][1]} | ${board.grid[1][2]}`);
  console.log('-----------');
  console.log(` ${board.grid[2][0]} | ${board.grid[2][1]} | ${board.grid[2][2]}`);
}

function isBoardFilled(board){
  for(let row of board) {
    for(let element of row) {
      if(element === "") {
        return false;
      }
    }
  }
  return true;
}

function switchPlayer() {
  turn = turn === "x" ? "o" : "x";
}

function checkWin(board, player){
  for(let i = 0; i < 3; i++) {
    if((board[i][0] === player &&
      board[i][1] === player &&
      board[i][2] === player) ||
      board[0][i] === player &&
      board[1][i] === player &&
      board[2][i] === player
    ){
      return true;
    }
  }
  if(board[0][0] === player &&
    board[1][1] === player &&
    board[2][2] === player) {
    return true;
  }
  if(board[0][2] === player &&
    board[1][1] === player &&
    board[2][0] === player) {
    return true;
  }
}


function isGameOver(board){
  for (let i = 0; i < 3; i++) {
    if(board[i][0] === "x" && board[i][0] === board[i][1] === board[i][2]){
      return true;
    }
    if(board[0][i] === "x" && board[0][i] === board[1][i] === board[2][i]){
      return true;
    }
    if(board[i][0] === "o" && board[i][0] === board[i][1] === board[i][2]){
      return true;
    }
    if(board[0][i] === "o" && board[0][i] === board[1][i] === board[2][i]){
      return true;
    }
  }
  if(board[0][0] === "x" && board[0][0] === board[1][1] === board[2][2]){
    return true;
  }
  if(board[0][2] === "x" && board[0][2] === board[1][1] === board [2][0]){
    return true;
  }
  if(board[0][0] === "o" && board[0][0] === board[1][1] === board[2][2]){
    return true;
  }
  if(board[0][2] === "o" && board[0][2] === board[1][1] === board [2][0]){
    return true;
  }
}

function evalBoard(board){
  for(let i = 0; i < 3; i++) {
    if((board[i][0] === "x" &&
      board[i][1] === "x" &&
      board[i][2] === "x") ||
      board[0][i] === "x" &&
      board[1][i] === "x" &&
      board[2][i] === "x"
    ){
      return 1;
    }
  }
  if(board[0][0] === "x" &&
    board[1][1] === "x" &&
    board[2][2] === "x") {
      return 1;
  }
  if(board[0][2] === "x" &&
    board[1][1] === "x" &&
    board[2][0] === "x") {
      return 1;
  }

  if((board[i][0] === "o" &&
    board[i][1] === "o" &&
    board[i][2] === "o") ||
    board[0][i] === "o" &&
    board[1][i] === "o" &&
    board[2][i] === "o"
  ){
    return -1;
  }

  if(board[0][0] === "o" &&
    board[1][1] === "o" &&
    board[2][2] === "o") {
      return -1;
  }
  if(board[0][2] === "o" &&
    board[1][1] === "o" &&
    board[2][0] === "o") {
      return -1;
  }
  return 0;
}

function miniMax(board, depth, isMax) {
  if(isGameOver(board)){
    return evalBoard(board);
  }

  if (isMax){
    let maxEval = -Infinty;
    for (let row = 0; row < 3; row++){
      for (let col = 0; col < 3; col++){
        if(board[row][col] === ""){
          board[row][col] = "x";
          const eval = miniMax(board, depth + 1, false);
          board[row][col] = "";
          maxEval = Math.max(maxEval, eval);
        }
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let row = 0; i < 3; row++) {
      for (let col = 0; j < 3; col++) {
        if (board[row][col] === ""){
          board[row][col] = "o";
          const eval = miniMax(board, depth + 1, true);
          board[row][col] = "";
          minEval = Math.min(minEval, eval);
        }
      }
    }
    return minEval;
    }
}

function findMove(board, player){

}
function getPlayer(){
  rl.question("Play as 'x' or 'o'?", (input) => {
    if(input !== "x" || input !== "0"){
      console.log("invalid input");
      getPlayer();
    } else{
      player = input === "x" ? player1 : player2;
    }
  });
}

function play(){
  printBoard();
  rl.question(`Player ${turn} to go enter (1-9): `, (input) => {
    let move = parseInt(input);
    if(isNaN(move) || move < 1 || move > 9) {
      console.log("invalid input. Play a position (1-9)");
      play();
    }else {
      const row = Math.floor((move -1)/3);
      const col = (move -1) % 3;
      if (board.grid[row][col] === 'x' || board.grid[row][col] === 'o') {
        console.log("Invalid move. Cell is occupied");
        play();
      } else {
        board.grid[row][col] = turn;
        if(checkWin(board.grid, turn)) {
          printBoard();
          console.log(`Player ${turn} wins!`);
          rl.close();
      } else if (isBoardFilled(board.grid)) {
          printBoard();
          console.log("It\'s a draw!");
          rl.close();
      } else {
          switchPlayer();
          play();
        }
      }
    }
  });
}
getPlayer();
play();
