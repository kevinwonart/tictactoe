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

const Board = () => {
  let move = player1;
  let botMove = player1 === x ? "o" : "x";
  const initialBoard= Array.from({ length: 3 }, () => new Array(3).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState(player1);
  const [board, setBoard] = useState(initialBoard);
  const [boardFilled, setBoardFilled] = useState(false);
  useEffect(() => {
  }, [boardFilled]);

  const handleClick = (row, col) => {
    if(board[row][col] === null) {
      const newBoard = board.map(array => [...array]);
      newBoard[row][col] = currentPlayer;
      setBoard(newBoard);
      setBoard(setNext(copyBoard(newBoard), botMove));
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
