import React from 'react';
import styles from './Board.css';

const Board = () => {
  return (
    <div className="board">
      <button class="tile" id="tile1"></button>
      <button class="tile" id="tile2"></button>
      <button class="tile" id="tile3"></button>
      <button class="tile" id="tile4"></button>
      <button class="tile" id="tile5"></button>
      <button class="tile" id="tile6"></button>
      <button class="tile" id="tile7"></button>
      <button class="tile" id="tile8"></button>
      <button class="tile" id="tile9"></button>
    </div>
  );
};

export default Board;
