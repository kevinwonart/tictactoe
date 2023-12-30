'use client'

import React, { useEffect, useState } from 'react';
import styles from './Board.css';
import * as MiniMax from './minimax';
import * as testing from './test';

const x = "/images/x.png";
const o = "/images/o.png";
const player1 = '/images/x.png';
const player2 = '/images/o.png';

const Board = () => {
  
  let move = player1;
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
      //setCurrentPlayer(currentPlayer === player1 ? player2 : player1);
      testing.setNext(board);
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
