const cells = document.querySelectorAll(".cell");

console.log(cells)
let currentPlayer = 'X';

const consolePrint = () => {
  console.log("cellclicked");
}

cells.forEach(cell =>{
  cell.addEventListener("click", consolePrint);
})
