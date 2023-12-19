'use client'

import React, { useState } from 'react';
import styles from './Board.css';

const player1 = "/images/x.png";
const player2 = "/images/o.png";

const Board = () => {
  
  let move = player1;
  const [currentPlayer, setCurrentPlayer] = useState(player1);
  const [tiles, setTiles] = useState(Array(9).fill(null));

  const handleClick = (index) => {
    if(tiles[index] === null) {
      const newTiles = [...tiles];
      newTiles[index] = currentPlayer;
      setTiles(newTiles);
      setCurrentPlayer(currentPlayer === player1 ? player2 : player1);
    }
  };

  return (
    <div className="board">
      {tiles.map((onClickImage, index) => (
        <button
          key={index}
          className="tile"
          id={`tile${index}`}
          onClick={() => handleClick(index)}
        >
          {onClickImage && <img src={onClickImage}/>}
        </button>
      ))}
    </div>
  );
};

export default Board;
