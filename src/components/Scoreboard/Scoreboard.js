"use client"

import React, { useState } from 'react';
import styles from './Scoreboard.css';

const Scoreboard = () => {
  const [playerScore, setPlayerScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [drawScore, setDrawScore] = useState(0);

  return (
    <div className="scoreboard">
      <div className="score">
        <h2> Player: {playerScore}</h2>
      </div>
      <div className="score">
        <h2> Draw: {drawScore}</h2>
      </div>
      <div className="score">
        <h2> Bot: {botScore}</h2>
      </div>
    </div>
  );
};

export default Scoreboard;
