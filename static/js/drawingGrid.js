/* variables */

let baseColor = "#f0f0f0";
let drawingColor = "black";
let gridSize = 16;
let isDrawing = false;
let isErasing = false;

const drawingGrid = document.getElementById("drawing-grid");
const eraserBtn = document.getElementById("eraser-btn");
const colorPicker = document.getElementById("color-picker");

function createGird(size) {
  drawingGrid.innerHTML = "";

  drawingGrid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  drawingGrid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.classList.add("grid-cell");

    cell.addEventListener("mouseover", (event) => {
      if (isDrawing && isErasing) {
        event.target.classList.remove("drawn");
      } else if (isDrawing) {
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

  eraserBtn.addEventListener("click", () => {
    isErasing = true;
  });
}

function initGrid() {
  createGird(gridSize);
  setupEventListeners();
}

initGrid();
