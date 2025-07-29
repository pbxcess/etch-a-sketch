/* variables */

let gridSize = 16;
const drawingGrid = document.getElementById("drawing-grid");
let isDrawing = false;

function createGird(size) {
  drawingGrid.innerHTML = "";

  drawingGrid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  drawingGrid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.classList.add("grid-cell");

    cell.addEventListener("mouseover", (event) => {
      if (isDrawing) {
        event.target.classList.add("drawn");
      }
    });

    drawingGrid.appendChild(cell);
  }
}

function setupEventListeners() {
  document.addEventListener("mousedown", () => {
    isDrawing = true;
  });

  document.addEventListener("mouseup", () => {
    isDrawing = false;
  });
}

function initGrid() {
  createGird(gridSize);
  setupEventListeners();
}

initGrid();
