const cells = document.querySelectorAll('cell');

let currentPlayer = 'X';

cells.forEach((cell) => {
    cell.addEventListener('click', event => {
      console.log("how it should be");
        if (cell.data-cell === '') {
            console.log("it works");
            cell.dataset.cell = currentPlayer;
            cell.textContent = currentPlayer;
            cell.style.backgroundImage = currentPlayer === 'X' ? "./catimg.png" : "./catimg.png";
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    });
});

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
}

let currentPlayer = 'X';
window.addEventListener("click", event => {
  let cell = document.createElement("cell");
  cell.className = "cell";
  console.log("cell clicked");
})
