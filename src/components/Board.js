'use client'

import React, { useEffect, useState } from 'react';
import styles from './Board.css';
import * as MiniMaxUtils from './minimax';

const x = "/images/x.png";
const o = "/images/o.png";
const player1 = '/images/x.png';
const player2 = '/images/o.png';

const Board = () => {
  
  let move = player1;
  const initialTiles = Array.from({ length: 3 }, () => new Array(3).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState(player1);
  const [tiles, setTiles] = useState(initialTiles);
  const [boardFilled, setBoardFilled] = useState(false);
  const handleClick = (row, col) => {
    if(tiles[row][col] === null) {
      const newTiles = tiles.map(array => [...array]);
      newTiles[row][col] = currentPlayer;
      setTiles(newTiles);
      setCurrentPlayer(currentPlayer === player1 ? player2 : player1);
    }
  };
  
  return (
    <div className="board">
      {tiles.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((col, colIndex) => (
            <button
              key={rowIndex * tiles.length + colIndex}
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
