'use client'

import React, { useEffect, useState } from 'react';
import styles from './Board.css';
import { setMiniMax } from './Minimax';
import Scoreboard from '../Scoreboard/Scoreboard';

const x = "/images/x.png";
const o = "/images/o.png";

function copyBoard(originalBoard) {
  console.log("board passed to copyBoard() but not copied");
  console.log(originalBoard);
  let copiedBoard = originalBoard.map(array => [...array]);
  for(let i = 0; i < copiedBoard.length; i++) {
      for(let j = 0; j < copiedBoard[i].length; j++){
        if (copiedBoard[i][j] === "/images/x.png")
          copiedBoard[i][j] = "x";
        if (copiedBoard[i][j] === "/images/o.png")
          copiedBoard[i][j] = "o";
        if (copiedBoard[i][j] === null)
          copiedBoard[i][j] = "";
      }
    }
  console.log("After copying board in inside copyBoard()");
  console.log(copiedBoard);
  return copiedBoard;
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


const Board = ({ setPlayerScore, setDrawScore, setBotScore }) => {
  const initialBoard= Array.from({ length: 3 }, () => new Array(3).fill(null));
  const [isGameOver, setIsGameOver] = useState(false);
  const [playerMove, setPlayerMove] = useState(x);
  const [botMove, setBotMove] = useState(o);
  const [board, setBoard] = useState(initialBoard);

  const handleClick = (row, col) => {
    if(isGameOver){
      setIsGameOver(false);
      setBoard(initialBoard);
      if(botMove === x) {
        let newBoard = initialBoard;
        console.log("Initialboard before passing minimax: ");
        console.log(initialBoard);
        newBoard = copyBoard(newBoard);
        newBoard = setMiniMax(copyBoard(newBoard), botMove);
        setBoard(newBoard);
      }
    }else if (board[row][col] === null) {
      let newBoard = board.map(array => [...array]);
      newBoard[row][col] = playerMove;
      setBoard(newBoard);
      if(checkWin(newBoard, playerMove)){
        setPlayerScore(currentScore => currentScore + 1);
        setIsGameOver(true);
        setPlayerMove(playerMove === x ? o : x); 
        setBotMove(botMove === x ? o : x); 
        //win animation
      }
      /* RECREATING ANOTHER BOARD BECAUSE THE STATE OF THE ARRAY GETS AFFECTED
       * IN THE MINIMAX BEFORE THE COPYING OF THE ARRAY GETS DONE---
       */

      let miniMaxBoard = newBoard.map(array => [...array]);
      miniMaxBoard = copyBoard(miniMaxBoard);
      newBoard = miniMaxBoard.map(array => [...array]);
      newBoard = setMiniMax(newBoard, botMove);
      setBoard(newBoard);
      if(checkWin(newBoard, botMove)){
        setBotScore(currentScore => currentScore + 1);
        setIsGameOver(true);
        setPlayerMove(playerMove === x ? o : x); 
        setBotMove(botMove === x ? o : x); 
        //win animation
      }
      console.log("end of handleClick");
      console.log(newBoard);
    }
    if(boardFilled(board)){
      console.log("game is a draw");
      setDrawScore(currentScore => currentScore + 1);
      setBoard(initialBoard);
      setIsGameOver(true);
      setPlayerMove(playerMove === x ? o : x); 
      setBotMove(botMove === x ? o : x); 
      //lose animation
    }
  };
  
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
