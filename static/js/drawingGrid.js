/* variables */

const drawingGrid = document.getElementById("drawing-grid");
const eraserBtn = document.getElementById("eraser-btn");
const colorPicker = document.getElementById("color-picker");

let baseColor = "#f0f0f0";
let drawingColor = colorPicker.value;
let gridSize = 16;
let isDrawing = false;
let isErasing = false;

function createGird(size) {
  drawingGrid.innerHTML = "";

  drawingGrid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  drawingGrid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.classList.add("grid-cell");

    cell.addEventListener("mouseover", (event) => {
      if (isDrawing) {
        if (isErasing) {
          event.target.style.backgroundColor = baseColor;
        } else {
          event.target.style.backgroundColor = drawingColor;
        }
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

  colorPicker.addEventListener("input", (event) => {
    drawingColor = event.target.value;
    isErasing = false;
  });
}

function initGrid() {
  createGird(gridSize);
  setupEventListeners();
}

initGrid();
