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

play();
