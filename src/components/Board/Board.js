'use client'

const c = { log: console.log.bind(console) };
import React, { useLayoutEffect, useState, useRef } from 'react';
import styles from './Board.css';
import { setMiniMax } from './Minimax';
//import Scoreboard from '../Scoreboard/Scoreboard';

const x = "/images/x.png";
const o = "/images/o.png";

//CLEAN BOARD MADE BCUZ REFERENCING ISSUE WITH ARRAY MAKING MINIMAX ACT FUNNY
//For example array is being updated before it's passed to the minimax functions
function copyBoard(originalBoard) {
  let newBoard = Array.from({ length: 3 }, () => new Array(3).fill(null));
  for(let i = 0; i < originalBoard.length; i++) {
      for(let j = 0; j < originalBoard[i].length; j++){
        if (originalBoard[i][j] === "/images/x.png")
          newBoard[i][j] = "x";
        if (originalBoard[i][j] === "/images/o.png")
          newBoard[i][j] = "o";
        if (originalBoard[i][j] === null)
          newBoard[i][j] = "";
      }
    }
  return newBoard;
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

function boardFilled(board){
  for(let row of board) {
    for(let element of row) {
      if(element === null) {
        return false;
      }
    }
  }
  return true;
}


const Board = ({/* setPlayerScore, setDrawScore, setBotScore */}) => {
  const initialBoard= Array.from({ length: 3 }, () => new Array(3).fill(null));
  const [isGameOver, setIsGameOver] = useState(false);
  const [player, setPlayer] = useState(x);
  const [playerMove, setPlayerMove] = useState(null);
  const [bot, setBot] = useState(o);
  const [board, setBoard] = useState(initialBoard);

  const handleClick = (row, col) => {
    /*
    if(isGameOver){
      setIsGameOver(false);
      setBoard(initialBoard);
      if(bot === x) {
        let newBoard = setMiniMax(copyBoard(newBoard), bot);
        setBoard(newBoard);
      }
    }else if (board[row][col] === null) {
      c.log("handleClick");
      let newBoard = board.map(array => [...array]);
      newBoard[row][col] = player;
      setBoard(newBoard);
      setPlayerMove([row,col]);
      if(checkWin(newBoard, player)){
        setPlayerScore(currentScore => currentScore + 1);
        setIsGameOver(true);
        setPlayer(player === x ? o : x); 
        setBot(bot === x ? o : x); 
        //win animation
      }
      console.log("end of handleClick");
    }
    if(boardFilled(board)){
      console.log("game is a draw");
      setDrawScore(currentScore => currentScore + 1);
      setBoard(initialBoard);
      setIsGameOver(true);
      setPlayer(player === x ? o : x); 
      setBot(bot === x ? o : x); 
      //lose animation
    }
  */
  };

  const firstUpdate = useRef(true);

  useLayoutEffect(() => {
    console.log("Use Layout Effect");
    c.log(firstUpdate.current);
    if (firstUpdate.current) {
      firstUpdate.current = false;
      c.log(firstUpdate.current);
      return;
    }
    if(!isGameOver) {
    }
  }, [playerMove]);

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((col, colIndex) => (
            <button
              key={rowIndex * board.length + colIndex}
              className="tile"
              onClick={() => handleClick(rowIndex, colIndex)}
            >
              {col && <img src={col} />}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
