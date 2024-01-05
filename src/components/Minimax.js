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

function getBotMove(board, bot){
  if(isGameOver(board)){
    return;
  }
  if(bot === "x"){
    let bestMove = { row: -1, col: -1 };
    let bestEval = -Infinity;
    for (let i = 0; i < 3; i++){
      for (let j = 0; j < 3; j++){
        if(board[i][j] === ""){
          board[i][j] = "x";
          const score = miniMax(board, false);
          board[i][j] = "";
          if (score > bestEval){
            bestEval = score;
            bestMove.row = i;
            bestMove.col = j;
          }
        }
      }
    }
    board[bestMove.row][bestMove.col] = bot;
    if(checkWin(board, bot)) {
      return;
    }else if (isBoardFilled(board)) {
      console.log("It\'s a draw!");
  } else {
      bot === "x" ? getPlayerMove("o") : getPlayerMove("x");
    }
  }else {
    let bestMove = { row: -1, col: -1 };
    let bestEval = Infinity;
    for (let i = 0; i < 3; i++){
      for (let j = 0; j < 3; j++){
        if(board[i][j] === ""){
          board[i][j] = "o";
          const score = miniMax(board, true);
          board[i][j] = "";
          if (score < bestEval){
            bestEval = score;

            bestMove.row = i;
            bestMove.col = j;
          }
        }
      }
    }
    board[bestMove.row][bestMove.col] = bot;
    console.log("board after running minimax");
    console.log(board);
    if(checkWin(board, bot)) {
      return;
    }
    return renderBoard(board);
  }
}

function renderBoard(board) {
  let renderedBoard = board.map(array => [...array]);
  for(let i = 0; i < renderedBoard.length; i++) {
      for(let j = 0; j < renderedBoard[i].length; j++){
        if (renderedBoard[i][j] === "x")
          renderedBoard[i][j] = "/images/x.png";
        if (renderedBoard[i][j] === "o")
          renderedBoard[i][j] = "/images/o.png";
        if (renderedBoard[i][j] === "")
          renderedBoard[i][j] = null;
      }
    }
  return renderedBoard;
}
export const setMiniMax = (board, bot) => {
  if(bot === "/images/x.png"){
    console.log("miniMax pass success. Board: ");
    console.log(board);
  }
  console.log("board minimax, in minimax pass before get bot move");
  console.log(board);
  getBotMove(board, bot);
  return(renderBoard(board));
} 
