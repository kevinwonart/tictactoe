const setBoard = (board) => {
  return board;
};
const setBot = (bot) => {
  return bot;
}

const board = setBoard(board);
const bot = setBot(bot);
const player = bot === "x" ? "o" : "x";

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
    if(board[i][0] === "x"  && board[i][1] === "x" && board[i][2] === "x"){
      return true;
    }
    if(board[0][i] === "x"  && board[1][i] === "x" && board[2][i] == "x"){
      return true;
    }
    if(board[i][0] === "o" && board[i][1] === "o" && board[i][2] == "o"){
      return true;
    }
    if(board[0][i] === "o" &&  board[1][i] === "o" && board[2][i] =="o"){
      return true;
    }
  }
  if(board[0][0] === "x" &&  board[1][1] === "x" && board[2][2] === "x"){
    return true;
  }
  if(board[0][2] === "x" &&  board[1][1] === "x" && board [2][0] == "x"){
    return true;
  }
  if(board[0][0] === "o" && board[1][1] === "o" && board[2][2] === "o"){
    return true;
  }
  if(board[0][2] === "o" &&  board[1][1] === "o" && board [2][0] == "o"){
    return true;
  }
  for(let i = 0; i < 3; i++){
    for(let j = 0; j < 3; j++){
      if(board[i][j] === ""){
        return false;
      }
    }
  }
  return true;
}

function evalBoard(board){
  for(let i = 0; i < 3; i++) {
    if((board[i][0] === "x" &&
      board[i][1] === "x" &&
      board[i][2] === "x") ||
      (board[0][i] === "x" &&
      board[1][i] === "x" &&
      board[2][i] === "x")
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
  for(let i = 0; i < 3; i++){
    if((board[i][0] === "o" &&
      board[i][1] === "o" &&
      board[i][2] === "o") ||
      (board[0][i] === "o" &&
      board[1][i] === "o" &&
      board[2][i] === "o")
    ){
      return -1;
    }
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

function miniMax(board, isMax) {
  if(isGameOver(board)){
    return evalBoard(board);
  }

  if (isMax){
    let maxEval = -Infinity;
    for (let row = 0; row < 3; row++){
      for (let col = 0; col < 3; col++){
        if(board[row][col] === ""){
          board[row][col] = "x";
          const score = miniMax(board, false);
          board[row][col] = "";
          maxEval = Math.max(maxEval, score);
        }
      }
    }
    //c.log(maxEval);
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === ""){
          board[row][col] = "o";
          const score = miniMax(board, true);
          board[row][col] = "";
          minEval = Math.min(minEval, score);
        }
      }
    }
    return minEval;
    }
}

function getBotMove(bot){
  if(isGameOver(board.grid)){
    return;
  }
  if(bot === "x"){
    let bestMove = { row: -1, col: -1 };
    let bestEval = -Infinity;
    for (let i = 0; i < 3; i++){
      for (let j = 0; j < 3; j++){
        if(board.grid[i][j] === ""){
          board.grid[i][j] = "x";
          const score = miniMax(board.grid, false);
          board.grid[i][j] = "";
          if (score > bestEval){
            bestEval = score;
            bestMove.row = i;
            bestMove.col = j;
          }
        }
      }
    }
    board.grid[bestMove.row][bestMove.col] = bot;
    if(checkWin(board.grid, bot)) {
      printBoard();
      console.log(`Player ${bot} wins!`);
      return;
    }else if (isBoardFilled(board.grid)) {
      printBoard();
      console.log("It\'s a draw!");
  } else {
      bot === "x" ? getPlayerMove("o") : getPlayerMove("x");
    }
  }else {
    let bestMove = { row: -1, col: -1 };
    let bestEval = Infinity;
    for (let i = 0; i < 3; i++){
      for (let j = 0; j < 3; j++){
        if(board.grid[i][j] === ""){
          board.grid[i][j] = "o";
          const score = miniMax(board.grid, true);
          board.grid[i][j] = "";
          if (score < bestEval){
            bestEval = score;

            bestMove.row = i;
            bestMove.col = j;
          }
        }
      }
    }
    board.grid[bestMove.row][bestMove.col] = bot;
    if(checkWin(board.grid, bot)) {
      printBoard();
      console.log(`Player ${bot} wins!`);
      return;
    }
    bot === "x" ? getPlayerMove("o") : getPlayerMove("x");
  }
}

export const setNext = (clientBoard, botMove) => {
  setBoard(clientBoard);
  setBot(botMove);
}
