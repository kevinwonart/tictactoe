class Board {
  constructor(rows, columns, winCon) {
    this.rows = rows;
    this.columns = columns;
    this.grid = Array.from({ length: this.rows }, () => Array(this.columns).fill(""));
    this.turn = "x";
  }
}
const board = new Board(3,3);
for(let row of board.grid){
  console.log(row);
}
