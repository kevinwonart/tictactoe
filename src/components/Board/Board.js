'use client'

const c = { log: console.log.bind(console) };
import React, { useLayoutEffect, useState, useRef, useEffect } from 'react';
import styles from './Board.css';
import { setMiniMax } from './Minimax';
//import Scoreboard from '../Scoreboard/Scoreboard';

const x = "/images/x.png";
const o = "/images/o.png";

//CLEAN BOARD MADE BCUZ REFERENCING ISSUE WITH ARRAY MAKING MINIMAX ACT FUNNY
//For example array is being updated before it's passed to the minimax functions
function copyBoard(originalBoard) {
  let newBoard = Array.from({ length: 3 }, () => new Array(3).fill(null));
  for(let i = 0; i < originalBoard.length; i++) {
      for(let j = 0; j < originalBoard[i].length; j++){
        if (originalBoard[i][j] === "/images/x.png")
          newBoard[i][j] = "x";
        if (originalBoard[i][j] === "/images/o.png")
          newBoard[i][j] = "o";
        if (originalBoard[i][j] === null)
          newBoard[i][j] = "";
      }
    }
  return newBoard;
}

function returnBoard(copiedBoard){
  let newBoard = Array.from({ length: 3 }, () => new Array(3).fill(null));
  for(let i = 0; i < copiedBoard.length; i++) {
    for(let j = 0; j < copiedBoard[i].length; j++) {
      if (copiedBoard[i][j] === ""){
        c.log("pass null");
        newBoard[i][j] = null;
        c.log(newBoard);
      } else {
        newBoard[i][j] = copiedBoard[i][j];
      }
    }
  }
  c.log("reutrn Board");
  c.log(newBoard);
  c.log("copied Board");
  c.log(copiedBoard);
  return newBoard;
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
  return false;
}

function boardFilled(board){
  for(let row of board) {
    for(let element of row) {
      if(element === '' || element === null) {
        return false;
      }
    }
  }
  return true;
}

const Board = ({ setPlayerScore, setDrawScore, setBotScore }) => {
  const initialBoard= Array.from({ length: 3 }, () => new Array(3).fill(null));
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameOverProcessed, setGameOverProcessed] = useState(false);
  const [player, setPlayer] = useState(x);
  const [playerMove, setPlayerMove] = useState(null);
  const [bot, setBot] = useState(o);
  const [board, setBoard] = useState(initialBoard);

  const handleClick = (row, col) => {
    c.log("Game over processed state at start of handleClick: " + gameOverProcessed);
    if(gameOverProcessed) {
      if(bot === x){
        let newBoard = board.map(array => [...array]);
        newBoard = copyBoard(initialBoard);
        let botMove = setMiniMax(newBoard, bot);
        c.log("botMove");
        c.log(botMove);
        newBoard[botMove.row][botMove.col] = bot;
        newBoard = returnBoard(newBoard);
        c.log("GameOverprocessed Passed: " + gameOverProcessed);
        c.log("bot in gameoverprocessed : " + bot);
        setIsGameOver(false);
        setGameOverProcessed(false);
        setBoard(newBoard);
        c.log("bot first move: new board and board: ");
        c.log(newBoard);
        c.log(board);
        return;
      } else{
        setBoard(initialBoard);
        setIsGameOver(false);
        setGameOverProcessed(false);
        return;
      }
    }
    let newBoard = board.map(array => [...array]);
    if (board[row][col] === null) {
      newBoard[row][col] = player;
      c.log("player onclick board");
      c.log(newBoard);
      setBoard(newBoard);
    }
    if (checkWin(board, player)) {
      setIsGameOver(true);
    } else if (boardFilled(board)) {
      setIsGameOver(true);
    } else {
      c.log("here's the problem");
      setPlayerMove([row, col]);
    }
  };
  
  const uEUpdate = useRef(true);
  useEffect(() => {
    console.log("Use Effect");
    console.log(board);
    c.log("boardFilled(board): ");
    c.log(boardFilled(board));
    c.log("checkwin(bot)");
    c.log(checkWin(board,bot));
    c.log("checkwin(player)");
    c.log(checkWin(board,player));
    if (uEUpdate.current) {
      uEUpdate.current = false;
      return;
    }
    if (!gameOverProcessed){
      if (checkWin(board, bot) && isGameOver){
        c.log("a");
        setBotScore(currentScore => currentScore + 1);
        setPlayer(player === x ? o : x);
        setBot(bot === x ? o : x);
        setGameOverProcessed(true);
      } else if(checkWin(board, player) && isGameOver){
        c.log("b");
        setPlayerScore(currentScore => currentScore + 1);
        setPlayer(player === x ? o : x);
        setBot(bot === x ? o : x);
        setGameOverProcessed(true);
      } else if(boardFilled(board) && !checkWin(board, bot) && !checkWin(board, player)){
        c.log("c");
        setDrawScore(currentScore => currentScore + 1);
        setPlayer(player === x ? o : x);
        setBot(bot === x ? o : x);
        setGameOverProcessed(true);
      }
    }
  }, [isGameOver]);

  const firstUpdate = useRef(true);
  useLayoutEffect(() => {
    console.log("Use Layout Effect");
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if(!isGameOver && playerMove) {
      c.log("board in getbotmove")
      c.log(board);
      let newBoard = copyBoard(board);
      c.log("new board");
      c.log(newBoard);
      let botMove = setMiniMax(newBoard, bot);
      c.log("bot move: ");
      c.log(botMove);
      newBoard = board.map(array => [...array]);
      newBoard[botMove.row][botMove.col] = bot;
      setBoard(newBoard);
      if(checkWin(newBoard, bot)){
        setIsGameOver(true);
      } else if (boardFilled(board)){
        setIsGameOver(true);
      }
    }
  }, [playerMove]);

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
