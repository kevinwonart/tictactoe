'use client'

import React, { useEffect, useState } from 'react';
import styles from './Board.css';
import * as MiniMax from './minimax';
import { setNext } from './test';

const x = "/images/x.png";
const o = "/images/o.png";
const player1 = '/images/x.png';
const player2 = '/images/o.png';

function copyBoard(originalBoard) {
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
  return copiedBoard;
}

function checkWin(board, player){
  console.log("print palyer in checkwin function: " + player);
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


const Board = () => {
  let humanMove = player1;
  let botMove = player1 === x ? "o" : "x";
  const initialBoard= Array.from({ length: 3 }, () => new Array(3).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState(player1);
  const [board, setBoard] = useState(initialBoard);
  const [scoreCard, setScoreCard] = useState( { human : 0, bot : 0, draw : 0 } );
  useEffect(() => {
  }, [boardFilled]);

  const handleClick = (row, col) => {
    if(board[row][col] === null) {
      let newBoard = board.map(array => [...array]);
      newBoard[row][col] = currentPlayer;
      setBoard(newBoard);
      if(checkWin(newBoard, humanMove)){
        console.log("x wins");
        newBoard = initialBoard;
        setBoard(newBoard);
      }
      setBoard(setNext(copyBoard(newBoard), botMove));
      console.log(newBoard);
      if(checkWin(newBoard, botMove)){
        console.log("o wins");
        newBoard = initialBoard;
        setBoard(newBoard);
        console.log("another printline");
      }
    }
    if(boardFilled(board)){
      console.log("game is a draw");
      newBoard = initialBoard;
      setBoard(newBoard);
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
