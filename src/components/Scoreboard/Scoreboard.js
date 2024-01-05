"use client"

import React, { useState } from 'react';
import styles from './Scoreboard.css';

const Scoreboard = ({ playerScore, drawScore, botScore }) => {

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
