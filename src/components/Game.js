"use client"

import React, { useState } from 'react';
import Board from './Board/Board';
import Scoreboard from './Scoreboard/Scoreboard';

const Game = () => {
  const [playerScore, setPlayerScore] = useState(0);
  const [drawScore, setDrawScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  
  return (
    <div>
      <Board setPlayerScore={setPlayerScore} setDrawScore={setDrawScore} setBotScore={setBotScore} />
      <Scoreboard playerScore={playerScore} drawScore={drawScore} botScore={botScore} />
    </div>
  );
};

export default Game;
