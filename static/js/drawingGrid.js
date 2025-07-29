/* variables */

const clearBtn = document.getElementById("clear-btn");
const colorPicker = document.getElementById("color-picker");
const drawingGrid = document.getElementById("drawing-grid");
const eraserBtn = document.getElementById("eraser-btn");
const gridSizeInput = document.getElementById("grid-size");

let baseColor = "#f0f0f0";
let drawingColor = colorPicker.value;
let gridSize = gridSizeInput.value;
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

function clearGrid() {
  baseColor = "#f0f0f0";
  colorPicker.value = "#000000";
  drawingColor = colorPicker.value;
  isErasing = false;
  initGrid(gridSize);
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

  clearBtn.addEventListener("click", () => {
    clearGrid();
  });

  colorPicker.addEventListener("input", (event) => {
    drawingColor = event.target.value;
    isErasing = false;
  });

  gridSizeInput.addEventListener("input", (event) => {
    gridSize = event.target.value;
    initGrid(gridSize);
  });
}

function initGrid(size) {
  createGird(size);
  setupEventListeners();
}

initGrid(gridSize);
